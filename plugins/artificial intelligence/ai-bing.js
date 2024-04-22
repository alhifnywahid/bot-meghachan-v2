exports.run = {
  usage: ["bing"],
  use: "text",
  category: "artificial intelligence",
  async: async (m, { client, text, isPrefix, command, Func }) => {
    try {
      if (!text)
        return client.reply(
          m.chat,
          Func.example(isPrefix, command, "apa itu api?"),
          m
        );
      client.sendReact(m.chat, "🕒", m.key);
      let json = await Func.fetchJson(`https://aemt.me/gemini?text=${text}`);
      if (json.status) {
        client.reply(m.chat, json.result, m);
      } else {
        return client.reply(m.chat, global.status.tryAgain, m);
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
