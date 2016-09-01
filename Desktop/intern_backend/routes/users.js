'user strict'
const utf8 = require('utf8')
const xml2json = require('xml2json')
const express = require('express');
const request = require('request');
const router = express.Router();
const ncmb = require('../accessNCMB')
/* GET users listing. */
router.get('/', (req, res, next) => {
	const word = "たんす" //ここに調べたものの名前を入れる
	const dist = "100cm" //ここに調べたものの長さを入れる
	const requestURL = "http://shopping.yahooapis.jp/ShoppingWebService/V1/itemSearch?appid=dj0zaiZpPTNMb1h6a2hLeHBwUSZzPWNvbnN1bWVyc2VjcmV0Jng9ZWU-&query="
	const urlAndQuery = requestURL + utf8.encode(word + " " + dist)

	const options = {
		url: urlAndQuery,
		method: "POST",
		json: true
	}
	const opt = {
		object: false,
	    reversible: false,
	    coerce: false,
	    sanitize: true,
	    trim: true,
	    arrayNotation: false
	}

	request(options, (error, response, body) => {
		if(error){
			console.log(error)
		}else{
			let datas = {
				service:"yahoo",
				name: [],
				url: [],
				images: [],
				price: []
			}
			var parsedResult = JSON.parse(xml2json.toJson(body, opt))
			parsedResult.ResultSet.Result.Hit.forEach( (hit) => {
				datas.name.push(hit.Name)
				datas.url.push(hit.Url)
				datas.image.push(hit.Image.Medium)
				datas.price.push(hit.Price)
			})
			res.render('users', { title: 'yahoo' , res: JSON.stringify(datas) })
		}
	})
	// const options = {
	//     url:'http://jlp.yahooapis.jp/KeyphraseService/V1/extract',
	//     headers: {
	//         'User-Agent': 'Yahoo AppID:dj0zaiZpPTNMb1h6a2hLeHBwUSZzPWNvbnN1bWVyc2VjcmV0Jng9ZWU'
	//     },
	//     form: {
	//         sentence : '東京ミッドタウンから国立新美術館まで歩いて5分で着きます。',
	//         output: 'json',
	//     }
	// };

	// const callback = (err, res, body) => {
	//     if (!err && res.statusCode === 200) {
	//         console.log(body);
	//     }else{
	//     	console.log(err)
	//     }
	// }

	// request.post(options, callback);
	

});

router.post('/', (req, res, next) => {
	const dataStore = ncmb.DataStore("measured_value")
	const values = new dataStore
	req.body.distance
	res.json()
})
module.exports = router;
