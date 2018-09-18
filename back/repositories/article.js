const Article = require('../models/article');

module.exports = {

    all: (cb) => {
        Article.find({}, (err, articles) => {

            if (articles.length) {
                articles = articles.map(article => {
                    article.id = String(article._id); // we add id explicitly
                    return article;
                });
            }

            let data = {};

            if (err) {
                data = {
                    error: true,
                    error_message: err
                };
            }
            data = {
                'data': {articles}
            };

            return cb(data);

        });

    },
    get: (id, cb) => {

        Article.findById(id, (err, article) => {

            let data = {};

            if (err) {
                data = {
                    error: true,
                    error_message: err
                };
            }
            data = {
                'data': {article}
            };

            return cb(data);

        });
    },
    create: (data, cb) => {
        let article = {title: data.title, description: data.description, photo: data.photo};

        Article.create(article, (err, article) => {

            let data = {};

            if (err) {
                data = {
                    error: true,
                    error_message: err
                };
            }
            
            data = {
                'data': {article}
            };

            return cb(data);
        });
    },
    update: (id, data, cb) => {
        Article.update({'_id': id}, {$set: data}, (err) => {

            let data = {};

            if (err) {
                data = {
                    error: true,
                    error_message: err
                };
            }

            Article.findById(id, (err, article) => {
                if (err) {
                    data = {
                        error: true,
                        error_message: err
                    };
                }

                data = {
                    'data': {article}
                };

                return cb(data);
            });

            return true;

        });
    },
    remove: (id, cb) => {
        Article.findByIdAndRemove(id, (err) => {

            if (err) {
                data = {
                    error: true,
                    error_message: err
                };
            }

            data = {
                status: true
            };

            return cb(data);

        });
    }

};
