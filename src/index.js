// módulos
const Discord = require("discord.js");

// pastas
const config = require("./security/config");
const setupCrashs = require("./security/crashs");
const commandsHandler = require("./handler/commandsHandler");
const eventsHandler = require("./handler/eventsHandler");

// definição do client e eventos
const client = new Discord.Client({
  intents: Object.values(Discord.GatewayIntentBits),
  partials: Object.values(Discord.Partials),
});

module.exports = client;

// Inicializa o sistema de tratamento de erros
setupCrashs(client);

async function start() {
  try {
    await commandsHandler(client);
    await eventsHandler(client);
    await client.login(config.discord.token);
  } catch (error) {
    console.error("Erro ao iniciar o bot:", error);
  }
}
start();
