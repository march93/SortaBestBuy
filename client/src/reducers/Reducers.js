import { SEARCH_ITEMS } from "../constants/Constants";

const initialState = {
    searchItemsList: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ITEMS:
            return { ...state, searchItemsList: action.payload };
        // case ADD_TO_CART:
        //     return { ...state, cartItems: [...state.cartItems, action.payload] };
        default:
            return state;
    }
};

export default rootReducer;