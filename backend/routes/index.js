const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const { NotFound, ErrorHandler } = require('./errorRoutes');

const routes = (app) => {
    // Products
    app.use('/api/products', productRoutes);

    // Users
    app.use('/api/users', userRoutes);

    app.get('/', (req, res) => {
        res.send('API is running');
    });

    // error routes
    app.use(NotFound);
    app.use(ErrorHandler);
};

module.exports = routes;
