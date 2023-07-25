const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Magazine = sequelize.define('Magazine', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

const Subscription = sequelize.define('Subscription', {
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

// Define associations
User.hasMany(Subscription);
Magazine.hasMany(Subscription);
Subscription.belongsTo(User);
Subscription.belongsTo(Magazine);

module.exports = { User, Magazine, Subscription };
