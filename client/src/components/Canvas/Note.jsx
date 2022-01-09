import React, {
	useEffect,
	useMemo,
	useState,
	useCallback,
	useRef,
	Suspense,
} from "react";
import { useDispatch } from "react-redux";
import {
	UPDATE_NOTESET,
	SELECT_NOTE,
	DRAG_NOTE,
	ADD_NOTE,
	DELETE_NOTE,
	REMOVE_NOTE,
} from "../../store/slices/noteSlice";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import isHotkey from "is-hotkey";
import { createEditor, Editor, Range, Transforms } from "slate";
import { Slate, Editable, withReact, ReactEditor, useSlate } from "slate-react";
import { useTransition, config, animated } from "react-spring";
import { withHistory } from "slate-history";
import { io } from "../../services/socket";
import Trash from "../../assets/icons/trash.svg";
import Down from "../../assets/icons/down.svg";

const DeleteNote = styled.div`
	position: absolute;
	top: -15px;
	right: -14px;
	padding: 6px;
	display: flex;
	transform: scale(0.8);
	border-radius: 100px;
	cursor: pointer;
	transition: all 0.2s ease-out;
	&:hover {
		background-color: ${(props) => props.theme.color.dark[1]};
	}
`;

const NoteTop = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	transition: 0.3s ease-out;
	${(props) =>
		props.isSelected
			? "border: 2px solid " + props.theme.color.white
			: "border: 1px solid " + props.theme.color.dark[3]};
	${(props) =>
		props.draggedNote
			? "box-shadow: -11px 7px 20px 3px #222222"
			: "box-shadow: none"};
	background: ${(props) => props.theme.color.dark[2]};
	border-radius: 5px;
	pointer-events: ${(props) => (props.isSelected ? "none" : "all")};
	transform: translate(-2px, -2px);
`;

const EditorContainer = styled.div`
	width: -webkit-fill-available;
	width: fill-available;
	overflow: hidden;
	padding: 20px 20px;
`;

const EditorTextContainer = styled.div``;
const NoteOverflow = styled.div`
	background: ${(props) =>
		props.overflowTrigger
			? "linear-gradient(360deg,rgba(96,96,96,1) 8%,rgba(96,96,96,0.5746673669467788) 18%,rgba(90,103,106,0) 25%,rgba(86,108,113,0) 30%,rgba(0,212,255,0) 100%)"
			: "transparent"};
	height: 100px;
	width: 90%;
	position: absolute;
	bottom: 0;
	z-index: 10;
	transition: 0.2s ease-out;
	pointer-events: none;
`;

const FormatCont = styled(animated.div)`
	position: absolute;
	left: 50%;
	height: 50px;
	background-color: ${(props) => props.theme.color.dark[1]};
	box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
		0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.14);
	border-radius: 5px;
	display: flex;
	align-items: center;
	transform: translateX(-50%);
	z-index: 1000;
`;

const FormatBox = styled.div`
	display: flex;
	align-items: center;
	padding: 0 10px;
`;

const IconCont = styled.div`
	margin: 0 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 35px;
	width: 40px;
	border-radius: 5px;
	transition: 0.2s ease-out;
	cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	background-color: ${(props) =>
		props.selected ? props.theme.color.dark[2] : "transparent"};
	&:hover {
		background-color: ${(props) =>
			!props.disabled
				? props.selected
					? props.theme.color.dark[2]
					: props.theme.color.dark[3]
				: "transparent"};
	}
`;

const DropSlidCont = styled.div`
	position: relative;
	margin: 0 10px;
	color: ${(props) => props.theme.color.white};
`;

const DropButton = styled.a`
	display: flex;
	align-items: center;
	padding: 5px 10px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.dark[2]};
	cursor: pointer;
`;

const ArrowIcon = styled.div`
	transition: all 0.2s ease-out;
	transform: rotate(${(props) => (props.selected ? "180deg" : "0deg")})
		scale(0.8);
`;

const ShareText = styled.h4`
	margin: 0 0 0 10px;
	transform: translateY(-2px);
	font-weight: ${(props) => props.theme.typography.semibold};
`;

const DropMenu = styled.div`
	position: absolute;
	left: 50%;
	margin: 10px 0px;
	padding: 10px 0;
	width: 200px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.color.dark[1]};
	transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	visibility: ${(props) => (props.selected ? "visible" : "hidden")};
	opacity: ${(props) => (props.selected ? "1" : "0")};
	transform: translateY(${(props) => (props.selected ? "0" : "2rem")})
		translateX(-50%);
`;

const DropMenuItem = styled.button`
	display: flex;
	align-items: center;
	height: 3rem;
	width: 100%;
	padding: 20px 10px;
	border: none;
	cursor: pointer;
	transition: all 0.1s ease-out;
	background-color: ${(props) =>
		props.selected ? props.theme.color.dark[2] : "transparent"};
	color: ${(props) => props.theme.color.white};

	&:hover {
		background-color: ${(props) =>
			props.selected
				? props.theme.color.dark[2]
				: props.theme.color.dark[3]};
	}
`;

const HOTKEYS = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
};

const formatMenu = [
	{
		id: "bold",
		text: "Bold",
	},
	{
		id: "italic",
		text: "Italics",
	},
	{
		id: "underline",
		text: "Underline",
	},
	{
		id: "bulleted-list",
		text: "Bullets",
	},
	{
		id: "numbered-list",
		text: "NumberedList",
	},
	{
		id: "centre-align",
		text: "AlignCenter",
	},
];

export default function Note({ shapeProps, isSelected, draggedNote }) {
	const EditorRef = useRef(null);
	const DraggableRef = useRef(null);
	const dispatch = useDispatch();
	const transition = useTransition(isSelected, {
		from: { top: 30, opacity: 0 },
		enter: { top: 80, opacity: 1 },
		leave: { top: 130, opacity: 0 },
		trail: 300,
		config: config.gentle,
	});

	useEffect(() => {
		io.once("recieveCreateNote", (newNote) => {
			dispatch(ADD_NOTE(newNote));
		});
	}, []);

	useEffect(() => {
		io.on("recieveNoteDelete", (deleteNoteIndex) => {
			dispatch(REMOVE_NOTE(deleteNoteIndex));
		});
	}, []);

	useEffect(() => {
		io.on("recieveNoteDrag", (newNote) => {
			dispatch(UPDATE_NOTESET(newNote));
		});
	}, []);

	useEffect(() => {
		io.on("recieveNoteResize", (newNote) => {
			dispatch(UPDATE_NOTESET(newNote));
		});
	}, []);

	useEffect(() => {
		io.on("recieveNoteChangeValue", (newNote) => {
			if (newNote.id === shapeProps.id)
				setValue(JSON.parse(newNote.content));
		});
	}, []);

	const [overflowTrigger, setOverflowTrigger] = useState(false);

	const [value, setValue] = useState(
		JSON.parse(shapeProps.content) || [
			{
				type: "paragraph",
				children: [{ text: "A line of text in a paragraph." }],
			},
		]
	);

	const renderLeaf = useCallback((props) => <Leaf {...props} />);
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(newValue) => {
				setValue(newValue);
				const isAstChange = editor.operations.some(
					(op) => "set_selection" !== op.type
				);
				if (isAstChange) {
					io.emit("noteChangeValue", {
						...shapeProps,
						content: JSON.stringify(newValue),
					});
				}
			}}
		>
			{transition((style, item) =>
				item ? (
					<FormatBar isMarkActive={isMarkActive} style={style} />
				) : null
			)}
			<Rnd
				ref={DraggableRef}
				bounds={"parent"}
				size={{ width: shapeProps.width }}
				position={{ x: shapeProps.x, y: shapeProps.y }}
				style={{
					display: "flex",
					zIndex: (draggedNote || isSelected) && 500,
				}}
				minWidth={300}
				minHeight={60}
				resizeHandleStyles={{
					bottomRight: {
						width: "10px",
						height: "10px",
						right: "-5px",
						bottom: "-5px",
						backgroundColor: isSelected && "#ffffff",
						transition: "0.1s ease-out",
						borderRadius: "10px",
					},
				}}
				enableResizing={{
					top: false,
					right: false,
					bottom: false,
					left: false,
					topRight: false,
					bottomRight: true,
					bottomLeft: false,
					topLeft: false,
				}}
				onClick={() => {
					if (shapeProps.height < EditorRef.current.offsetHeight + 30) {
						dispatch(
							UPDATE_NOTESET({
								...shapeProps,
								height: EditorRef.current.offsetHeight + 30,
							})
						);
					}
					dispatch(SELECT_NOTE(shapeProps.id));
					ReactEditor.focus(editor);
				}}
				onDragStart={() => {
					dispatch(DRAG_NOTE(shapeProps.id));
				}}
				onDrag={(event, d) => {
					io.emit("noteDrag", {
						...shapeProps,
						x: d.x,
						y: d.y,
					});
				}}
				onDragStop={(event, d) => {
					dispatch(
						UPDATE_NOTESET({
							...shapeProps,
							x: d.x,
							y: d.y,
						})
					);
					io.emit("noteDragStop", {
						...shapeProps,
						x: d.x,
						y: d.y,
					});
					dispatch(DRAG_NOTE([]));
				}}
				onResize={(e, direction, ref, delta, position) => {
					if (ref.offsetHeight < EditorRef.current.offsetHeight + 30)
						setOverflowTrigger(true);
					else setOverflowTrigger(false);
				}}
				onResizeStop={(e, direction, ref, delta, position) => {
					dispatch(
						UPDATE_NOTESET({
							...shapeProps,
							width: ref.offsetWidth,
							height: ref.offsetHeight,
						})
					);
					io.emit("noteResize", {
						...shapeProps,
						width: ref.offsetWidth,
						height: ref.offsetHeight,
					});
				}}
				disableDragging={isSelected}
			>
				<NoteTop
					draggedNote={draggedNote}
					isSelected={isSelected}
				></NoteTop>
				{isSelected && (
					<DeleteNote onClick={() => dispatch(DELETE_NOTE(shapeProps))}>
						<Trash />
					</DeleteNote>
				)}
				<NoteOverflow overflowTrigger={overflowTrigger}></NoteOverflow>
				<EditorContainer width={shapeProps.width}>
					<EditorTextContainer ref={EditorRef}>
						<Editable
							placeholder="Write something..."
							autoFocus
							renderLeaf={renderLeaf}
							renderElement={renderElement}
							decorate={([node, path]) => {
								if (editor.selection != null) {
									if (
										!Editor.isEditor(node) &&
										Editor.string(editor, [path[0]]) === "" &&
										Range.includes(editor.selection, path) &&
										Range.isCollapsed(editor.selection)
									) {
										return [
											{
												...editor.selection,
												placeholder: true,
											},
										];
									}
								}
								return [];
							}}
							onKeyDown={(event) => {
								for (const hotkey in HOTKEYS) {
									if (isHotkey(hotkey, event)) {
										event.preventDefault();
										const mark = HOTKEYS[hotkey];
										toggleMark(editor, mark);
									}
								}
							}}
						/>
					</EditorTextContainer>
				</EditorContainer>
			</Rnd>
		</Slate>
	);
}

const FormatBar = ({ style }) => {
	return (
		<FormatCont style={style}>
			<FormatBox>
				<StyleSelector />
				<TextEditor isMarkActive={isMarkActive} />
			</FormatBox>
		</FormatCont>
	);
};

function TextEditor() {
	const editor = useSlate();

	function loadComponent(name) {
		const Component = React.lazy(() =>
			import(`../../assets/icons/${name}.svg`)
		);
		return Component;
	}

	// eslint-disable-next-line no-lone-blocks
	{
		return formatMenu.map((item) => {
			const Component = loadComponent(item.id);
			return (
				<Suspense key={item.id} fallback={<div>Loading...</div>}>
					{item.id !== "numbered-list" && item.id !== "bulleted-list" ? (
						item.id === "bold" ? (
							<IconCont
								selected={isMarkActive(editor, item.id)}
								disabled={
									isBlockActive(editor, "normalheader") ||
									isBlockActive(editor, "largeheader")
								}
								onMouseDown={(event) => {
									event.preventDefault();
									if (
										!isBlockActive(editor, "normalheader") &&
										!isBlockActive(editor, "largeheader")
									) {
										toggleMark(editor, item.id);
									}
								}}
							>
								<Component />
							</IconCont>
						) : item.id === "centre-align" ? (
							<IconCont
								selected={isMarkActive(editor, item.id)}
								disabled={
									isBlockActive(editor, "bulleted-list") ||
									isBlockActive(editor, "numbered-list")
								}
								onMouseDown={(event) => {
									event.preventDefault();
									if (
										!isBlockActive(editor, "bulleted-list") &&
										!isBlockActive(editor, "numbered-list")
									) {
										toggleBlock(editor, item.id);
									}
								}}
							>
								<Component />
							</IconCont>
						) : (
							<IconCont
								selected={isMarkActive(editor, item.id)}
								onMouseDown={(event) => {
									event.preventDefault();
									toggleMark(editor, item.id);
								}}
							>
								<Component />
							</IconCont>
						)
					) : (
						<IconCont
							selected={isBlockActive(editor, item.id)}
							onMouseDown={(event) => {
								event.preventDefault();
								toggleBlock(editor, item.id);
							}}
						>
							<Component />
						</IconCont>
					)}
				</Suspense>
			);
		});
	}
}

function StyleSelector() {
	const editor = useSlate();
	const menu = [
		{
			id: "largeheader",
			text: "Large Header",
			el: "h3",
			fontFamily: "Bitter",
			weight: 600,
		},
		{
			id: "normalheader",
			text: "Normal Header",
			el: "h4",
			fontFamily: "Bitter",
			weight: 600,
		},
		{
			id: "normaltext",
			text: "Normal Text",
			el: "h5",
			fontFamily: "Open Sans",
			weight: 400,
		},
		{
			id: "smalltext",
			text: "Small Text",
			el: "h6",
			fontFamily: "Open Sans",
			weight: 400,
		},
	];

	const dropdown = useRef(null);
	const [open, setOpen] = React.useState(false);
	const [selectedTextStyle, setSelectedTextStyle] =
		React.useState("Normal Text");

	function useOutsideAlerter(ref) {
		React.useEffect(() => {
			menu.map((item) => {
				if (isMarkActive(editor, item.id)) setSelectedTextStyle(item.text);
			});
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setOpen(false);
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	useOutsideAlerter(dropdown);

	return (
		<DropSlidCont ref={dropdown}>
			<DropButton
				onMouseDown={(event) => {
					event.preventDefault();
					setOpen(!open);
				}}
			>
				<ArrowIcon selected={open}>
					<Down />
				</ArrowIcon>
				<ShareText>{selectedTextStyle}</ShareText>
			</DropButton>
			<DropMenu selected={open}>
				{menu.map((item, index) => {
					const Tag = item.el;
					return (
						<DropMenuItem
							key={item.id}
							selected={isMarkActive(editor, item.id)}
							onMouseDown={(event) => {
								event.preventDefault();
								addText(editor, item.id);
								selectedTextStyle !== item.text
									? setSelectedTextStyle(item.text)
									: setSelectedTextStyle("Normal Text");
							}}
						>
							<Tag
								style={{
									margin: 0,
									fontWeight: item.weight,
									fontFamily: item.fontFamily,
								}}
							>
								{item.text}
							</Tag>
						</DropMenuItem>
					);
				})}
			</DropMenu>
		</DropSlidCont>
	);
}

const Element = ({ attributes, children, element }) => {
	switch (element.type) {
		case "list-item":
			return <li {...attributes}>{children}</li>;
		case "bulleted-list":
			return (
				<ul
					style={{
						listStyle: "outside disc",
						margin: "1rem 0",
						padding: "0 0 0 2rem",
						color: "#ffffff",
					}}
					{...attributes}
				>
					{children}
				</ul>
			);
		case "numbered-list":
			return (
				<ol
					style={{
						margin: "1rem 0",
						padding: "0 0 0 2rem",
						color: "#ffffff",
					}}
					{...attributes}
				>
					{children}
				</ol>
			);
		case "centre-align":
			return (
				<div style={{ textAlign: "center" }} {...attributes}>
					{children}
				</div>
			);
		default:
			return <span {...attributes}>{children}</span>;
	}
};

const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	if (leaf.largeheader) {
		children = (
			<h3 style={{ fontFamily: "Bitter", fontWeight: 600 }}>{children}</h3>
		);
	}

	if (leaf.normalheader) {
		children = (
			<h4 style={{ fontFamily: "Bitter", fontWeight: 600 }}>{children}</h4>
		);
	}

	if (leaf.smalltext) {
		children = <h6>{children}</h6>;
	}

	if (leaf.normaltext) {
		<h5 {...attributes}>{children}</h5>;
	}

	return (
		<span
			style={{
				color: "#ffffff",
				fontSize: "1.414rem",
				fontFamily: "Open Sans, Sans-Serif",
			}}
			{...attributes}
		>
			{children}
		</span>
	);
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => n.type === format,
	});
	return !!match;
};

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) => LIST_TYPES.includes(n.type),
		split: true,
	});

	Transforms.setNodes(editor, {
		type: isActive ? "paragraph" : isList ? "list-item" : format,
	});

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const addText = (editor, format) => {
	const isActive = isMarkActive(editor, format);
	const styles = ["largeheader", "normalheader", "normaltext", "smalltext"];

	styles.map((style) => Editor.removeMark(editor, style));

	Editor.addMark(editor, format, true);
};
