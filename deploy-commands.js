import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import config from "./config.json" assert { type: "json" };
import commands from "./commands.json" assert { type: "json" };

const rest = new REST({ version: "10" }).setToken(config.bot.token);
config.guild.forEach(async (guild) => {
  await rest.put(Routes.applicationGuildCommands(config.bot.id, guild), {
    body: commands,
  });
});

console.log("commands.deployed!");
