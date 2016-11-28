module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING(50),
            unique: true
        },
        password: DataTypes.STRING(50),
        studentID: {
            type: DataTypes.STRING(50),
            unique: true
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true
        },
        phone: {
            type: DataTypes.STRING(50),
            unique: true
        }
    }, {
        timestamps: false
    });

    return user;
}
