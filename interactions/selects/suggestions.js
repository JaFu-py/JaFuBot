import { client } from "../../app.js";
import { supa } from "../../app.js";
import { EmbedBuilder } from "@discordjs/builders";

export default async (interaction) => {
  const { data: suggestions, error } = await supa
    .from("suggestions")
    .select("*")
    .eq("id", interaction.values[0]);
  if (error) {
    console.log(error);
    return;
  }
  const suggestion = suggestions[0];
  const embed = new EmbedBuilder()
    .setTitle(String(suggestion.title ?? "None"))
    .setDescription(String(suggestion.description));
  interaction.update({ embeds: [embed] });
};
