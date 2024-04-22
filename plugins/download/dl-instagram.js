exports.run = {
	usage: ['instagram'],
	hidden: ['igdl', 'ig'],
	use: 'link',
	category: 'download',
	async: async (m, { client, args, isPrefix, command, Func }) => {
		try {
			if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.instagram.com/p/CK0tLXyAzEI'), m);
			if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) return client.reply(m.chat, global.status.invalid, m);
			client.sendReact(m.chat, '🕒', m.key);
			const json = await Func.fetchJson(`https://dikaardnt.com/api/download/instagram?url=${args[0]}`);
			if (!Array.isArray(json)) return client.reply(m.chat, global.status.tryAgain, m);
			if (json.length > 1) {
				let i = 1;
				for (let data of json) {
					client.sendFile(m.chat, data, Func.filename('jpg'), `Image ${i++}`, m);
					await Func.delay(1500);
				}
			} else {
				client.sendFile(m.chat, json[0], 'mp4', '*么  I G - D O W N L O A D E R*', m);
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
