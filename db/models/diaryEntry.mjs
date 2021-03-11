import Sequelize from 'sequelize';

const DiaryEntry = (sequelize) => {
    const diaryEntry = sequelize.define('diaryEntry', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
    {
        underscored: true
    });

    return diaryEntry;
};

export default DiaryEntry;
