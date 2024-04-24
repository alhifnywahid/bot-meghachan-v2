exports.run = {
	usage: ['ai'],
	hidden: 'chatgpt',
	use: 'text',
	category: 'artificial intelligence',
	async: async (m, { message, client, text, isPrefix, command, Func }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'siapa itu megawati?'), m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Api.aemt.aiGptV1(text);
			if (json.status) {
				return client.reply(m.chat, json.result, m);
			} else {
				json = await Api.aemt.aiGptV2(text);
				if (json.status) {
					return client.reply(m.chat, json.result, m);
				} else {
					json = await Api.aemt.aiGptV3(text);
					if (json.status) {
						return client.reply(m.chat, json.result, m);
					} else {
						json = await Api.aemt.aiGptV4(text);
						if (json.status) {
							return client.reply(m.chat, json.result, m);
						} else {
							json = await Api.aemt.aiGptV5(text);
							if (json.status) {
								return client.reply(m.chat, json.result, m);
							} else {
								return message(json);
							}
						}
					}
				}
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
