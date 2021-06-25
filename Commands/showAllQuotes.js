
module.exports = {
    name: "showallquotes",
    description: "Outputs all quotes that have been stored",
    execute(msg, args, pulledData, outputChannel) {
        let allQuotes = "";
        pulledData.messages.forEach((message) => {
            allQuotes += "\"" + message.content + "\" - " + message.author + "\n\n";
        })
        outputChannel.send({
            embed: {
                title: "__**All Quotes**__",
                description: `${allQuotes}`,
                color: 3066993
            }
        });
    }
}
