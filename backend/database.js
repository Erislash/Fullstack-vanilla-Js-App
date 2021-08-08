const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_SERVER, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((db) => {
        console.log('DB Connected...');
    })
    .catch((err) => {
        console.log('Cannot connect to Mongo DB');
    });
