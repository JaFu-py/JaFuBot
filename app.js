import { Client, Events, GatewayIntentBits } from "discord.js";
import supabase from "@supabase/supabase-js";
import config from "./config.json" assert { type: "json" };
import colors from "colors";

const client = new Client({
  intents: 8,
});
client.database = supabase.createClient(
  config.supabase.url,
  config.supabase.key
);

client.on("ready", () => {
  console.clear();
  console.log(`Ghostie's ready! :)`.green);
});

client.on("interaction", async (message) => {
  switch (message.customId) {
    case "ping":
      message.reply("Pong!");
      break;
  }
});

client.login(config.token);
