import React, { Component } from 'react';
import '../styles/Wishlist.css';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from "react-redux";
import { removeFromWishlist } from '../actions/Actions';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Clear';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const mapStateToProps = state => {
    return {
        wishlist: state.wishlist
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeFromWishlist: item => dispatch(removeFromWishlist(item))
    };
};

class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 10
        }
    }

    removeFromWishlist(id) {
        this.props.removeFromWishlist(id);

        this.toastId = toast.success("Item removed from wishlist!", {
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

    render() {
        const data = this.props.wishlist;
        const page = this.state.page;
        const rowsPerPage = this.state.rowsPerPage;

        return (
            <div className="Wishlist">
                {this.props.wishlist.length > 0 ?
                    <div>
                        <h2 className="wishlist-title">
                            Wishlist: {this.props.wishlist.length} items
                        </h2>
                        <Paper className="wishlist-container">
                            <div className="wishlist-div">
                                <Table className="wishlist-table">
                                    <TableBody>
                                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                            return (
                                            <TableRow key={n.id} className="item-row">
                                                <TableCell component="th" scope="row">
                                                    <DeleteIcon
                                                        className="delete-item"
                                                        onClick={this.removeFromWishlist.bind(this, n.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <img
                                                        src={n.info.thumbnailImage}
                                                        alt={n.info.name}
                                                        className="item-image"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <span className="item-name">
                                                        {n.info.name}
                                                    </span>
                                                </TableCell>
                                                <TableCell numeric>
                                                    <span className="item-price">
                                                        {"$" + (n.info.salePrice ? n.info.salePrice.toFixed(2) : n.info.msrp.toFixed(2))}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                colSpan={4}
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
                    <div className="EmptyWishlist">
                        <p className="no-item">You currently have 0 items in your wishlist. Click the button to go back to the product search page.</p>
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

const WishlistPage = connect(mapStateToProps, mapDispatchToProps)(Wishlist);

export default WishlistPage;