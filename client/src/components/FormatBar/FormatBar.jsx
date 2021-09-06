import React from "react";
import StyleSelector from "./StyleSelector.jsx";
import TextEditor from "./TextEditor.jsx";
import styled from "styled-components";

const FormatCont = styled.div`
	position: absolute;
	top: 80px;
	left: 50%;
	height: 50px;
	background-color: ${(props) => props.theme.color.dark[1]};
	border-radius: 5px;
	display: flex;
	align-items: center;
	transform: translateX(-50%);
`;

const FormatBox = styled.div`
	display: flex;
	align-items: center;
	padding: 0 10px;
`;

export default function FormatBar() {
	return (
		<FormatCont>
			<FormatBox>
				<StyleSelector />
				<TextEditor />
			</FormatBox>
		</FormatCont>
	);
}
