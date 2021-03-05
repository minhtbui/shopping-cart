import React, { useState } from 'react';
import {
    Button,
    Grid,
    HStack,
    IconButton,
    Image,
    NumberInput,
    NumberInputField,
    Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

// redux
import { useDispatch } from 'react-redux';
import { removeItem, updateItem } from '../actions/cartAction';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(item.qty);

    const onClickChangeQtyHandler = (type) => {
        if (type === 'inc') {
            dispatch(updateItem(item._id, item.qty + 1));
            setQty(item.qty + 1);
        } else {
            dispatch(updateItem(item._id, item.qty - 1));
            setQty(item.qty - 1);
        }
    };

    const onChangeQtyHandler = (e) => {
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

    const removeItemHandler = (e) => {
        dispatch(removeItem(item._id));
    };
    return (
        <Grid
            templateColumns='fit-content(50%) 45% 10% 140px fit-content(100%)'
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
            <Text fontSize='lg' fontWeight='700'>
                ${item.price}
            </Text>
            <HStack maxW='200px'>
                <Button
                    variant='none'
                    colorScheme='teal'
                    fontSize='30px'
                    onClick={() => onClickChangeQtyHandler('dec')}
                    isDisabled={qty <= 1 && true}>
                    -
                </Button>
                <NumberInput min={1} max={item.countInStock} value={qty}>
                    <NumberInputField
                        p='0'
                        textAlign='center'
                        onChange={onChangeQtyHandler}
                    />
                </NumberInput>
                <Button
                    variant='none'
                    colorScheme='teal'
                    fontSize='30px'
                    onClick={() => onClickChangeQtyHandler('inc')}
                    isDisabled={qty >= item.countInStock && true}>
                    +
                </Button>
            </HStack>
            <IconButton
                icon={<DeleteIcon />}
                isRound
                onClick={removeItemHandler}
            />
        </Grid>
    );
};

export default CartItem;
