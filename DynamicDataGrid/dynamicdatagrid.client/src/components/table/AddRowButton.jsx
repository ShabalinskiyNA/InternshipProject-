import * as React from "react";

class AddRowButton extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <button type="button" onClick={this.props.onClick}>Add row</button>
        )
    }
}

export default AddRowButton;