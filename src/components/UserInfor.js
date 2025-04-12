import React from "react";

class UserInfor extends React.Component {
    state = {
        name: 'Bruyne',
        address: 'Ha noi'
    }

    handleOnClick = (event) => {
        // console.log("Clicked", event)
        // console.log('My name is:', this.state.name)
        // console.log('Random number:',) 
        this.setState({
            name: 'BruyneDinhcaovcl',
            age: Math.floor((Math.random() * 100) + 1)
        })
    }

    // test onMouseOver
    // handleOnMouseOver(event) {
    //     console.log("Hovered", event.pageX);
    // }

    handleOnChangeInput = (event) => {
        // console.log(event.target.value); 
        this.setState({
            name: event.target.value,
        })
    }

    handleOnChangeAge = (event) => {
        // console.log(event.target.value); 
        this.setState({
            age: event.target.value,
        })
    }


    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }
    render() {
        return (
            <div>
                My name is : {this.state.name};
                Age: {this.state.age};
                {/* <button onClick={this.handleOnClick}>Click me</button>
                <button onMouseOver={(event) => {this.handleOnMouseOver(event)}}>Hover me</button> */}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <label>My Name:</label>
                    <input type="text" onChange={(event) => this.handleOnChangeInput(event)} /><br />
                    <label>Age:</label>
                    <input type="text" onChange={(event) => this.handleOnChangeAge(event)} /><br />
                    <button>Change me</button>
                </form>
            </div>
        )
    }
}

export default UserInfor;