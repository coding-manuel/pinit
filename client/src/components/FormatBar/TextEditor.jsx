import React, { useState, Suspense } from "react";
import styled from "styled-components";

const IconCont = styled.div`
	margin: 0 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 35px;
	width: 40px;
	border-radius: 5px;
	transition: 0.2s ease-out;
	cursor: pointer;
	background-color: ${(props) =>
		props.selected ? props.theme.color.dark[2] : "transparent"};
	&:hover {
		background-color: ${(props) =>
			props.selected
				? props.theme.color.dark[2]
				: props.theme.color.dark[3]};
	}
`;

const formatMenu = [
	{
		id: "bold",
		text: "Bold",
		applied: true,
	},
	{
		id: "italics",
		text: "Italics",
		applied: false,
	},
	{
		id: "bullets",
		text: "Bullets",
		applied: false,
	},
	{
		id: "numbered list",
		text: "NumberedList",
		applied: false,
	},
	{
		id: "align center",
		text: "AlignCenter",
		applied: false,
	},
];

function loadComponent(name) {
	const Component = React.lazy(() => import(`../../assets/icons/${name}.svg`));
	return Component;
}

function TextEditor() {
	const [active, setActive] = useState([]);

	function handleOnClick(item) {
		console.log(active);
		if (!active.some((current) => current.id === item.id)) {
			console.log(!active.some((current) => current.id === item.id));
			setActive([...active, item]);
			item.applied = true;
		} else {
			let selectionAfterRemoval = active;
			selectionAfterRemoval = selectionAfterRemoval.filter(
				(current) => current.id !== item.id
			);
			setActive([...selectionAfterRemoval]);
		}
	}

	function isItemInSelection(item) {
		if (active.find((current) => current.id === item.id)) {
			return true;
		} else {
			return false;
		}
	}

	{
		return formatMenu.map((item) => {
			const Component = loadComponent(item.id);
			return (
				<Suspense fallback={<div>Loading...</div>}>
					<IconCont
						onClick={() => handleOnClick(item)}
						selected={isItemInSelection(item) && true}
					>
						<Component />
					</IconCont>
				</Suspense>
			);
		});
	}
}

export default TextEditor;
