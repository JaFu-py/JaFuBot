export default async (interaction) => {
  const { data: suggestions, error } = await supa
    .from("suggestions")
    .select("*");
  if (error) {
    console.log(error);
  }
  const suggestion = suggestions[0];
  interaction.update({
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
