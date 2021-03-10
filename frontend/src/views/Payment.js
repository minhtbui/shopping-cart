import React from 'react';
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
import { useSelector } from 'react-redux';

const Payment = () => {
    const history = useHistory();
    const { cartItems } = useSelector((state) => state.cart);

    const checkOutHandler = () => {
        history.push('/login?redirect=payment');
    };
    return (
        <>
            <Grid templateColumns='.7fr .3fr' gap={10}>
                <List spacing={5}>
                    <Heading>Payment</Heading>

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
                <Box
                    d='flex'
                    flexDir='column'
                    alignItems='center'
                    bgColor='gray.100'
                    boxShadow='lg'
                    p='6'
                    rounded='md'>
                    <Heading as='h3' fontSize='2xl'>
                        Subtotal (
                        {cartItems?.reduce((acc, item) => acc + item.qty, 0) ||
                            0}
                        ) Items
                    </Heading>
                    <Text fontSize='3xl' mt='auto'>
                        Total: $
                        {cartItems
                            ?.reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0,
                            )
                            .toFixed(2) || 0}
                    </Text>
                    <Button
                        leftIcon={<FaShoppingCart />}
                        colorScheme='green'
                        variant='solid'
                        mt={3}
                        onClick={checkOutHandler}>
                        Checkout
                    </Button>
                </Box>
            </Grid>
        </>
    );
};

export default Payment;
