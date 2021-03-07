import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import Cart from './views/Cart';
import Login from './views/Login';
import Register from './views/Register';
import ProductDetail from './views/ProductDetail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// chakra UI
import { Container } from '@chakra-ui/react';

const App = () => {
    return (
        <>
            <Router>
                <Header />
                <main>
                    <Container maxW='1550px' minH='80vh' py='10'>
                        <Switch>
                            <Route path='/' component={Home} exact />
                            <Route path='/login' component={Login} />
                            <Route path='/register' component={Register} />
                            <Route path='/cart' component={Cart} />
                            <Route
                                path='/product/:id'
                                component={ProductDetail}
                            />
                        </Switch>
                    </Container>
                </main>
                <Footer />
            </Router>
        </>
    );
};

export default App;
