import {
    PAYMENT_SAVE_ADDRESS,
    PAYMENT_SAVE_METHOD,
    PAYMENT_SAVE_PRICES,
} from '../constants/paymentConstant';

export const savePaymentPrices = (
    itemPrices,
    shippingFee,
    taxPrice,
    totalPrices,
) => (dispatch, getState) => {
    dispatch({
        type: PAYMENT_SAVE_PRICES,
        payload: {
            itemPrices,
            shippingFee,
            taxPrice,
            totalPrices,
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
