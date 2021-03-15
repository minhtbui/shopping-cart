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
    useToast,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import PaymentMethods from '../components/PaymentMethods';
import AddressForm from '../components/AddressForm';
import toastConfig from '../utils/toastConfig';
// Redux
import { useSelector } from 'react-redux';

const Payment = () => {
    const history = useHistory();
    const toast = useToast();
    const { cartItems } = useSelector((state) => state.cart);
    const { paymentAddress, paymentMethod } = useSelector(
        (state) => state.payment,
    );
    const { isOpen, onOpen, onClose } = useDisclosure();

    const checkOutHandler = () => {
        if (paymentAddress && paymentMethod) {
            history.push('/login?redirect=payment-confirmation');
        } else {
            toast(
                toastConfig(
                    'Information is insufficient.',
                    'Please fill information to continue',
                ),
            );
        }
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
                        {paymentAddress && (
                            <Text p='10px 0 10px 20px'>
                                <strong>Address</strong>:{' '}
                                {paymentAddress.street},{' '}
                                {paymentAddress.district}
                                <br />
                                <strong>City</strong>: {paymentAddress.city},{' '}
                                {paymentAddress.country}
                            </Text>
                        )}
                    </Box>
                    <List spacing={5}>
                        <Heading as='h3' fontSize='2xl'>
                            Ordered Items
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
                        <Text>{paymentMethod}</Text>
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
