exports.run = {
	usage: ['bing'],
	use: 'text',
	category: 'artificial intelligence',
	async: async (m, { message, client, text, isPrefix, command, Func }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'apa itu api?'), m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Api.aemt.aiBing(text);
			if (json.status) {
				client.reply(m.chat, json.result, m);
			} else {
				return message(json);
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
