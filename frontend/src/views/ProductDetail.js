import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { StarIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Image,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { MdAddShoppingCart } from 'react-icons/md';

const ProductDetail = ({ match }) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(
                `/api/products/${match.params.id}`,
            );
            setProduct(data);
        };
        fetchProduct();
    }, []);

    return (
        <>
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
                            <MdAddShoppingCart size='25' color='black' />
                        </Button>
                    </Flex>
                </Box>
            </Grid>
        </>
    );
};

export default ProductDetail;
