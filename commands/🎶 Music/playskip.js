const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `playskip`,
  category: `🎶 Music`,
  aliases: [`ps`],
  description: `Plays a song and skip curret track instantly !`,
  usage: `playskip <Song / URL>`,
  parameters: {"type":"music", "activeplayer": false, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if no args return error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please provide a url or search term.`)
        );
        message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`**Searching** <a:load:843777570884550686> & **Skipping** ${emoji.msg.skip_track}`)
          .setDescription(`\`\`\`${text}\`\`\``)
          ).then(msg=>{
            msg.delete({timeout: 5000}).catch(e=>console.log("Could not delete, this prevents a bug"))
          })
      //play the SONG from YOUTUBE
      playermanager(client, message, args, `skiptrack:youtube`);
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