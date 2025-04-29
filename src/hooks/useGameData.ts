import { DatabaseSchemaType, ToastType } from "@/types";
import { getFirestoreCollection } from "@/utils/getFirestoreCollection";
import { useEffect, useState } from "react";

const useGameData = () => {
  const [database, setDatabase] = useState<null | DatabaseSchemaType[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const fetchData = async () => {
    setSystemMessage({ message: "", variant: null });
    setIsLoading(true);

    try {
      const databaseResponse = await getFirestoreCollection("games");
      setDatabase(databaseResponse);
    } catch (error) {
      console.error("algo deu errado: " + error);
      setSystemMessage({
        message: "Algo deu errado, tente novamente.",
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    database,
    isLoading,
    systemMessage,
    setDatabase,
    refreshData: fetchData,
  };
};

export default useGameData;
