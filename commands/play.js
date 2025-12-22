const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const play = require('play-dl');

module.exports = {
  name: 'play',
  description: 'Joue une musique',
  async execute(message, args) {
    const query = args.join(" ");
    if (!query) return message.reply("❌ Donne un nom de musique.");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply("❌ Tu dois être dans un salon vocal.");

    const search = await play.search(query, { limit: 1 });
    if (!search || !search[0]) return message.reply("❌ Aucune musique trouvée.");

    const stream = await play.stream(search[0].url);

    global.connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator
    });

    global.player = createAudioPlayer();
    const resource = createAudioResource(stream.stream, { inputType: stream.type });

    global.player.play(resource);
    global.connection.subscribe(global.player);

    message.reply(`🎶 Lecture : **${search[0].title}**`);
  }
};
