import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const addedItem = action.payload;
            const existedItem = state.cartItems.find(
                (item) => item._id === addedItem._id,
            );

            if (existedItem) {
                existedItem.qty += addedItem.qty;
                return {
                    ...state,
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, addedItem],
                };
            }
        case CART_UPDATE_ITEM:
            const cartItem = action.payload;
            const updatedItem = state.cartItems.find(
                (item) => item._id === cartItem._id,
            );
            if (updatedItem) {
                updatedItem.qty = cartItem.qty;
            }
            return {
                ...state,
            };
        default:
            return state;
    }
};
