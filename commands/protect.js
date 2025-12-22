const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('protect')
    .setDescription('Active ou désactive la protection anti-raid')
    .addStringOption(option =>
      option.setName('etat')
        .setDescription('on / off')
        .setRequired(true)
    ),

  async execute(interaction) {
    const etat = interaction.options.getString('etat');

    if (etat === 'on') {
      global.protect = true;
      return interaction.reply('🛡️ Protection anti-raid activée.');
    }

    if (etat === 'off') {
      global.protect = false;
      return interaction.reply('❌ Protection anti-raid désactivée.');
    }

    return interaction.reply('❌ Utilise `on` ou `off`.');
  },
};
