import * as React from "react";

class AddColButton extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <button type="button" style={{ width: '100px'}} onClick={this.props.onClick}>Add colum</button>
        )
    }
}

export default AddColButton;