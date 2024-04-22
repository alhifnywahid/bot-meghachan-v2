exports.run = {
	usage: ['black'],
	use: 'text',
	category: 'artificial intelligence',
	async: async (m, { client, text, isPrefix, command, Func }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'berapa anak saya nanti?'), m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Func.fetchJson(`https://aemt.me/gpt4?text=${text}`);
			if (!json.status) return m.reply('ERR');
			client.reply(m.chat, json.result, m);
		} catch (e) {
			return client.reply(m.chat, global.status.tryAgain, m);
		}
	},
	error: false,
	limit: true,
	// restrict: false,
	cache: true,
	location: __filename,
};
