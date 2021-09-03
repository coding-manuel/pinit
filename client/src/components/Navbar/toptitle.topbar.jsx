import React from "react";
import Logo from "../../assets/logos/pinIT Logo.svg";
import Share from "../../assets/icons/share.svg";
import People from "../../assets/icons/people.svg";
import Settings from "../../assets/icons/settings.svg";
import Export from "../../assets/icons/export.svg";
import styled from "styled-components";

const Navbar = styled.div`
	background: ${(props) => props.theme.color.dark[1]};
	height: 40px;
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
	z-index: 100;
`;

const LogoCont = styled.div`
	transform: scale(0.8);
`;

const Title = styled.h3`
	margin: 0;
`;

const NavLink = styled.a`
	color: ${(props) => props.theme.color.white};
	font-weight: ${(props) => props.theme.typography.semibold};
	text-decoration: none;
	padding: 0 1rem;
	cursor: pointer;
`;

const NavMenu = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const NavBtnLink = styled.a`
	border-radius: 4px;
	background: ${(props) => (props.primary ? "#800080" : "transparent")};
	padding: 15px;
	transform: scale(0.8);
	cursor: pointer;
	transition: all 0.2s ease-out;
	&:hover {
		transform: scale(0.8) translateY(-5px);
	}
`;

const ShareBtn = styled.a`
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.color.primary};
	padding: 5px 10px;
	border-radius: 5px;
	margin: 0 15px;
	cursor: pointer;
	transition: all 0.2s ease-out;
	&:hover {
		background: ${(props) => props.theme.color.primaryDarken};
	}
`;

const ShareIcon = styled.div`
	transform: scale(0.8);
`;

const ShareText = styled.h4`
	margin: 0;
	transform: translateY(-2px);
	padding: 0 0 0 10px;
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
`;

const Topbar = () => (
	<>
		<Navbar>
			<NavLink to="/">
				<LogoCont>
					<Logo />
				</LogoCont>
			</NavLink>
			<Title>
				<NavLink to="/sign-up">Title</NavLink>
			</Title>
			<NavMenu>
				<ShareBtn>
					<ShareIcon>
						<Share />
					</ShareIcon>
					<ShareText>Share</ShareText>
				</ShareBtn>
				<NavBtnLink>
					<Export />
				</NavBtnLink>
				<NavBtnLink>
					<People />
				</NavBtnLink>
				<NavBtnLink>
					<Settings />
				</NavBtnLink>
			</NavMenu>
		</Navbar>
	</>
);

export default Topbar;
