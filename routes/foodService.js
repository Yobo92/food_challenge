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
var Tobj;

let fooPromise = new Promise((resolve, reject) => {
  request(TAPI_EXPLORER, function(err, response, body){
    Tobj = JSON.parse(body);
    
    Food.find({})

  .populate({path: 'PId',
  $match: {city: Tobj.addresses[0].address.localName},
  select: 'name lat lon'})
  .exec(function(err, data){
    console.log("from query: " +data);
    resolve(data);
  });
  });
});

fooPromise.then((myObj) => {
var localProviders = [];

if(myObj[0].PId == null)
{
  res.json({localProviders: 0});
}
else 
{
  for (let provider of myObj) {
    localProviders.push({
      provider_name: provider.PId.name,
      provider_lat: provider.PId.lat,
      provider_lon: provider.PId.lon,
      food_name: provider.name,
      food_description: provider.description,
      food_date_posted: provider.date_posted
    })
  }
  res.json({localProviders: localProviders});
}




})
  });

module.exports = router;


/*
var allBackpacks = [];
      for (let backpack of data){
        allBackpacks.push({BpId: backpack.bpid,
          BOId: backpack.id,
        name: backpack.name,
      description: backpack.description,
    ownerid: backpack.ownerid[0]
*/