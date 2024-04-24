exports.run = {
	regex: /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/,
	async: async (m, { message, client, body, users, Func, osv }) => {
		try {
			const regex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
			const extract = body ? Func.generateLink(body) : null;
			if (extract) {
				const links = extract.filter((v) => Func.ttFixed(v).match(regex));
				if (links.length != 0) {
					if (users.limit > 0) {
						let limit = 1;
						if (users.limit >= limit) {
							users.limit -= limit;
						} else return client.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m);
					}
					client.sendReact(m.chat, '🕒', m.key);
					let quotes = '*么  T I K T O K - D O W N L O A D*';
					Func.hitstat('tiktok', m.sender);
					links.map(async (link) => {
						let json = await Api.dika.ttDl(link);
						if (!json.create_time) return message(json);
						if (json.slide.without_watermark.length !== 0) {
							let i = 1;
							for (let p of json.slide.without_watermark) {
								client.sendFile(m.chat, p, 'image.jpg', `Images ${i++}`, m);
								await Func.delay(1500);
							}
							return;
						} else if (json.video) {
							const isOver = await osv(json.video.url.without_watermark);
							if (isOver.size) return client.reply(m.chat, isOver.mess, m);
							client.sendFile(m.chat, json.video.url.without_watermark, 'video.mp4', quotes, m);
						}
					});
				}
			}
		} catch (e) {
			return message(e);
		}
	},
	limit: true,
	restrict: false,
	download: true,
};
