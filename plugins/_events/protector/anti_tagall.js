exports.run = {
	async: async (m, { message, client, isAdmin, isOwner }) => {
		try {
			if (!isOwner && !isAdmin && m.mentionedJid.length > 10) return client.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
		} catch (e) {
			return message(e);
		}
	},
	error: false,
	group: true,
	restrict: false,
	botAdmin: true,
	cache: true,
	location: __filename,
};
