import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import LandingNavbar from '../components/Navbar/LandingNavbar.jsx'
import MainPicture from '../assets/images/landing_img_1.png'

const LandingWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.color.dark[3]};
`;

const LandingContent = styled.div`
    display:flex;
    align-items: center;
    margin: 8rem 4rem;
    @media(max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const LandingContentWrapper = styled.div`
    width: 90vw;
    margin: auto;
`;

const LandingText = styled.div`
    color:${(props) => props.theme.color.white};
    min-width: 400px;
`;
const MainText = styled.h2`
    font-family: 'bitter';

    padding: 2rem 0;
`;
const SubText = styled.h4`
    max-width: 35rem;
`;

const LandingImage = styled.img`
    height: 60vw;
    max-height: 700px;
    min-height: 500px;
    @media(max-width: 768px) {
        padding: 4rem 0;
        width: 80vw;
        height: auto;
        min-height: 0;
    }
`;

const ShareBtn = styled.button`
    border: none;
	background: ${(props) => props.theme.color.primary};
	padding: 3px 10px;
	border-radius: 5px;
	margin: 2rem 0;
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

function Landing() {
    return (
        <LandingWrapper>
            <LandingNavbar />
            <LandingContentWrapper>
                <LandingContent>
                    <LandingText>
                        <MainText>Put your thoughts<br />Through.</MainText>
                        <SubText>pinIT helps you put your mind to words visually.</SubText>
                        <NavLink to="/demo" style={{ textDecoration: 'none' }}>
                            <ShareBtn>
                                <ShareText>Try Demo</ShareText>
                            </ShareBtn>
                        </NavLink>
                    </LandingText>
                    <LandingImage src={MainPicture} alt="" />
                </LandingContent>
            </LandingContentWrapper>
        </LandingWrapper>
    )
}

export default Landing
