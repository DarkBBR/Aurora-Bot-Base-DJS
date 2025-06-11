const { EmbedBuilder } = require("discord.js");

function setupErrorHandlers(client) {
  process.on("unhandledRejection", (reason, p) => {
    console.log(" [antiCrash] :: Unhandled Rejection/Catch");
    console.log(reason, p);
    logError(client, "Unhandled Rejection", reason);
  });

  process.on("uncaughtException", (err, origin) => {
    console.error("[ Event Error: uncaughtException ]", err, origin);
    logError(client, "Uncaught Exception", err);
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.error("[ Event Error: uncaughtExceptionMonitor ]", err, origin);
    logError(client, "Uncaught Exception Monitor", err);
  });
}

async function logError(client, type, error) {
  try {
    const errorEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`🚨 Erro Detectado: ${type}`)
      .setDescription(`\`\`\`js\n${error.stack || error}\`\`\``)
      .setTimestamp();
  } catch (err) {
    console.error("Erro ao tentar logar o erro:", err);
  }
}

module.exports = setupErrorHandlers;
