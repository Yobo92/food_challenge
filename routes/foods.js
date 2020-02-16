var express = require('express');
var router = express.Router();
var Food = require('../models/Foods');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
    if (req.session.Id ==null)  req.session.Id = -1;
    var food = new Food({
       name: req.header("name"),
       description: req.header("description"),
       date_posted: req.header("date_posted"),
       PId: req.session.Id
    });

    food.save(function (err, food) {
        (err) ? res.json({FId: '1'}) : res.json({FId: food._id});
    })
});




module.exports = router;
