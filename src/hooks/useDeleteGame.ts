import { db } from "@/config/firebase";
import { TIMEOUT_TO_REMOVE_TOAST } from "@/constants";
import { ToastType } from "@/types";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";

const useDeleteGame = (id: string, path: string) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const handleDelete = async () => {
    setSystemMessage({
      message: "",
      variant: null,
    });

    try {
      const deleteRef = doc(db, path, id);
      await deleteDoc(deleteRef);

      setIsDeleted(true);
      setSystemMessage({ message: "O jogo foi deletado!", variant: "success" });

      setTimeout(() => {
        setSystemMessage({
          message: "",
          variant: null,
        });
      }, TIMEOUT_TO_REMOVE_TOAST);
    } catch (error) {
      console.log(error);
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
