import bcryptjs from 'bcryptjs';

import db from './db/dbSettings.mjs';
import server from './server.mjs';

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
        server.listen(3000, () => {
            console.log('Server listening on port 3000...');
        });
    })
    .catch(err => {
        console.log(err);
    });
