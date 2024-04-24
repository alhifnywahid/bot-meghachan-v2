const { Converter } = new (require('@neoxr/wb'))();
exports.run = {
	usage: ['ytmp3', 'ytmp4', 'youtube'],
	hidden: ['yta', 'ytv', 'yt'],
	use: 'link',
	category: 'download',
	async: async (m, { message, osv, client, args, isPrefix, command, users, env, Func, Scraper }) => {
		try {
			if (/yt?(a|mp3)/i.test(command)) {
				if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://youtu.be/zaRFmdtLhQ8'), m);
				if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) return client.reply(m.chat, global.status.invalid, m);
				client.sendReact(m.chat, '🕒', m.key);
				const json = await Scraper.youtube(args[0]);
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
			} else if (/yt?(v|mp4)/i.test(command)) {
				if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://youtu.be/zaRFmdtLhQ8'), m);
				if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) return client.reply(m.chat, global.status.invalid, m);
				client.sendReact(m.chat, '🕒', m.key);
				const json = await Scraper.youtube(args[0], 'video');
				if (!json.status) return message(json);
				let caption = `乂  *Y T - M P 4*\n\n`;
				caption += `	◦  *Title* : ${json.title}\n`;
				caption += `	◦  *Size* : ${json.data.size}\n`;
				caption += `	◦  *Duration* : ${json.duration}\n`;
				caption += `	◦  *Quality* : ${json.data.quality}\n\n`;
				caption += global.footer;
				const isOver = await osv(json.data.buffer);
				if (isOver.size) return client.reply(m.chat, isOver.mess, m);
				let isSize = json.data.size.replace(/MB/g, '').trim();
				if (isSize > 99)
					return client
						.sendMessageModify(m.chat, caption, m, {
							largeThumb: true,
							thumbnail: await Func.fetchBuffer(json.thumbnail),
						})
						.then(async () => {
							await client.sendFile(m.chat, json.data.buffer, json.data.filename, caption, m, {
								document: true,
							});
						});
				client.sendFile(m.chat, json.data.buffer, json.data.filename, caption, m);
			}
		} catch (e) {
			return message(e);
		}
	},
	error: false,
	limit: true,
	// restrict: false,
	cache: true,
	location: __filename,
};
