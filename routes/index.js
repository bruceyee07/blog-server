const router = require('koa-router')();

const Tag = require('../controllers/tag');

router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

router.get('/foo', function *(next) {
  yield this.render('index', {
    title: 'Hello World foo!'
  });
});

router.get('/tag/list', Tag.list);
router.get('/tag/list/all', Tag.listAll);

router.post('/tag/create', Tag.create);
router.post('/tag/destrory', Tag.destrory);

module.exports = router;
