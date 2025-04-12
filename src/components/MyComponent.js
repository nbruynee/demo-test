import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {

    // JSX: allow js write inside file html 
    render() {
        return (
            <div>
                <UserInfor />
                <DisplayInfo name='Bruyne Dinh cao vcl' age='22' />
            </div>
        )
    }
}

export default MyComponent;