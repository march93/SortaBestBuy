import { SEARCH_ITEMS, CHANGE_PAGE, BLOCK_NEXT } from "../constants/Constants";

const initialState = {
    searchItemsList: [],
    startPage: 1,
    isNextBlocked: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ITEMS:
            return { ...state, searchItemsList: action.payload };
        case CHANGE_PAGE:
            return { ...state, startPage: action.payload }
        case BLOCK_NEXT:
            return { ...state, isNextBlocked: action.payload }
        // case ADD_TO_CART:
        //     return { ...state, cartItems: [...state.cartItems, action.payload] };
        default:
            return state;
    }
};

export default rootReducer;