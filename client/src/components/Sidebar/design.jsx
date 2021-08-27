import React from "react";
import styled from "styled-components";


const Pic = styled.img`
    padding:10px;
    display: block;
    margin: auto;
`;

const Text = styled.p`
    color: white;
    padding-bottom: 5px;
    font-size: small;
    text-align: center;

`

function Design(props) {
    return(
        <div> 
            {props.img}
            <Text>{props.text}</Text>
        </div>
    );
}

export default Design;