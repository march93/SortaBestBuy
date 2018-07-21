import React, { Component } from 'react';
import '../styles/Products.css';

class Products extends Component {
  render() {
    return (
        <div className="Products">
            <div className="SearchHeader">
                <div className="form-group has-feedback has-feedback-left">
                    <input type="text" className="form-control" id="search-value" placeholder="Search Products" />
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                    <button type="submit" className="btn btn-primary search-button">Search</button>
                </div>
            </div>
        </div>
    );
  }
}

export default Products;