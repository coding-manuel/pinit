import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_NOTESET, SELECT_NOTE } from "../../store/slices/noteSlice";
import { Stage, Layer, Rect } from "react-konva";
import Note from "./Note.jsx";

export default function App() {
	const { noteSet, selectedNote } = useSelector((state) => state.reducer.note);
	const dispatch = useDispatch();
	const layerRef = React.useRef();
	const Konva = window.Konva;

	const checkDeselect = (e) => {
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
			dispatch(SELECT_NOTE([]));
		}
	};

	const selectionRectRef = React.useRef();
	// const selection = React.useRef({
	// 	visible: false,
	// 	x1: 0,
	// 	y1: 0,
	// 	x2: 0,
	// 	y2: 0,
	// });

	// const updateSelectionRect = () => {
	// 	const node = selectionRectRef.current;
	// 	node.setAttrs({
	// 		visible: selection.current.visible,
	// 		x: Math.min(selection.current.x1, selection.current.x2),
	// 		y: Math.min(selection.current.y1, selection.current.y2),
	// 		width: Math.abs(selection.current.x1 - selection.current.x2),
	// 		height: Math.abs(selection.current.y1 - selection.current.y2),
	// 		fill: "rgba(0, 161, 255, 0.3)",
	// 	});
	// 	node.getLayer().batchDraw();
	// };

	// const oldPos = React.useRef(null);
	// const onMouseDown = (e) => {
	// 	const isElement = e.target.findAncestor(".elements-container");
	// 	if (isElement) {
	// 		return;
	// 	}

	// 	const pos = e.target.getStage().getPointerPosition();
	// 	selection.current.visible = true;
	// 	selection.current.x1 = pos.x;
	// 	selection.current.y1 = pos.y;
	// 	selection.current.x2 = pos.x;
	// 	selection.current.y2 = pos.y;
	// 	updateSelectionRect();
	// };

	// const onMouseMove = (e) => {
	// 	if (!selection.current.visible) {
	// 		return;
	// 	}
	// 	const pos = e.target.getStage().getPointerPosition();
	// 	selection.current.x2 = pos.x;
	// 	selection.current.y2 = pos.y;
	// 	updateSelectionRect();
	// };

	// const onMouseUp = () => {
	// 	oldPos.current = [];
	// 	if (!selection.current.visible) {
	// 		return;
	// 	}
	// 	const selBox = selectionRectRef.current.getClientRect();

	// 	const elements = [];
	// 	layerRef.current.find(".note").forEach((elementNode) => {
	// 		const elBox = elementNode.getClientRect();
	// 		if (Konva.Util.haveIntersection(selBox, elBox)) {
	// 			elements.push(elementNode.attrs.id);
	// 		}
	// 	});
	// 	dispatch(SELECT_NOTE(elements));
	// 	selection.current.visible = false;
	// 	// disable click event
	// 	Konva.listenClickTap = false;
	// 	updateSelectionRect();
	// };

	// const onClickTap = (e) => {
	// 	let stage = e.target.getStage();
	// 	let layer = layerRef.current;
	// 	// if click on empty area - remove all selections
	// 	if (e.target === stage) {
	// 		dispatch(SELECT_NOTE([]));
	// 		layer.draw();
	// 		return;
	// 	}

	// 	// do nothing if clicked NOT on our rectangles
	// 	if (!e.target.hasName(".rect")) {
	// 		return;
	// 	}

	// 	// do we pressed shift or ctrl?
	// 	const metaPressed = e.evt.shiftKey;
	// 	const isSelected = tr.nodes().indexOf(e.target) >= 0;

	// 	if (!metaPressed && !isSelected) {
	// 		// if no key pressed and the node is not selected
	// 		// select just one
	// 		tr.nodes([e.target]);
	// 	} else if (metaPressed && isSelected) {
	// 		// if we pressed keys and node was selected
	// 		// we need to remove it from selection:
	// 		const nodes = tr.nodes().slice(); // use slice to have new copy of array
	// 		// remove node from array
	// 		nodes.splice(nodes.indexOf(e.target), 1);
	// 		tr.nodes(nodes);
	// 	} else if (metaPressed && !isSelected) {
	// 		// add the node into selection
	// 		const nodes = tr.nodes().concat([e.target]);
	// 		tr.nodes(nodes);
	// 	}
	// 	layer.draw();
	// };
	return (
		<Stage
			width={window.innerWidth}
			height={window.innerHeight}
			onMouseDown={checkDeselect}
			// onMouseUp={onMouseUp}
			// onMouseMove={onMouseMove}
			onTouchStart={checkDeselect}
		>
			<Layer ref={layerRef}>
				<Rect
					fill={"#292929"}
					listening={false}
					width={window.innerWidth}
					height={window.innerHeight}
				/>
				{noteSet.map((rect) => {
					return (
						<Note
							shapeProps={rect}
							text={rect.text}
							isSelected={selectedNote.includes(rect.id)}
							// multiSelect={selectedNote.length !== 1}
							onSelect={() => {
								dispatch(SELECT_NOTE(rect.id));
							}}
							onChange={(newAttrs) => dispatch(UPDATE_NOTESET(newAttrs))}
						/>
					);
				})}
				{/* <Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef} /> */}
			</Layer>
		</Stage>
	);
}
