import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existedItem = state.cartItems.find(
                (cartItem) => cartItem._id === item._id,
            );

            if (existedItem) {
                existedItem.qty += item.qty;
                return {
                    ...state,
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case CART_UPDATE_ITEM:
            const updateItem = state.cartItems.find(
                (cartItem) => cartItem._id === item._id,
            );
            return {};
        default:
            return state;
    }
};
