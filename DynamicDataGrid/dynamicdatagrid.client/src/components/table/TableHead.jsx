import * as React from "react";

class TableHead extends React.Component {
    constructor(props) {
        super(props);
            
    }
    render() {
        return (
            <>
                <tr> 
                    {this.props.data.map(q => <th style={{ border: '1px solid black' }}>{q.header}</th>)}
                </tr >
                <tr> 
                    {this.props.data.map(q => <th style={{ border: '1px solid black' }}>{q.type}</th>)}
                </tr >
            </>            
        );
    };
}

export default TableHead;