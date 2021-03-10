import Sequelize from 'sequelize';

const HandlingQuestionConfirmation = (sequelize) => {
    const handlingQuestionConfirmation = sequelize.define('handlingQuestionConfirmation', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            priamaryKey: true
        },
        handlingQuestionResult: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return handlingQuestionConfirmation;
};

export default HandlingQuestionConfirmation;
