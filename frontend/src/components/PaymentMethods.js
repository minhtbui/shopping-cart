import { Stack } from '@chakra-ui/layout';
import {} from '@chakra-ui/modal';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import React from 'react';
import { useForm } from 'react-hook-form';
// redux
import { useDispatch } from 'react-redux';

const PaymentMethods = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    return (
        <RadioGroup>
            <Stack direction='row' spacing='20px'>
                <Radio value='credit-card' defaultChecked>
                    Credit card
                </Radio>
                <Radio value='paypal'>Paypal</Radio>
                <Radio value='apple-pay'>Apple pay</Radio>
            </Stack>
        </RadioGroup>
    );
};

export default PaymentMethods;
