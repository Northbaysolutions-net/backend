module.exports = function(sequelize, DataTypes) {
    const Session = sequelize.define('Session', {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        expires: {
            type: DataTypes.DATE
        },
        data: {
            type: DataTypes.STRING(50000)
        }
    },
    {
        tableName: 'Session',
    });

    return Session;


}