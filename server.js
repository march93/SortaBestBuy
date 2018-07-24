const express = require('express');
const axios = require('axios');
const WalmartAPI = '6k2qygre8hb96fd3pdb5keap';

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/getProducts', (req, res) => {
    axios.get('http://api.walmartlabs.com/v1/search', {
        params: {
            query: req.query.searchValue,
            start: req.query.startPage,
            numItems: 24,
            format: 'json',
            apiKey: WalmartAPI,
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

app.listen(port, () => console.log(`Listening on port ${port}`));