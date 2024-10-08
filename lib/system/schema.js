module.exports = (m, env) => {
	const isNumber = (x) => typeof x === 'number' && !isNaN(x);
	let user = global.db.users.find((v) => v.jid == m.sender);
	if (user) {
		if (!isNumber(user.afk)) user.afk = -1;
		if (!('afkReason' in user)) user.afkReason = '';
		if (!('afkObj' in user)) user.afkObj = {};
		if (!('name' in user)) user.name = m.pushName;
		if (!('banned' in user)) user.banned = false;
		if (!isNumber(user.ban_temporary)) user.ban_temporary = 0;
		if (!isNumber(user.ban_times)) user.ban_times = 0;
		if (!isNumber(user.limit)) user.limit = env.limit;
		if (!('premium' in user)) user.premium = false;
		if (!isNumber(user.expired)) user.expired = 0;
		if (!isNumber(user.lastseen)) user.lastseen = 0;
		if (!isNumber(user.hit)) user.hit = 0;
		if (!isNumber(user.warning)) user.warning = 0;
		/* ++ */ if (!isNumber(user.point)) user.point = 0;
		/* ++ */ if (!isNumber(user.tabungan)) user.tabungan = 0;
		/* ++ */ if (!('history_nabung' in user)) user.history_nabung = [];
		/* ++ */ if (!('pasangan' in user)) user.pasangan = '';
		/* ++ */ if (!('taken' in user)) user.taken = false;
		/* ++ */ if (!isNumber(user.limitGame)) user.limitGame = env.limit_game;
		/* ++ */ if (!isNumber(user.lastclaim)) user.lastclaim = 0;
		/* ++ */ if (!isNumber(user.spam)) user.spam = 0;
		/* ++ */ if (!isNumber(user.attempt)) user.attempt = 0;
		/* ++ */ if (!('code' in user)) user.code = '';
		/* ++ */ if (!isNumber(user.codeExpire)) user.codeExpire = 0;
		/* ++ */ if (!('email' in user)) user.email = '';
		/* ++ */ if (!('verified' in user)) user.verified = false;
	} else {
		global.db.users.push({
			jid: m.sender,
			afk: -1,
			afkReason: '',
			afkObj: {},
			name: m.pushName,
			banned: false,
			ban_temporary: 0,
			ban_times: 0,
			limit: env.limit,
			premium: false,
			expired: 0,
			lastseen: 0,
			hit: 0,
			warning: 0,
			/* ++ */ tabungan: 0,
			/* ++ */ history_nabung: [],
			/* ++ */ pasangan: '',
			/* ++ */ taken: false,
			/* ++ */ point: 0,
			/* ++ */ limitGame: env.limit_game,
			/* ++ */ lastclaim: 0,
			/* ++ */ spam: 0,
			/* ++ */ attempt: 0,
			/* ++ */ code: '',
			/* ++ */ codeExpire: 0,
			/* ++ */ email: '',
			/* ++ */ verified: false,
		});
	}

	if (m.isGroup) {
		let group = global.db.groups.find((v) => v.jid == m.chat);
		if (group) {
			if (!isNumber(group.activity)) group.activity = 0;
			if (!('antidelete' in group)) group.antidelete = true;
			if (!('antilink' in group)) group.antilink = true;
			if (!('antivirtex' in group)) group.antivirtex = true;
			if (!('filter' in group)) group.filter = false;
			if (!('left' in group)) group.left = false;
			if (!('localonly' in group)) group.localonly = false;
			if (!('mute' in group)) group.mute = false;
			if (!('viewonce' in group)) group.viewonce = true;
			if (!('autosticker' in group)) group.autosticker = true;
			if (!('member' in group)) group.member = {};
			if (!('text_left' in group)) group.text_left = '';
			if (!('text_welcome' in group)) group.text_welcome = '';
			if (!('welcome' in group)) group.welcome = true;
			if (!isNumber(group.expired)) group.expired = 0;
			if (!('stay' in group)) group.stay = false;
			/* ++ */ if (!('porn' in group)) group.porn = false;
			/* ++ */ if (!('game' in group)) group.game = true;
			/* ++ */ if (!('antiporn' in group)) group.antiporn = true;
		} else {
			global.db.groups.push({
				jid: m.chat,
				activity: 0,
				antidelete: true,
				antilink: false,
				antivirtex: false,
				filter: false,
				left: false,
				localonly: false,
				mute: false,
				viewonce: true,
				autosticker: true,
				member: {},
				text_left: '',
				text_welcome: '',
				welcome: true,
				expired: 0,
				stay: false,
				/* ++ */ antiporn: true,
				/* ++ */ game: true,
				/* ++ */ porn: false,
			});
		}
	}

	let chat = global.db.chats.find((v) => v.jid == m.chat);
	if (chat) {
		if (!isNumber(chat.chat)) chat.chat = 0;
		if (!isNumber(chat.lastchat)) chat.lastchat = 0;
		if (!isNumber(chat.lastseen)) chat.lastseen = 0;
		/* ++ */ if (!isNumber(chat.command)) chat.command = 0;
	} else {
		global.db.chats.push({
			jid: m.chat,
			chat: 0,
			lastchat: 0,
			lastseen: 0,
			/* ++ */ command: 0,
		});
	}

	let setting = global.db.setting;
	if (setting) {
		if (!('autodownload' in setting)) setting.autodownload = true;
		if (!('debug' in setting)) setting.debug = false;
		if (!('error' in setting)) setting.error = [];
		if (!('hidden' in setting)) setting.hidden = [];
		if (!('pluginDisable' in setting)) setting.pluginDisable = [];
		if (!('receiver' in setting)) setting.receiver = [];
		if (!('groupmode' in setting)) setting.groupmode = false;
		if (!('sk_pack' in setting)) setting.sk_pack = env.schema.sk_pack;
		if (!('sk_author' in setting)) setting.sk_author = env.schema.sk_author;
		if (!('self' in setting)) setting.self = false;
		if (!('noprefix' in setting)) setting.noprefix = true;
		if (!('multiprefix' in setting)) setting.multiprefix = true;
		if (!('prefix' in setting)) setting.prefix = ['.', '/', '!', '#'];
		if (!('toxic' in setting)) setting.toxic = env.toxic;
		/* ++ */ if (!('chatbot' in setting)) setting.chatbot = true;
		/* ++ */ if (!('games' in setting)) setting.games = false;
		/* ++ */ if (!('fitporn' in setting)) setting.fitporn = false;
		/* ++ */ if (!('group_id' in setting)) setting.group_id = [];
		/* ++ */ if (!('levelup' in setting)) setting.levelup = true;
		if (!('online' in setting)) setting.online = true;
		if (!('onlyprefix' in setting)) setting.onlyprefix = '+';
		if (!('owners' in setting)) setting.owners = env.owner;
		if (!isNumber(setting.lastReset)) setting.lastReset = new Date() * 1;
		if (!('msg' in setting)) setting.msg = env.schema.message_menu;
		if (!isNumber(setting.style)) setting.style = env.shcema.menu_style;
		if (!('cover' in setting)) setting.cover = env.schema.banner_menu;
		if (!('link' in setting)) setting.link = env.schema.group_link;
	} else {
		global.db.setting = {
			autodownload: true,
			debug: false,
			error: [],
			hidden: [],
			pluginDisable: [],
			receiver: [],
			groupmode: false,
			sk_pack: env.schema.sk_pack,
			sk_author: env.schema.sk_author,
			self: false,
			noprefix: true,
			multiprefix: true,
			prefix: ['.', '#', '!', '/'],
			toxic: env.toxic,
			online: true,
			onlyprefix: '+',
			owners: [env.owner],
			lastReset: new Date() * 1,
			msg: env.schema.message_menu,
			style: env.schema.menu_style,
			cover: env.schema.banner_menu,
			link: env.schema.group_link,
		};
	}
};
