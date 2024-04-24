exports.run = {
	usage: ['capcut'],
	hidden: ['cc'],
	use: 'url',
	category: 'download',
	async: async (m, { message, client, isPrefix, command, Func, args, osv }) => {
		try {
			if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.capcut.com/t/Zs86uRPs8/'), m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Api.aemt.ccDl(args[0]);
			if (!json.status) return message(json);
			const isOver = await osv(json.result.video_ori);
			if (isOver.size) return client.reply(m.chat, isOver.mess, m);
			client.sendFile(m.chat, json.result.video_ori, '', '', m);
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
