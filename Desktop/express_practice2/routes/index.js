'use strict'
const express = require('express');
const router = express.Router();
const rakuten = require('rakuten');
/* GET home page. */
router.get('/', (req, res, next) => {

	const item = rakuten.ichiba.item('2014-02-22');
	let searchWord = "たんす" + " " + "100cm"// ここに検索ワードと測った大きさを入れる
	const params = {
	  applicationId: 'xxx',
	  keyword: searchWord
	};
	new Promise( (resolve, reject) => {
		item.search(params, (err, response) => {
			let editedData = {
				name: new Array(),
				url: new Array(),
				images: new Array
			}
			console.log(editedData)
			if(response){
				// console.log(response.count + ' items found!');
				response.Items.forEach( (item, i) => {
					// console.log("itemName: " + item.Item.itemName)
					// console.log("itemUrl: " + item.Item.itemUrl)
					// console.log("image: " + item.Item.mediumImageUrls)
					editedData.name.push(item.Item.itemName)
					editedData.url.push(item.Item.itemUrl)
					editedData.images.push(item.Item.mediumImageUrls)
				})
				console.log("りたーんれすぽんす　")
				console.log(editedData)
				resolve({ furnitureData: editedData})
			}else{
				console.error(err)
				reject({message: err})
			}
		})
	})
	.then( (resolve) => {
		res.render('index', { title: 'rakuten' , res: JSON.stringify(resolve.furnitureData) })
		//ここでJSON形式でアンドロイドにデータを返すとかする
	},  (err) => {
		console.log(err.message)
		res.render('index', { title: 'rakuten error', res: JSON.stringify(err.message) })
		//エラーもJSON形式で返す
	})
	
 });

const search = () => {
	
}

module.exports = router;



