exports.run = {
	usage: ['pinterest'],
	hidden: ['pin'],
	use: 'teks',
	category: 'download',
	async: async (m, { message, client, text, isPrefix, command, Func }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'kucing oren'), m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Api.aemt.pintDl(text);
			if (!json.result) return message(json);
			for (let p of json.result) {
				client.sendFile(m.chat, p, 'image.jpg', `Images ${i++}`, m);
				await Func.delay(1500);
				if (i === 11) return;
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
