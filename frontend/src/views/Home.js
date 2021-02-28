import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import axios from 'axios';

// chakra UI
import { Heading, SimpleGrid } from '@chakra-ui/react';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <>
            <Heading as='h2'>New Products</Heading>
            <SimpleGrid minChildWidth='200px' gap='8' py='10'>
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default Home;
