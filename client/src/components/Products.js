import React, { Component } from 'react';
import '../styles/Products.css';
import axios from 'axios';
import { connect } from "react-redux";
import { searchItems, changePage, blockNext } from '../actions/Actions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import StarRatings from 'react-star-ratings';


const mapStateToProps = state => {
    return { 
        searchItemsList: state.searchItemsList,
        startPage: state.startPage,
        isNextBlocked: state.isNextBlocked
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchItems: searchedItems => dispatch(searchItems(searchedItems)),
        changePage: page => dispatch(changePage(page)),
        blockNext: block => dispatch(blockNext(block))
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

    componentDidMount() {
        console.log(this.props.searchItemsList);
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
                // Update searched items list in Redux Store
                this.props.searchItems(response.data.items);

                // Update boolean for next page disabler
                this.props.blockNext(response.data.nextPageDisable);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Get previous page results
    getPrevPage() {
        if (!this.nextDisable) {
            // Prevent double clicks
            this.nextDisable = true;

            // Call API to get the next set of results
            axios.get('/api/getProducts', {
                params: {
                  searchValue: this.state.searchValue,
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
                    this.nextDisable = false;
                })
                .catch((error) => {
                    console.log(error);
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
                  searchValue: this.state.searchValue,
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
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div className="Products">
                <div className="SearchHeader">
                    <div className="form-group has-feedback has-feedback-left">
                        <input type="text" className="form-control" id="search-value" placeholder="Search Products" onKeyPress={this.isEnterKey.bind(this)} onChange={this.onChangeName.bind(this)} />
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
                                            {"$" + (card.salePrice ? card.salePrice : card.msrp)}
                                        </Typography>
                                        <Typography variant="subheading" color="textSecondary">
                                            <StarRatings
                                                rating={card.customerRating ? parseInt(card.customerRating) : 0}
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
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="Share">
                                            <InfoIcon />
                                        </IconButton>
                                        <button className="btn btn-primary shopping-cart-add">
                                            <AddShoppingCartIcon />
                                            <span>Add To Shopping Cart</span>
                                        </button>
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
            </div>
        );
    }
}

const ProductPage = connect(mapStateToProps, mapDispatchToProps)(Products);

export default ProductPage;