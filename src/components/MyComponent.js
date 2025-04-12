import React from "react";

class MyComponent extends React.Component {
    // JSX: allow js write inside file html 
    render() {
        return (
            <div>
                My first components
                {Math.random()}
            </div>
        )
    }
}

export default MyComponent;