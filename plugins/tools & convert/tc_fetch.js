const fs = require('fs')
const axios = require('axios')
exports.run = {
	usage: ['fetch'],
	hidden: ['get'],
	use: 'link',
	category: 'tools & convert',
	async: async (m, {
		client,
		args,
		text,
		isPrefix,
		command,
		drive,
		Func
	}) => {
		try {
			if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, global.db.setting.cover), m)
			client.sendReact(m.chat, '🕒', m.key)
			if (args[0].match('drive.google.com')) {
				let old = new Date()
				const response = await drive.getFile(args[0])
				if (!response.status && response.msg == 'Invalid Credentials') {
					drive.AuthClient.refreshAccessToken((error, token) => {
						if (error) return m.reply(Func.jsonFormat(error))
						drive.AuthClient.setCredentials({
							refresh_token: token.refresh_token,
							access_token: token.access_token
						})
					})
					await Func.delay(1500)
					try {
						const retry = await drive.getFile(args[0])
						if (!retry.status) return client.reply(m.chat, global.status.fail, m)
						let json = await Func.getFile(Buffer.from(retry.data.chunk))
						let chSize = Func.sizeLimit(json.size, global.max_upload)
						if (chSize.oversize) return client.reply(m.chat, `💀 Ukuran file (${json.size}) melebihi batas maksimum. Maaf kami tidak dapat mengunggah file.`, m)
						client.sendFile(m.chat, fs.readFileSync(json.file), '', `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
					} catch {
						client.reply(m.chat, Func.texted('bold', `🚩 Tidak dapat mengunduh, mungkin akses file bukan untuk umum.`), m)
					}
				} else {
					if (!response.status) return client.reply(m.chat, global.status.fail, m)
					let json = await Func.getFile(Buffer.from(response.data.chunk))
					let chSize = Func.sizeLimit(json.size, global.max_upload)
					if (chSize.oversize) return client.reply(m.chat, `💀 Ukuran file (${json.size}) melebihi batas maksimum. Maaf kami tidak dapat mengunggah file.`, m)
					client.sendFile(m.chat, fs.readFileSync(json.file), '', `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
				}
			} else if (args[0].match('github.com')) {
				let username = args[0].split(`/`)[3]
				let repository = args[0].split(`/`)[4]
				let zipball = `https://api.github.com/repos/${username.trim()}/${repository.trim()}/zipball`
				client.sendFile(m.chat, zipball, `${repository}.zip`, '', m)
			} else {
				const fetch = await axios.get(args[0], {
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Referer": "https://www.google.com/",
						"Referrer-Policy": "strict-origin-when-cross-origin",
						"User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
					}
				})
				if (/json/i.test(fetch.headers['content-type'])) return m.reply(Func.jsonFormat(fetch.data))
				if (/text/i.test(fetch.headers['content-type'])) return m.reply(fetch.data)
				client.sendFile(m.chat, args[0], '', '', m)
			}
		} catch (e) {
      console.log(Func.jsonFormat(e))
      return client.reply(m.chat, global.status.tryAgain, m);
		}
	},
   error: false,
   limit: true,
   restrict: true,
   cache: true,
	location: __filename
}