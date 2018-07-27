import React, { Component } from 'react';
import '../styles/Checkout.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from "react-redux";
import { clearCartItems } from '../actions/Actions';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearCartItems: item => dispatch(clearCartItems(item))
    };
};

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            number: "",
            expiry: "",
            cvv: ""
        }
    }

    onNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    onNumberChange(event) {
        this.setState({
            number: event.target.value
        });
    }

    onExpiryChange(event) {
        this.setState({
            expiry: event.target.value
        });
    }

    onCVVChange(event) {
        this.setState({
            cvv: event.target.value
        });
    }

    submitPayment(event) {
        // Prevent page refresh
        event.preventDefault();

        // get payment total
        let price = 0;
        this.props.cartItems.forEach(item => {
            if (item.info.salePrice) {
                price += item.info.salePrice * item.quantity;
            } else {
                price += item.info.msrp * item.quantity;
            }
        });
        
        // Submit card details
        axios.post('/api/checkoutItems', {
              name: this.state.name,
              number: this.state.number,
              expiry: this.state.expiry,
              cvv: this.state.cvv,
              price: price * 100
            })
            .then((response) => {
                if (response.data === 'succeeded') {
                    // Charge succeeded
                    this.toastId = toast.success("Transaction successfully completed!", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });

                    // Clear cart contents if charge is successful
                    this.clearCart();
                } else {
                    this.toastId = toast.error("Transaction could not be completed!", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            })
            .catch((error) => {
                this.toastId = toast.error("Could not complete transaction.", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            });
    }

    clearCart() {
        // Set cart to empty
        this.props.clearCartItems([]);
    }

    render() {
        // get payment total
        let price = 0;
        this.props.cartItems.forEach(item => {
            if (item.info.salePrice) {
                price += item.info.salePrice * item.quantity;
            } else {
                price += item.info.msrp * item.quantity;
            }
        });

        return (
            <div className="Checkout">
                {this.props.cartItems.length > 0 ?
                    <div>
                        <h2 className="checkout-title">
                            Checkout: {this.props.cartItems.length} {this.props.cartItems.length === 1 ? "item" : "items"}
                        </h2>

                        <Paper className="checkout-paper">
                            <form className="checkout-form">
                                <div className="form-group row">
                                    <label htmlFor="inputName" className="col-sm-3 col-form-label">Name</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputName"
                                            placeholder="Name"
                                            defaultValue={this.state.name}
                                            onChange={this.onNameChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputCreditCard" className="col-sm-3 col-form-label">Card Number</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="inputCreditCard"
                                            placeholder="Credit Card Number"
                                            defaultValue={this.state.number}
                                            onChange={this.onNumberChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputExpiry" className="col-sm-3 col-form-label">Expiration Date</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputExpiry"
                                            placeholder="MM/YYYY"
                                            defaultValue={this.state.expiry}
                                            onChange={this.onExpiryChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputCVV" className="col-sm-3 col-form-label">Card CVV</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputCVV"
                                            placeholder="Security Code"
                                            defaultValue={this.state.cvv}
                                            onChange={this.onCVVChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-8">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={this.submitPayment.bind(this)}
                                            >
                                            {"Pay $" + price}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Paper>
                    </div>
                    :
                    <div className="EmptyCheckout">
                        <p className="no-item">You currently have 0 items in your shopping cart. Click the button to go back to the product search page.</p>
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

const CheckoutPage = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default CheckoutPage;