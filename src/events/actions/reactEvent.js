require("colors");
const discord = require("discord.js");

module.exports = {
  name: "reactEvent",
  run: (client) => {
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const { commandName } = interaction;
      if (commandName === "react-custom") {
        const response = await interaction.reply({
          content: "kkk",
          fetchReply: true,
        });
        response.react("<a:6331pepereean:1215018777457201234>");
      }
    });
    client.on("messageCreate", async (message) => {
      if (message.author.bot) return;
      if (message.content.toLowerCase().includes("k")) {
        message.react("<a:6331pepereean:1215018777457201234>");
      }
    });
  },
};
