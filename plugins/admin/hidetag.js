exports.run = {
	usage: ['hidetag'],
	use: 'text',
	category: 'admin tools',
	async: async (m, { message, client, text, participants }) => {
		let users = participants.map((u) => u.id);
		await client.reply(m.chat, text, null, {
			mentions: users,
		});
	},
	admin: true,
	restrict: false,
	group: true,
};
