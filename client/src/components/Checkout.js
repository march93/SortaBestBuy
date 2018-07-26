import React, { Component } from 'react';
import '../styles/Checkout.css';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
// import { clearCartItems } from '../actions/Actions';

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // clearCartItems: item => dispatch(clearCartItems(item))
    };
};

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    clearCart(id) {
        // this.props.clearCart([]);

        // this.toastId = toast.success("", {
        //     position: toast.POSITION.BOTTOM_CENTER
        // });
    }

    render() {
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
                                        <input type="text" className="form-control" id="inputName" placeholder="Name" />
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Email</label>
                                    <div className="col-sm-8">
                                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputCountry" className="col-sm-3 col-form-label">Country</label>
                                    <div className="col-sm-8">
                                        <select id="inputCountry" className="form-control">
                                            <option defaultValue>Choose...</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputProvince" className="col-sm-3 col-form-label">Province</label>
                                    <div className="col-sm-8">
                                        <select id="inputProvince" className="form-control">
                                            <option defaultValue>Choose...</option>
                                            <option>Alberta</option>
                                            <option>British Columbia</option>
                                            <option>Manitoba</option>
                                            <option>New Brunswick</option>
                                            <option>Newfoundland and Labrador</option>
                                            <option>Northwest Territories</option>
                                            <option>Nova Scotia</option>
                                            <option>Nunavut</option>
                                            <option>Ontario</option>
                                            <option>Prince Edward Island</option>
                                            <option>Quebec</option>
                                            <option>Saskatchewan</option>
                                            <option>Yukon</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputCity" className="col-sm-3 col-form-label">City</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="inputCity" placeholder="City" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPostalCode" className="col-sm-3 col-form-label">Postal Code</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="inputPostalCode" placeholder="Postal Code" />
                                    </div>
                                </div> */}
                                <div className="form-group row">
                                    <label htmlFor="inputCreditCard" className="col-sm-3 col-form-label">Card Number</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="inputCreditCard" placeholder="Credit Card Number" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputExpiry" className="col-sm-3 col-form-label">Expiration Date</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="inputExpiry" placeholder="MM/YYYY" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputCVV" className="col-sm-3 col-form-label">Card CVV</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="inputCVV" placeholder="Security Code" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-8">
                                        <button type="submit" className="btn btn-primary">Pay</button>
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