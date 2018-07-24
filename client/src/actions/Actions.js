import { SEARCH_ITEMS, CHANGE_PAGE, BLOCK_NEXT } from "../constants/Constants";

export const searchItems = searchedItems => ({ type: SEARCH_ITEMS, payload: searchedItems });

export const changePage = page => ({ type: CHANGE_PAGE, payload: page });

export const blockNext = block => ({ type: BLOCK_NEXT, payload: block });