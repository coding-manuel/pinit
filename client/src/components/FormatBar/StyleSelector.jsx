import React, { useRef, useEffect } from "react";
import Down from "../../assets/icons/down.svg";
import styled from "styled-components";

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

function StyleSelector() {
	const menu = [
		{
			id: "largeheader",
			text: "Large Header",
			el: "h3",
			fontFamily: "Bitter",
			weight: 600,
			selected: true,
		},
		{
			id: "normalheader",
			text: "Normal Header",
			el: "h4",
			fontFamily: "Bitter",
			weight: 600,
			selected: false,
		},
		{
			id: "normaltext",
			text: "Normal Text",
			el: "h5",
			fontFamily: "Open Sans",
			weight: 600,
			selected: false,
		},
		{
			id: "smalltext",
			text: "Small Text",
			el: "h6",
			fontFamily: "Open Sans",
			weight: 600,
			selected: false,
		},
	];

	const dropdown = useRef(null);
	const [open, setOpen] = React.useState(false);
	const [selection, setSelection] = React.useState([]);

	function handleOnClick(item) {
		if (!selection.some((current) => current.id === item.id)) {
			setSelection([item]);
		}
	}

	function isItemInSelection(item) {
		if (selection.find((current) => current.id === item.id)) {
			return true;
		} else {
			return false;
		}
	}

	function useOutsideAlerter(ref) {
		useEffect(() => {
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
			<DropButton onClick={() => setOpen(!open)}>
				<ArrowIcon selected={open}>
					<Down />
				</ArrowIcon>
				<ShareText>Normal Text</ShareText>
			</DropButton>
			<DropMenu selected={open}>
				{menu.map((item, index) => {
					const Tag = item.el;
					return (
						<DropMenuItem
							key={item.id}
							selected={isItemInSelection(item) && true}
							onClick={() => handleOnClick(item)}
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

export default StyleSelector;
