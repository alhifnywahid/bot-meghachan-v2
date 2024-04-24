exports.run = {
	usage: ['resep'],
	use: 'teks',
	category: 'tools & convert',
	async: async (m, { message, client, text, isPrefix, command, Func }) => {
		try {
			if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'nasi goreng'), m);
			client.sendReact(m.chat, '🕒', m.key);
			let json = await Api.aemt.cariGetResep(text);
			if (!json.hasil) return message(json);
			let quotes = `*么  R E S E P - D A P U R*\n\n`;
			quotes += ' ◦  *Judul* : ' + json.hasil.data.judul + '\n';
			quotes += ' ◦  *Waktu* : ' + json.hasil.data.waktu_masak + '\n';
			quotes += ' ◦  *Porsi* : ' + json.hasil.data.hasil + '\n';
			quotes += ' ◦  *Tingkat Kesulitan* : ' + json.hasil.data.tingkat_kesulitan + '\n';
			quotes += ' ◦  *Bahan* : ' + json.hasil.data.bahan + '\n';
			quotes += ' ◦  *Langkah - Langkah* : ' + json.hasil.data.langkah_langkah + '\n\n';
			quotes += global.footer;
			client.sendFile(m.chat, json.hasil.data.thumb, '', quotes, m);
		} catch (e) {
			return message(e);
		}
	},
	error: false,
	limit: true,
	restrict: false,
	cache: true,
	location: __filename,
};
