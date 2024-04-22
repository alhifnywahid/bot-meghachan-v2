exports.run = {
  usage: ["donasi"],
  hidden: ["donate"],
  category: "miscs",
  async: async (m, { client, env, Func }) => {
    client.sendReact(m.chat, "❤️", m.key);
    let quotes = "*么 D O N A S I - B O T*\n\n";
    quotes += "Berapapun donasi mu akan sangat\n";
    quotes += "berarti untuk kami,\n";
    quotes += "Metode Pembayaran:\n\n";
    quotes += "➠ DANA/OVO/GOPAY: 085655207366\n";
    quotes += "➠ Pulsa: 085655207366\n";
    quotes += "➠ Saweria: https://saweria.co/megachanbot\n\n";
    quotes += "Terimakasih, dengan berkah mu owner dapat meningkatkan performa bot ini.";
    client.reply(m.chat, quotes, m)
  },
  error: false,
  cache: true,
  restrict: true,
  location: __filename,
};
