exports.run = {
  usage: ["pinterest"],
  hidden: ["pin"],
  use: "teks",
  category: "download",
  async: async (m, { client, text, isPrefix, command, Func }) => {
    try {
      if (!text)
        return client.reply(
          m.chat,
          Func.example(isPrefix, command, "kucing oren"),
          m
        );
      client.sendReact(m.chat, "🕒", m.key);
      let json = await Func.fetchJson(
        `https://aemt.me/pinterest?query=${text}`
      );
      if (!json.result) return client.reply(m.chat, global.status.tryAgain, m);
      let i = 1;
      for (let p of json.result) {
        client.sendFile(m.chat, p, "image.jpg", `Images ${i++}`, m);
        await Func.delay(1500);
        if (i === 11) return;
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
  location: __filename,
};
