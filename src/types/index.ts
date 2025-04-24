export interface IDatabaseSchema {
  id: string;
  title: string;
  image_source: string;
  platform:
    | "xbox"
    | "pc"
    | "playstation"
    | "nintendo"
    | "mobile"
    | "steam deck";
  status: "playing" | "wishlist" | "replaying" | "dont started" | "completed";
  description: string;
}
