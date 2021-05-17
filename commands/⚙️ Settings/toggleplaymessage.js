const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "toggleplaymessage",
  aliases: ["toggleplaymsg", "playmessage", "playmsg"],
  category: "⚙️ Settings",
  description: "Toogles play message pruning or cleaning. DEFAULT: TRUE.",
  usage: "toggleplaymessage",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    //run the code of togglepruning
    let {
      run
    } = require("./togglepruning");
    run(client, message, args);
  }
};
