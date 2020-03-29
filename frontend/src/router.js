import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; //npm i react-router-dom

import Logon from './pages/Logon'; //if we not put the file name, then it'll search for the index.js in the folder
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';


export default function Routes() {
  //exact  -  the react looking for router that begins with the path, so we need to use exact to say that is exact that path
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} /> 
        <Route path="/register" component={Register}/>

        <Route path="/profile" component={Profile}/>
        <Route path="/incidents/new" component={NewIncident}/>
      </Switch>
    </BrowserRouter>
  );
}