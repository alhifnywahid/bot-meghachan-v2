exports.run = {
	async: async (m, { message, client, body, groupSet }) => {
		try {
			if (!m.fromMe && body && ((groupSet.antivirtex && body.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื)/gi)) || (groupSet.antivirtex && body.length > 10000)))
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
