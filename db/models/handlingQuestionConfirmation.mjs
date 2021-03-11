import Sequelize from 'sequelize';

const HandlingQuestionConfirmation = (sequelize) => {
    const handlingQuestionConfirmation = sequelize.define('handlingQuestionConfirmation', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        handlingQuestionResult: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    },
    {
        underscored: true
    });

    return handlingQuestionConfirmation;
};

export default HandlingQuestionConfirmation;
