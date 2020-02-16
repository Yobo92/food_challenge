var express = require('express');
var router = express.Router();
var Food = require('../models/Foods');
var Provider = require('../models/Providers');
const request = require('request');
const TAPIKey = "CFcHIxY9q69ZAPZL2JQ9AdARTv0jXns3";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/findFreeFood', function(req, res, next) {

  var lat = req.header("lat");
  var lon = req.header("lon");
  var latlon = encodeURIComponent(lat+","+lon)
const TAPI_EXPLORER = `https://api.tomtom.com/search/2/reverseGeocode/${latlon}.json?key=${TAPIKey}`
var obj;

let fooPromise = new Promise((resolve, reject) => {
  request(TAPI_EXPLORER, function(err, response, body){
    obj = JSON.parse(body);
    resolve(obj);
  });
});

fooPromise.then((obj) => {
  Food.find({})
  .populate({path: 'PId',
match: {city: {$gte: obj.addresses[0].address.localName}},
select: 'name'})
.exec(function(err, data){
  (err) ? res.json({restaurant: -1}) : res.json({restaurant: data.PId});
});
  
console.log(obj.addresses[0].address.localName);
})
  });

module.exports = router;


/*
User.find()
    .populate('comments posts') // multiple path names in one requires mongoose >= 3.6
    .exec(function(err, usersDocuments) {
        // handle err
        // usersDocuments formatted as desired
    });
*/