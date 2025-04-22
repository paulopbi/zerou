export const getBadgeModifier = (type: string) => {
  if (type === "dont started") return "dont-started";
  if (type === "steam deck") return "steam-deck";
  return type;
};
