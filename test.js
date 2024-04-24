const { validationUrl, getSizeBuffer } = require('./lib/system/tools');
const { Scraper, Function: Rend } = new (require('@neoxr/wb'))();

async function none() {
	// const json = await Scraper.youtube('https://www.youtube.com/watch?v=vhrdYTP4AiY', 'video');
	// let image2 = await Scraper.uploadImageV2(json.data.buffer);
	// // const b = await Rend.getSize(image2);
	// console.log(image2);
	console.log(Rend);
}

none();
