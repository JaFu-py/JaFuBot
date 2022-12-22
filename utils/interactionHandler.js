export default async (interaction) => {
  switch (interaction.customId) {
    case "suggestionsSLCT":
      await import("../interactions/selects/suggestions.js").then((m) =>
        m.default(interaction)
      );
      break;
    case "suggestionsBTN":
  }
};
