const productRoutes = require('./productRoutes');
const { NotFound, ErrorHandler } = require('./errorRoutes');

const routes = (app) => {
    app.use('/api/products', productRoutes);
    app.get('/', (req, res) => {
        res.send('API is running');
    });

    // error routes
    app.use(NotFound);
    app.use(ErrorHandler);
};

module.exports = routes;
