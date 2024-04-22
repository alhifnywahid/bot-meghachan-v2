exports.run = {
	regex: /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/,
	async: async (m, { client, body, users, setting, Func }) => {
		try {
			const regex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/;
			const extract = body ? Func.generateLink(body) : null;
			if (extract) {
				const links = extract.filter((v) => Func.igFixed(v).match(regex));
				if (links.length != 0) {
					if (users.limit > 0) {
						let limit = 1;
						if (users.limit >= limit) {
							users.limit -= limit;
						} else return client.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m);
					}
					client.sendReact(m.chat, '🕒', m.key);
					let old = new Date();
					Func.hitstat('ig', m.sender);
					links.map(async (link) => {
						const json = await Func.fetchJson(`https://dikaardnt.com/api/download/instagram?url=${Func.igFixed(link)}`);
						if (!Array.isArray(json)) return client.reply(m.chat, Func.jsonFormat(json), m);
						if (json.length > 1) {
							let i = 1;
							for (let data of json) {
								client.sendFile(m.chat, data, Func.filename('jpg'), `Image ${i++}`, m);
								await Func.delay(1500);
							}
						} else {
							client.sendFile(m.chat, json[0], 'mp4', '*么  I G - D O W N L O A D E R*', m);
						}
					});
				}
			}
		} catch (e) {
			client.reply(m.chat, global.status.tryAgain, m);
			console.log(Func.jsonFormat(e));
		}
	},
	restrict: false,
	limit: true,
	download: true,
};
