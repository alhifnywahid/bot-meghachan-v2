const { validationUrl, getSizeBuffer } = require('./../lib/system/tools');
exports.run = {
	usage: ['test'],
	async: async (m, { message, client, args, text, command, ctx, Func, Scraper, users, env, osv }) => {
		try {
			// const hd =
			// 	'https://video-ams4-1.xx.fbcdn.net/o1/v/t2/f1/m69/GKuOZBk_29uMuQ4FACGQ13_LSvwGbmdjAAAF.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ht=video-ams4-1.xx.fbcdn.net&_nc_cat=103&strext=1&vs=347002dc1db873f9&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HS3VPWkJrXzI5dU11UTRGQUNHUTEzX0xTdndHYm1kakFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dEcUVQQkVTampMWlFMZ0NBRWh6VlZvZVk0WldidjRHQUFBRhUCAsgBAEsHiBJwcm9ncmVzc2l2ZV9yZWNpcGUBMQ1zdWJzYW1wbGVfZnBzABB2bWFmX2VuYWJsZV9uc3ViACBtZWFzdXJlX29yaWdpbmFsX3Jlc29sdXRpb25fc3NpbQAoY29tcHV0ZV9zc2ltX29ubHlfYXRfb3JpZ2luYWxfcmVzb2x1dGlvbgAddXNlX2xhbmN6b3NfZm9yX3ZxbV91cHNjYWxpbmcAEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcjBdAAAAAAAAAABERAAAAJtrj26nd5s0BFQIoAkMzGAt2dHNfcHJldmlldxwXQJI0qfvnbIsYIWRhc2hfZ2VuMmh3YmFzaWNfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50BTI2Mjc4EW9lbV9pc19leHBlcmltZW50AAxvZW1fdmlkZW9faWQQMTA3MzA4ODk3MzYwMTY4MhJvZW1fdmlkZW9fYXNzZXRfaWQPNDE5Mjg0NDMzNDU4NDMxFW9lbV92aWRlb19yZXNvdXJjZV9pZA80NTI1NjQ2NDAwMzcxMDEcb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZA8zMDgyOTE5Njg5MDI3NzEOdnRzX3JlcXVlc3RfaWQAJQIcACXEARsHiAFzBDYxNzECY2QKMjAyMi0wNi0yNQNyY2IFMjYyMDADYXBwBVZpZGVvAmN0GUNPTlRBSU5FRF9QT1NUX0FUVEFDSE1FTlQTb3JpZ2luYWxfZHVyYXRpb25fcwgxMTY1LjE3NwJ0cxVwcm9ncmVzc2l2ZV9lbmNvZGluZ3MA&ccb=9-4&oh=00_AfB0ScN3DqqacVIKbkgX96Xm7g06WnBTI9RsIu3sAR4N2w&oe=662A43BA&_nc_sid=1d576d&_nc_rid=725646786775410&_nc_store_type=1';
			// const json = await Scraper.play('lathi');
			const json = await Scraper.youtube('https://www.youtube.com/watch?v=vhrdYTP4AiY', 'video');
			const isOver = await osv(json.data.buffer);
			const size = getSizeBuffer(json.data.buffer);
			console.log(isOver);
			console.log(size.replace(/MB/g, '').trim());
			// if (isOver.size) return client.reply(m.chat, isOver.mess, m);

			// client.sendFile(m.chat, json.data.buffer, 'go.mp4', '', m);
		} catch (e) {
			return message(Func.jsonFormat(e));
		}
	},
	error: false,
	// owner: true,
	cache: true,
	restrict: false,
	location: __filename,
};
