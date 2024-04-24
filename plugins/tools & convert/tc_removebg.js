exports.run = {
	usage: ['removebg'],
	hidden: ['nobg'],
	use: 'reply photo',
	category: 'tools & convert',
	async: async (m, { message, client, Func, Scraper, osv }) => {
		try {
			if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
				let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype;
				let q = m.quoted ? m.quoted.message[type] : m.msg;
				if (/image/.test(type)) {
					client.sendReact(m.chat, '🕒', m.key);
					let img = await client.downloadMediaMessage(q);
					let image = await Scraper.uploadImageV2(img);
					let json = await Api.aemt.removeBg(image.data.url);
					if (json.url.status) return message(json);
					const isOver = await osv(json.url.result);
					if (isOver.size) return client.reply(m.chat, isOver.mess, m);
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
				let json = await Api.aemt.removeBg(image.data.url);
				if (json.url.status) return message(json);
				const isOver = await osv(json.url.result);
				if (isOver.size) return client.reply(m.chat, isOver.mess, m);
				client.sendFile(m.chat, json.url.result, '', '', m);
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
