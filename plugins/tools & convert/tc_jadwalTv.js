exports.run = {
  usage: ["jadwaltv"],
  hidden: ["acaratv"],
  use: "chanel",
  category: 'tools & convert',
  async: async (m, { client, text, isPrefix, command, Func }) => {
    try {
      if (!text)
        return client.reply(m.chat, Func.example(isPrefix, command, "transtv"), m);
      client.sendReact(m.chat, "🕒", m.key);
      let json = await Func.fetchJson(`https://aemt.me/jadwaltv?tv=${text}`);
      if (!json.result) return client.reply(m.chat, global.status.tryAgain, m)
      let channel = json.result.channel
      let quotes = `*么  J A D W A L - T V*\n\n`
      quotes += `*CHANNEL ${channel.toUpperCase()}*\n\n`
      for (let data of json.result.result) {
        quotes += '	◦  *Jam* : ' + data.date + '\n'
        quotes += '	◦  *Acara* : ' + data.event + '\n\n'
      }
      quotes += '*LIST CHANNEL TERSEDIA* : ' + json.tv_available + '\n\n'
      quotes += global.footer
      client.reply(m.chat, quotes, m)
    } catch (e) {
      console.log(Func.jsonFormat(e))
      return client.reply(m.chat, global.status.tryAgain, m);
    }
  },
  error: false,
  limit: true,
  restrict: true,
  cache: true,
  location: __filename,
};