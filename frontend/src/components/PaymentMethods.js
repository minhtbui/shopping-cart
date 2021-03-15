import { Stack } from '@chakra-ui/layout';
import {} from '@chakra-ui/modal';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import React, { useEffect } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/paymentAction';

const PaymentMethods = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        paymentMethodsHandler();
    }, []);

    const paymentMethodsHandler = (e) => {
        return e?.target.value
            ? dispatch(savePaymentMethod(e.target.value))
            : dispatch(savePaymentMethod('Credit Card'));
    };

    return (
        <RadioGroup>
            <Stack
                direction='row'
                spacing='20px'
                onChange={paymentMethodsHandler}>
                <Radio value='Credit Card' defaultChecked>
                    Credit Card
                </Radio>
                <Radio value='Paypal'>Paypal</Radio>
                <Radio value='Apple pay'>Apple pay</Radio>
            </Stack>
        </RadioGroup>
    );
};

export default PaymentMethods;
