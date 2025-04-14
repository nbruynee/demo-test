import React from "react";
import './DisplayInfo.scss';

// Stateful: Has state, can change and cause re-render.
// Stateless: Has no state, just receives data via(thông qua) props and displays.

// class componentscomponents
// class DisplayInfo extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isHideShow: true,
//         }
//     }

//     // componentDidMount () {
//     //     console.log(">>>Call me components did mount:")
//     //     setTimeout(() => {
//     //         document.title = 'Bruyne && Dinh cao vcl'
//     //     }, 5000)
//     // };

//     // componentDidUpdate (prevProps, prevState, snapshot) {
//     //     console.log(">>> Call me components did update: ", this.props, prevProps)
//     //     if (this.props.listUsers !== prevProps.listUsers) {
//     //         if(this.props.listUsers.length === 5) {
//     //             alert("Congrat users fifth")
//     //         }
//     //     }
//     // }

//     // handleOnHideShow = () => {
//     //     this.setState({
//     //         isHideShow: !this.state.isHideShow,
//     //     });
//     // };
//     render() {
//         // console.log('Display list User with props:', this.props.listUsers);
//         const { listUsers } = this.props;
//         return (
//             <div>
//                 {/* <div>
//                     <span onClick={() => { this.handleOnHideShow() }}>
//                         {this.state.isHideShow === true ? 'Hide list users' : 'Display list users'}
//                     </span>
//                 </div> */}
//                 {true &&
//                     <div>
//                         {listUsers.map((user, index) => {
//                             // console.log('>>Check list user:', user)
//                             return (
//                                 <div key={user.id} className={+user.age > 18 ? 'blue' : 'red'}>
//                                     <div>My Name is: {user.name}</div>
//                                     <div>My Age: {user.age} </div>
//                                     <button onClick={()=> {this.props.handleDeleteUser(user.id)}}>Delete</button>
//                                     <hr />
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 }
//             </div>
//         )
//     }
// }

// function components
const DisplayInfo = (props) => {
    const { listUsers } = props;
    return (
        <div>
            {true &&
                <div>
                    {listUsers.map((user, index) => {
                        // console.log('>>Check list user:', user)
                        return (
                            <div key={user.id} className={+user.age > 18 ? 'blue' : 'red'}>
                                <div>My Name is: {user.name}</div>
                                <div>My Age: {user.age} </div>
                                <button onClick={() => { props.handleDeleteUser(user.id) }}>Delete</button>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default DisplayInfo;

// render() {
//         // console.log('Display list User with props:', this.props.listUsers);
//         // props : stand for properties
//         // destructuring arr/ obj
//         // const {name, age} = this.props; // if obj use {}, otherwise arr []
//         const { listUsers } = this.props;
//         return (
//             // <div>
//             //     <div>My Name is: {name}</div>
//             //     <div>My Age: {age} </div>
//             //     <hr/>
//             // </div>
//             <div>
//                 {listUsers.map((user, index) => {
//                     console.log('>>Check list user:', user)
//                     // the way traditional, + is converted from type string to number
//                     // if (+user.age > 18) {
//                     //     return (
//                     //         <div key={user.id} className="blue">
//                     //             <div>My Name is: {user.name}</div>
//                     //             <div>My Age: {user.age} </div>
//                     //             <hr />
//                     //         </div>
//                     //     )
//                     // }
//                     // else {
//                     //     return (
//                     //         <div key={user.id} className="red">
//                     //             <div>My Name is: {user.name}</div>
//                     //             <div>My Age: {user.age} </div>
//                     //             <hr />
//                     //         </div>
//                     //     )
//                     // }
//                     // the way is short but it ofter use much
//                     return (
//                         <div>
//                             <div>
//                                 <span onClick={() => { this.handleOnHideShow() }}>
//                                     {this.state.isHideShow === true ? 'Hide list users' : 'Display list users'}
//                                 </span>
//                             </div>
//                             {this.state.isHideShow &&
//                                 <div>
//                                     <div key={user.id} className={+user.age > 18 ? 'blue' : 'red'}>
//                                         <div>My Name is: {user.name}</div>
//                                         <div>My Age: {user.age} </div>
//                                         <hr />
//                                     </div>
//                                 </div>
//                             }
//                         </div>
//                     )
//                 })}

//             </div>
//         )
//     }