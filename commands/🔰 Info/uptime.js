const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
module.exports = {
  name: "uptime",
  category: "🔰 Info",
  aliases: [""],
  cooldown: 10,
  usage: "uptime",
  description: "Returns the duration on how long the Bot is online",
  run: async (client, message, args, user, text, prefix) => {
    try {
      message.channel.send(new MessageEmbed()
        .setColor("#12ffcc")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<a:verified_black1:837002349846200352> **${client.user.username}** is since ${duration(client.uptime)} online`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
}