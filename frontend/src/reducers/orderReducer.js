import {
    ORDER_CREATE_LOADING,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAIL_LOADING,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_PAYMENT_LOADING,
    ORDER_PAYMENT_SUCCESS,
    ORDER_PAYMENT_FAIL,
    ORDER_LIST_LOADING,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
} from '../constants/orderConstant';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_RESET:
            return {};
        case ORDER_CREATE_LOADING:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                createdOrder: action.payload,
            };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderDetailReducer = (
    state = { orderItem: [], shippingAddress: {} },
    action,
) => {
    switch (action.type) {
        case ORDER_DETAIL_LOADING:
            return { ...state, loading: true };
        case ORDER_DETAIL_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_LOADING:
            return { loading: true, ...state };
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAYMENT_LOADING:
            return { loading: true };
        case ORDER_PAYMENT_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAYMENT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
