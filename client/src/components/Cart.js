import React, { Component } from 'react';
import '../styles/Cart.css';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from "react-redux";
import { removeFromCart, updateItemQuantity } from '../actions/Actions';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Clear';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const mapStateToProps = state => {
    return { 
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: item => dispatch(removeFromCart(item)),
        updateItemQuantity: total => dispatch(updateItemQuantity(total))
    };
};

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 10
        }
    }

    removeFromShoppingCart(id) {
        this.props.removeFromCart(id);

        this.toastId = toast.success("Item removed from shopping cart!", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }

    onChangePage(event, page) {
        this.setState({
            page
        });
    }

    onChangeRowsPerPage(event) {
        this.setState({
            rowsPerPage: event.target.value
        });
    }

    incrementQuantity(id) {
        const item = this.props.cartItems.find(function(element) {
            return element.id === id;
        });
        this.props.updateItemQuantity({id: id, total: item.quantity + 1});
    }

    decrementQuantity(id) {
        const item = this.props.cartItems.find(function(element) {
            return element.id === id;
        });
        this.props.updateItemQuantity({id: id, total: item.quantity - 1});
    }

    render() {
        const data = this.props.cartItems;
        const page = this.state.page;
        const rowsPerPage = this.state.rowsPerPage;

        return (
            <div className="Cart">
                {this.props.cartItems.length > 0 ?
                    <div>
                        <h2 className="cart-title">
                            Shopping Cart: {this.props.cartItems.length} items
                        </h2>
                        <Paper className="cart-container">
                            <div className="cart-div">
                                <Table className="cart-table">
                                    <TableBody>
                                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                            return (
                                            <TableRow key={n.id} className="item-row">
                                                <TableCell component="th" scope="row">
                                                    <DeleteIcon
                                                        className="delete-item"
                                                        onClick={this.removeFromShoppingCart.bind(this, n.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <img src={n.info.thumbnailImage} className="item-image" />
                                                </TableCell>
                                                <TableCell>
                                                    <span className="item-name">
                                                        {n.info.name}
                                                    </span>
                                                </TableCell>
                                                <TableCell numeric>
                                                    <div className="item-quantity">
                                                        <button
                                                            className="item-increment"
                                                            onClick={this.incrementQuantity.bind(this, n.id)}
                                                            disabled={n.quantity === 99}
                                                            >
                                                            +
                                                        </button>
                                                        <span className="item-total">{n.quantity}</span>
                                                        <button
                                                            className="item-decrement"
                                                            onClick={this.decrementQuantity.bind(this, n.id)}
                                                            disabled={n.quantity === 1}
                                                            >
                                                            -
                                                        </button>
                                                    </div>
                                                </TableCell>
                                                <TableCell numeric>
                                                    <span className="item-price">
                                                        {"$" + (n.info.salePrice ? (n.info.salePrice * n.quantity) : (n.info.msrp * n.quantity))}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                colSpan={5}
                                                count={data.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onChangePage={this.onChangePage.bind(this)}
                                                onChangeRowsPerPage={this.onChangeRowsPerPage.bind(this)}
                                                />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                        </Paper>
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