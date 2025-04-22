import { db } from "@/config/firebase";
import { IDatabaseSchema } from "@/types";
import { collection, getDocs } from "firebase/firestore";

export const getFirestoreCollection = async (path: string) => {
  const gamesCollectionRef = collection(db, path);
  const snapShot = await getDocs(gamesCollectionRef);

  const firestoreData = snapShot.docs.map(
    (doc) => doc.data() as IDatabaseSchema
  );

  return firestoreData;
};
