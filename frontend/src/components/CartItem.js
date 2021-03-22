import React, { useEffect, useState } from 'react';
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
import { TiEquals, TiTimes } from 'react-icons/ti';

// redux
import { removeItem, updateItem } from '../actions/cartAction';
import { useDispatch } from 'react-redux';

const CartItem = ({ item, orderedItem }) => {
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
            templateColumns='80px 45% 10% fit-content(100%) 10%'
            gap={10}
            alignItems='center'>
            <Image
                boxSize='80px'
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
            {!orderedItem ? (
                <>
                    <HStack maxW='200px'>
                        <Button
                            variant='none'
                            colorScheme='teal'
                            fontSize='30px'
                            onClick={() => onClickChangeQtyHandler('dec')}
                            isDisabled={qty <= 1}>
                            -
                        </Button>

                        <NumberInput
                            min={1}
                            max={item.countInStock}
                            value={qty}>
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
                            isDisabled={qty >= item.countInStock}>
                            +
                        </Button>
                    </HStack>
                    <IconButton
                        w='30px'
                        icon={<DeleteIcon />}
                        variant='none'
                        onClick={removeItemHandler}
                    />
                </>
            ) : (
                <>
                    <HStack maxW='200px'>
                        <TiTimes size='25px' />
                        <NumberInput
                            min={1}
                            max={item.countInStock}
                            value={qty}
                            isReadOnly>
                            <NumberInputField
                                border='none'
                                p='0'
                                textAlign='center'
                            />
                        </NumberInput>
                        <TiEquals size='25px' />
                    </HStack>
                    <Text as='strong' fontSize='20px'>
                        ${(item.price * item.qty).toFixed(2)}
                    </Text>
                </>
            )}
        </Grid>
    );
};

export default CartItem;
