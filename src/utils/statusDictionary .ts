type statusDictionaryProps =
  | "playing"
  | "wishlist"
  | "replaying"
  | "dont started"
  | "completed";

export const statusDictionary = (statusType: statusDictionaryProps) => {
  let message = "";

  if (statusType === "playing") {
    message = "jogando";
  }

  if (statusType === "wishlist") {
    message = "na lista";
  }

  if (statusType === "replaying") {
    message = "rejogando";
  }

  if (statusType === "dont started") {
    message = "não começei";
  }

  if (statusType === "completed") {
    message = "finalizado";
  }
  return message;
};
