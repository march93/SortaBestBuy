import React, { Component } from 'react';
import '../styles/Products.css';
import axios from 'axios';
import { connect } from "react-redux";
import { searchValue, searchItems, changePage, blockNext, addToCart, removeFromCart, addToWishlist, removeFromWishlist } from '../actions/Actions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InfoIcon from '@material-ui/icons/Info';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import StarRatings from 'react-star-ratings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const mapStateToProps = state => {
    return { 
        searchedValue: state.searchedValue,
        searchItemsList: state.searchItemsList,
        startPage: state.startPage,
        isNextBlocked: state.isNextBlocked,
        cartItems: state.cartItems,
        wishlist: state.wishlist
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchValue: value => dispatch(searchValue(value)),
        searchItems: searchedItems => dispatch(searchItems(searchedItems)),
        changePage: page => dispatch(changePage(page)),
        blockNext: block => dispatch(blockNext(block)),
        addToCart: item => dispatch(addToCart(item)),
        removeFromCart: item => dispatch(removeFromCart(item)),
        addToWishlist: item => dispatch(addToWishlist(item)),
        removeFromWishlist: item => dispatch(removeFromWishlist(item))
    };
};

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        }

        // Blockers to prevent double clicking
        this.prevDisable = false;
        this.nextDisable = false;
    }

    // Set search value on change
    onChangeName(event) {
        this.setState({
            searchValue: event.target.value
        });
    }

    // Check if Enter key is pressed inside input element
    isEnterKey(event) {
        if (event.key === "Enter") {
            this.getProducts();
        }
    }

    // Get list of products from API
    getProducts() {
        axios.get('/api/getProducts', {
            params: {
              searchValue: this.state.searchValue,
              startPage: 1
            }
          })
            .then((response) => {
                // Update search value
                this.props.searchValue(this.state.searchValue);

                // Update searched items list in Redux Store
                this.props.searchItems(response.data.items);

                // Update boolean for next page disabler
                this.props.blockNext(response.data.nextPageDisable);
            })
            .catch((error) => {
                this.toastId = toast.error("Could not get products.", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            });
    }

    // Get previous page results
    getPrevPage() {
        if (!this.prevDisable) {
            // Prevent double clicks
            this.prevDisable = true;

            // Call API to get the next set of results
            axios.get('/api/getProducts', {
                params: {
                  searchValue: this.props.searchedValue, // Use Redux stored search value to avoid wrong value from onChangeName
                  startPage: this.props.startPage - 24
                }
              })
                .then((response) => {
                    // Update page number
                    this.props.changePage(this.props.startPage - 24);

                    // Update searched items list in Redux Store
                    this.props.searchItems(response.data.items);

                    // Update boolean for next page disabler
                    this.props.blockNext(response.data.nextPageDisable);

                    // Unblock next page blocker
                    this.prevDisable = false;
                })
                .catch((error) => {
                    this.toastId = toast.error("Could not get products.", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                });
        }
    }

    // Get next page results
    getNextPage() {
        if (!this.nextDisable) {
            // Prevent double clicks
            this.nextDisable = true;

            // Call API to get the next set of results
            axios.get('/api/getProducts', {
                params: {
                  searchValue: this.props.searchedValue, // Use Redux stored search value to avoid wrong value from onChangeName
                  startPage: this.props.startPage + 24
                }
              })
                .then((response) => {
                    // Update page number
                    this.props.changePage(this.props.startPage + 24);

                    // Update searched items list in Redux Store
                    this.props.searchItems(response.data.items);

                    // Update boolean for next page disabler
                    this.props.blockNext(response.data.nextPageDisable);

                    // Unblock next page blocker
                    this.nextDisable = false;
                })
                .catch((error) => {
                    this.toastId = toast.error("Could not get products.", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                });
        }
    }

    getInfo(id) {
        if (id) {
            // Navigate to product page
            // No need to redirect, easier to navigate back since there's a history stack trace
            this.props.history.push('/product-info/' + id);
        } else {
            // Toast error pop up if ID doesn't exist
            if (! toast.isActive(this.toastId)) {
                this.toastId = toast.error("Sorry, no product info at this time!", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        }
    }

    addToShoppingCart(id) {
        const item = this.props.searchItemsList.filter(product => (product.itemId === id));
        this.props.addToCart({id: id, info: item[0], quantity: 1});

        this.toastId = toast.success("Item added to shopping cart!", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }

    removeFromShoppingCart(id) {
        this.props.removeFromCart(id);

        this.toastId = toast.success("Item removed from shopping cart!", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }

    addToWishlist(id) {
        const item = this.props.searchItemsList.filter(product => (product.itemId === id));
        this.props.addToWishlist({id: id, info: item[0]});

        this.toastId = toast.success("Item added to wishlist!", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }

    removeFromWishlist(id) {
        this.props.removeFromWishlist(id);

        this.toastId = toast.success("Item removed from wishlist!", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }

    render() {
        return (
            <div className="Products">
                <div className="SearchHeader">
                    <div className="form-group has-feedback has-feedback-left">
                        <input
                            type="text"
                            className="form-control"
                            id="search-value"
                            defaultValue={this.props.searchedValue}
                            placeholder="Search Products"
                            onKeyPress={this.isEnterKey.bind(this)}
                            onChange={this.onChangeName.bind(this)} 
                        />
                        <button type="submit" className="btn btn-primary search-button" onClick={this.getProducts.bind(this)}>Search</button>
                    </div>
                </div>

                {this.props.searchItemsList.length > 0 ?

                    <div className="ProductSection">

                        <div className="upper-buttons">
                            <button 
                                type="submit"
                                className="btn btn-primary search-button"
                                disabled={this.props.startPage === 1}
                                onClick={this.getPrevPage.bind(this)}
                                >
                                Prev Page
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary search-button"
                                disabled={this.props.isNextBlocked}
                                onClick={this.getNextPage.bind(this)}
                                >
                                Next Page
                            </button>
                        </div>

                        <div className="ProductList">

                            {this.props.searchItemsList.map(card => (
                                <Card className="product-card" key={card.itemId}>
                                    <CardHeader
                                        title={card.name}
                                        className="product-header"
                                    />
                                    <CardContent className="product-content">
                                        <Typography variant="subheading" className="product-price">
                                            {"$" + (card.salePrice ? card.salePrice.toFixed(2) : card.msrp.toFixed(2))}
                                        </Typography>
                                        <Typography variant="subheading" color="textSecondary">
                                            <StarRatings
                                                rating={card.customerRating ? parseInt(card.customerRating, 10) : 0}
                                                starRatedColor="blue"
                                                numberOfStars={5}
                                                starDimension="20px"
                                                name='rating'
                                            />
                                        </Typography>
                                    </CardContent>
                                    <CardMedia
                                        className="product-image"
                                        image={card.mediumImage}
                                        title={card.name}
                                    />
                                    <CardActions className="product-actions" disableActionSpacing>
                                        <IconButton aria-label="Add to favorites">
                                            {this.props.wishlist.filter(product => (product.id === card.itemId)).length > 0 ? 
                                                <FavoriteIcon
                                                    className="favorite"
                                                    onClick={this.removeFromWishlist.bind(this, card.itemId)}
                                                />
                                                :
                                                <FavoriteBorderIcon
                                                    className="unfavorite"
                                                    onClick={this.addToWishlist.bind(this, card.itemId)}
                                                />
                                            }
                                        </IconButton>
                                        <IconButton aria-label="Get Product Info">
                                            <InfoIcon
                                                onClick={this.getInfo.bind(this, card.itemId)}
                                            />
                                        </IconButton>
                                        {this.props.cartItems.filter(item => (item.id === card.itemId)).length > 0 ?
                                            <button 
                                                className="btn btn-primary btn-danger shopping-cart-delete"
                                                onClick={this.removeFromShoppingCart.bind(this, card.itemId)}
                                                >
                                                <RemoveShoppingCartIcon />
                                                <span>Remove From Shopping Cart</span>
                                            </button>
                                            :
                                            <button 
                                                className="btn btn-primary shopping-cart-add"
                                                onClick={this.addToShoppingCart.bind(this, card.itemId)}
                                                >
                                                <AddShoppingCartIcon />
                                                <span>Add To Shopping Cart</span>
                                            </button>
                                        }
                                    </CardActions>
                                </Card>
                            ))}
                        </div>

                        <div className="lower-buttons">
                            <button
                                type="submit"
                                className="btn btn-primary search-button"
                                disabled={this.props.startPage === 1}
                                onClick={this.getPrevPage.bind(this)}
                                >
                                Prev Page
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary search-button"
                                disabled={this.props.isNextBlocked}
                                onClick={this.getNextPage.bind(this)}
                                >
                                Next Page
                            </button>
                        </div>
                    
                    </div>

                    :

                    <div className="NoProducts">
                        <span className="no-items">No Items to display</span>
                    </div>
                }
                <ToastContainer autoClose={3000} />
            </div>
        );
    }
}

const ProductPage = connect(mapStateToProps, mapDispatchToProps)(Products);

export default ProductPage;