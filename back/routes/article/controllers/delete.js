const Repository = require('../../../repositories/article');

module.exports = (req, res) => {

    let id = req.params.id;

    Repository.remove(id, (data) => res.json(data));

};

