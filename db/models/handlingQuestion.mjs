import Sequelize from 'sequelize';

const HandlingQuestion = (sequelize) => {
    const handlingQuestion = sequelize.define('handlingQuestion', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        question: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
    {
        underscored: true
    });

    return handlingQuestion;
};

export default HandlingQuestion;
