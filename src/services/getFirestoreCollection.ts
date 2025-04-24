import { db } from "@/config/firebase";
import { DatabaseSchemaType } from "@/types";
import { collection, getDocs } from "firebase/firestore";

export const getFirestoreCollection = async (path: string) => {
  const gamesCollectionRef = collection(db, path);
  const snapShot = await getDocs(gamesCollectionRef);

  const firestoreData = snapShot.docs.map(
    (doc) => doc.data() as DatabaseSchemaType
  );

  return firestoreData;
};
