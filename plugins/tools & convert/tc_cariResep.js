exports.run = {
  usage: ['resep'],
  use: 'teks',
  category: 'tools & convert',
  async: async (m, {
     client,
     text,
     isPrefix,
     command,
     Func
  }) => {
     try {
        if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'nasi goreng'), m)
        client.sendReact(m.chat, '🕒', m.key)
        let json = await Func.fetchJson(`https://aemt.me/caribacaresep?query=${text}`)
        if (!json.hasil) return client.reply(m.chat, global.status.tryAgain, m)
        let quotes = `*么  R E S E P - D A P U R*\n\n`
        quotes += ' ◦  *Judul* : ' + json.hasil.data.judul + '\n'
        quotes += ' ◦  *Waktu* : ' + json.hasil.data.waktu_masak + '\n'
        quotes += ' ◦  *Porsi* : ' + json.hasil.data.hasil + '\n'
        quotes += ' ◦  *Tingkat Kesulitan* : ' + json.hasil.data.tingkat_kesulitan + '\n'
        quotes += ' ◦  *Bahan* : ' + json.hasil.data.bahan + '\n'
        quotes += ' ◦  *Langkah - Langkah* : ' + json.hasil.data.langkah_langkah + '\n\n'
        quotes += global.footer
        client.sendFile(m.chat, json.hasil.data.thumb, '', quotes, m)
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