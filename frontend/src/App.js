import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import Cart from './views/Cart';
import Payment from './views/Payment';
import PaymentConfirmation from './views/PaymentConfirmation';
import Login from './views/Login';
import Register from './views/Register';
import ProductDetail from './views/ProductDetail';
import UserProfile from './views/UserProfile';
import OrderDetail from './views/OrderDetail';

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
                            <Route path='/profile' component={UserProfile} />
                            <Route path='/cart' component={Cart} />
                            <Route path='/payment' component={Payment} />
                            <Route
                                path='/payment-confirmation'
                                component={PaymentConfirmation}
                            />

                            <Route
                                path='/product/:id'
                                component={ProductDetail}
                            />
                            <Route path='/orders/:id' component={OrderDetail} />
                        </Switch>
                    </Container>
                </main>
                <Footer />
            </Router>
        </>
    );
};

export default App;
