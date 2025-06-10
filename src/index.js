// módulos
const Discord = require("discord.js");

// pastas
const config = require("./security/config");
const commandsHandler = require("./handler/commandsHandler");
const eventsHandler = require("./handler/eventsHandler");

// definição do client e eventos
const client = new Discord.Client({
  intents: Object.values(Discord.GatewayIntentBits),
  partials: Object.values(Discord.Partials),
});

module.exports = client;

// proteção contra crash's
process.on("unhandledRejection", (reason, p) => {
  console.log(" [antiCrash] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.error("[ Event Error: uncaughtException ]", err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.error("[ Event Error: uncaughtExceptionMonitor ]", err, origin);
});

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
