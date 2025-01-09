import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite',
});

const URL = sequelize.define('URL', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    longUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

(async () => {
    await sequelize.sync();
})();

export default URL;
