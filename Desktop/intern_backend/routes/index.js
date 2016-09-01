'use strict'
const express = require('express');
const router = express.Router();
const rakuten = require('rakuten');
/* GET home page. */
router.get('/', (req, res, next) => {

	const item = rakuten.ichiba.item('2014-02-22');
	let searchWord = "たんす" + " " + "100cm"// ここに検索ワードと測った大きさを入れる
	const params = {
	  applicationId: '1026719549827443135',
	  keyword: searchWord
	};
	new Promise( (resolve, reject) => {
		item.search(params, (err, response) => {
			let editedData = {
				service:"楽天",
				name: [],
				url: [],
				images: [],
				price: []
			}
			if(response){
				response.Items.forEach( (item, i) => {
					editedData.name.push(item.Item.itemName)
					editedData.url.push(item.Item.itemUrl)
					editedData.images.push(item.Item.mediumImageUrls)
					editedData.price.push(item.Item.itemPrice)
				})
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



