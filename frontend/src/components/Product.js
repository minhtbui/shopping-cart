import React from 'react';
import { Link } from 'react-router-dom';

// chakra UI
import {
    Box,
    Image,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const Product = ({ product }) => {
    return (
        <Box
            bg='#e9e8e6'
            p='10px'
            borderRadius='20px'
            boxShadow='2px 2px 10px #e9e8e6'>
            <Link to={`/product/${product._id}`}>
                <Image src={product.image} />
            </Link>
            <Stat p='2'>
                <Link to={`/product/${product._id}`}>
                    <StatLabel fontSize='xl'>{product.name}</StatLabel>
                </Link>
                <StatHelpText
                    fontSize='md'
                    fontWeight='700'
                    color={product.countInStock > 0 ? 'green' : 'red'}>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </StatHelpText>
                <Box d='flex' py='2'>
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={
                                    i < product.rating ? 'teal.500' : 'gray.300'
                                }
                            />
                        ))}

                    <StatHelpText mb='0' ml='5'>
                        {product.numReviews} reviews
                    </StatHelpText>
                </Box>
                <StatNumber>${product.price}</StatNumber>
            </Stat>
        </Box>
    );
};

export default Product;
