exports.run = {
	async: async (m, { message, client, body, groupSet, isAdmin }) => {
		try {
			// delete link then kick when antilink is turned on
			if (groupSet.antilink && !isAdmin && body) {
				if ((body.match(/(chat.whatsapp.com)/gi) && !body.includes(await client.groupInviteCode(m.chat))) || body.match(/(wa.me)/gi))
					return client
						.sendMessage(m.chat, {
							delete: {
								remoteJid: m.chat,
								fromMe: false,
								id: m.key.id,
								participant: m.sender,
							},
						})
						.then(() => client.groupParticipantsUpdate(m.chat, [m.sender], 'remove'));
			}

			// it only removes the link when antilink turned off
			if (!groupSet.antilink && !isAdmin && body) {
				if ((body.match(/(chat.whatsapp.com)/gi) && !body.includes(await client.groupInviteCode(m.chat))) || body.match(/(wa.me)/gi))
					return client.sendMessage(m.chat, {
						delete: {
							remoteJid: m.chat,
							fromMe: false,
							id: m.key.id,
							participant: m.sender,
						},
					});
			}
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
