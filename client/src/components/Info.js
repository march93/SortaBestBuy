import React, { Component } from 'react';
import '../styles/Info.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ReactHtmlParser from 'react-html-parser';
import StarRatings from 'react-star-ratings';
import { connect } from "react-redux";
import { addToCart, removeFromCart } from '../actions/Actions';

const mapStateToProps = state => {
    return { 
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: item => dispatch(addToCart(item)),
        removeFromCart: item => dispatch(removeFromCart(item))
    };
};

class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            productInfo: []
        }
    }

    componentDidMount() {
        axios.get('/api/getProductInfo', {
            params: {
              id: this.props.match.params.id
            }
          })
            .then((response) => {
                // Update with product info matching the ID
                this.setState({
                    loading: false,
                    productInfo: response.data
                });
            })
            .catch((error) => {
                // Toast Error
                toast.error("Cannot get product info.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            });
    }

    addToShoppingCart(id) {
        this.props.addToCart({id: id, info: this.state.productInfo[0], quantity: 1});

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

    render() {
        // Render nothing to the screen until componentDidMount is ready
        if (this.state.loading) {
            return null;
        }

        const item = this.state.productInfo;

        return (
            <div className="Info">
                {item.length > 0 ?
                    <div>
                        <Card className="item-info">
                            <CardMedia
                                className="item-photo"
                                image={item[0].largeImage}
                                title={item[0].name}
                            />
                            <CardContent className="item-content">
                                <Typography gutterBottom variant="headline" component="h2">
                                    {item[0].name}
                                </Typography>
                                <Typography variant="subheading" className="item-price">
                                    {"$" + (item[0].salePrice ? item[0].salePrice.toFixed(2) : item[0].msrp.toFixed(2))}
                                </Typography>
                                <Typography variant="subheading" color="textSecondary">
                                    <StarRatings
                                        rating={item[0].customerRating ? parseInt(item[0].customerRating) : 0}
                                        starRatedColor="blue"
                                        numberOfStars={5}
                                        starDimension="20px"
                                        name='rating'
                                    />
                                </Typography>
                                <Typography gutterBottom variant="headline" component="h3">
                                    Description
                                </Typography>
                                <Typography component="span" className="item-short-description">
                                    {ReactHtmlParser(item[0].shortDescription)}
                                </Typography>
                                <Typography gutterBottom variant="headline" component="h3">
                                    Item Details
                                </Typography>
                                <Typography component="span" className="item-long-description">
                                    {ReactHtmlParser(item[0].longDescription)}
                                </Typography>
                            </CardContent>
                            <CardActions className="item-buttons">
                                <button
                                    type="submit"
                                    className="btn btn-primary back-button"
                                    >
                                    <Link to="/">Back To Search</Link>
                                </button>
                                {this.props.cartItems.filter(product => (product.id === item[0].itemId)).length > 0 ?
                                    <button 
                                        className="btn btn-primary btn-danger remove-from-cart"
                                        onClick={this.removeFromShoppingCart.bind(this, item[0].itemId)}
                                        >
                                        <RemoveShoppingCartIcon />
                                        <span>Remove From Shopping Cart</span>
                                    </button>
                                    :
                                    <button 
                                        type="submit"
                                        className="btn btn-primary add-to-cart"
                                        onClick={this.addToShoppingCart.bind(this, item[0].itemId)}
                                        >
                                        <AddShoppingCartIcon />
                                        <span>Add To Cart</span>
                                    </button>
                                }
                            </CardActions>
                        </Card>
                    </div>
                    :
                    <div className="NoInfo">
                        <span className="no-item">Product Info Unavailable</span>
                    </div>
                }
                <ToastContainer autoClose={3000} />
            </div>
        );
    }
}

const InfoPage = connect(mapStateToProps, mapDispatchToProps)(Info);

export default InfoPage;