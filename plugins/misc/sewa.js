exports.run = {
	usage: ['sewa'],
	category: 'miscs',
	async: async (m, { message, client, env, Func }) => {
		try {
			client.sendReact(m.chat, '🕒', m.key);
			let quotes = '*么 S E W A  - B O T*\n\n';
			quotes += '*HARGA*\n';
			quotes += '◦ 5.000 Ribu selama 1 bulan.\n\n';
			quotes += '*PEMBAYARAN YANG TERSEDIA*\n';
			quotes += '◦ Ewallet = Dana, Ovo, Gopay, Shopeepay & link Aja.\n';
			quotes += '◦ Bank = Tersedia Semua Bank.\n';
			quotes += '◦ Qris = Tersedia Semua Qris.\n';
			quotes += '◦ Pulsa = Xl & Indosat.\n\n';
			quotes += 'Silahkan hubungi *.owner* untuk melakukan pembelian premium.';
			client.reply(m.chat, quotes, m);
		} catch (e) {
			return message(e);
		}
	},
	error: false,
	cache: true,
	restrict: false,
	location: __filename,
};
