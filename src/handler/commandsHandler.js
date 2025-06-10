//módulos
require("colors");
const fs = require("fs").promises;
const path = require("path");
const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

async function commandsHandler(client) {
  const slashArray = [];
  let commandsLoaded = [];
  client.slashCommands = new Discord.Collection();

  try {
    const commandsPath = path.join(__dirname, "../commands");
    const items = await fs.readdir(commandsPath);
    
    for (const item of items) {
      const itemPath = path.join(commandsPath, item);
      const stats = await fs.stat(itemPath);
      
      // Pula se não for um diretório
      if (!stats.isDirectory()) continue;
      
      const files = await fs.readdir(itemPath);
      
      for (const file of files) {
        if (!file.endsWith(".js")) continue;
        
        const command = require(path.join(itemPath, file));
        if (!command.name) continue;
        
        // Cria o comando slash
        const slashCommand = new SlashCommandBuilder()
          .setName(command.name)
          .setDescription(command.description || "Sem descrição");
        
        client.slashCommands.set(command.name, command);
        slashArray.push(slashCommand.toJSON());
        commandsLoaded.push(command.name);
      }
    }

    // Registra os comandos imediatamente
    await client.guilds.cache.forEach((guild) => guild.commands.set(slashArray));
    console.log(
      `💾 Comandos carregados: [${commandsLoaded.join("\n")}]`.blue
    );

    // Retorna true para indicar que os comandos foram carregados
    return true;
  } catch (error) {
    console.log("Erro ao carregar os comandos: ".red, error);
    return false;
  }
}

module.exports = commandsHandler;
