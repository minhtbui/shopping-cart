const productRoutes = require('./productRoutes');

const routes = (app) => {
    app.use('/api/products', productRoutes);
    app.get('/', (req, res) => {
        res.send('API is running');
    });
};

module.exports = routes;
