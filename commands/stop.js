module.exports = {
  name: 'stop',
  description: 'Arrête la musique',
  async execute(message) {
    if (!message.member.voice.channel) return message.reply("❌ Tu dois être dans un salon vocal.");

    try {
      global.player.stop();
      global.connection.destroy();
      message.reply("⏹️ Musique arrêtée.");
    } catch {
      message.reply("❌ Aucune musique en cours.");
    }
  }
};
