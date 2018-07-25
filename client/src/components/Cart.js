import React, { Component } from 'react';
import '../styles/Cart.css';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from "react-redux";
import { addToCart, removeFromCart } from '../actions/Actions';

const mapStateToProps = state => {
    return { 
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: item => dispatch(removeFromCart(item))
    };
};

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    removeFromShoppingCart(id) {
        this.props.removeFromCart(id);

        this.toastId = toast.success("Item removed from shopping cart!", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }

    render() {
        return (
            <div className="Cart">
                {this.props.cartItems.length > 0 ?
                    <div>
                        <h2 className="cart-title">
                            Shopping Cart: {this.props.cartItems.length} items
                        </h2>
                        {this.props.cartItems.map(item => (
                            <div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="EmptyCart">
                        <p className="no-item">You currently have 0 items in your cart. Click the button to go back to the product search page.</p>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            >
                            <Link to="/">Back To Search</Link>
                        </button>
                    </div>
                }
                <ToastContainer autoClose={3000} />
            </div>
        );
    }
}

const CartPage = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartPage;