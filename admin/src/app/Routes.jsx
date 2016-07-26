import React from 'react'
import {Route, Redirect, IndexRoute} from 'react-router'

import Layout from './pages/layout/Layout.jsx'

import Home from './pages/home/Home.jsx'

// import LockedScreen from './pages/misc/LockedScreen.jsx'
// import Login from './pages/misc/Login.jsx'
// import Forgot from './pages/misc/Forgot.jsx'
// import Register from './pages/misc/Register.jsx'


import FormElements from './pages/forms/FormElements.jsx'


let requireAuth = async (nextState, replace) => {
  let response = await fetch('/auth/status', {credentials: 'include'});
  let result = await response.json();
  console.log("=== result ===", result);
  if (!result.authenticated) {
    window.location.replace("/");
  }
}

const Routes = (
  <Route>
      <Route path="/" component={Layout} onEnter={requireAuth}>
          <Redirect from="/" to="/home"/>
          <IndexRoute component={Home}/>
          <Route path="home" component={Home} />

          <Redirect from="forms" to="/forms/elements"/>
          <Route path="forms">
              <Route path="elements" component={FormElements}/>
          </Route>
      </Route>
  </Route>
);



export default Routes
