import React from 'react';
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Router from "./components/Router";

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
    <>
        <Router />
    </>
);

export default App;
