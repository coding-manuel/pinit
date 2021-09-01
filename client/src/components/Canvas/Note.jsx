import React from "react";
import { Rect, Transformer, Text, Group } from "react-konva";
import { Html } from "react-konva-utils";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, text }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<>
			<Group
				onClick={onSelect}
				onTap={onSelect}
				x={shapeProps.x}
				y={shapeProps.y}
				id={shapeProps.id}
				width={shapeProps.width}
				height={shapeProps.height}
				draggable
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				onTransformEnd={(e) => {
					// transformer is changing scale of the node
					// and NOT its width or height
					// but in the store we have only width and height
					// to match the data better we will reset scale on transform end
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					// we will reset it back
					node.scaleX(1);
					node.scaleY(1);
					onChange({
						...shapeProps,
						x: node.x(),
						y: node.y(),
						// set minimal value
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(node.height() * scaleY),
					});
				}}
			>
				<Rect
					fill={shapeProps.fill}
					width={shapeProps.width}
					height={shapeProps.height}
					cornerRadius={5}
					ref={shapeRef}
					stroke={isSelected ? "yellow" : "transparent"}
				/>
				{isSelected ? (
					<Html>
						<input style={{ margin: 20, fontSize: 20 }} value={text} />
					</Html>
				) : (
					<Text text={text} y={20} x={20} fontSize={20} />
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
