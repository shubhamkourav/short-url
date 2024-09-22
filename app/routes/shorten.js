
const route = require('express').Router();
const { get, create, update, remove, list, search } = require('../controllers/shorten');

route.get('/', list);
route.post('/', create);
route.get('/:shortCode', get);
route.put('/:shortCode', update);
route.delete('/:shortCode', remove);

route.get('/search', search);


module.exports = route;