import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addItem = (product, qty) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            qty,
        },
    });

    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems),
    );
};
