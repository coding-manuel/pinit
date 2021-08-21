import React from "react";
import styled from "styled-components";

const  Header = styled.section`
  background-color: #1f1b10;
  margin: auto -16px;
  padding: 16px 32px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;


const Title = styled.p`
  color: #fff;
  font-family: "McLaren", cursive;
  font-weight: 200;
  `;

function Topbar() {
  return (
    <Header>

<Title>PinIT</Title>



</Header>
  );
}

export default Topbar;
