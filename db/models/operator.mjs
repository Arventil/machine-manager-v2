import Sequelize from 'sequelize';

const Operator = (sequelize) => {
    const operator = sequelize.define('operator', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        underscored: true
    });

    return operator;
};

export default Operator;
