const op = require('Sequelize').Op;
const Tag = require('../model/tag');

const list = async ctx => {
  const query = ctx.query;
  const where = {
    name: {
      [Op.like]: `%${query.name}%`
    }
  };
  const { rows: data, count: total } = await Tag.findAndCountAll({
    where,
    offset: (+query.pageNo - 1) * +query.pageSize,
    limit: +query.pageSize,
    order: [
      ['createdAt', 'DESC']
    ]
  });
  ctx.body = {
    data,
    total,
    code: 1000,
    desc: 'success'
  };
};

const listAll = async ctx => {
  const data = await Tag.findAll();
  ctx.body = {
    code: 1000,
    data
  };
};

const create = async ctx => {
  const params = ctx.request.body;
  if (!params.name) {
    ctx.body = {
      code: 1003,
      desc: '标签名不能为空！'
    }
    return false;
  }
  try {
    await Tag.create(params);
    ctx.body = {
      code: 1000,
      data: '标签创建成功！'
    };
  } catch (err) {
    const msg = err.errors[0];
    ctx.body = {
      code: 300,
      data: msg.value + msg.message
    };
  }
};

const destrory = async ctx => {
  await Tag.destrory({ where: ctx.request.body });
  ctx.body = {
    code: 1000,
    desc: '删除成功！'
  };
};

module.exports = {
  list,
  listAll,
  create,
  destrory
};