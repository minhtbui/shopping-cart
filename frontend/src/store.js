import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productDetailReducer,
    productListReducer,
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userReducer } from './reducers/userReducer';
import { paymentReducer } from './reducers/paymentReducer';

const reducers = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    user: userReducer,
    payment: paymentReducer,
});

// get local storage
const cartItem = localStorage.getItem('cartItems');
const userInfo = localStorage.getItem('userInfo');
const paymentAddress = localStorage.getItem('paymentAddress');

// set initial state
const cartItemsFromStorage = cartItem ? JSON.parse(cartItem) : [];
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null;
const paymentAddressFromStorage = paymentAddress
    ? JSON.parse(paymentAddress)
    : null;

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    user: { userInfo: userInfoFromStorage },
    payment: { paymentAddress: paymentAddressFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
