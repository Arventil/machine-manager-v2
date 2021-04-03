import Sequelize from 'sequelize';

const FiredUpToken = (sequelize) => {
    const firedUpToken = sequelize.define('firedUpToken', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        token: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
    {
        underscored: true
    });

    return firedUpToken;
};

export default FiredUpToken;
