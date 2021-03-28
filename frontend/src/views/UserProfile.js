import {
    Alert,
    AlertIcon,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Input,
    InputRightElement,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import toastConfig from '../utils/toastConfig';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../actions/userAction';
import { getOrderList } from '../actions/orderAction';

const UserProfile = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const [validate, setValidate] = useState({
        error: false,
        message: '',
    });

    const { loading, error, userInfo } = useSelector((state) => state.user);
    const { error: ordersError, orders } = useSelector(
        (state) => state.orderList,
    );

    useEffect(() => {
        if (userInfo) {
            dispatch(getOrderList());
        }
    }, [dispatch, userInfo]);

    const formOnSubmitHandler = ({ name, email, password, cfPassword }) => {
        if (password !== cfPassword) {
            setValidate({ error: true, message: 'Passwords do not match!!!' });
        } else {
            dispatch(updateUserProfile(name, email, password));
            setValidate({
                error: false,
                message: '',
            });
            toast(
                toastConfig(
                    'Update Successful.',
                    'Your profile has been updated.',
                ),
            );
        }
    };
    return userInfo ? (
        <Grid
            templateColumns='.3fr fit-content(100%)  .7fr'
            gap={5}
            justifyContent='space-around'>
            <VStack
                as='form'
                p='10px'
                spacing={6}
                onSubmit={handleSubmit(formOnSubmitHandler)}>
                <Text as='h2' fontWeight='500' fontSize='5xl'>
                    User Profile
                </Text>
                {error && (
                    <Alert status='error'>
                        <AlertIcon />
                        {error}{' '}
                    </Alert>
                )}
                <FormControl id='Name' isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        name='name'
                        variant='flushed'
                        pr={2}
                        pl={2}
                        ref={register}
                        defaultValue={userInfo.name}
                    />
                </FormControl>
                <FormControl id='email' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name='email'
                        variant='flushed'
                        pr={2}
                        pl={2}
                        ref={register}
                        defaultValue={userInfo.email}
                    />
                </FormControl>
                <FormControl id='password' isInvalid={validate.error}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name='password'
                        variant='flushed'
                        type={show ? 'text' : 'password'}
                        pr='4.5rem'
                        pl={2}
                        ref={register}
                    />
                    <InputRightElement width='4.5rem' bottom={2} top='unset'>
                        <Button
                            h='1.75rem'
                            variant='none'
                            size='sm'
                            onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </FormControl>
                <FormControl id='cfPassword' isInvalid={validate.error}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        name='cfPassword'
                        variant='flushed'
                        type={show ? 'text' : 'password'}
                        pr='4.5rem'
                        pl={2}
                        ref={register}
                    />
                    <FormErrorMessage>{validate.message}</FormErrorMessage>
                </FormControl>
                <Button
                    type='submit'
                    w='50%'
                    borderColor='gray.500'
                    variant='outline'
                    isLoading={loading && 'true'}>
                    Update
                </Button>
            </VStack>

            <Divider orientation='vertical' w='1px' />

            <VStack spacing={6}>
                <Text as='h2' fontWeight='500' fontSize='5xl'>
                    Orders
                </Text>

                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>No. Order</Th>
                            <Th>Date</Th>
                            <Th>Paid</Th>
                            <Th>Delivered</Th>
                            <Th isNumeric>Total Price</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {error ? (
                            <Alert status='error'>
                                <AlertIcon />
                                {error}
                            </Alert>
                        ) : (
                            orders?.map((order) => (
                                <Tr>
                                    <Td>#{order._id}</Td>
                                    <Td>{order.updatedAt}</Td>
                                    <Td>
                                        {order.isPaid ? (
                                            <CheckIcon color='green' />
                                        ) : (
                                            <CloseIcon color='red.300' />
                                        )}
                                    </Td>
                                    <Td>
                                        {order.isDeliveried ? (
                                            <CheckIcon color='green' />
                                        ) : (
                                            <CloseIcon color='red.300' />
                                        )}
                                    </Td>
                                    <Td isNumeric>${order.totalPrice}</Td>
                                    <Td>
                                        <Button
                                            as={Link}
                                            to={`/orders/${order._id}`}
                                            size='sm'>
                                            Detail
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </VStack>
        </Grid>
    ) : (
        <Redirect to='/login' />
    );
};

export default UserProfile;
