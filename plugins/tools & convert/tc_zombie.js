exports.run = {
   usage: ['zombie'],
   use: 'reply photo',
   category: 'tools & convert',
   async: async (m, {
      client,
      isPrefix,
      command,
      Func,
      Scraper
   }) => {
      try {
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            if (/image/.test(type)) {
           	client.sendReact(m.chat, '🕒', m.key)
               let img = await client.downloadMediaMessage(q)
               let image = await Scraper.uploadImageV2(img)
               let json = await Func.fetchJson(`https://aemt.me/converter/zombie?url=${image.data.url}`)
               if (!json.status) return client.reply(m.chat, global.status.tryAgain, m)
               client.sendFile(m.chat, json.url, 'image.jpg', '', m)
            } else client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
            if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let img = await q.download()
            let image = await Scraper.uploadImageV2(img)
            let json = await Func.fetchJson(`https://aemt.me/converter/zombie?url=${image.data.url}`)
            if (!json.status) return client.reply(m.chat, global.status.tryAgain, m)
            client.sendFile(m.chat, json.url, 'image.jpg', '', m)
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