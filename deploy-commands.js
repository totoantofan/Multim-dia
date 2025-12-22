const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

// Ton ID serveur et ID bot
const clientId = 'TON_ID_BOT_ICI';
const guildId = 'TON_ID_SERVEUR_ICI';

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔄 Enregistrement des commandes slash...');
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log('✅ Commandes enregistrées avec succès !');
  } catch (error) {
    console.error(error);
  }
})();
