exports.run = {
	usage: ['jarak'],
	use: 'dari - ke',
	// hidden: ['drive', 'gd'],
	category: 'tools & convert',
	async: async (m, { message, client, text, isPrefix, command, Func, args }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'surabaya - bandung'), m);
			let [dari, ke] = text.split`-`;
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Api.aemt.jarak(dari, ke);
			if (json.status) {
				let quotes = '*么  J A R A K*\n\n';
				quotes += json.url.desc;
				client.sendFile(m.chat, json.url.data, '', quotes, m);
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
