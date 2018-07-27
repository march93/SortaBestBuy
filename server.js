const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const WalmartAPI = '6k2qygre8hb96fd3pdb5keap';
const decode = require('unescape');

const app = express();
const port = process.env.PORT || 5000;
const secret_key = 'sk_test_JfkVnrHHZnKKFkBPZdpUGGiG';
const stripe = require("stripe")(secret_key);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

app.post('/api/checkoutItems', (req, res) => {
    // Get token with credit card provided
    stripe.tokens.create({
        card: {
          "number": req.body.number,
          "exp_month": parseInt(req.body.expiry.substring(0, 2), 10),
          "exp_year": parseInt(req.body.expiry.substring(3), 10),
          "cvc": req.body.cvv
        }
    })
    .then(response =>
        // Charge credit card
        stripe.charges.create({
            amount: parseInt(req.body.price, 10),
            currency: "cad",
            source: response.id,
            description: "Charge for " + req.body.name
        }))
    .then(charge =>
        // Send back status of charge
        res.send(charge.status)
    )
    .catch(function(error) {
        console.log(error);
    });
});

// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, 'client/build')));
  
//     // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//         res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
// }

app.listen(port, () => console.log(`Listening on port ${port}`));