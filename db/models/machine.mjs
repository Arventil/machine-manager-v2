import Sequelize from 'sequelize';

const Machine = (sequelize) => {
    const machine = sequelize.define('machine', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        machineName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        note: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });

    return machine;
};

export default Machine;
