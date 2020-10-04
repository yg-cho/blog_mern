import React, { useEffect } from 'react';
import Router from "./components/Router";
import { Provider } from 'react-redux';
import store from "./store";
import { loadUser } from './actions/auth';
import setAuthToken from "./utils/setAuthToken";
import './App.css';

    if(localStorage.token) {
        setAuthToken(localStorage.token);
        console.log(localStorage.token);
        console.log("인증됨");
    }

//
// function App() {
//   return (
//     <div className="App">
//         <Navbar/>
//         <Landing/>
//     </div>
//   );
// }

const App = () => {

    useEffect(()=> {
        store.dispatch(loadUser());
        console.log("store :::",store.dispatch(loadUser()));

    },[])
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
};

export default App;
