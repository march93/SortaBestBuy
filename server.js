const express = require('express');
const axios = require('axios');
const WalmartAPI = '6k2qygre8hb96fd3pdb5keap';
const decode = require('unescape');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/getProducts', (req, res) => {
    axios.get('http://api.walmartlabs.com/v1/search', {
        params: {
            query: req.query.searchValue,
            start: req.query.startPage,
            numItems: 24,
            format: 'json',
            apiKey: WalmartAPI
        }
    })
        .then(function (response) {
            // If results returned is less than or equal to 24, attach extra parameter to disable next page button
            // Return 24 items at a time
            if (response.data.totalResults <= parseInt(req.query.startPage) + 10) {
                response.data.nextPageDisable = true;
                res.send(response.data);
            } else {
                response.data.nextPageDisable = false;
                res.send(response.data);
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get('/api/getProductInfo', (req, res) => {
    axios.get('http://api.walmartlabs.com/v1/items', {
        params: {
            ids: req.query.id,
            format: 'json',
            apiKey: WalmartAPI
        }
    })
        .then(function(response) {
            // Check if there are any items
            if (response.data.items.length > 0) {
                // Unescape HTML tags within the long/short description
                response.data.items[0].shortDescription = decode(response.data.items[0].shortDescription);
                response.data.items[0].longDescription = decode(response.data.items[0].longDescription);
                res.send(response.data.items);
            } else {
                // Send an empty array if item ID doesn't exist
                res.send([]);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));