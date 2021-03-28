const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const { NotFound, ErrorHandler } = require('./errorRoutes');

const routes = (app) => {
    // Products
    app.use('/api/products', productRoutes);

    // Users
    app.use('/api/users', userRoutes);

    // Orders
    app.use('/api/orders', orderRoutes);

    //get paypal client id
    app.get('/api/config/paypal', (req, res) =>
        res.send(process.env.PAYPAL_CLIENT_ID),
    );

    app.get('/', (req, res) => {
        res.send('API is running');
    });

    // error routes
    app.use(NotFound);
    app.use(ErrorHandler);
};

module.exports = routes;
