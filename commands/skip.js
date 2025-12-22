module.exports = {
  name: 'skip',
  description: 'Passe la musique',
  async execute(message) {
    if (!message.member.voice.channel) return message.reply("❌ Tu dois être dans un salon vocal.");

    try {
      global.player.stop();
      message.reply("⏭️ Musique passée.");
    } catch {
      message.reply("❌ Impossible de skip.");
    }
  }
};
