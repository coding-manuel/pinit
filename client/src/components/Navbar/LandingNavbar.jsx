import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import Logo from "../../assets/logos/pinIT Logo.svg";

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

const ShareBtn = styled.a`
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.color.primary};
	padding: 3px 10px;
	border-radius: 5px;
	margin: 0 15px;
	cursor: pointer;
	transition: all 0.2s ease-out;
	&:hover {
		background: ${(props) => props.theme.color.primaryDarken};
	}
`;

const ShareText = styled.h5`
	margin: 0;
	padding: 5px;
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
`;

const LandingNavbar = () => {
    return (
        <>
            <Navbar>
                <LogoCont>
                    <Logo />
                </LogoCont>
                <NavLink to="/register" style={{ textDecoration: 'none' }}>
                    <ShareBtn>
                        <ShareText>Register</ShareText>
                    </ShareBtn>
                </NavLink>
            </Navbar>
        </>
    );
};

export default LandingNavbar;
