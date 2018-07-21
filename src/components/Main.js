import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './Products';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Products}/>
    </Switch>
  </main>
)

export default Main;