exports.run = {
	usage: ['removebg'],
	hidden: ['nobg'],
	use: 'reply photo',
	category: 'tools & convert',
	async: async (m, { client, text, isPrefix, command, Func, Scraper }) => {
		try {
			if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
				let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype;
				let q = m.quoted ? m.quoted.message[type] : m.msg;
				if (/image/.test(type)) {
					client.sendReact(m.chat, '🕒', m.key);
					let img = await client.downloadMediaMessage(q);
					let image = await Scraper.uploadImageV2(img);
					let json = await Func.fetchJson(`https://aemt.me/removebg?url=${image.data.url}`);
					if (!json.url) return client.reply(m.chat, global.status.tryAgain, m);
					client.sendFile(m.chat, json.url.result, '', '', m);
				} else client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m);
			} else {
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || '';
				if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m);
				if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m);
				client.sendReact(m.chat, '🕒', m.key);
				let img = await q.download();
				let image = await Scraper.uploadImageV2(img);
				let json = await Func.fetchJson(`https://aemt.me/removebg?url=${image.data.url}`);
				if (!json.url) return client.reply(m.chat, global.status.tryAgain, m);
				client.sendFile(m.chat, json.url.result, '', '', m);
			}
		} catch (e) {
			console.log(Func.jsonFormat(e));
			return client.reply(m.chat, global.status.tryAgain, m);
		}
	},
	error: false,
	limit: true,
	restrict: false,
	cache: true,
	location: __filename,
};
