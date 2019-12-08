import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';

const AppNavigator = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Dashboard} exact />
    </Switch>
  </BrowserRouter>
);

export default AppNavigator;
