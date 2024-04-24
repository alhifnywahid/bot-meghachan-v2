const { Converter } = new (require('@neoxr/wb'))();
exports.run = {
	usage: ['ytlist'],
	hidden: ['ytplaylist', 'playlist', 'getmp3', 'getmp4'],
	use: 'link',
	category: 'download',
	async: async (m, { message, client, args, isPrefix, command, osv, env, Func, Scraper }) => {
		try {
			client.ytplaylist = client.ytplaylist ? client.ytplaylist : [];
			if (!args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.youtube.com/playlist?list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD'), m);
			const check = client.ytplaylist.find((v) => v.jid == m.sender);
			if (/get?(mp4|mp3)/.test(command) && !check && !isNaN(args[0])) return m.reply(Func.texted('bold', `🚩 Your session has expired / does not exist, do another search using the keywords you want.`));
			if (/get?(mp4|mp3)/.test(command) && check && !isNaN(args[0])) {
				if (Number(args[0]) > check.results.length) return m.reply(Func.texted('bold', `🚩 Exceed amount of data.`));
				client.sendReact(m.chat, '🕒', m.key);
				if (command === 'getmp3') {
					const json = await Scraper.youtube(check.results[Number(args[0]) - 1]);
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
				} else if (command === 'getmp4') {
					const json = await Scraper.youtube(check.results[Number(args[0]) - 1], 'video');
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
			} else if (['ytplaylist', 'playlist', 'ytlist'].includes(command)) {
				client.sendReact(m.chat, '🕒', m.key);
				const json = await Api.dika.ytPlaylistDl(args[0]);
				if (!json.items) return message(json);
				if (!check) {
					client.ytplaylist.push({
						jid: m.sender,
						results: json.items.map((v) => v.url),
						created_at: new Date() * 1,
					});
				} else check.results = json.items.map((v) => v.url);
				let p = `To download video use *${isPrefix}getmp4 number* and to get audio use *${isPrefix}getmp3 number*\n`;
				p += `*Example* : ${isPrefix}getmp4 1\n\n`;
				json.items
					.map((v, i) => {
						p += `*${i + 1}*. ${v.title}\n`;
						p += `◦ *Link* : ${v.url}\n\n`;
					})
					.join('\n\n');
				p += global.footer;
				client.reply(m.chat, p, m);
			}
			setInterval(async () => {
				const session = client.ytplaylist.find((v) => v.jid == m.sender);
				if (session && new Date() - session.created_at > env.timeout) {
					Func.removeItem(client.ytplaylist, session);
				}
			}, 60_000);
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
