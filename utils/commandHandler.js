export default async (interaction) => {
  switch (interaction.commandName) {
    case "ping":
      interaction.reply("Pong!");
      break;

    case "level":
      await import("../commands/levels.js").then((m) => {
        m.default(interaction);
      });
      break;

    case "suggestions":
      await import("../commands/suggest.js").then((m) => {
        m.default(interaction);
      });
      break;

    default:
      await interaction.reply(
        "Greetings, fellow traveler. It appears you have asked an uncharted request. I am sorry, but I am unable to be of assistance today. Please try again or seek the counsel of a wiser soul. In these dark and perilous times, it is best to tread carefully and seek the guidance of those who have come before. May your path be true and your sword sharp."
      );
      break;
  }
};
