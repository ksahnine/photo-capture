const Repository = require('../../../repositories/article');

module.exports = (req, res) => {

    Repository.all((data) => res.json(data));

};
