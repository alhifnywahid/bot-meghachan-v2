exports.run = {
	usage: ['menfess'],
	hidden: ['menfes', 'confes', 'confess'],
	use: '628xxx | ayu | i love u',
	category: 'tools & convert',
	async: async (m, { client, text, isPrefix, command, Func }) => {
		global.db.menfess = global.db.menfess ? global.db.menfess : {};
		if (!text) return client.reply(m.chat, Func.example(isPrefix, command, '628xxxxx | asep | i love u'), m);
		let [jid, name, msg] = text.split`|`;
		if (!jid || !name || !msg) return client.reply(m.chat, Func.example(isPrefix, command, '628xxxxx | asep | i love u'), m);
		if (jid == m.sender) return client.reply(m.chat, Func.texted('bold', "🚩 Can't send message to yourself."), m);
		let p = (await client.onWhatsApp(jid))[0] || {};
		if (!p.exists) return client.reply(m.chat, Func.texted('bold', '🚩 Number not registered on WhatsApp.'), m);
		let mf = Object.values(global.db.menfess).find((mf) => mf.status === true);
		if (mf) return !0;
		try {
			let id = +new Date();
			let txt = `📩 You got *+1* menfess message from : *${name.trim()}*\n\n`;
			txt += `“${msg.trim()}”`;
			await client.reply(p.jid, txt, m);
			client.sendReact(m.chat, '✅', m.key);
			global.db.menfess[id] = {
				id,
				from: m.sender,
				name,
				receiver: p.jid,
				msg,
				status: false,
			};
			return !0;
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
