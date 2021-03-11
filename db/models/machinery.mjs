import Sequelize from 'sequelize';

const Machinery = (sequelize) => {
    const machinery = sequelize.define('machinery', {
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
    },
    {
        underscored: true
    });

    return machinery;
};

export default Machinery;
