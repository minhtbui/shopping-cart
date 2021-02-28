import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import ProductDetail from './views/ProductDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// chakra UI
import { Container } from '@chakra-ui/react';

const App = () => {
    return (
        <>
            <Router>
                <Header />
                <main>
                    <Container
                        maxW='1200px'
                        minH='80vh'
                        py='10'
                        px={{ base: 5, md: 5, lg: 0 }}>
                        <Route path='/' component={Home} exact />
                        <Route path='/product/:id' component={ProductDetail} />
                    </Container>
                </main>
                <Footer />
            </Router>
        </>
    );
};

export default App;
