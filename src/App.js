import './App.scss';
import React from 'react';
import Header from './components/Header/header';
import { Link, Outlet } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <div className='header-container'>
          <Header />
        </div>
        <div className='main-container'>
          <div className='sidenav-container'>

          </div>
          <div className='app-content'>
            <Outlet />
          </div>
        </div>

      </div>
    );
  };
};

// const App = () => {
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();

//   return (
//     <MyComponent/>
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Hello world with Bruyne
//     //     </p>
//     //     <div>Count = {count}</div>
//     //     <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//     //     <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//     //   </header>
//     // </div>
//   );
// }

export default App;
