import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CartItem from '../components/CartItem';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Grid,
    Heading,
    List,
    Text,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentPrices } from '../actions/paymentAction';

const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cartItems } = useSelector((state) => state.cart);

    const checkOutHandler = () => {
        history.push('/login?redirect=payment');
    };

    useEffect(() => {
        const itemPrices =
            parseInt(
                cartItems
                    ?.reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2),
            ) || 0;
        const taxPrice =
            parseInt(
                cartItems
                    ?.reduce(
                        (acc, item) => acc + item.qty * (item.price * 0.1),
                        0,
                    )
                    .toFixed(2),
            ) || 0;
        const shippingFee = itemPrices >= 500 ? 'Free' : 50;

        const totalPrices =
            shippingFee === 'Free'
                ? itemPrices + taxPrice
                : itemPrices + taxPrice + shippingFee;

        dispatch(
            savePaymentPrices(itemPrices, shippingFee, taxPrice, totalPrices),
        );
    }, [checkOutHandler]);

    return (
        <>
            <Grid templateColumns='1fr' gap={10}>
                <List spacing={5}>
                    <Heading>Shopping Cart</Heading>

                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))
                    ) : (
                        <Alert status='info' fontWeight='700'>
                            <AlertIcon />
                            The cart is empty! Let's go shopping!!!
                        </Alert>
                    )}
                </List>
                <Button
                    leftIcon={<FaShoppingCart />}
                    justifySelf='flex-end'
                    colorScheme='green'
                    variant='solid'
                    mt={3}
                    isDisabled={cartItems.length === 0}
                    onClick={checkOutHandler}>
                    Checkout
                </Button>
            </Grid>
        </>
    );
};

export default Cart;
