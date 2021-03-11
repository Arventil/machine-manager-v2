import express from 'express';

import db from './db/dbSettings.mjs';

const app = express();

app.use('/', (req, res, next) => {
    res.status(200).json({ message: 'Hello World!' });
});

db.sequelize.sync({})
    .then(() => {
        app.listen(3000);
    });
