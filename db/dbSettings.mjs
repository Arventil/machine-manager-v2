import Sequelize from 'sequelize';

import User from './models/user.mjs';
import DiaryEntry from './models/diaryEntry.mjs';

const sequelize = new Sequelize(
    'mmanager',
    'manager',
    'xc12mqWL',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

const db = {};

db.User = User(sequelize);
db.DiaryEntry = DiaryEntry(sequelize);

export default db;
