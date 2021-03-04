import React, { useState } from 'react';
import {
    Button,
    Grid,
    HStack,
    Image,
    NumberInput,
    NumberInputField,
    Text,
} from '@chakra-ui/react';

// redux
import { useDispatch } from 'react-redux';
import { updateItem } from '../actions/cartAction';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(item.qty);

    const onClickChangeHandler = (type) => {
        if (type === 'inc') {
            dispatch(updateItem(item._id, item.qty + 1));
            setQty(item.qty + 1);
        } else {
            dispatch(updateItem(item._id, item.qty - 1));
            setQty(item.qty - 1);
        }
    };
    const onChangeHandler = (e) => {
        const input = parseInt(e.target.value);
        if (1 <= input && input <= item.countInStock) {
            console.log('run');
            dispatch(updateItem(item._id, input));
            setQty(input);
        } else {
            dispatch(updateItem(item._id, 1));
            setQty(1);
        }
    };
    return (
        <Grid
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
                    fontSize='30px'
                    onClick={() => onClickChangeHandler('dec')}
                    isDisabled={qty <= 1 && true}>
                    -
                </Button>
                <NumberInput min={1} max={item.countInStock} value={qty}>
                    <NumberInputField
                        p='0'
                        textAlign='center'
                        onChange={onChangeHandler}
                    />
                </NumberInput>
                <Button
                    variant='outline'
                    colorScheme='teal'
                    fontSize='30px'
                    onClick={() => onClickChangeHandler('inc')}
                    isDisabled={qty >= item.countInStock && true}>
                    +
                </Button>
            </HStack>
            <Text fontSize='lg' fontWeight='700'>
                ${item.price}
            </Text>
        </Grid>
    );
};

export default CartItem;
