exports.run = {
	usage: ['zombie'],
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
					let image = await Scraper.uploadImageV2(img);
					let json = await Api.aemt.zombieEffect(image.data.url);
					if (!json.status) return message(json);
					client.sendFile(m.chat, json.url, 'image.jpg', '', m);
				} else client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m);
			} else {
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || '';
				if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m);
				if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m);
				client.sendReact(m.chat, '🕒', m.key);
				let img = await q.download();
				let image = await Scraper.uploadImageV2(img);
				let json = await Api.aemt.zombieEffect(image.data.url);
				if (!json.status) return message(json);
				const isOver = await osv(json.url);
				if (isOver.size) return client.reply(m.chat, isOver.mess, m);
				client.sendFile(m.chat, json.url, 'image.jpg', '', m);
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
