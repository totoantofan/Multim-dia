let joins = [];

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    if (!global.protect) return;

    const now = Date.now();
    joins.push(now);

    joins = joins.filter(t => now - t < 10000);

    if (joins.length >= 5) {
      try {
        await member.kick('Anti-raid activé');
      } catch (e) {}
    }
  },
};
