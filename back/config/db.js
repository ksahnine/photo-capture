const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongodb.uri);

mongoose.connection.on('error', (err) => {
    console.log("Erreur: ", err);
});

mongoose.connection.on('connected', () => {
    console.log("MongoDB: Connecte");
});

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB: Deconnecte");
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Fermeture de connexion');
        process.exit(0);
    });
});

module.exports = mongoose;
