exports.run = {
	usage: ['bard'],
	use: 'text',
	category: 'artificial intelligence',
	async: async (m, { message, client, text, isPrefix, command, Func }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'apa itu javascript?'), m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Api.aemt.aiBard(text);
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
