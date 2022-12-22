export default async () => {
  const { data: suggestion, error } = await supa
    .from("suggestions")
    .select("*");
  if (error) {
    console.log(error);
  }
  const suggestions = [{ label: "None", value: "None" }];
  suggestions.push(suggestion);
  const s = new SelectMenuBuilder()
    .setCustomId("suggestions")
    .setPlaceholder("Select a suggestion")
    .addOptions(suggestions);
  console.log(s.toJSON());
  return s.toJSON();
};
