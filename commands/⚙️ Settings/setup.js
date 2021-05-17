const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");

module.exports = {
  name: "setup",
  category: "⚙️ Settings",
  aliases: ["musicsetup"],
  cooldown: 10,
  usage: "setup",
  description: "Creates an unique Music Setup for Requesting Songs!",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      let musiccmds = [];
      const commands = (category) => {
        return client.commands.filter((cmd) => cmd.category.toLowerCase().includes("music")).map((cmd) => `\`${cmd.name}\``);
      };
      for (let i = 0; i < client.categories.length; i += 1) {
        if (client.categories[i].toLowerCase().includes("music")) {
          musiccmds = commands(client.categories[i]);
        }
      }
      //get the old setup
      let oldsetup = client.setups.get(message.guild.id);
      //try to delete every single entry if there is a setup
      if (oldsetup.textchannel != "0") {
        try {
          message.guild.channels.cache.get(oldsetup.textchannel).delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        } catch {}
        try {
          message.guild.channels.cache.get(oldsetup.voicechannel).delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        } catch {}
        try {
          message.guild.channels.cache.get(oldsetup.category).delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        } catch {}
      }
      //create a new Cateogry
      message.guild.channels.create("Typhoon Music - Requests", {
          type: 'category',
          permissionOverwrites: [{
            id: message.guild.id,
            allow: ['VIEW_CHANNEL'],
          }, ],
        })
        .then((channel1) => {
          try {
            //set the maximumbitrate limit
            let maxbitrate = 96000;
            //get the boosts amount
            let boosts = message.guild.premiumSubscriptionCount;
            //change the bitrate limit regarding too boost level from https://support.discord.com/hc/de/articles/360028038352-Server-Boosting-
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;

            message.guild.channels.create(`TYPHOON VC🥂`, {
                type: 'voice', //voice Channel
                bitrate: maxbitrate, //set the bitrate to the maximum possible
                userLimit: 10, //set the limit for voice users
                parent: channel1.id, //ADMINISTRATOR
                permissionOverwrites: [{
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                }, ],
              })
              .then((channel2) => {
                try {
                  message.guild.channels.create(`typhoon-music-requests`, {
                      type: 'text', // text channel
                      rateLimitPerUser: 6, //set chat delay
                      topic: `:rewind: Rewind 20 seconds\n :fast_forward: Forward 20 seconds\n :play_pause: Pause/Resume the song\n :stop_button: Stop Track\n :track_previous: Play's previous song\n :track_next: Skip / Next\n :arrows_clockwise: Replay Track\n :sound: Volume -10 %\n :loud_sound: Volume +10 %\n :mute: Toggle Volume Mute\n ​:arrows_counterclockwise: Change repeat mode\n :infinity: Toggle Autoplay\n :twisted_rightwards_arrows: Shuffles the queue`,
                      parent: channel1.id,
                      permissionOverwrites: [{
                          id: message.guild.id,
                          allow: ['VIEW_CHANNEL', "SEND_MESSAGES", "ADD_REACTIONS"],
                        },
                        { //giving the Bot himself permissions
                          id: client.user.id,
                          allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
                        }
                      ],
                    })
                    .then(async (channel3) => {
                      message.reply(`Setting up in <#${channel3.id}>`)
                      let embed1 = new MessageEmbed()
                      let embed2 = new MessageEmbed()
                        .setColor("#9BFF00")
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Music Queue")
                        .setDescription(`Empty\nJoin a voice channel and queue songs by name or url in here.`)
                      let embed3 = new MessageEmbed()
                        .setColor("#9BFF00")
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Currently no song is playing!")
                        .setDescription(`Join a voice channel and enter a song name or url to play.\n [Invite Tyhpoon](https://bit.ly/typhoonbot) • [Support Server](https://discord.gg/WHdzfr9QE4)`)
                        .setImage("https://cdn.discordapp.com/attachments/830721752564105216/840969161953640458/1b4bfada7ea35b721432ae156a0fc7e2.jpg")
                      //send a temp message
                      channel3.send(new MessageEmbed().setColor("#9BFF00").setDescription("Setting Up..")).then(msg => {
                        //react with embed 1
                        msg.edit(embed1)
                        //save it in the database
                        client.setups.set(message.guild.id, msg.id, "message_cmd_info");
                        //send another message
                        channel3.send(new MessageEmbed().setColor("#9BFF00").setDescription("Setting Up..")).then(msg => {
                          //edit the message again
                          msg.edit(embed2)
                          //save it in the database
                          client.setups.set(message.guild.id, msg.id, "message_queue_info");
                          //send an message again
                          channel3.send(new MessageEmbed().setColor("#9BFF00").setDescription("Setting Up..")).then(async msg => {
                            //edit the message
                            msg.edit(embed3)
                            //react with all reactions
                            await msg.react(emoji.react.rewind) //rewind 20 seconds
                            await msg.react(emoji.react.forward) //forward 20 seconds
                            await msg.react(emoji.react.pause_resume) //pause / resume
                            await msg.react(emoji.react.stop) //stop playing music
                            await msg.react(emoji.react.previous_track) //skip back  track / (play previous)
                            await msg.react(emoji.react.skip_track) //skip track / stop playing
                            await msg.react(emoji.react.replay_track) //replay track
                            await msg.react(emoji.react.reduce_volume) //reduce volume by 10%
                            await msg.react(emoji.react.raise_volume) //raise volume by 10%
                            await msg.react(emoji.react.toggle_mute) //toggle mute
                            await msg.react(emoji.react.repeat_mode) //change repeat mode --> track --> Queue --> none
                            await msg.react(emoji.react.autoplay_mode) //toggle autoplay mode
                            await msg.react(emoji.react.shuffle) //shuffle the Queue
                            //create the collector
                            //save all other datas in the database
                            client.setups.set(message.guild.id, msg.id, "message_track_info");
                            client.setups.set(message.guild.id, channel3.id, "textchannel");
                            client.setups.set(message.guild.id, channel2.id, "voicechannel");
                            client.setups.set(message.guild.id, channel1.id, "category");
                            client.stats.inc("global", "setups");
                          });
                        })
                      })
                    })
                  //catch all errors
                } catch (e) {
                  //log them
                  console.log(String(e.stack).red)
                  //send information
                  return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
                    .setDescription(String("```" + e.stack + "```").substr(0, 2048))
                  );
                }
              })
          } catch (e) {
            //log them
            console.log(String(e.stack).red)
            //send information
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
              .setDescription(String("```" + e.stack + "```").substr(0, 2048))
            );
          }
        })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};
