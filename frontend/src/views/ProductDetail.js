import React, { useEffect } from 'react';
import Loader from '../components/Loader';

// chakra UI
import { StarIcon } from '@chakra-ui/icons';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    HStack,
    Image,
    Input,
    Spacer,
    Text,
    useNumberInput,
} from '@chakra-ui/react';
import { MdAddShoppingCart } from 'react-icons/md';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../actions/productAction';
import { addItem } from '../actions/cartAction';

const ProductDetail = ({ match }) => {
    const dispatch = useDispatch();
    const { error, loading, product } = useSelector(
        (state) => state.productDetail,
    );

    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
    } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: product.countInStock,
    });
    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const qty = getInputProps();

    useEffect(() => {
        dispatch(detailProduct(match.params.id));
    }, [dispatch, match]);

    const addCartHandler = (e) => {
        dispatch(addItem(product, parseInt(qty.value)));
    };
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
                product && (
                    <Grid templateColumns='repeat(2, 1fr)'>
                        <Image src={product.image} alt={product.name} />
                        <Box d='grid' p='4'>
                            <Heading as='h3'>{product.name}</Heading>
                            <Text as='p' fontSize='xl'>
                                {product.description}
                            </Text>
                            <Flex alignItems='center' h='fit-content'>
                                <Box>
                                    {Array(5)
                                        .fill('')
                                        .map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                fontSize='3xl'
                                                color={
                                                    i < product.rating
                                                        ? 'teal.500'
                                                        : 'gray.300'
                                                }
                                            />
                                        ))}
                                </Box>
                                <Spacer flex='.5' />
                                <Text as='strong' fontSize='3xl'>
                                    {product.price} $
                                </Text>
                            </Flex>

                            {!product.countInStock ? (
                                <Text
                                    fontSize='md'
                                    fontWeight='700'
                                    color='red.500'>
                                    Out Of Stock
                                </Text>
                            ) : (
                                <Flex alignItems='baseline' h='fit-content'>
                                    <Box>
                                        <HStack maxW='200px'>
                                            <Button
                                                variant='outline'
                                                colorScheme='teal'
                                                fontSize='30px'
                                                {...dec}>
                                                -
                                            </Button>
                                            <Input
                                                textAlign='center'
                                                p='0'
                                                {...qty}
                                            />
                                            <Button
                                                variant='outline'
                                                colorScheme='teal'
                                                fontSize='30px'
                                                {...inc}>
                                                +
                                            </Button>
                                        </HStack>
                                        <Text
                                            textAlign='center'
                                            fontSize='sm'
                                            color='gray.500'
                                            mt='2'>
                                            In Stock: {product.countInStock}
                                        </Text>
                                    </Box>

                                    <Spacer flex='.5' />
                                    <Button
                                        w='30%'
                                        bgColor='teal.300'
                                        onClick={addCartHandler}>
                                        <MdAddShoppingCart
                                            size='25'
                                            color='black'
                                        />
                                    </Button>
                                </Flex>
                            )}
                        </Box>
                    </Grid>
                )
            )}
        </>
    );
};

export default ProductDetail;
