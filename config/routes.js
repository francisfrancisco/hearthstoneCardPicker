const cards = require("../controllers/cards.js")
module.exports = function(app){

  app.get('/', cards.index);
  app.get('/card/add/:id', cards.new);
  app.get('/card/remove/:id', cards.remove)
  app.post('/card', cards.create);

}
