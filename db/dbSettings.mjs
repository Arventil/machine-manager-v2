import Sequelize from 'sequelize';

import { dbName, dbUsername, dbPass, dbHost } from '../config.mjs';

import Operator from './models/operator.mjs';
import DiaryEntry from './models/diaryEntry.mjs';
import HandlingQuestion from './models/handlingQuestion.mjs';
import HandlingQuestionConfirmation from './models/handlingQuestionConfirmation.mjs';
import HandlingType from './models/handlingType.mjs';
import Machinery from './models/machinery.mjs';
import PeriodicDeadline from './models/periodicDeadline.mjs';
import PeriodicDeadlineCategory from './models/periodicDeadlineCategory.mjs';

const sequelize = new Sequelize(
    dbName,
    dbUsername,
    dbPass,
    {
        dialect: 'mysql',
        host: dbHost
    }
);

const db = {};

db.sequelize = sequelize;

db.Operator = Operator(sequelize);
db.DiaryEntry = DiaryEntry(sequelize);
db.HandlingQuestion = HandlingQuestion(sequelize);
db.HandlingQuestionConfirmation = HandlingQuestionConfirmation(sequelize);
db.HandlingType = HandlingType(sequelize);
db.Machinery = Machinery(sequelize);
db.PeriodicDeadline = PeriodicDeadline(sequelize);
db.PeriodicDeadlineCategory = PeriodicDeadlineCategory(sequelize);

db.Operator.hasMany(db.DiaryEntry);
db.DiaryEntry.belongsTo(db.Operator);

db.Machinery.hasMany(db.DiaryEntry);
db.DiaryEntry.belongsTo(db.Machinery);

db.HandlingType.hasMany(db.HandlingQuestion);
db.HandlingQuestion.belongsTo(db.HandlingType);

db.Machinery.hasMany(db.HandlingQuestion);
db.HandlingQuestion.belongsTo(db.Machinery);

db.HandlingQuestion.hasMany(db.HandlingQuestionConfirmation);
db.HandlingQuestionConfirmation.belongsTo(db.HandlingQuestion);

db.Operator.hasMany(db.HandlingQuestionConfirmation);
db.HandlingQuestionConfirmation.belongsTo(db.Operator);

db.Machinery.belongsToMany(db.HandlingType, {
    through: 'machinery_handling_type'
});
db.HandlingType.belongsToMany(db.Machinery, {
    through: 'machinery_handling_type'
});

db.Operator.hasMany(db.Machinery);
db.Machinery.belongsTo(db.Operator);

db.Machinery.hasMany(db.PeriodicDeadline);
db.PeriodicDeadline.belongsTo(db.Machinery);

db.PeriodicDeadlineCategory.hasMany(db.PeriodicDeadline);
db.PeriodicDeadline.belongsTo(db.PeriodicDeadlineCategory);

export default db;
