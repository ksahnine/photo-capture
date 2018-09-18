const Repository = require('../../../repositories/article');

module.exports = (req, res) => {

    Repository.create(req.body, (data) => res.json(data));

};
