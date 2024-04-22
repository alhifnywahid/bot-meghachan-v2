exports.run = {
  usage: ['premium'],
  hidden: ['prem'],
  category: 'miscs',
  async: async (m, {
     client,
     env,
     Func
  }) => {
    try {
      client.sendReact(m.chat, "🕒", m.key);
      let quotes = '*么 I N F O - P R E M I U M*\n\n'
      quotes += '*KEUNTUNGAN*\n'
      quotes += '◦ Bisa menggunakan semua fitur.\n'
      quotes += '◦ Mendapatkan 10.000 limit.\n'
      quotes += '◦ Jika bot mode grouponly user premium bisa memainkan di pesan pribadi.\n\n'
      quotes += '*HARGA*\n'
      quotes += '◦ 5.000 Ribu selama 1 bulan (Tidak harus langganan setiap bulan).\n\n'
      quotes += '*PEMBAYARAN YANG TERSEDIA*\n'
      quotes += '◦ Ewallet = Dana, Ovo, Gopay, Shopeepay & link Aja.\n'
      quotes += '◦ Bank = Tersedia Semua Bank.\n'
      quotes += '◦ Qris = Tersedia Semua Qris.\n'
      quotes += '◦ Pulsa = Xl & Indosat.\n\n'
      quotes += 'Silahkan hubungi *.owner* untuk melakukan pembelian premium.\n'
      quotes += 'Invite bot ke GC kalian ? ketik *.sewabot*'
      client.reply(m.chat, quotes, m)
    } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  error: false,
  cache: true,
  restrict: true,
  location: __filename
}