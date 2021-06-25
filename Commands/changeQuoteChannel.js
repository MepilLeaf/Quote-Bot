
module.exports = {
    name: "changequotechannel",
    description: "Changes the channel where quotes are outputed",
    async execute(msg, args, pulledData, outputChannel) {
        let channelName = args[0];

        try {
            let newChannel = await msg.client.channels.cache.find(channel => channel.name == channelName);
            if (newChannel == undefined) throw (ReferenceError(`${channelName} is not a valid channel`));

            pulledData.quoteChannel = await newChannel;
            outputChannel = await pulledData.quoteChannel;
            msg.channel.send(`The channel has been changed to ${channelName}`);
        } catch (e) {
            msg.channel.send(e.message);
        }
    }
}