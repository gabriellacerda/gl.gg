var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/icon/:id', function (req, res, next) {
  let baseUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/';
  let reqUrl  = baseUrl + req.params.id + '.png';
  request.get(reqUrl).pipe(res);
});

/* GET users listing. */
router.post('/', function(req, res, next) {

  let baseUrl = '';

  let br    = 'https://br1.api.riotgames.com';
  let eune  = 'https://eun1.api.riotgames.com';
  let euw   = 'https://euw1.api.riotgames.com';
  let jp    = 'https://jp1.api.riotgames.com';
  let kr    = 'https://kr.api.riotgames.com';
  let lan   = 'https://la1.api.riotgames.com';
  let las   = 'https://la2.api.riotgames.com';
  let na    = 'https://na1.api.riotgames.com';
  let oce   = 'https://oc1.api.riotgames.com';
  let tr    = 'https://tr1.api.riotgames.com';
  let ru    = 'https://ru.api.riotgames.com';
  let pbe   = 'https://pbe1.api.riotgames.com';

  let apiKey = 'RGAPI-51b1123f-324e-431d-b12c-cba82dbb6655';
  let name = req.body.name;
  let region = req.body.region;

  switch(region.toLowerCase()) {
    case 'br':
        baseUrl = br;
        break;
    case 'eune':
        baseUrl = eune;
        break;
    case 'euw':
        baseUrl = euw;
        break;
    case 'jp':
        baseUrl = jp;
        break;
    case 'kr':
        baseUrl = kr;
        break;
    case 'lan':
        baseUrl = lan;
        break;
    case 'las':
        baseUrl = las;
        break;
    case 'na':
        baseUrl = na;
        break;
    case 'oce':
        baseUrl = oce;
        break;
    case 'tr':
        baseUrl = tr;
        break;
    case 'ru':
        baseUrl = ru;
        break;
    case 'pbe':
        baseUrl = pbe;
        break;
    default:
        baseUrl = false;
  }

  if (baseUrl) {
    let reqUrl = baseUrl + '/lol/summoner/v3/summoners/by-name/' + name + '?api_key=' + apiKey;
    request.get(reqUrl).pipe(res);
  } else {
    res.json({status: false, data: ''});
  }



});

module.exports = router;
