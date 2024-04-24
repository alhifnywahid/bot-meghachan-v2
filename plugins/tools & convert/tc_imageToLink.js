exports.run = {
	usage: ['tolink'],
	use: 'reply photo',
	category: 'tools & convert',
	async: async (m, { message, client, isPrefix, command, Func, Scraper }) => {
		try {
			if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
				let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype;
				let q = m.quoted ? m.quoted.message[type] : m.msg;
				if (/image/.test(type)) {
					client.sendReact(m.chat, '🕒', m.key);
					let img = await client.downloadMediaMessage(q);
					let image1 = await Scraper.uploadImage(img);
					let image2 = await Scraper.uploadImageV2(img);
					let image3 = await Scraper.uploadImageV3(img);
					let text = `*么  I M A G E - T O - U R L*\n\n`;
					text += '	◦  *Link 1* : ' + image1.data.url + '\n';
					text += '	◦  *Link 2* : ' + image2.data.url + '\n';
					text += '	◦  *Link 3* : ' + image3.data.url + '\n\n';
					text += global.footer;
					client.reply(m.chat, text, m);
				} else client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m);
			} else {
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || '';
				if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m);
				if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m);
				client.sendReact(m.chat, '🕒', m.key);
				let img = await q.download();
				let image1 = await Scraper.uploadImage(img);
				let image2 = await Scraper.uploadImageV2(img);
				let image3 = await Scraper.uploadImageV3(img);
				let text = `*么  I M A G E - T O - U R L*\n\n`;
				text += '	◦  *Link 1* : ' + image1.data.url + '\n';
				text += '	◦  *Link 2* : ' + image2.data.url + '\n';
				text += '	◦  *Link 3* : ' + image3.data.url + '\n\n';
				text += global.footer;
				client.reply(m.chat, text, m);
			}
		} catch (e) {
			return message(e);
		}
	},
	error: false,
	limit: true,
	restrict: false,
	cache: true,
	location: __filename,
};
