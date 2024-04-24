exports.run = {
	regex: /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/,
	async: async (m, { message, client, body, users, setting, env, Func, osv }) => {
		try {
			const regex = /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/;
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
					Func.hitstat('fb', m.sender);
					links.map(async (link) => {
						const json = await Api.aemt.fbDown1(link);
						if (!json.status) return message(json);
						if (json.result.HD) {
							const isOver = await osv(json.result.HD);
							if (isOver.size) return client.reply(m.chat, isOver.mess, m);
							client.sendFile(m.chat, json.result.HD, Func.filename('mp4'), `◦ *Quality* : HD`, m);
						} else {
							const isOver = await osv(json.result.Normal_video);
							if (isOver.size) return client.reply(m.chat, isOver.mess, m);
							client.sendFile(m.chat, json.result.Normal_video, Func.filename('mp4'), `◦ *Quality* : SD`, m);
						}
					});
				}
			}
		} catch (e) {
			return message(e);
		}
	},
	limit: true,
	cache: true,
	download: true,
};
