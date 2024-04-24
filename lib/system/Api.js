const { Function: Func } = new (require('@neoxr/wb'))();

class Aemt {
	baseUrl = 'https://aemt.me';

	fbDown1 = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/download/fbdl?url=' + url);
		return json;
	};

	ccDl = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/download/capcut?url=' + url);
		return json;
	};

	mfDl = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/mediafire?link=' + url);
		return json;
	};

	gdriveDl = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/download/gdrive?url=' + url);
		return json;
	};

	pintDl = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/pinterest?query=' + url);
		return json;
	};

	tweetDl = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/download/twtdl?url=' + url);
		return json;
	};

	aiBard = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/bard?text=' + url);
		return json;
	};

	aiGptV1 = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/openai?text=' + url);
		return json;
	};

	aiGptV2 = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/gpt4?text=' + url);
		return json;
	};

	aiGptV3 = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/v2/gpt4?text=' + url);
		return json;
	};

	aiGptV4 = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/turbo?text=' + url);
		return json;
	};

	aiGptV5 = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/v2/turbo?text=' + url);
		return json;
	};

	remini = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/remini?url=' + url + '&resolusi=4');
		if (!isUrl(json.url))
			return {
				status: false,
				kesalahan: json.url,
				url: this.baseUrl + '/remini?url=' + url + '&resolusi=4',
			};
		return json;
	};

	removeBg = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/removebg?url=' + url);
		return json;
	};

	zombieEffect = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/converter/zombie?url=' + url);
		return json;
	};

	ttStalk = async (username) => {
		let json = await Func.fetchJson(this.baseUrl + '/download/tiktokstalk?username=' + username);
		return json;
	};

	cariGetResep = async (text) => {
		let json = await Func.fetchJson(this.baseUrl + '/caribacaresep?query=' + text);
		return json;
	};

	jadwalTv = async (text) => {
		let json = await Func.fetchJson(this.baseUrl + '/jadwaltv?tv=' + text);
		return json;
	};

	jarak = async (dari, ke) => {
		let json = await Func.fetchJson(this.baseUrl + '/jarak?dari=' + dari + '&ke=' + ke);
		return json;
	};
}

class Dika {
	baseUrl = 'https://dikaardnt.com/api';

	igDl = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/download/instagram?url=' + url);
		return json;
	};

	ttDl = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/download/tiktok?url=' + url);
		return json;
	};

	ytPlaylistDl = async (url) => {
		let json = await Func.fetchJson(this.baseUrl + '/api/youtube/playlist?url=' + url);
		return json;
	};
}

function isUrl(url) {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
}

module.exports = {
	Aemt,
	Dika,
};
