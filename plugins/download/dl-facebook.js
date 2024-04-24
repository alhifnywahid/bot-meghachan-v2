exports.run = {
	usage: ['fb'],
	hidden: ['fbdl', 'fbvid'],
	use: 'link',
	category: 'download',
	async: async (m, { message, client, args, isPrefix, command, Func, osv }) => {
		try {
			if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://fb.watch/7B5KBCgdO3'), m);
			if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m);
			client.sendReact(m.chat, '🕒', m.key);
			const json = await Api.aemt.fbDown1(args[0]);
			if (!json.status) return message(json);
			if (json.result.HD) {
				const isOver = await osv(json.result.HD);
				if (isOver.size) return client.reply(m.chat, isOver.mess, m);
				client.sendFile(m.chat, json.result.HD, Func.filename('mp4'), `◦ *Quality* : HD`, m);
			} else {
				if (!json.result.Normal_video) return message(json);
				const isOver = await osv(json.result.Normal_video);
				if (isOver.size) return client.reply(m.chat, isOver.mess, m);
				client.sendFile(m.chat, json.result.Normal_video, Func.filename('mp4'), `◦ *Quality* : SD`, m);
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
