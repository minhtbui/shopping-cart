import {
    ORDER_CREATE_LOADING,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_INIT,
    ORDER_LIST_LOADING,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DETAIL_LOADING,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
} from '../constants/orderConstant';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_INIT:
            return {
                success: false,
                createdOrder: {},
            };
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
            return { loading: true, ...state };
        case ORDER_DETAIL_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
