import * as React from "react";
import TableCell from "./TableCell";

class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.datas,
        };
        this.render = this.render.bind(this);
    }
    render() {
        
        let tableData = this.props.datas.slice();
        let numColumns = tableData.length < 2 ? 2 : tableData.length;
        let numRows = tableData[0].columnData.length < 2 ? 2 : tableData[0].columnData.length;


        let tabl = Array.from({ length: numRows },
            () => Array(numColumns)
                .fill({ "columId": "noTrue", "rowId": "noTrue", "data": "" }));

        for (var i = 0; i < tableData.length; i++) {
            for (var j = 0; j < numRows; j++) {
                tabl[j][i] = {
                    "columId": tableData[i].id,
                    "rowId": j,
                    "data": tableData[i].columnData[j]
                };
            }
        }

        return (
            <>
                {tabl.map(r =>
                    <tr>
                        {r.map(dat => 
                        <TableCell 
                        cellData={dat} 
                        onCellClick={this.props.cellClick} 
                        onDelColClick={this.props.delColumHendler}/>)}
                    </tr>)
                }
            </>
        );

    };



}

export default TableBody;