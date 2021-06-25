const fs = require('fs');
require('dotenv').config({ path: "./.env" });
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
let commandList = [];
const commandFiles = fs.readdirSync("./Commands").filter((file) => file.endsWith(".js"));

const TOKEN = process.env.TOKEN;
const prefix = ">";

for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    commandList.push(command.name);
    client.commands.set(command.name, command);
}

commandList = commandList.map(command => `\`${prefix}${command}\``.toLowerCase());

let outputChannel;
let pulledData;

let read = async () => {
    let raw = await fs.readFileSync('./data.json');
    pulledData = await JSON.parse(raw);
    outputChannel = await client.channels.cache.get(pulledData.quoteChannel.id);

}

client.login(TOKEN);

client.once('ready', async () => {
    console.log('ready');
    await read();
})

client.on('message', async (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;

    try {
        await read();
        await client.commands.get(command).execute(msg, args, pulledData, outputChannel);
    } catch (e) {
        msg.channel.send("That is not a valid command");
    }
    fs.writeFileSync('data.json', JSON.stringify(pulledData));
})
