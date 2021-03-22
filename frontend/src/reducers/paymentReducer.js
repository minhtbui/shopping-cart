import {
    PAYMENT_SAVE_ADDRESS,
    PAYMENT_SAVE_METHOD,
    PAYMENT_SAVE_PRICES,
} from '../constants/paymentConstant';

export const paymentReducer = (state = { paymentAddres: {} }, action) => {
    switch (action.type) {
        case PAYMENT_SAVE_PRICES:
            return {
                ...state,
                paymentPrices: action.payload,
            };
        case PAYMENT_SAVE_ADDRESS:
            return {
                ...state,
                paymentAddress: action.payload.data,
            };
        case PAYMENT_SAVE_METHOD:
            return {
                ...state,
                paymentMethod: action.payload.data,
            };
        default:
            return state;
    }
};
