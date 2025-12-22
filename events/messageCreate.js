module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    if (global.maintenance === true) {
      await message.delete().catch(() => {});
    }
  },
};
