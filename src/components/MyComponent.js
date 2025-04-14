import React from "react";
import DisplayInfo from "./DisplayInfo";
import AddUserInfor from "./AddUser";

class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: "Bruyne King", age: "22" },
            { id: 2, name: "Bruyne Lion", age: "23" },
            { id: 3, name: "Bruyne Senior in future", age: "17" },
        ]
    }

    handleAddNewUser = (userObj) => {
        console.log('Check userObj from parents:', userObj);
        this.setState({
            listUsers: [...this.state.listUsers, userObj]
        })
    }

    handleDeleteUser = (userId) => {
        let listUsersClone = this.state.listUsers;
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        this.setState({
            listUsers: listUsersClone,
        })
    }


    // JSX: allow js write inside file html 
    // convert a arr or obj should use JSON.stringify
    render() {
        // const test = [
        //     { name: 'nghia', age: 50 }
        // ]
        return (
            <div>
                {/* {JSON.stringify(test)} */}

                <AddUserInfor
                    handleAddNewUser={this.handleAddNewUser}

                />
                <br />
                <DisplayInfo
                    listUsers={this.state.listUsers}
                    handleDeleteUser={this.handleDeleteUser}

                />
            </div>
        )
    }
}

export default MyComponent;