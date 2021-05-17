const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "togglerequestonly",
  aliases: ["togglerequest", "tro"],
  category: "⚙️ Settings",
  description: "Allows you to use music command anywhere in the server. You must have permissions required to use this command.",
  usage: "togglerequestonly",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    try {
      //set the new prefix
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, `requestonly`), `requestonly`);
      //return success embed
      return message.channel.send(new MessageEmbed()
        .setColor("#00FFC5")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | ${client.settings.get(message.guild.id, `requestonly`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`} Request Only`)
        .setDescription(`You are now ${client.settings.get(message.guild.id, `requestonly`) ? `__**not**__` : ``} allowed to use Commands in different Channels`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`${e.message}`)
      );
    }
  }
};
