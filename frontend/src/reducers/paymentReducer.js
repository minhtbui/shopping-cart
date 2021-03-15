import {
    PAYMENT_SAVE_ADDRESS,
    PAYMENT_SAVE_METHOD,
} from '../constants/paymentConstant';

export const paymentReducer = (state = { paymentAddres: {} }, action) => {
    switch (action.type) {
        case PAYMENT_SAVE_ADDRESS:
            return {
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
