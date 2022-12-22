export default (interaction, error) => {
  console.error(error);
  interaction.reply({
    content:
      "Greetings fellow traveller. I have encountered an error. I am sorry, but I am unable to be of assistance today. Please try again or seek the counsel of a wiser soul. In these dark and perilous times, it is best to tread carefully and seek the guidance of those who have come before. May your path be true and your sword sharp.",
    ephemeral: true,
  });
};
