import { db } from "@/config/firebase";
import { ToastType } from "@/types";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  INITIAL_PLATFORM_VALUE,
  INITIAL_STATUS_VALUE,
  TIMEOUT_TO_REMOVE_TOAST,
} from "@/constants";
import { useNavigate } from "react-router";

const useAddGame = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [platform, setPlatform] = useState(INITIAL_PLATFORM_VALUE);
  const [status, setStatus] = useState(INITIAL_STATUS_VALUE);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const validateAddGameForm = () => {
    if (!title.trim()) {
      setSystemMessage({
        message: "O titulo é obrigatório",
        variant: "danger",
      });
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setPlatform(INITIAL_PLATFORM_VALUE);
    setStatus(INITIAL_STATUS_VALUE);
    setTitle("");
    setImageSource("");
    setEditorContent("");
  };

  const handleAddGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSystemMessage({ message: "", variant: null });

    if (!user) {
      setSystemMessage({
        message: "Você precisa estar logado",
        variant: "danger",
      });
      return;
    }

    if (!validateAddGameForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const gameRef = collection(db, "games");
      const newGameRef = doc(gameRef);

      const databaseSchema = {
        id: newGameRef.id,
        user_id: user.uid,
        image_source: imageSource,
        title,
        platform,
        status,
        description: editorContent,
        created_at: Timestamp.now(),
      };

      await setDoc(newGameRef, databaseSchema);

      setSystemMessage({
        message: "Jogo adicionado com sucesso!",
        variant: "success",
      });

      resetForm();

      setTimeout(() => {
        setSystemMessage({ message: "", variant: null });
        navigate("/");
      }, TIMEOUT_TO_REMOVE_TOAST);
    } catch (error) {
      console.error(error);
      setSystemMessage({
        message: "Algo deu errado, tente novamente mais tarde.",
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAddGame,
    setTitle,
    setImageSource,
    setPlatform,
    setStatus,
    setEditorContent,
    isLoading,
    title,
    imageSource,
    platform,
    status,
    editorContent,
    systemMessage,
  };
};

export default useAddGame;
