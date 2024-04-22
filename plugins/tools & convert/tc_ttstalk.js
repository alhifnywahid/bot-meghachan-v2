exports.run = {
  usage: ["tiktokstalk"],
  hidden: ["ttstalk"],
  use: "username",
  category: 'tools & convert',
  async: async (m, { client, text, isPrefix, command, Func }) => {
    try {
      if (!text)
        return client.reply(m.chat, Func.example(isPrefix, command, "gopret"), m);
      client.sendReact(m.chat, "🕒", m.key);
      let json = await Func.fetchJson(
        `https://aemt.me/download/tiktokstalk?username=${text}`
      );
      if (json.status) {
        let output = "*么  T I K T O K - S T A L K*\n\n";
        output += "*Username* : " + json.result.username + "\n";
        output += "*Description* : " + json.result.description + "\n";
        output += "*Likes* : " + json.result.likes + "\n";
        output += "*Follower* : " + json.result.followers + "\n";
        output += "*Following* : " + json.result.following + "\n";
        output += "*Total Postingan* : " + json.result.totalPosts;
        client.sendFile(m.chat, json.result.profile, "", output, m);
      } else {
        return client.reply(m.chat, global.status.tryAgain, m)
      }
    } catch (e) {
      console.log(Func.jsonFormat(e))
      return client.reply(m.chat, global.status.tryAgain, m);
    }
  },
  error: false,
  limit: 2,
  cache: true,
  location: __filename,
};
