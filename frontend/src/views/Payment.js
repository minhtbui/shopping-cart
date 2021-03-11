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
    useDisclosure,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

// Redux
import { useSelector } from 'react-redux';
import AddressForm from '../components/AddressForm';
import PaymentMethods from '../components/PaymentMethods';

const Payment = () => {
    const history = useHistory();
    const { cartItems } = useSelector((state) => state.cart);
    const { paymentAddress } = useSelector((state) => state.payment);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const checkOutHandler = () => {
        history.push('/login?redirect=payment-confirmation');
    };
    return (
        <>
            <Grid templateColumns='.7fr .3fr' gap={10}>
                <Box>
                    <Heading textAlign='center' pb='10px'>
                        Payment
                    </Heading>
                    <Box>
                        <Heading
                            d='inline-block'
                            as='h3'
                            fontSize='2xl'
                            verticalAlign='middle'>
                            Shipping Address
                        </Heading>
                        <Button
                            d='inline-block'
                            size='sm'
                            ml='5%'
                            bg='teal.100'
                            _hover={{ bg: 'teal.300' }}
                            onClick={onOpen}>
                            Select
                        </Button>
                        <AddressForm isOpen={isOpen} onClose={onClose} />
                        {paymentAddress ? (
                            <Text p='10px 0 10px 20px'>
                                <strong>Address</strong>:{' '}
                                {paymentAddress.street},{' '}
                                {paymentAddress.district}
                                <br />
                                <strong>City</strong>: {paymentAddress.city},{' '}
                                {paymentAddress.country}
                            </Text>
                        ) : (
                            <Alert status='warning' my='15px'>
                                <AlertIcon />
                                Please add your shipping address.
                            </Alert>
                        )}
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
                    <Box my='15px'>
                        <Heading
                            d='inline-block'
                            as='h3'
                            fontSize='2xl'
                            mb='15px'
                            verticalAlign='middle'>
                            Payment Methods
                        </Heading>
                        <PaymentMethods />
                    </Box>
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

export default Payment;
