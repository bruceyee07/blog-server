const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog_db', 'admin', 'admin123', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('mysql 连接成功！');
  })
  .catch(err => {
    console.error('mysql 连接失败：', err);
  });

// 如果你希望 Sequelize 根据你的模型定义自动创建表(或根据需要进行修改), 你可以使用sync方法
// 你可以调用sequelize.sync()来自动同步所有模型,而不是为每个模型调用sync().
sequelize.sync();

module.exports = sequelize;