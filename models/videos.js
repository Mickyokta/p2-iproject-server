'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Videos.init({
    videoUrl: DataTypes.STRING,
    videoTitle: DataTypes.STRING,
    videoImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Videos',
  });
  return Videos;
};