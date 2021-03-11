import Sequelize from 'sequelize';

const HandlingType = (sequelize) => {
    const handlingType = sequelize.define('handlingType', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        handlingType: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        underscored: true
    });

    return handlingType;
};

export default HandlingType;
