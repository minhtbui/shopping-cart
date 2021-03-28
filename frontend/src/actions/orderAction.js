import axios from 'axios';
import {
    ORDER_CREATE_LOADING,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_LIST_LOADING,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DETAIL_LOADING,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_PAYMENT_LOADING,
    ORDER_PAYMENT_SUCCESS,
    ORDER_PAYMENT_FAIL,
} from '../constants/orderConstant';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_LOADING });

        const {
            user: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/orders', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const resetCreatedOrder = () => (dispatch) => {
    dispatch({ type: ORDER_CREATE_RESET });
};

export const getOrderList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_LOADING });

        const {
            user: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/orders', config);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getOrderDetail = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAIL_LOADING });

        const {
            user: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${orderId}`, config);

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateOrderPayment = (orderId, paymentResult) => async (
    dispatch,
    getState,
) => {
    try {
        dispatch({ type: ORDER_PAYMENT_LOADING });

        const {
            user: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.put(`/api/orders/${orderId}`, paymentResult, config);

        dispatch({
            type: ORDER_PAYMENT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAYMENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
