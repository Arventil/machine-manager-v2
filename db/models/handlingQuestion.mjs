import Sequelize from 'sequelize';

const HandlingQuestion = (sequelize) => {
    const handlingQuestion = sequelize.define('handlingQuestion', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: false
        }
    });

    return handlingQuestion;
};

export default HandlingQuestion;
