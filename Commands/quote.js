
module.exports = {
    name: "quote",
    description: "Stores and displays a quote",
    async execute(msg, args, pulledData, outputChannel) {

        let parseAuthorFromMessage = (args) => {
            const author = args.splice(args.length - 1);
            args.splice(args.length - 1);
            outputChannel.send({
                embed: {
                    description: `**\"${args.join(" ")}\" - ${author}**`,
                    color: 3066993
                }
            })
            pulledData.messages.push({ content: args.join(" "), author: author[0] });
        }

        let parseAuthorFromAuthor = (msg, args) => {
            outputChannel.send({
                embed: {
                    description: `**\"${args.join(" ")}\" - ${msg.author.username}**`,
                    color: 3066993
                }
            })
            pulledData.messages.push({ content: args.join(" "), author: msg.author.username });
        }

        let message;
        try {
            message = await msg.channel.messages.fetch(args[0]);
            parseAuthorFromAuthor(message, message.content.split(" "));
        } catch (e) {
            if (args[args.length - 2] == '-') {
                parseAuthorFromMessage(args);
            } else {
                parseAuthorFromAuthor(msg, args);
            }
        }

    }
}