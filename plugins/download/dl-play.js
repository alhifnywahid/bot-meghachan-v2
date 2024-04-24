const { Converter } = new (require('@neoxr/wb'))();
exports.run = {
	usage: ['play'],
	hidden: ['lagu', 'song'],
	use: 'query',
	category: 'download',
	async: async (m, { message, client, text, isPrefix, command, osv, Func, Scraper }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m);
			client.sendReact(m.chat, '🕒', m.key);
			const json = await Scraper.play(text);
			if (!json.status) return message(json);
			let caption = `乂  *Y T - P L A Y*\n\n`;
			caption += `	◦  *Title* : ${json.title}\n`;
			caption += `	◦  *Size* : ${json.data.size}\n`;
			caption += `	◦  *Duration* : ${json.duration}\n`;
			caption += `	◦  *Bitrate* : ${json.data.quality}\n\n`;
			caption += global.footer;
			const isOver = await osv(json.data.buffer);
			if (isOver.size) return client.reply(m.chat, isOver.mess, m);
			client
				.sendMessageModify(m.chat, caption, m, {
					largeThumb: true,
					thumbnail: await Func.fetchBuffer(json.thumbnail),
				})
				.then(async () => {
					const buffer = await Converter.toAudio(json.data.buffer, 'mp3');
					client.sendFile(m.chat, buffer, json.data.filename, '', m, {
						document: true,
						APIC: await Func.fetchBuffer(json.thumbnail),
					});
				});
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
