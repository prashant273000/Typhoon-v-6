const { MessageEmbed } = require("discord.js");
    const { readdirSync } = require("fs");
    const { stripIndents } = require("common-tags");
    const { embedcolor } = require("../../botconfig/config.json");
    const { prefix } = require('../../botconfig/config.json');

    module.exports = {
        
            name: "help",
            aliases: ["h"],
            usage: "[command name] (optional)",
            category: "🔰 Info",
            description: "Displays all commands that the karma has.",
            accessableby: "everyone",
        
        run: async (client, message, args) => {

            const embed = new MessageEmbed()
                .setColor(embedcolor)
                .setAuthor(`${message.guild.me.displayName}`, message.guild.iconURL())
                .setThumbnail(client.user.displayAvatarURL())

            if (!args[0]) {

                embed.setDescription(`**Typhoon's Prefix Is \`${prefix}\`\n\nFor Help Related To A Particular Command Type -\n\`${prefix}help [command name] Or ${prefix}help [alias]\`**`)
                embed.addField(` Info [14] - `, '`avatar`, `botinfo`, `devloper`, `djmode`, `invite`, `ping`, `reactions`, `serverinfo`, `stats`, `uptime`, `userinfo`')
                embed.addField(` Settings [15] - `, '`addbotchat`, `adddjrole`, `removedj`, `prefix`, `reset`, `setup`, `toogledjonly`, `toogleplaymessage`, `tooglepruning`, `tooglerequestonly`')
                //embed.addField(`${client.emotes.chatbot} Chatbot [3] - `, '`chatbot`, `disableChatbotchannel`, `setChatbotchannel`')
                embed.addField(` Fun [16] - `, '`amazeme`, `8ball`, `beautiful`, `delete`, `fact`, `joke`, `kiss`, `meme`, `rip`, `shit`, `weather`')
                embed.addField(` Moderation [10] - `, '`ban`, `clear`, `detailwarn`, `kick`, `mute`, `react`, `removeallwarns`, `slowmode`, `unmute`, `unwarn`, `warn`, `warnings`')
                embed.addField(` Music [45] - `, '`addprevious`, `addsimilar`, `autoplay`, `clearqueue`, `forceskip`, `forward`, `grab`, `join`, `jump`, `loop`, `loopqueue`, `loopsong`, `lyrics`, `move`, `moveme`, `nowplaying`, `pause`, `play`, `playlist`, `playprevious`, `playsc`, `playskip`, `playskipsc`, `playsongoftheday`, `queue`, `queuestatus`, `radio`, `removedupes`, `removetrack`, `removevoteskip`, `restart`, `resume`, `rewind`, `search`, `searchplaylist`, `searchradio`, `searchsrc`, `searchsimilar`, `seek`, `shuffle`, `skip`, `stop`, `unshuffle`, `volume`, `voteskip`')
                embed.addField(` Filter [4] -`, '`bassboost`, `clearreq`, `clearfilter`, `equalizer`')
                embed.addField(` Other -`, '`github`, `embed`, `say`, `react`, `addbotchat`, `removebotchat`')
                embed.addField(` Special Commands - `, '`setup`, `autoplay`')
                embed.addField(`If you want the bot to stay in VC 24/7. You can join the voice channel and type !join to join the bot in VC. Bot will stay 24/7 in VC!`)
                embed.setFooter('© TYPHOON BOT PROJECT', 'https://cdn.discordapp.com/attachments/830721752564105216/840969142206070814/Typhoon.jpg')
                embed.setImage('https://media.discordapp.net/attachments/830721752564105216/840969161953640458/1b4bfada7ea35b721432ae156a0fc7e2.jpg')
                embed.setTimestamp()

                return message.channel.send(embed)
            } else {
                let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
                if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
                command = command.config

                embed.setDescription(stripIndents`**Typhoon's Prefix Is \`${prefix}\`**\n
                ** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
                ** Description -** ${command.description || "No Description provided."}\n
                ** Usage -** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}\n
                ** Needed Permissions -** ${command.accessableby || "everyone can use this command!"}\n
                ** Aliases -** ${command.aliases ? command.aliases.join(", ") : "None."}`)
                embed.setFooter(message.guild.name, message.guild.iconURL())

                return message.channel.send(embed)
            }
        }
    };