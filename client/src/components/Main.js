import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './Products';
import Info from './Info';
import Cart from './Cart';
import Wishlist from './Wishlist';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Products}/>
      <Route exact path='/product-info/:id' component={Info}/>
      <Route exact path='/cart' component={Cart}/>
      <Route exact path='/wishlist' component={Wishlist}/>
    </Switch>
  </main>
)

export default Main;