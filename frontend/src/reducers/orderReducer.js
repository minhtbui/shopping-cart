import {
    ORDER_CREATE_LOADING,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_INIT,
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
