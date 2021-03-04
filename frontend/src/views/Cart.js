import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Heading,
    HStack,
    Image,
    Input,
    List,
    Text,
} from '@chakra-ui/react';

// Redux
import { useSelector } from 'react-redux';

const Cart = () => {
    const [qty, setQty] = useState(null);
    const { cartItems } = useSelector((state) => state.cart);

    const incItemHandler = (e) => {};
    const qtyChangeHandler = (e) => {
        setQty(e.target.value);
    };
    return (
        <>
            <Grid templateColumns='.7fr .3fr'>
                <List spacing={5}>
                    <Heading>Shopping Cart</Heading>

                    {cartItems.map((item) => (
                        <Grid
                            key={item._id}
                            templateColumns='fit-content(50%) 40% 20% 10%'
                            gap={10}
                            alignItems='center'>
                            <Image
                                boxSize='100px'
                                objectFit='cover'
                                borderRadius='20px'
                                src={item.image}
                                alt={item.name}
                            />
                            <Text as='h4' fontSize='xl' fontWeight='500'>
                                {item.name}
                            </Text>
                            <HStack maxW='200px'>
                                <Button
                                    variant='outline'
                                    colorScheme='teal'
                                    fontSize='30px'>
                                    -
                                </Button>
                                <Input
                                    textAlign='center'
                                    p='0'
                                    defaultValue={item.qty}
                                    value={qty}
                                    onCHange={qtyChangeHandler}
                                />
                                <Button
                                    variant='outline'
                                    colorScheme='teal'
                                    fontSize='30px'
                                    onClick={incItemHandler}>
                                    +
                                </Button>
                            </HStack>
                            <Text fontSize='lg' fontWeight='700'>
                                ${item.price}
                            </Text>
                        </Grid>
                    ))}
                </List>
                <Box bgColor='gray.100' boxShadow='lg' p='6' rounded='md'>
                    <Heading as='h3' fontSize='2xl' textAlign='center'>
                        Subtotal (
                        {cartItems.reduce((acc, item) => acc + item.qty, 0) ||
                            0}
                        ) Items
                    </Heading>
                    <Text>
                        Total: $
                        {cartItems.reduce(
                            (acc, item) => acc + item.qty * item.price,
                            0,
                        ) || 0}
                    </Text>
                </Box>
            </Grid>
        </>
    );
};

export default Cart;
