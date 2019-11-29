const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const moment = require('moment');
// 定义表结构
const tag = sequelize.define('tag', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    unique: {
      msg: '标签已存在！'
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm');
    }
  },
  updateAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('updateAt')).format('YYYY-MM-DD HH:mm');
    }
  }
}, {
  // sequelize会自动使用传入的模型名（define的第一个参数）的复数做为表名 设置true取消默认设置
  freezeTableName: true
});

module.exports = tag;