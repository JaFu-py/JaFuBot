import { client } from "../app.js";
import config from "../config.json" assert { type: "json" };
import { supa } from "../app.js";
client.on("messageCreate", async (message) => {
  // Background Checks
  if (message.author.bot) return;
  if (message.channel.type === "DM") return;
  if (message.channel.id in config.channels.ignore) return;

  //Get user data from supabase
  const { data, error } = await supa
    .from("users")
    .select("*")
    .eq("id", message.author.id);
  if (error) {
    console.log(error);
  }
  const user = data[0];
  //Calculate xp
  const earned_xp = Math.max(
    Math.floor(Math.random() * 2.5 * message.content.length),
    1
  );
  //If user isn't in database, add them
  if (data.length === 0) {
    await supa.from("users").insert([
      {
        id: message.author.id,
        level: 0,
        xp: earned_xp,
      },
    ]);
    return;
  }

  let new_xp = user.xp + earned_xp;
  //If user has leveled up, update database
  if (new_xp >= (user.level + 1) * 100) {
    user.level++;
    const new_xp = 0;
    await supa
      .from("users")
      .update({ level: user.level, xp: new_xp })
      .eq("id", message.author.id);
    message.reply(
      `${message.author.mention} has leveled up to level ${new_level}!`
    );
  }
  //Update xp
  await supa.from("users").update({ xp: new_xp }).eq("id", message.author.id);
});
console.log("events.levels.js loaded!");
