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
import ReactHtmlParser from 'react-html-parser';
import StarRatings from 'react-star-ratings';

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

    render() {
        // Render nothing to the screen until componentDidMount is ready
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="Info">
                {this.state.productInfo.length > 0 ?
                    <div>
                        <Card className="item-info">
                            <CardMedia
                                className="item-photo"
                                image={this.state.productInfo[0].largeImage}
                                title={this.state.productInfo[0].name}
                            />
                            <CardContent className="item-content">
                                <Typography gutterBottom variant="headline" component="h2">
                                    {this.state.productInfo[0].name}
                                </Typography>
                                <Typography variant="subheading" color="textSecondary">
                                    <StarRatings
                                        rating={this.state.productInfo[0].customerRating ? parseInt(this.state.productInfo[0].customerRating) : 0}
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
                                    {ReactHtmlParser(this.state.productInfo[0].shortDescription)}
                                </Typography>
                                <Typography gutterBottom variant="headline" component="h3">
                                    Item Details
                                </Typography>
                                <Typography component="span" className="item-long-description">
                                    {ReactHtmlParser(this.state.productInfo[0].longDescription)}
                                </Typography>
                            </CardContent>
                            <CardActions className="item-buttons">
                                <button
                                    type="submit"
                                    className="btn btn-primary back-button"
                                >
                                    <Link to="/">Back To Search</Link>
                                </button>
                                <button 
                                    type="submit"
                                    className="btn btn-primary add-to-cart"
                                >
                                    <AddShoppingCartIcon />
                                    <span>Add To Cart</span>
                                </button>
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

export default Info;