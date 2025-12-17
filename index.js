const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once("ready", () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);

  const channelId = "ID_DU_SALON"; // Remplace par l'ID du salon Discord
  const interval = 60 * 60 * 1000; // 1 heure

  setInterval(() => {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      channel.send("⏰ Rappel : n'oublie pas ta tâche !");
    }
  }, interval);
});

client.login(process.env.TOKEN);
