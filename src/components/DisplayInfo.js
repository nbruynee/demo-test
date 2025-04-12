import React from "react";

class DisplayInfo extends React.Component {
    render() {
        // props : stand for properties
        // destructuring arr/ obj
        const {name, age} = this.props; // if obj use {}, otherwise arr []
        return(
            <div>
                <div>My Name is: {name}</div>
                <div>My Age: {age} </div>
            </div>
        )
    }
}

export default DisplayInfo;