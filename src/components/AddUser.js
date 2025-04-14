import React, { useState } from "react";

// class AddUserInfor extends React.Component {
//     state = {
//         name: 'Bruyne',
//         age: 20,
//     }

//     handleOnClick = (event) => {
//         // console.log("Clicked", event)
//         // console.log('My name is:', this.state.name)
//         // console.log('Random number:',) 
//         this.setState({
//             name: 'BruyneDinhcaovcl',
//             age: Math.floor((Math.random() * 100) + 1)
//         })
//     }

//     // test onMouseOver
//     // handleOnMouseOver(event) {
//     //     console.log("Hovered", event.pageX);
//     // }

//     handleOnChangeInput = (event) => {
//         // console.log(event.target.value); 
//         this.setState({
//             name: event.target.value,
//         })
//     }

//     handleOnChangeAge = (event) => {
//         // console.log(event.target.value); 
//         this.setState({
//             age: event.target.value,
//         })
//     }


//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         // console.log(this.state);
//         this.props.handleAddNewUser({
//             id : Math.floor(Math.random() * 10) + 1 + '-random',
//             name: this.state.name,
//             age: this.state.age
//         });
//     }

//     render() {
//         return (
//             <div>
//                 My name is : {this.state.name};
//                 Age: {this.state.age};
//                 {/* <button onClick={this.handleOnClick}>Click me</button>
//                 <button onMouseOver={(event) => {this.handleOnMouseOver(event)}}>Hover me</button> */}
//                 <form onSubmit={(event) => this.handleOnSubmit(event)}>
//                     <label>My Name:</label>
//                     <input type="text" onChange={(event) => this.handleOnChangeInput(event)} /><br />
//                     <label>Age:</label>
//                     <input type="text" onChange={(event) => this.handleOnChangeAge(event)} /><br />
//                     <button>Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUserInfo = (props) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState('');

    // const handleOnClick = (event) => {
    //     setName('BruyneDinhcaovcl');
    //     setAge(Math.floor((Math.random() * 100) + 1))
    // }

    const handleOnChangeInput = (event) => {
        // console.log(event.target.value); 
        setName(event.target.value)
    }

    const handleOnChangeAge = (event) => {
        // console.log(event.target.value); 
        setAge(event.target.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state);
        props.handleAddNewUser({
            id: Math.floor(Math.random() * 10) + 1 + '-random',
            name: name,
            age: age,
        });
    }

    return (
        <div>
            My name is : {name};
            Age: {age};
            <form onSubmit={(event) => handleOnSubmit(event)}>
                <label>My Name:</label>
                <input type="text" onChange={(event) => handleOnChangeInput(event)} /><br />
                <label>Age:</label>
                <input type="text" onChange={(event) => handleOnChangeAge(event)} /><br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddUserInfo;