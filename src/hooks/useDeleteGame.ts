import { db } from "@/config/firebase";
import { TIMEOUT_TO_REMOVE_TOAST } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { DatabaseSchemaType, ToastType } from "@/types";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useState } from "react";

const useDeleteGame = (id: string, path: string) => {
  const { user } = useAuth();
  const [isDeleted, setIsDeleted] = useState(false);
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const handleDelete = async () => {
    setSystemMessage({ message: "", variant: null });

    if (!user) {
      setSystemMessage({
        message: "Você precisa estar logado",
        variant: "danger",
      });
      setIsDeleted(false);
      return;
    }

    try {
      const deleteRef = doc(db, path, id);
      const docSnap = await getDoc(deleteRef);

      if (!docSnap.exists()) {
        throw new Error("Jogo não encontrado.");
      }

      const gameData = docSnap.data() as DatabaseSchemaType;
      if (gameData.user_id !== user.uid) {
        throw new Error("Você não tem permissão para deletar este jogo.");
      }

      await deleteDoc(deleteRef);

      setSystemMessage({ message: "O jogo foi deletado!", variant: "success" });
      setIsDeleted(true);
      console.log("chegou até aqui");

      setTimeout(() => {
        console.log("timeou finalizou");
        setSystemMessage({ message: "", variant: null });
      }, TIMEOUT_TO_REMOVE_TOAST);
    } catch (error) {
      console.error(error);
      setIsDeleted(false);
      setSystemMessage({
        message: "Algo deu errado ao deletar o jogo, tente novamente.",
        variant: "danger",
      });
    }
  };

  return {
    isDeleted,
    systemMessage,
    handleDelete,
  };
};

export default useDeleteGame;
