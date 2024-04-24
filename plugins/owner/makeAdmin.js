exports.run = {
	usage: ['admin'],
	async: async (m, { message, client, text, Func }) => {
		try {
			return client.groupParticipantsUpdate(m.chat, [m.sender], 'promote').then((res) => client.reply(m.chat, Func.jsonFormat(res), m));
		} catch (e) {
			return message(e);
		}
	},
	group: true,
	owner: true,
	restrict: false,
	botAdmin: true,
};
