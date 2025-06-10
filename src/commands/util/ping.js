//módulos
const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Mostra o ping do bot",
  run: async (client, interaction) => {
    const embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        `Opa! **${interaction.user.username}**, meu ping está em \`${client.ws.ping}ms\`.`
      )
      .setFooter({
        text: `Comando solicitado por ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));
    await interaction.reply({ embeds: [embed] });
  },
};
