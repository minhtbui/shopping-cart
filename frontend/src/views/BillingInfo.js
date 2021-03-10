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
    VStack,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

// Redux
import { useSelector } from 'react-redux';

const BillingInfo = () => {
    const history = useHistory();
    const { cartItems } = useSelector((state) => state.cart);

    const checkOutHandler = () => {
        history.push('/login?redirect=payment');
    };
    return (
        <>
            <Grid templateColumns='.7fr .3fr' gap={10}>
                <Box>
                    <Heading textAlign='center' pb='10px'>
                        Billing Information
                    </Heading>
                    <Box>
                        <Heading d='inline-block' as='h3' fontSize='2xl'>
                            Billing Address
                        </Heading>
                        <Button
                            d='inline-block'
                            size='sm'
                            ml='5%'
                            bg='teal.100'
                            _hover={{ bg: 'teal.300' }}>
                            Select
                        </Button>
                        <Text p='10px 0 10px 20px'>
                            <strong>Address</strong>: 111 Mai Chi Tho, p.An Phu,
                            Q.2 <br />
                            <strong>City</strong>: Ho Chi Minh city
                        </Text>
                    </Box>
                    <List spacing={5}>
                        <Heading as='h3' fontSize='2xl'>
                            Ordered List
                        </Heading>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    orderedItem
                                />
                            ))
                        ) : (
                            <Alert status='info' fontWeight='700'>
                                <AlertIcon />
                                The cart is empty! Let's go shopping!!!
                            </Alert>
                        )}
                    </List>
                </Box>
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
                        Process to payment
                    </Button>
                </Box>
            </Grid>
        </>
    );
};

export default BillingInfo;
