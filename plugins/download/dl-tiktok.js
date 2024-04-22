exports.run = {
	usage: ['tiktok', 'tikmp3', 'tikwm'],
	hidden: ['ttdl', 'ttmp3', 'ttvid', 'tt'],
	use: 'link',
	category: 'download',
	async: async (m, { client, args, isPrefix, command, Func }) => {
		try {
			if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://vm.tiktok.com/ZSR7c5G6y/'), m);
			if (!args[0].match('tiktok.com')) return client.reply(m.chat, global.status.invalid, m);
			client.sendReact(m.chat, '🕒', m.key);
			let quotes = '*么  T I K T O K - D O W N L O A D*';
			let json = await Func.fetchJson(`https://dikaardnt.com/api/download/tiktok?url=${args[0]}`);
			if (!json.desc) return client.reply(m.chat, global.status.tryAgain, m);
			if (command == 'tiktok' || command == 'tt') {
				if (json.slide.without_watermark.length !== 0) {
					let i = 1;
					for (let p of json.slide.without_watermark) {
						client.sendFile(m.chat, p, 'image.jpg', `Images ${i++}`, m);
						await Func.delay(1500);
					}
					return;
				}
				if (json.video) return client.sendFile(m.chat, json.video.url.without_watermark, 'video.mp4', quotes, m);
			}
			if (command == 'tikwm') return client.sendFile(m.chat, json.video.url.watermark, 'video.mp4', quotes, m);
			if (command == 'tikmp3') return !json.music ? client.reply(m.chat, global.status.fail, m) : client.sendFile(m.chat, json.music.url, `${json.music.title}.mp3`, '', m);
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
