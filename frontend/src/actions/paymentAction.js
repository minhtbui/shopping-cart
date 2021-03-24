import {
    PAYMENT_SAVE_ADDRESS,
    PAYMENT_SAVE_METHOD,
    PAYMENT_SAVE_PRICES,
} from '../constants/paymentConstant';

export const savePaymentPrices = (
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
) => (dispatch, getState) => {
    dispatch({
        type: PAYMENT_SAVE_PRICES,
        payload: {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        },
    });

    localStorage.setItem(
        'paymentPrices',
        JSON.stringify(getState().payment.paymentPrices),
    );
};

export const savePaymentAddress = (data) => (dispatch, getState) => {
    dispatch({
        type: PAYMENT_SAVE_ADDRESS,
        payload: {
            data,
        },
    });

    localStorage.setItem(
        'paymentAddress',
        JSON.stringify(getState().payment.paymentAddress),
    );
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: PAYMENT_SAVE_METHOD,
        payload: {
            data,
        },
    });
};
