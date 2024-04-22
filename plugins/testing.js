exports.run = {
	usage: ['test'],
	async: async (m, { client, text, command, ctx, Func, Scraper }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'berapa anak saya nanti?'), m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Func.fetchJson(`https://aemt.me/gpt4?text=${text}`);
			if (json.status) return global.erorFitur(json);
			client.reply(m.chat, json.result, m);
			console.log('RENDERING');
		} catch (e) {
			console.log(Func.jsonFormat(e));
			return client.reply(m.chat, global.status.tryAgain, m);
		}
	},
	error: false,
	// owner: true,
	cache: true,
	restrict: false,
	location: __filename,
};
