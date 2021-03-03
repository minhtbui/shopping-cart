import React, { useEffect } from 'react';

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
    Image,
    Spacer,
    Spinner,
    Text,
} from '@chakra-ui/react';
import { MdAddShoppingCart } from 'react-icons/md';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../actions/productAction';

const ProductDetail = ({ match }) => {
    const dispatch = useDispatch();
    const { error, loading, product } = useSelector(
        (state) => state.productDetail,
    );
    useEffect(() => {
        dispatch(detailProduct(match.params.id));
    }, [dispatch, match]);

    return (
        <>
            {loading ? (
                <Spinner
                    thickness='4px'
                    speed='0.5s'
                    emptyColor='gray.200'
                    color='black'
                    size='xl'
                    d='block'
                    mt='20%'
                    mx='auto'
                />
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

                            <Flex alignItems='center' h='fit-content'>
                                <Text as='strong' fontSize='3xl'>
                                    {product.price} $
                                </Text>
                                <Spacer flex='.6' />
                                <Button w='30%' bgColor='teal.300'>
                                    <MdAddShoppingCart
                                        size='25'
                                        color='black'
                                    />
                                </Button>
                            </Flex>
                        </Box>
                    </Grid>
                )
            )}
        </>
    );
};

export default ProductDetail;
