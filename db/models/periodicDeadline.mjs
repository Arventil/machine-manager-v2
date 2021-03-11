import Sequelize from 'sequelize';

const PeriodicDeadline = (sequelize) => {
    const periodicDeadline = sequelize.define('periodicDeadline', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    {
        underscored: true
    });

    return periodicDeadline;
};

export default PeriodicDeadline;
