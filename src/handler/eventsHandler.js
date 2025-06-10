//módulos
const fs = require("fs");
const path = require("path");

function listFiles(dir, filesSub, folderMain, objectEvents, client) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      listFiles(filePath, filesSub, file, objectEvents, client);
    } else {
      const eventModule = require(filePath);
      const eventName = eventModule.name;
      filesSub.push(`${folderMain}/${file}`);
      if (typeof eventModule.run === "function") {
        eventModule.run(client);
      }
      if (!objectEvents[folderMain]) objectEvents[folderMain] = [];
      objectEvents[folderMain].push(eventName);
    }
  });
}

function eventsHandlers(client) {
  const eventsPath = path.join(__dirname, "../events");
  const objectEvents = {};
  let eventNames = [];

  if (!fs.existsSync(eventsPath))
    return console.log("❌ Não foi possível carregar os eventos.");

  listFiles(eventsPath, eventNames, "events", objectEvents, client);

  const eventsLoaded = [];

  for (let folderMain in objectEvents) {
    eventsLoaded.push(
      `[${folderMain}: ${objectEvents[folderMain].join("\n")}]`
    );
  }
  console.log(`📀 Eventos carregados: ${eventsLoaded.join(" - ")}`.yellow);
  return objectEvents;
}

module.exports = eventsHandlers;
