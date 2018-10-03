const knex = require("../db/knex.js");

module.exports = {
  index: (req,res) => {
    if(!req.session.current){
      req.session.current = [];
    }
    knex('card').then((results) => {
      res.render('index', { card:results, current:req.session.current });
    })
  },
  create: (req,res) => {
    knex('card').insert({
      mana: req.body.mana,
      attack: req.body.attack,
      health: req.body.health,
      description: req.body.description //insert(req.body)
    }).then(() => {
      res.redirect('/');
    })
  },
  new: (req,res) => {
    knex('card')
    .where('id', req.params.id)
    .then((results) => {
      req.session.current.push(results[0]);
      req.session.save(()=>{
      res.redirect('/');
    })
    });
  },
  remove: (req,res) => {
    let current = req.session.current

      if(current.length == 1){
        req.session.current = [];
        req.session.save(()=>{
          res.redirect('/')
        })
        return;
      }
    for(let i = 0; i<current.length; i++){
      if(current[i].id == Number(req.params.id)){
        current.splice(i, 1);
        req.session.save(()=>{
          res.redirect('/');
        })
        return;
      }
    }
    res.redirect('/')
  }
}
