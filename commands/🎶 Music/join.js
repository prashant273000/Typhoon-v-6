const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `24/7`,
  category: `🎶 Music`,
  aliases: [`join`, `create`],
  description: `Enables the 24/7 mode.`,
  usage: `24/7`,
  parameters: {"type":"radio", "activeplayer": false, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, curplayer) => {
    try{
      var { channel } = message.member.voice;
      if(!channel) 
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} ERROR | You are not connected to a Voice Channel. Please connect to a voice channel to enable 24/7 mode.`)
        );
      //if no args return error
      var player = client.manager.players.get(message.guild.id);
      if(player) {
        var vc = player.voiceChannel;
        var voiceChannel = message.guild.channels.cache.get(player.voiceChannel);
        
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} ERROR | I am already connected somewhere in voice channel !`)
          .setDescription(`I am connected in: \`${vc ? voiceChannel ? voiceChannel.name : vc : "could not get voicechanneldata"}\``)
        );
      }
      //create the player
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: config.settings.selfDeaf,
      });
      //join the chanel
      if (player.state !== "CONNECTED") { 
        player.connect();
        player.stop();
      }
      else {
        var vc = player.voiceChannel;
        var voiceChannel = message.guild.channels.cache.get(player.voiceChannel);
        
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} ERROR | I am already connected somewhere`)
          .setDescription(`I am connected in: \`${vc ? voiceChannel ? voiceChannel.name : vc : "could not get voicechanneldata"}\``)
        );
      }
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
