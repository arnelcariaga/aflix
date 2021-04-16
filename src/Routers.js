import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login/';
import Home from './Home/';
import Dashboard from './Dashboard/';

require ('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require ('../node_modules/bootstrap/dist/js/bootstrap.bundle.js')

const Routers = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </Suspense>
  </Router>
);

export default Routers;