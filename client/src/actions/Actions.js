import { SEARCH_ITEMS } from "../constants/Constants";

export const searchItems = searchedItems => ({ type: SEARCH_ITEMS, payload: searchedItems });