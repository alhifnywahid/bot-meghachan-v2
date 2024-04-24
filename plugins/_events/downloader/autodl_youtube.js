exports.run = {
	regex: /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/,
	async: async (m, { message, client, body, users, osv, Func, Scraper }) => {
		try {
			const regex = /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
			const extract = body ? Func.generateLink(body) : null;
			if (extract) {
				const links = extract.filter((v) => v.match(regex));
				if (links.length != 0) {
					if (users.limit > 0) {
						let limit = 1;
						if (users.limit >= limit) {
							users.limit -= limit;
						} else return client.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m);
					}
					client.sendReact(m.chat, '🕒', m.key);
					Func.hitstat('ytmp4', m.sender);
					links.map(async (link) => {
						const json = await Scraper.youtube(link, 'video');
						if (!json.status) return message(json);
						let caption = `乂  *Y T - M P 4*\n\n`;
						caption += `	◦  *Title* : ${json.title}\n`;
						caption += `	◦  *Size* : ${json.data.size}\n`;
						caption += `	◦  *Duration* : ${json.duration}\n`;
						caption += `	◦  *Quality* : ${json.data.quality}\n\n`;
						caption += global.footer;
						const isOver = await osv(json.data.buffer);
						if (isOver.size) return client.reply(m.chat, isOver.mess, m);
						client.sendFile(m.chat, json.data.buffer, json.data.filename, caption, m, {
							document: true,
						});
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
