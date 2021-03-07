import React, { useEffect } from 'react';
import Product from '../components/Product';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';

// chakra UI
import { Alert, AlertIcon, Heading, SimpleGrid } from '@chakra-ui/react';
import Loader from '../components/Loader';

const Home = () => {
    const dispatch = useDispatch();
    const { error, loading, products } = useSelector(
        (state) => state.productList,
    );

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <Heading as='h2'>New Products</Heading>
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert status='error'>
                    <AlertIcon />
                    {error}
                </Alert>
            ) : (
                <SimpleGrid minChildWidth='200px' gap='8' py='10'>
                    {products?.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </SimpleGrid>
            )}
        </>
    );
};

export default Home;
