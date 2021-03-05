import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_ITEM,
} from '../constants/cartConstants';

export const addItem = (product, qty) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty,
        },
    });

    saveLocalStorage(getState);
};

export const updateItem = (id, qty) => (dispatch, getState) => {
    dispatch({
        type: CART_UPDATE_ITEM,
        payload: {
            _id: id,
            qty,
        },
    });

    saveLocalStorage(getState);
};

export const removeItem = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            _id: id,
        },
    });

    saveLocalStorage(getState);
};

const saveLocalStorage = (getState) => {
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems),
    );
};
