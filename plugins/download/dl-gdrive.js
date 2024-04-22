const decode = require("html-entities").decode;
exports.run = {
    usage: ["gdrive"],
    hidden: ["drive", "gd"],
    use: "url",
    category: "download",
    async: async (m, {
        client,
        text,
        isPrefix,
        command,
        Func,
        args
    }) => {
        try {
            if (!args || !args[0])
                return client.reply(m.chat, Func.example(isPrefix, command, "https://drive.google.com/file/d/1XEFME9zo-A_AXBPej60f9uGeZejzj1Z7/view?usp=sharing"), m);
            if (!args[0].match(/(?:https?:\/\/)?drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/?/)) return client.reply(m.chat, global.status.invalid, m);
            client.sendReact(m.chat, "🕒", m.key);
            let json = await Func.fetchJson(`https://aemt.me/download/gdrive?url=${args[0]}`);
            if (!json.status || !json.result.status) return client.reply(m.chat, global.status.tryAgain, m);
            let text = `*么  G D R I V E - D O W N L O A D*\n\n`;
            text += "	◦  *Name* : " + unescape(decode(json.result.fileName)) + "\n";
            text += "	◦  *Size* : " + json.result.fileSize + "\n\n";
            text += global.footer;
            client.sendMessageModify(m.chat, text, m, {
                    largeThumb: true,
                    thumbnail: "https://telegra.ph/file/fcf56d646aa059af84126.jpg",
                })
                .then(async () => {
                    client.sendFile(
                        m.chat,
                        json.result.data,
                        unescape(decode(json.result.fileName)),
                        "",
                        m
                    );
                });
        } catch (e) {
            console.log(Func.jsonFormat(e))
            return client.reply(m.chat, global.status.tryAgain, m);
        }
    },
    error: false,
    limit: true,
    restrict: true,
    cache: true,
    location: __filename,
};