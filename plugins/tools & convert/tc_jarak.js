exports.run = {
	usage: ['jarak'],
	use: 'dari - ke',
	// hidden: ['drive', 'gd'],
	category: 'tools & convert',
	async: async (m, { client, text, isPrefix, command, Func, args }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'surabaya - bandung'), m);
			let [dari, ke] = text.split`-`;
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Func.fetchJson(`https://aemt.me/jarak?dari=${dari}&ke=${ke}`);
			if (json.status) {
				let quotes = '*么  J A R A K*\n\n';
				quotes += json.url.desc;
				client.sendFile(m.chat, json.url.data, '', quotes, m);
			} else {
				return client.reply(m.chat, global.status.tryAgain, m);
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
