const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `cleareq`,
  category: `👀 Filter`,
  aliases: [`ceq`, `reseteq`, `clearequalizer`, `resetequalizer`, `restoreequalizer`, `req`],
  description: `Clears the Equalizer`,
  usage: `clearEQ`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      player.clearEQ();
      return message.channel.send(new MessageEmbed()
        .setColor("#00FFC1")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success |Cleared the equilizer`)
        .addField(`${emoji.msg.equalizer} Equalizer: `, `${emoji.msg.ERROR} Nothing`)
        .setDescription(`Note: *It might take up to 5 seconds to clear the equilizer !*`)
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
};