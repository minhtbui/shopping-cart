import {
    PAYMENT_SAVE_ADDRESS,
    PAYMENT_SAVE_METHOD,
} from '../constants/paymentConstant';

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
