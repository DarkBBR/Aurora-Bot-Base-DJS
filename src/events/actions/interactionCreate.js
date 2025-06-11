//módulos
require("colors");
const Discord = require("discord.js");

module.exports = {
  name: "interactionCreate",
  run: (client) => {
    client.on("interactionCreate", async (interaction) => {
      if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) {
          interaction.reply({
            flags: Discord.MessageFlags.Ephemeral,
            content: "Opa! Algo deu errado!",
          });
        } else {
          command.run(client, interaction);
        }
      }
    });
  },
};
