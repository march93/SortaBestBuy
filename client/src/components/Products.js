import React, { Component } from 'react';
import '../styles/Products.css';
import axios from 'axios';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        }
    }

    onChangeName(event) {
        this.setState({
            searchValue: event.target.value
        });
    }

    getProducts() {
        axios.get('/api/getProducts', {
            params: {
              searchValue: this.state.searchValue
            }
          })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
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
            </div>
        );
    }
}

export default Products;