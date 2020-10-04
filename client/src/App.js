import React from 'react';
import Router from "./components/Router";
import { Provider } from 'react-redux';
import store from "./store";


import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//         <Navbar/>
//         <Landing/>
//     </div>
//   );
// }

const App = () => (

    <Provider store={store}>
        <Router />
    </Provider>
);

export default App;
