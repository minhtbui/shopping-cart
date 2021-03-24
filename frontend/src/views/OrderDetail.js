import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';
import React, { useEffect } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from '../actions/orderAction';
import Loader from '../components/Loader';

const OrderDetail = ({ match }) => {
    const dispatch = useDispatch();
    const { loading, order, error } = useSelector((state) => state.orderDetail);

    useEffect(() => {
        dispatch(getOrderDetail(match.params.id));
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert status='error'>
                    <AlertIcon />
                    {error}
                </Alert>
            ) : (
                order && (
                    <Flex flexWrap='wrap'>
                        <Heading w='100%' mb='50px'>
                            Order #{order._id}
                        </Heading>
                        <Box flex='0.3'>
                            <Heading as='h3'>Shipping Address</Heading>

                            <Table variant='unstyled'>
                                <Tbody>
                                    <Tr>
                                        <Th>Street</Th>
                                        <Td>{order.shippingAddress.street}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>District</Th>
                                        <Td>
                                            {order.shippingAddress.district}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Th>City</Th>
                                        <Td>{order.shippingAddress.city}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>Country</Th>
                                        <Td>{order.shippingAddress.country}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Box>
                        <Spacer flex='.1' />
                        <Box flex='.7'>
                            <Heading as='h3'>Order Items</Heading>

                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Product Name</Th>
                                        <Th isNumeric>Qty</Th>
                                        <Th isNumeric>Price</Th>
                                        <Th isNumeric>Subtotal</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {order.orderItems.map((item) => (
                                        <Tr>
                                            <Td>
                                                <Image
                                                    d='inline-block'
                                                    borderRadius='20px'
                                                    boxSize='50px'
                                                    mr='15px'
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                                {item.name}
                                            </Td>
                                            <Td isNumeric>{item.qty}</Td>
                                            <Td isNumeric>${item.price}</Td>
                                            <Td isNumeric>
                                                ${item.qty * item.price}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th colSpan='2' isNumeric>
                                            Sum
                                        </Th>
                                        <Td colSpan='2' isNumeric>
                                            $
                                            {order.orderItems.reduce(
                                                (acc, { price, qty }) =>
                                                    (acc += price * qty),
                                                0,
                                            )}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Th colSpan='2' isNumeric>
                                            Shipping Fee
                                        </Th>
                                        <Td colSpan='2' isNumeric>
                                            ${order.shippingPrice}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Th colSpan='2' isNumeric>
                                            Tax (10%)
                                        </Th>
                                        <Td colSpan='2' isNumeric>
                                            ${order.taxPrice}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Th colSpan='2' isNumeric>
                                            Payment Method
                                        </Th>
                                        <Td colSpan='2' isNumeric>
                                            {order.paymentMethod}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Th colSpan='2' isNumeric>
                                            Subtotal
                                        </Th>
                                        <Td colSpan='2' isNumeric>
                                            ${order.totalPrice}
                                        </Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </Box>
                    </Flex>
                )
            )}
        </>
    );
};

export default OrderDetail;
