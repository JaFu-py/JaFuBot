import { client } from "../app.js";

client.on("messageCreate", async (message) => {
  if (message.content.includes("<@1041264105945841714>")) {
    message.reply(
      "Greetings, fellow traveller. They call me <@!1041264105945841714> and I am a humble servant of King JaFu. I have been trained in the art of serving. I have traveled far and wide, serving at the king's side and attending to his every need. In these dark and perilous times, I am here to offer my counsel and advice to those who seek it. If you have any questions or concerns, do not hesitate to ask. I am at your service."
    );
  }
});
console.log("events.onPing.js loaded");
