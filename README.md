# SortaBestBuy

It's sort of like Best Buy but half as good. Don't let Best Buy in the name trick you, it doesn't actually display any data from Best Buy. This app displays product information from Wal-Mart.

## What does the app do?

This app allows the user to search items available for sale in Wal-Mart's database through their public API. The user can add items to their shopping cart or their wishlist. At the end, the user can choose to checkout out those items they have in their cart.

## Features

* Search for items based on name and relevance
* View additional item information such as description, price, reviews, etc.
* Add or delete items in their wishlist
* Add or delete items in their shopping cart
* Update the quantity of each item in their cart
* Checkout items in shopping cart by paying with a credit card

## Front End

The front end of this app is built entirely with React/Redux.

## Back End

The back end is built with NodeJS to handle all the logic. It also makes API calls to Wal-Mart's public API, then sends that data over to the front end. A reverse proxy is used to redirect calls to the correct location.

## Popular Libraries/Frameworks

The app makes heavy use of Bootstrap and Material UI for the interface. This cuts down time spent on custom UI pieces. Axios is the go to HTTP client to make API calls. It's use of promises provides a more streamlined use for HTTP requests.

## Deployment

The app is currently deployed on Heroku. You can access it here: https://sortabestbuy.herokuapp.com