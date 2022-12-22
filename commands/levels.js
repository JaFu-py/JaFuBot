import { supa } from "../app.js";

export default async (interaction) => {
  const { data, error } = await supa
    .from("users")
    .select("*")
    .eq("id", interaction.options.getUser("user") ?? interaction.user.id);

  if (error) console.log(error);
  console.log(interaction.options.getUser("user"));
  //--------------------//
  if (data.length === 0) {
    supa.from("users").insert([
      {
        id: interaction.user.id,
        level: 0,
        xp: 0,
      },
    ]);
    if (interaction.options.getUser("user") === null)
      interaction.reply("You are level 0 with 0 xp!");
    else return;
    interaction.reply(
      `${interaction.options.getUser("user").mention} is level 0 with 0 xp!`
    );
    return;
  } else {
    const user = data[0];

    if (interaction.options.getUser("user") === null)
      interaction.reply(`You are level ${user.level} with ${user.xp} xp!`);
    //--\\
    else
      interaction.reply(
        `${interaction.options.getUser("user")?.mention} is level ${
          user.level
        } with ${user.xp} xp!`
      );
  }
};
