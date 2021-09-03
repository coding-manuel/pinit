import React from "react";
import Logo from "../../assets/logos/pinIT Logo.svg";
import Share from "../../assets/icons/share.svg";
import People from "../../assets/icons/people.svg";
import Settings from "../../assets/icons/settings.svg";
import Export from "../../assets/icons/export.svg";
import styled from "styled-components";

export const Navbar = styled.nav`
	background: #000;
	height: 40px;
	display: flex;
	justify-content: space-between;
	padding: 20px 15px;
	z-index: 10;
`;

export const NavLink = styled.a`
	color: #fff;
	font-size: 45px;
	font-family: "Lucida Console", "Courier New", monospace;
	font-weight: 900;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	height: 100%;
	cursor: pointer;
	&.active {
		color: #15cdfc;
	}
`;

export const NavMenu = styled.div`
	display: flex;
	align-items: center;
	margin-right: -24px;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavBtn = styled.nav`
	display: flex;
	align-items: center;
	margin-right: 24px;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavBtnLink = styled.a`
	border-radius: 4px;
	background: ${(props) => (props.primary ? "#800080" : "black")};
	fill: ${(props) => (props.primary ? "black" : "palevioletred")};
	padding: 10px 22px;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	margin-left: 24px;
	&:hover {
		background: ${(props) => (props.primary ? "black" : "#2B2B2B")};
		transition: all 0.2s ease-in-out;
	}
`;

const Topbar = () => (
	<>
		<Navbar>
			<NavLink to="/">
				<Logo />
			</NavLink>
			<NavMenu>
				<NavLink to="/sign-up" activeStyle>
					Title
				</NavLink>
			</NavMenu>
			<NavMenu>
				<NavBtn>
					<NavBtnLink primary>
						<Share />
					</NavBtnLink>
					<NavBtnLink>
						<Export />
					</NavBtnLink>
					<NavBtnLink>
						<People />
					</NavBtnLink>
					<NavBtnLink>
						<Settings />
					</NavBtnLink>
				</NavBtn>
			</NavMenu>
		</Navbar>
	</>
);

export default Topbar;
