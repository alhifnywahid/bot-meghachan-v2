exports.run = {
	usage: ['ai'],
	hidden: 'chatgpt',
	use: 'text',
	category: 'artificial intelligence',
	async: async (m, { client, text, isPrefix, command, Func }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'siapa itu megawati?'), m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Func.fetchJson(`https://aemt.me/openai?text=${text}`);
			if (json.status) {
				return client.reply(m.chat, json.result, m);
			} else {
				json = await Func.fetchJson(`https://aemt.me/gpt4?text=${text}`);
				if (json.status) {
					return client.reply(m.chat, json.result, m);
				} else {
					json = await Func.fetchJson(`https://aemt.me/v2/gpt4?text=${text}`);
					if (json.status) {
						return client.reply(m.chat, json.result, m);
					} else {
						json = await Func.fetchJson(`https://aemt.me/turbo?text=${text}`);
						if (json.status) {
							return client.reply(m.chat, json.result, m);
						} else {
							json = await Func.fetchJson(`https://aemt.me/v2/turbo?text=${text}`);
							if (json.status) {
								return client.reply(m.chat, json.result, m);
							} else {
								return client.reply(m.chat, global.status.tryAgain, m);
							}
						}
					}
				}
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
