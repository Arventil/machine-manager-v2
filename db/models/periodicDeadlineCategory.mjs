import Sequelize from 'sequelize';

const PeriodicDeadlineCategory = (sequelize) => {
    const periodicDeadlineCategory = sequelize.define('periodicDeadlineCategory', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        categoryName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        daysToRemind: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        underscored: true
    });

    return periodicDeadlineCategory;
};

export default PeriodicDeadlineCategory;
