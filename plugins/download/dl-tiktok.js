exports.run = {
	usage: ['tiktok', 'tikmp3', 'tikwm'],
	hidden: ['ttdl', 'ttmp3', 'ttvid', 'tt'],
	use: 'link',
	category: 'download',
	async: async (m, { message, client, args, isPrefix, command, Func, osv }) => {
		try {
			if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://vm.tiktok.com/ZSR7c5G6y/'), m);
			if (!args[0].match('tiktok.com')) return client.reply(m.chat, global.status.invalid, m);
			client.sendReact(m.chat, '🕒', m.key);
			let quotes = '*么  T I K T O K - D O W N L O A D*';
			let json = await Api.dika.ttDl(args[0]);
			if (!json.desc) return message(json);
			if (command == 'tiktok' || command == 'tt') {
				if (json.slide.without_watermark.length !== 0) {
					let i = 1;
					for (let p of json.slide.without_watermark) {
						client.sendFile(m.chat, p, 'image.jpg', `Images ${i++}`, m);
						await Func.delay(1500);
					}
					return;
				}
				if (json.video) {
					const isOver = await osv(json.video.url.without_watermark);
					if (isOver.size) return client.reply(m.chat, isOver.mess, m);
					client.sendFile(m.chat, json.video.url.without_watermark, 'video.mp4', quotes, m);
					// client.sendFile(m.chat, json.video.url.without_watermark, Func.filename('mp4'), '', m, {
					// 	document: true,
					// 	APIC: await Func.fetchBuffer(''),
					// });
					return;
				}
			}
			if (command == 'tikwm') {
				const isOver = await osv(json.video.url.watermark);
				if (isOver.size) return client.reply(m.chat, isOver.mess, m);
				client.sendFile(m.chat, json.video.url.watermark, 'video.mp4', quotes, m);
				return;
			}
			if (command == 'tikmp3') return !json.music ? client.reply(m.chat, global.status.fail, m) : client.sendFile(m.chat, json.music.url, `${json.music.title}.mp3`, '', m);
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
