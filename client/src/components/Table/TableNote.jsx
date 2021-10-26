import React from "react";
import { render } from "react-dom";
import { Rnd } from "react-rnd";
import { useState } from "react";
// import { Column, Table2 } from "@blueprintjs/table";

const TableNote = () => {
    const [tablestate, settablestate] = useState({
        width: "inherit",
        height: "inherit",
        x: 100,
        y: 50
    })
    const style = {
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        border: "solid 1px #ddd",
        background: "#f0f0f0"
    };
    const tablestyle={
        width: "inherit",
        height: "inherit",
        textAlign: "center",
        border: "1px solid black",
        fontSize: "2rem",
    }

    // const renderCell = (rowIndex, columnIndex) => {
    //     // const dataKey = TableEditableExample.dataKey(rowIndex, columnIndex);
    //     // const value = this.state.sparseCellData[dataKey];
    //     return (
    //         <EditableCell2
    //             value={"Hello Faraaz"}
    //             // intent={Intent.PRIMARY}
    //             // onCancel={this.cellValidator(rowIndex, columnIndex)}
    //             // onChange={this.cellValidator(rowIndex, columnIndex)}
    //             // onConfirm={this.cellSetter(rowIndex, columnIndex)}
    //         />
    //     );
    // };

    return (
        <>
            <Rnd
                style={style}
                size={{ width: tablestate.width, height: tablestate.height }}
                position={{ x: tablestate.x, y: tablestate.y }}
                onDragStop={(e, d) => {
                    settablestate({ x: d.x, y: d.y });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    settablestate({
                        width: ref.style.width,
                        height: ref.style.height,
                        ...position
                    });
                }}
            >
                {/* <Table2 style={tablestyle} numRows={5}>
                    <Column />
                    <Column />
                    <Column />
                </Table2> */}
                <table style={tablestyle}>
                    <tr>
                        <th style={tablestyle}>Name</th>
                        <th style={tablestyle}>Name</th>
                        <th style={tablestyle}>Name</th>
                        <th style={tablestyle}>Name</th>
                    </tr>
                    <tr>
                        <td  style={tablestyle}>Faraaz</td>
                        <td  style={tablestyle}>Faraaz</td>
                        <td  style={tablestyle}>Faraaz</td>
                        <td  style={tablestyle}>Faraaz</td>
                    </tr>
                    <tr>
                        <td  style={tablestyle}>Faraaz</td>
                        <td  style={tablestyle}>Faraaz</td>
                        <td  style={tablestyle}>Faraaz</td>
                        <td  style={tablestyle}>Faraaz</td>
                    </tr>
                    <tr>
                        <td  style={tablestyle}>Faraaz</td>
                        <td  style={tablestyle}>Faraaz</td>
                        <td  style={tablestyle}>Faraaz</td>
                        <td  style={tablestyle}>Faraaz</td>
                    </tr>
                </table>
            </Rnd>
        </>
    )
}

export default TableNote
