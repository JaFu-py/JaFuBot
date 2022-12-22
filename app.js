//es6
import {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  Routes,
} from "discord.js";
// http requests
import fetch from "node-fetch";
import { SlashCommandBuilder } from "discord.js";
import config from "./config.json" assert { type: "json" };
import supabase from "@supabase/supabase-js";
import fs from "fs";
//------------------------//
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});
export const supa = supabase.createClient(
  "https://rhvudptkffqigizludnc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJodnVkcHRrZmZxaWdpemx1ZG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMDIwNzQsImV4cCI6MTk4NTU3ODA3NH0.W_6EZ0wY55O3e9UFwuejAL_vxIX7MX7jeCBxVXUZ1Wg"
);
//------------------------//
for (const file of fs.readdirSync("./events")) {
  import(`./events/${file}`);
}
client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand())
    await import("./utils/commandHandler.js").then((m) =>
      m.default(interaction)
    );
  else if (interaction.isStringSelectMenu())
    await import("./utils/interactionHandler.js").then((m) =>
      m.default(interaction)
    );
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.login(config.bot.token);
