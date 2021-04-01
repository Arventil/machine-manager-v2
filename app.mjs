import express from 'express';
import bcryptjs from 'bcryptjs';

import db from './db/dbSettings.mjs';

import authentication from './controllers/auth/authentication.mjs';

import operatorRoutes from './routes/operatorRoutes.mjs';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(authentication);
app.use('/api', operatorRoutes);

let hashedAdminPass;

db.sequelize.sync({})
    .then(() => {
        return bcryptjs.hash('admin', 12);
    })
    .then(hashedPass => {
        hashedAdminPass = hashedPass;
        return db.Operator.findByPk(1);
    })
    .then(operator => {
        if (!operator) {
            return db.Operator.create({
                username: 'admin',
                password: hashedAdminPass,
                role: 'admin'
            });
        }

        return operator;
    })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
