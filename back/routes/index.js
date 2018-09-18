module.exports = (app) => {

    /**
     * Index
     */
    app.get('/', (req, res) => res.json('ok'));

    /**
     * User
     */
    app.use('/articles', require('./article/article'));

};
