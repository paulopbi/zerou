import { Timestamp } from "firebase/firestore";

export interface IDatabaseSchema {
  user_id: string;
  title: string;
  image_source: string;
  status: "playing" | "wishlist" | "replaying" | "dont started" | "completed";
  platform:
    | "xbox"
    | "pc"
    | "playstation"
    | "nintendo"
    | "mobile"
    | "steam deck";
  description: string;
  created_at: Timestamp;
}
