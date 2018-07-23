import React, { Component } from 'react';
import '../styles/Products.css';
import axios from 'axios';
import { connect } from "react-redux";
import { searchItems } from '../actions/Actions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const mapStateToProps = state => {
    return { searchItemsList: state.searchItemsList };
};

const mapDispatchToProps = dispatch => {
    return {
        searchItems: searchedItems => dispatch(searchItems(searchedItems))
    };
};

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        }
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

    // Get list of products from API
    getProducts() {
        axios.get('/api/getProducts', {
            params: {
              searchValue: this.state.searchValue
            }
          })
            .then((response) => {
                console.log(this.props);
                console.log(response);
                // Update searched items list in Redux Store
                this.props.searchItems(response.data.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="Products">
                <div className="SearchHeader">
                    <div className="form-group has-feedback has-feedback-left">
                        <input type="text" className="form-control" id="search-value" placeholder="Search Products" onChange={this.onChangeName.bind(this)} />
                        <button type="submit" className="btn btn-primary search-button" onClick={this.getProducts.bind(this)}>Search</button>
                    </div>
                </div>
                <div className="ProductList">
                    <GridList cellHeight={360} className="ProductGrid">
                        {this.props.searchItemsList.map(tile => (
                            <GridListTile key={tile.itemId}>
                                <img src={tile.largeImage} alt={tile.title} />
                                <GridListTileBar
                                title={tile.name + " - $" + (tile.msrp ? tile.msrp : tile.salePrice)}
                                titlePosition="top"
                                className="title-bar"
                                actionIcon={
                                    <IconButton className="">
                                        <StarBorderIcon />
                                    </IconButton>
                                }
                                actionPosition="left"
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        );
    }
}

const ProductPage = connect(mapStateToProps, mapDispatchToProps)(Products);

export default ProductPage;