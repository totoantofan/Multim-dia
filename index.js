const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Bot en ligne"));
app.listen(3000);

const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.once("ready", () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// Liste des mots interdits
const bannedWords = ["pute", "fdp", "ntm", "tg", "merde"];

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // Détection d'insultes
  if (bannedWords.some(word => content.includes(word))) {
    message.delete();
    message.channel.send(`⚠️ ${message.author}, ton message contenait un mot interdit.`);
  }

  // Détection de spam (5 messages en 5 secondes)
  if (!client.spamMap) client.spamMap = new Map();

  const now = Date.now();
  const userMessages = client.spamMap.get(message.author.id) || [];
  const filtered = userMessages.filter(t => now - t < 5000);

  filtered.push(now);
  client.spamMap.set(message.author.id, filtered);

  if (filtered.length >= 5) {
    message.channel.send(`🚫 ${message.author} a été détecté pour spam.`);
    message.member.timeout(10_000, "Spam détecté");
  }
});

client.login(process.env.TOKEN);
