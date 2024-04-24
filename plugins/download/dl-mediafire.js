const decode = require('html-entities').decode;
exports.run = {
	usage: ['mediafire'],
	hidden: ['mf'],
	use: 'link',
	category: 'download',
	async: async (m, { message, client, isPrefix, command, Func, args, osv }) => {
		try {
			if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.mediafire.com/file/1fqjqg7e8e2v3ao/YOWA.v8.87_By.SamMods.apk/file'), m);
			if (!args[0].match(/https?:\/\/(?:www\.)?mediafire\.com\/(?:download|file)\/[\w-]+/)) return client.reply(m.chat, global.status.invalid, m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Api.aemt.mfDl(args[0]);
			if (!json.result) return message(json);
			let text = `*么  M E D I A F I R E - D O W N L O A D*\n\n`;
			text += '	◦  *Name* : ' + unescape(decode(json.result.title)) + '\n';
			text += '	◦  *Size* : ' + json.result.size + '\n\n';
			text += global.footer;
			const isOver = await osv(json.result.link);
			if (isOver.size) return client.reply(m.chat, isOver.mess, m);
			client
				.sendMessageModify(m.chat, text, m, {
					largeThumb: true,
					thumbnail: 'https://telegra.ph/file/fcf56d646aa059af84126.jpg',
				})
				.then(async () => {
					client.sendFile(m.chat, json.result.link, unescape(decode(json.result.title)), '', m);
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
