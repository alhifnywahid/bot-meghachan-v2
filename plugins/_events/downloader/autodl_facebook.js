exports.run = {
   regex: /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/,
   async: async (m, {
      client,
      body,
      users,
      setting,
      env,
      Func,
      Scraper
   }) => {
      try {
         const regex = /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('fb', m.sender)
               links.map(async link => {
                  let json = await Func.fetchJson(`https://aemt.me/download/fbdl?url=${link}`)
                  if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
                  if (json.result.HD) {
                     const size = await Func.getSize(json.result.HD)
                     const chSize = Func.sizeLimit(size, users.premium ? env.max_upload : env.max_upload_free)
                     const isOver = users.premium ? `💀 File size (${size}) exceeds the maximum limit, download it by yourself via this link : ${await (await Scraper.shorten(json.result.HD))}` : `⚠️ File size (${size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
                     if (chSize.oversize) return client.reply(m.chat, isOver, m)
                     client.sendFile(m.chat, json.result.HD, Func.filename('mp4'), `◦ *Quality* : HD`, m)
                  } else {
                     const size = await Func.getSize(json.result.Normal_video)
                     const chSize = Func.sizeLimit(size, users.premium ? env.max_upload : env.max_upload_free)
                     const isOver = users.premium ? `💀 File size (${size}) exceeds the maximum limit, download it by yourself via this link : ${await (await Scraper.shorten(json.result.Normal_video))}` : `⚠️ File size (${size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
                     if (chSize.oversize) return client.reply(m.chat, isOver, m)
                     client.sendFile(m.chat, json.result.Normal_video, Func.filename('mp4'), `◦ *Quality* : SD`, m)
                  }
               })
            }
         }
      } catch (e) {
         client.reply(m.chat, global.status.tryAgain, m);
         console.log(Func.jsonFormat(e))
      }
   },
   limit: true,
   cache: true,
   download: true
}