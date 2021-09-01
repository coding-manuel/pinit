import React from "react";
import styled from "styled-components";
import  note from"../../assets/icons/note.svg"
import  whiteboard from"../../assets/icons/whiteboard.svg"
import  link from"../../assets/icons/link.svg"
import  table from"../../assets/icons/table.svg"
import  file from"../../assets/icons/file.svg"
import  image from"../../assets/icons/image.svg"

// const Icon = styled.div`
//   background-color: #1f1b10;
//   position : relative;
//   top : 20vh; 
//   padding: 10px;
//   left : 0;
// `
const Icon = styled.div`
  display: flex;
  padding:10px 0px;
  // width:30px;
  justify-content: center;
  cursor: pointer;
  transition: transform 250ms;
    &:hover {
      transform: translateY(-5px);
      opacity: .5;
    }
`
// const WhiteBorad  = styled(Board)`
//   fill : skyblue;
// `
const Text = styled.p`
    color: white;
    margin-top: -5px;
    padding-bottom: 5px;
    font-size: small;
    text-align: center;
    &:hover {
      cursor: pointer;
    }

`
const Container = styled.div`
    background-color: #1f1b10;
    width: 6%;
    min-width: 70px;
    height: 70vh;
    overflow-y: auto;
    margin: auto;
    position: absolute;
    top: 0; bottom: 0;
    border: solid black;
    margin-left: 20px;
    max-height: 500px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;

function Sidebar(){
    return (
      <Container>

        <Icon> <img src={note} alt=""/></Icon>
        <Text>Notes</Text>
        <Icon> <img src={whiteboard} alt=""/></Icon>
        <Text>whiteboard</Text>
        <Icon> <img src={link} alt=""/></Icon>
        <Text>link</Text>
        <Icon> <img src={image} alt=""/></Icon>
        <Text>image</Text>
        <Icon> <img src={file} alt=""/></Icon>
        <Text>file</Text>
        <Icon> <img src={table} alt=""/></Icon>
        <Text>table</Text>
        {/* {arr.map((item) => <Icon src={item}/>)} */}
        {/* <Design
          img = {info[0].imgURL}
          text = {info[0].text}
        />
        <Design
          img = {info[1].imgURL}
          text = {info[1].text}
        />
        <Design
          img = {info[2].imgURL}
          text = {info[2].text}
        />
        <Design
          img = {info[3].imgURL}
          text = {info[3].text}
        />
        <Design
          img = {info[4].imgURL}
          text = {info[4].text}
        /> */}

      </Container>
      );
}

export default Sidebar;
