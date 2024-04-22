exports.run = {
	usage: ['fb'],
	hidden: ['fbdl', 'fbvid'],
	use: 'link',
	category: 'download',
	async: async (m, { client, args, isPrefix, command, users, Scraper, env, Func }) => {
		try {
			if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://fb.watch/7B5KBCgdO3'), m);
			if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Func.fetchJson(`https://aemt.me/download/fbdl?url=${args[0]}`);
			if (!json.status) return client.reply(m.chat, global.status.tryAgain, m);
			if (json.result.HD) {
				const size = await Func.getSize(json.result.HD);
				const chSize = Func.sizeLimit(size, users.premium ? env.max_upload : env.max_upload_free);
				const isOver = users.premium ? `💀 File size (${size}) exceeds the maximum limit, download it by yourself via this link : ${await await Scraper.shorten(json.result.HD)}` : `⚠️ File size (${size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`;
				if (chSize.oversize) return client.reply(m.chat, isOver, m);
				client.sendFile(m.chat, json.result.HD, Func.filename('mp4'), `◦ *Quality* : HD`, m);
			} else {
				if (!json.result.Normal_video) return client.reply(m.chat, global.status.fail, m);
				const size = await Func.getSize(json.result.Normal_video);
				const chSize = Func.sizeLimit(size, users.premium ? env.max_upload : env.max_upload_free);
				const isOver = users.premium ? `💀 File size (${size}) exceeds the maximum limit, download it by yourself via this link : ${await await Scraper.shorten(json.result.Normal_video)}` : `⚠️ File size (${size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`;
				if (chSize.oversize) return client.reply(m.chat, isOver, m);
				client.sendFile(m.chat, json.result.Normal_video, Func.filename('mp4'), `◦ *Quality* : SD`, m);
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
