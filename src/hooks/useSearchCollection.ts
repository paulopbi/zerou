import { db } from "@/config/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ToastType } from "@/types";

const useSearchCollection = <T>(collectionName: string) => {
  const { user } = useAuth();
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const fetchData = async () => {
    setSystemMessage({ message: "", variant: null });
    setIsLoading(true);

    try {
      if (!user) return;

      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where("user_id", "==", user.uid));
      const snapshot = await getDocs(q);

      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];

      setData(docs);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setSystemMessage({
        message: "Erro ao buscar dados, tente novamente.",
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    data,
    isLoading,
    systemMessage,
    refreshData: fetchData,
    setData,
  };
};

export default useSearchCollection;
