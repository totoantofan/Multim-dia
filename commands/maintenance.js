const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('maintenance')
    .setDescription('Active ou désactive le mode maintenance')
    .addStringOption(option =>
      option.setName('etat')
        .setDescription('on / off')
        .setRequired(true)
    ),

  async execute(interaction) {
    const etat = interaction.options.getString('etat');

    if (etat === 'on') {
      global.maintenance = true;
      return interaction.reply('🛠️ Maintenance activée : les messages seront bloqués.');
    }

    if (etat === 'off') {
      global.maintenance = false;
      return interaction.reply('✅ Maintenance désactivée : tout redevient normal.');
    }

    return interaction.reply('❌ Utilise `on` ou `off`.');
  },
};
