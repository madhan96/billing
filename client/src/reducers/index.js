import { combineReducers } from 'redux';
import { selectedProducts } from './selectedproducts';
import { productreports, billreports } from './reports';
import { users } from './users';
const initialState = {
    productList: [],

}

const products = (state = initialState, action) => {
    switch (action.type) {

        case 'addProductList':
            return { ...state, productList: action.data };

        default:
            return state;
    }
}

export default combineReducers({ products, selectedProducts, billreports, productreports, users });