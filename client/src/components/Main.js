import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './Products';
import Info from './Info';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Products}/>
      <Route exact path='/product-info/:id' component={Info}/>
    </Switch>
  </main>
)

export default Main;