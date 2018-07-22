const express = require('express');
const axios = require('axios');
const WalmartAPI = '6k2qygre8hb96fd3pdb5keap';

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/getProducts', (req, res) => {
    axios.get('http://api.walmartlabs.com/v1/search', {
        params: {
            query: req.query.searchValue,
            numItems: 25,
            format: 'json',
            apiKey: WalmartAPI,
        }
      })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));