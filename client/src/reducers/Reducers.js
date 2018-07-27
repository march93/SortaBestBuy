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
    REMOVE_FROM_WISHLIST
} from "../constants/Constants";

const initialState = {
    searchedValue: '',
    searchItemsList: [],
    startPage: 1,
    isNextBlocked: false,
    cartItems: [],
    wishlist: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_VALUE:
            return { ...state, searchedValue: action.payload };
        case SEARCH_ITEMS:
            return { ...state, searchItemsList: action.payload };
        case CHANGE_PAGE:
            return { ...state, startPage: action.payload };
        case BLOCK_NEXT:
            return { ...state, isNextBlocked: action.payload };
        case ADD_TO_CART:
            return { ...state, cartItems: [...state.cartItems, action.payload] };
        case REMOVE_FROM_CART:
            // Return shallow copy of current array without the matching item ID 
            return { ...state, cartItems: [...state.cartItems.filter((elem, idx) => {
                return elem.id !== action.payload;
            })]};
        case CLEAR_CART:
            return { ...state, cartItems: action.payload };
        case UPDATE_ITEM_QUANTITY:
            // Get the index of the item we want to update
            const index = state.cartItems.findIndex(item => item.id === action.payload.id);

            return { ...state, cartItems: [
                ...state.cartItems.slice(0, index), // Everything before current item
                {
                    ...state.cartItems[index],
                    quantity: action.payload.total
                },
                ...state.cartItems.slice(index + 1) // Everything after current item
            ]};
        case ADD_TO_WISHLIST:
            return { ...state, wishlist: [...state.wishlist, action.payload] };
        case REMOVE_FROM_WISHLIST:
            // Return shallow copy of current array without the matching item ID 
            return { ...state, wishlist: [...state.wishlist.filter((elem, idx) => {
                return elem.id !== action.payload;
            })]};
        default:
            return state;
    }
};

export default rootReducer;