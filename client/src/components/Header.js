import React, { Component } from 'react';
import '../styles/Header.css';

class Header extends Component {
  render() {
    return (
        <div className="Header">
            <nav className="HeaderBar navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand">SortaBestBuy</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Search Products <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="cart">Cart <span className="badge cart-badge">0</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="checkout">Checkout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
  }
}

export default Header;