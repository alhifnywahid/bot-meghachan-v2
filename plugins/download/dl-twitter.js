exports.run = {
	usage: ['twitter'],
	use: 'link',
	hidden: ['tweet'],
	category: 'download',
	async: async (m, { client, text, isPrefix, command, Func, args }) => {
		try {
			if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://twitter.com/i/status/1161512897819926528'), m);
			if (!args[0].match(/http(?:s)?:\/\/(?:www\.|mobile\.)?twitter\.com\/([a-zA-Z0-9_]+)/)) return client.reply(m.chat, global.status.invalid, m);
			client.sendReact(m.chat, '🕒', m.key);
			const quotes = '*么  T W I T T E R - D O W N L O A D*';
			let json = await Func.fetchJson(`https://aemt.me/download/twtdl?url=${args[0]}`);
			if (!json.status) return client.reply(m.chat, global.status.tryAgain, m);
			if (json.result.url[0].hd) {
				client.sendFile(m.chat, json.result.url[0].hd, Func.filename('mp4'), quotes, m);
			} else if (json.result.url[0].sd) {
				client.sendFile(m.chat, json.result.url[0].sd, Func.filename('mp4'), quotes, m);
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
