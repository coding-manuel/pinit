import React from "react";
import { Stage, Layer, Rect, Text, Transformer } from "react-konva";
import Note from "./Note.jsx";

const initialRectangles = [
	{
		x: 20,
		y: 50,
		width: 300,
		height: 60,
		fill: "red",
		shadowBlur: 5,
		id: "rect1",
		text: "Type Here...",
	},
	{
		x: 150,
		y: 150,
		width: 300,
		height: 60,
		fill: "green",
		id: "rect2",
		text: "Type Here...",
	},
];

export default function App() {
	const [rectangles, setRectangles] = React.useState(initialRectangles);
	const [selectedId, selectShape] = React.useState(null);

	const checkDeselect = (e) => {
		// deselect when clicked on empty area
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
			selectShape(null);
		}
	};
	return (
		<Stage
			width={window.innerWidth}
			height={window.innerHeight}
			onMouseDown={checkDeselect}
			onTouchStart={checkDeselect}
		>
			<Layer draggable>
				{rectangles.map((rect, i) => {
					return (
						<Note
							shapeProps={rect}
							text={rect.text}
							isSelected={rect.id === selectedId}
							onSelect={() => {
								selectShape(rect.id);
							}}
							onChange={(newAttrs) => {
								const rects = rectangles.slice();
								rects[i] = newAttrs;
								setRectangles(rects);
							}}
						/>
					);
				})}
			</Layer>
		</Stage>
	);
}
