import React from "react";

class MyComponent extends React.Component {
    state = {
        name: 'Bruyne',
        address: 'Ha noi'
    }

    handleOnClick(event) {
        console.log("Clicked", event)
    }

    handleOnMouseOver(event) {
        console.log("Hovered", event.pageX);
    }
    // JSX: allow js write inside file html 
    render() {
        return (
            <div>
                My name is : {this.state.name}
                <button onClick={this.handleOnClick}>Click me</button>
                <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
            </div>
        )
    }
}

export default MyComponent;