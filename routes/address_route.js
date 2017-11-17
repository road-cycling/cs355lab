var express = require('express');
var router = express.Router();
var inserts = require('../model/inserts_universal');
var addressS = require('../model/address_dal');

router.get('/all', (req, res) => {
  addressS.getAll()
  .then(address => {
    res.render('address/addressall', {address});
  })
  .catch(err => res.send(err));
})


router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  addressS.delete(id)
    .then(setTimeout(() => res.redirect('/address/all'), 200))
    .catch(err => res.send(err));
})

router.post('/update', (req, res) => {
  addressS.edit(req.body.update)
  .then(setTimeout(() => res.redirect('/address/all'), 200))
  .catch(err => res.send(err));
})

router.post('/add', (req, res) => {
  inserts.insert('address', req.body.update)
  .then(setTimeout(() => res.redirect('/address/all'), 200))
  .catch(err => res.send(err));
});


module.exports = router;
