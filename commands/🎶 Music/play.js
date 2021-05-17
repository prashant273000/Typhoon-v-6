const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `play`,
  category: `🎶 Music`,
  aliases: [`p`],
  description: `Plays a song from youtube only.`,
  usage: `play <Song / URL>`,
  parameters: {"type":"music", "activeplayer": false, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if no args return error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor("#FF0000")
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please provide me a link or search term.`)
        );
          message.channel.send(new MessageEmbed()
          .setColor("#FF00C6")
          .setTitle(`**Searching for the song !** <a:searching:843765016258936862>`)
          .setDescription(`\`\`\`${text}\`\`\``)
        ).then(msg=>{
          msg.delete({timeout: 5000}).catch(e=>console.log("Could not delete, this prevents a bug"))
        })

      //play the SONG from YOUTUBE
      playermanager(client, message, args, `song:youtube`);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor("#FF0000")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<a:error:843768213308178462> ERROR | Unable to play a song an error has occurred !`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};