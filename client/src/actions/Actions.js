import {
    SEARCH_VALUE,
    SEARCH_ITEMS,
    CHANGE_PAGE,
    BLOCK_NEXT,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    UPDATE_ITEM_QUANTITY,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
} from "../constants/Constants";

export const searchValue = value => ({ type: SEARCH_VALUE, payload: value });

export const searchItems = searchedItems => ({ type: SEARCH_ITEMS, payload: searchedItems });

export const changePage = page => ({ type: CHANGE_PAGE, payload: page });

export const blockNext = block => ({ type: BLOCK_NEXT, payload: block });

export const addToCart = item => ({ type: ADD_TO_CART, payload: item });

export const removeFromCart = item => ({ type: REMOVE_FROM_CART, payload: item });

export const clearCartItems = item => ({ type: CLEAR_CART, payload: item });

export const updateItemQuantity = total => ({ type: UPDATE_ITEM_QUANTITY, payload: total });

export const addToWishlist = item => ({ type: ADD_TO_WISHLIST, payload: item });

export const removeFromWishlist = item => ({ type: REMOVE_FROM_WISHLIST, payload: item });