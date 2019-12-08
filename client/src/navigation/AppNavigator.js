import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const AppNavigator = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Dashboard} exact />
    </Switch>
  </BrowserRouter>
);

export default AppNavigator;
