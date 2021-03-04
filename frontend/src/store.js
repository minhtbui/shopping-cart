import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productDetailReducer,
    productListReducer,
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';

const reducers = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
});

const cartItemLocal = localStorage.getItem('cartItems');

const cartItemsFromStorage = cartItemLocal ? JSON.parse(cartItemLocal) : [];

const initialState = { cart: { cartItems: cartItemsFromStorage } };

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
