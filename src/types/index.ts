import { Timestamp } from "firebase/firestore";

export type DatabaseSchemaType = {
  id: string;
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
};

export type ToastType = {
  message: string;
  variant: "success" | "danger" | "info" | "warning" | null;
};
