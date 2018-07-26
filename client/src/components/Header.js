import React, { Component } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { 
        cartItems: state.cartItems,
        wishlist: state.wishlist
    };
};

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
                            <Link to="/" className="nav-link">Search Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/wishlist" className="nav-link">Wishlist <span className="badge wishlist-badge">{this.props.wishlist.length}</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link">Cart <span className="badge cart-badge">{this.props.cartItems.length}</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/checkout" className="nav-link">Checkout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
  }
}

const HeaderPage = connect(mapStateToProps, null)(Header);

export default HeaderPage;