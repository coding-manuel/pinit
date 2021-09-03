import React from "react";
import { Rect, Transformer, Text, Group } from "react-konva";
import { Html } from "react-konva-utils";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, text }) => {
	const [inputText, changeText] = React.useState(text);
	const [inputTextRows, changeInputTextRows] = React.useState(0);
	const [textAreaHeight, changeTextAreaHeight] = React.useState(0);
	const [shapeHeight, changeShapeHeight] = React.useState(shapeProps.height); // height of the all groups

	//flags
	const [beingDragged, changeBeingDragged] = React.useState(false); //dragged trigger

	//refs
	const trRef = React.useRef(); //transformer
	const shapeRef = React.useRef(); //rectangle fill
	const group = React.useRef(); //main group
	const textArea = React.useRef(); //text area

	React.useEffect(() => {
		if (isSelected) {
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
			textArea.current.setSelectionRange(
				textArea.current.textLength,
				textArea.current.textLength
			);

			if (textAreaHeight > shapeProps.height) {
				changeShapeHeight(textAreaHeight + 25);
			}
		} else {
			changeShapeHeight(shapeProps.height);
		}
	}, [isSelected]);

	const calculateTextAreaHeight = function (ta, scanAmount) {
		var origHeight = ta.style.height,
			height = ta.offsetHeight,
			scrollHeight = ta.scrollHeight;
		/// only bother if the ta is bigger than content
		if (height >= scrollHeight) {
			/// check that our browser supports changing dimension
			/// calculations mid-way through a function call...
			ta.style.height = height + scanAmount + "px";
			/// by checking that scrollHeight has updated
			if (scrollHeight < ta.scrollHeight) {
				/// now try and scan the ta's height downwards
				/// until scrollHeight becomes larger than height
				while (ta.offsetHeight >= ta.scrollHeight) {
					ta.style.height = (height -= scanAmount) + "px";
				}
				/// be more specific to get the exact height
				while (ta.offsetHeight < ta.scrollHeight) {
					ta.style.height = height++ + "px";
				}
				/// reset the ta back to it's original height
				ta.style.height = origHeight;
				/// put the overflow back
				return height;
			}
		} else {
			return scrollHeight;
		}
	};

	return (
		<>
			<Group
				ref={group}
				id={shapeProps.id}
				width={shapeProps.width}
				height={shapeHeight}
				x={shapeProps.x}
				y={shapeProps.y}
				onClick={onSelect}
				onTap={onSelect}
				draggable
				onDragStart={() => {
					group.current.zIndex(100);
					changeBeingDragged(true);
				}}
				onDragEnd={(e) => {
					changeBeingDragged(false);
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
			>
				{shapeHeight + 10 < textAreaHeight && (
					<Html divProps={{ style: { pointerEvents: "none" } }}>
						<div
							style={{
								zIndex: 1,
								width: shapeProps.width,
								height: shapeHeight,
								background:
									"linear-gradient(0deg, rgba(96,96,96,1) 5%, rgba(9,9,121,0) 27%)",
								borderRadius: "5px",
							}}
						></div>
					</Html>
				)}
				<Rect
					ref={shapeRef}
					width={shapeProps.width}
					height={shapeHeight}
					fill={shapeProps.fill}
					cornerRadius={5}
					shadowColor={"#111111"}
					shadowBlur={beingDragged ? 40 : 5}
					stroke={isSelected ? "#ffffff" : "transparent"}
					strokeWidth={2}
					strokeScaleEnabled={false}
					onTransform={() => {
						const node = shapeRef.current;
						const scaleX = node.scaleX();
						const scaleY = node.scaleY();

						textArea.current.focus();

						changeTextAreaHeight(textArea.current.scrollHeight + 15);

						node.scaleX(1);
						node.scaleY(1);
						onChange({
							...shapeProps,
							width: Math.max(5, node.width() * scaleX),
							height: Math.max(node.height() * scaleY),
						});
						changeShapeHeight(shapeProps.height);
					}}
				/>
				{isSelected ? (
					<Html>
						<textarea
							autoFocus={true}
							ref={textArea}
							value={inputText}
							placeholder={"Type here..."}
							style={{
								margin: "16px 0 0 18px",
								fontSize: 20,
								color: "#ffffff",
								background: "none",
								border: "none",
								outline: "none",
								fontFamily: "Open Sans",
								overflow: "hidden",
								resize: "none",
								width: shapeProps.width - 40,
								height: shapeHeight - 25,
								lineHeight: 25 + "px",
							}}
							onChange={(e) => {
								changeText(e.target.value);
								changeTextAreaHeight(
									textArea.current.scrollHeight + 15
								);

								changeInputTextRows(
									Math.ceil(
										calculateTextAreaHeight(textArea.current, 25) / 25
									)
								);

								onChange({
									...shapeProps,
									height:
										Math.abs(25 * inputTextRows) < 60
											? 60
											: 15 + Math.abs(25 * inputTextRows),
								});

								changeShapeHeight(shapeProps.height);
							}}
						/>
					</Html>
				) : (
					<Text
						text={inputText === "" ? "Type here..." : inputText}
						y={20}
						x={20}
						fontFamily={"Open Sans"}
						fontSize={20}
						fontStyle={inputText === "" ? "normal 300" : "normal"}
						lineHeight={1.25}
						width={shapeProps.width - 40}
						height={shapeHeight - 20}
						fill={inputText !== "" ? "#ffffff" : "#D6D6D6"}
					/>
				)}
			</Group>
			{isSelected && (
				<Transformer
					ref={trRef}
					rotateEnabled={false}
					keepRatio={false}
					flipEnabled={false}
					anchorFill={"transparent"}
					anchorSize={5}
					enabledAnchors={["bottom-right"]}
					borderEnabled={false}
					boundBoxFunc={(oldBox, newBox) => {
						if (newBox.width < 200 || newBox.height < 60) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
		</>
	);
};

export default function Note({
	shapeProps,
	isSelected,
	onSelect,
	onChange,
	text,
}) {
	return (
		<Rectangle
			shapeProps={shapeProps}
			isSelected={isSelected}
			onSelect={onSelect}
			onChange={onChange}
			text={text}
		/>
	);
}
