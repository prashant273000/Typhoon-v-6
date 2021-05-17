const Discord = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
    duration
} = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Sends detailed info about the typhoon bot.",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                if (e) {
                    return console.log(String(e.stack).red);
                }
                let connectedchannelsamount = 0;
                let guilds = client.guilds.cache.map((guild) => guild);
                for (let i = 0; i < guilds.length; i++) {
                    if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                }
                if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                const botinfo = new Discord.MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle("__**DETAILED INFO ABOUT TYPHOON BOT**__")
                    .setColor("#03fcca")
                    .addField("<a:online:843823055432318976> Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                    .addField("<a:uptime:843825014071754773> Uptime ", `\`${duration(client.uptime)}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("<a:discordgg:842055987732152371> Users", `\`Total: ${client.users.cache.size} Users\``, true)
                    .addField("<a:discordgg:842055987732152371> Servers", `\`Total: ${client.guilds.cache.size} Servers\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("<a:load:843777570884550686> Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``, true)
                    .addField("<a:load:843777570884550686> Connected Channels", `\`${connectedchannelsamount}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("<a:upvote:839493688886689812> Discord.js", `\`v${Discord.version}\``, true)
                    .addField("<a:upvote:839493688886689812> Node", `\`${process.version}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("<a:queued:837003000782389358> CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField("<a:queued:837003000782389358> CPU usage", `\`${percent.toFixed(2)}%\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("<a:ping:843823227179630663> API Latency", `\`${client.ws.ping}ms\``, true)
                    .addField("<a:king:843822795968217118> Made With <a:ColorfulHeart:832481403974451202> By Prashant <a:king:843822795968217118>")
                    .setFooter("Requested by:", message.author.username, message.author.displayAvatarURL())
                message.channel.send(botinfo);
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            );
        }
    },
};