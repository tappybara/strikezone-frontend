import React from 'react';
import { HashRouter, Route, browserHistory, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Pitchers from './pages/pitchers';
import Starts from './pages/starts';
import Data from './pages/data';
import Firebase from './components/Firebase/firebase';
import FirebaseContext from './components/Firebase/context';
import NavBar from './components/header.jsx';

function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
        <NavBar />
        <Route exact path="/team/:tn" component={Pitchers} />
        <Route path="/team/:tn/:pid" component={Starts} />
        <Route path="/data/:tn/:opp/:date" component={Data} />
        <Route exact path="/" component={Home} />
    </BrowserRouter>
</FirebaseContext.Provider>
  );
}

export default App;
