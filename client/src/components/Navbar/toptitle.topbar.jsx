import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Logo from "../../assets/logos/pinIT Logo.svg";
import CreateNavbar from "./CreateNavbar.jsx";
import DashNavbar from "./DashNavbar.jsx";

const Navbar = styled.div`
	background: ${(props) => props.theme.color.dark[1]};
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 20px;
	z-index: 100;
`;

const LogoCont = styled.div`
	transform: scale(0.8);
`;

const NavLink = styled.a`
	color: ${(props) => props.theme.color.white};
	font-weight: ${(props) => props.theme.typography.semibold};
	text-decoration: none;
	padding: 0 1rem;
	cursor: pointer;
`;

const Topbar = ({ create }) => {
	const history = useHistory();
	const { userID } = useSelector((state) => state.reducer.user);

	const handleLogo = () => {
		history.push({
			pathname: "/dashboard",
			search: `?userID=${userID}`,
			state: { userID: userID },
		});
	};
	return (
		<>
			<Navbar>
				<NavLink to="/dashboard">
					<LogoCont onClick={handleLogo}>
						<Logo />
					</LogoCont>
				</NavLink>
				{create ? <CreateNavbar /> : <DashNavbar />}
			</Navbar>
		</>
	);
};

export default Topbar;
