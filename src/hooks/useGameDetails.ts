import { db } from "@/config/firebase";
import { DatabaseSchemaType, ToastType } from "@/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGameDetails = (id?: string) => {
  const [gameData, setGameData] = useState<DatabaseSchemaType | null>(null);
  const [editorContent, setEditorContent] = useState<string | undefined>("");
  const [isSaving, setIsSaving] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  const saveDescription = async () => {
    if (!id || !gameData) return;
    setIsSaving(true);
    setSystemMessage({
      message: "",
      variant: null,
    });

    try {
      const docRef = doc(db, "games", id);
      await updateDoc(docRef, { description: editorContent });

      setGameData(
        (prev) => prev && { ...prev, description: editorContent || "" }
      );
      setSystemMessage({
        message: "Descrição salva com sucesso!",
        variant: "success",
      });

      setTimeout(() => setSystemMessage({ message: "", variant: null }), 3000);
      setCanSave(true);
    } catch (error) {
      console.error(error);
      setSystemMessage({
        message: "Erro ao salvar a descrição. Tente novamente.",
        variant: "danger",
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) {
        setSystemMessage({
          message: "ID inválido. Tente novamente.",
          variant: "danger",
        });
        return;
      }

      try {
        const gameRef = doc(db, "games", id);
        const snap = await getDoc(gameRef);

        if (!snap.exists()) {
          setSystemMessage({
            message: "Jogo não encontrado.",
            variant: "danger",
          });
          return;
        }

        const data = snap.data() as DatabaseSchemaType;
        setGameData(data);
        setEditorContent(data.description);
      } catch (error) {
        console.error(error);
        setSystemMessage({
          message: "Erro ao buscar dados do jogo.",
          variant: "danger",
        });
      }
    };

    fetchGame();
  }, [id]);

  return {
    gameData,
    editorContent,
    isSaving,
    canSave,
    systemMessage,
    handleEditorChange,
    saveDescription,
  };
};

export default useGameDetails;
