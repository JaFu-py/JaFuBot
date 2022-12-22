import { client } from "../app.js";
import { supa } from "../app.js";
import {
  SelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} from "@discordjs/builders";

const addSuggestion = async (interaction) => {
  const params = {
    author: interaction.user.id,
    title: interaction.options.getString("title"),
    description: interaction.options.getString("description"),
    status: "pending",
  };
  const { data, error } = await supa
    .from("suggestions")
    .insert(params)
    .select("*");
  if (error) {
    console.log(error);
  }
  interaction.reply(`Suggestion added!`);
};

const listSuggestions = async (interaction) => {
  const { data: suggestions, error } = await supa
    .from("suggestions")
    .select("*");
  if (error) {
    console.log(error);
  }

  interaction.reply({
    components: [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("suggestionsSLCT")
          .setPlaceholder("Select a suggestion")
          .addOptions(
            suggestions.map((suggestion) => {
              return {
                label: suggestion.title,
                value: String(suggestion.id),
                description: suggestion.description,
              };
            })
          )
      ),
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("suggestionsBTN")
          .setLabel("Refresh")
          .setStyle(2)
      ),
    ],
  });
};

const editSuggestion = async (interaction) => {
  const params = {
    title: interaction.options.getString("title"),
    description: interaction.options.getString("description"),
  };
};
export default async (interaction) => {
  switch (interaction.options.getSubcommand()) {
    case "add":
      await addSuggestion(interaction);
      break;
    case "view":
      await listSuggestions(interaction);
      break;
    /*case "edit":
      await deleteSuggestion(interaction);
      break;
    case "delete":
      await deleteSuggestion(interaction);
      break;
    case "approve":
      await approveSuggestion(interaction);
      break;
    case "deny":
      await denySuggestion(interaction);
      break;*/
  }
};
