import "./DetailedGames.css";
import { Link, useParams } from "react-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { DatabaseSchemaType, ToastType } from "@/types";
import { getBadgeModifier } from "@/utils/getBadgeModifier";
import { ArrowLeft } from "lucide-react";
import { statusDictionary } from "@/utils/statusDictionary ";
import RichTextEditor from "@/components/RichTextEditor";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";

const DetailedGame = () => {
  const { id } = useParams<{ id: string }>();
  const [gameData, setGameData] = useState<DatabaseSchemaType | null>(null);
  const [editorContent, setEditorContent] = useState(gameData?.description);
  const [isSaving, setIsSaving] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const handleEditorChange = (newContent: string) => {
    setCanSave(false);
    setEditorContent(newContent);
  };

  const saveDescription = async () => {
    if (!id || !gameData) return;

    setIsSaving(true);
    setSystemMessage({ message: "", variant: null });

    try {
      const gameRef = doc(db, "games", id);
      await updateDoc(gameRef, {
        description: editorContent,
      });

      setGameData(
        (prev) => prev && { ...prev, description: editorContent || "" }
      );
      setSystemMessage({
        message: "Descrição salva com sucesso!",
        variant: "success",
      });
      setTimeout(() => setSystemMessage({ message: "", variant: null }), 3000);
    } catch (error) {
      console.error(error);
      setSystemMessage({
        message: "Algo deu errado ao salvar os dados, tente novamente!",
        variant: "danger",
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const getDatabaseGames = async () => {
      setSystemMessage({ message: "", variant: null });

      if (!id) {
        setSystemMessage({
          message: "Algo deu errado ao conectar com o banco de dados.",
          variant: "danger",
        });
        return;
      }

      try {
        const gameRef = doc(db, "games", id);
        const gameSnap = await getDoc(gameRef);

        if (!gameSnap.exists()) {
          setSystemMessage({
            message: "Jogo não encontrdo, tente novamente",
            variant: "danger",
          });
          return;
        }

        setGameData(gameSnap.data() as DatabaseSchemaType);
      } catch (error) {
        console.error(error);
        setSystemMessage({
          message: "Algo deu errado, tente novamente",
          variant: "danger",
        });
      }
    };
    getDatabaseGames();
  }, [id]);

  if (gameData) {
    return (
      <>
        <Navbar />
        {gameData.image_source ? (
          <div className="detailed__image-container">
            <img
              className="detailed__image"
              src={gameData.image_source}
              alt={`Foto Do Jogo ${gameData.title}`}
              fetchPriority="high"
            />
          </div>
        ) : (
          <div className="detailed__background">
            <h1 className="detailed__background-text">{gameData.title}</h1>
          </div>
        )}
        <section className="container">
          <Link to="/" className="detailed__link">
            <ArrowLeft /> Voltar
          </Link>

          <h1 className="detailed__title">{gameData.title}</h1>

          <div className="detailed__badges-container">
            <span
              className={`badge badge--${getBadgeModifier(gameData.status)}`}
            >
              {statusDictionary(gameData.status)}
            </span>
            <span
              className={`badge badge--${getBadgeModifier(gameData.platform)}`}
            >
              {gameData.platform}
            </span>
          </div>

          {gameData && (
            <div className="detailed__description-container">
              <RichTextEditor
                key={id}
                content={gameData.description}
                onChange={handleEditorChange}
              />
            </div>
          )}

          <div className="detailed__btn-controll">
            <Button
              onClick={saveDescription}
              disabled={isSaving || canSave}
              variant="success"
            >
              {isSaving ? "Salvando..." : "Salvar Descrição"}
            </Button>
          </div>
        </section>

        {systemMessage.message && systemMessage.variant && (
          <Toast variant={systemMessage.variant}>{systemMessage.message}</Toast>
        )}
      </>
    );
  }
};

export default DetailedGame;
