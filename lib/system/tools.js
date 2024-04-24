function validationUrl(url) {
	if (Buffer.isBuffer(url)) return false;
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
}

function getSizeBuffer(buffer) {
	function buffToBinner(buffer) {
		return buffer.byteLength;
	}
	function formatSize(finalByte) {
		const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		let index = 0;
		while (finalByte >= 1024 && index < units.length - 1) {
			finalByte /= 1024;
			index++;
		}
		return `${finalByte.toFixed(2)} ${units[index]}`;
	}
	const oriBuffer = buffToBinner(buffer);
	return formatSize(oriBuffer);
}

module.exports = {
	validationUrl,
	getSizeBuffer,
};
