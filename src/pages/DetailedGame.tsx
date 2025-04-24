import "./DetailedGames.css";
import { Link, useParams } from "react-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { DatabaseSchemaType } from "@/types";
import { getBadgeModifier } from "@/utils/getBadgeModifier";
import { ArrowLeft } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";

const DetailedGame = () => {
  const { id } = useParams<{ id: string }>();
  const [gameData, setGameData] = useState<DatabaseSchemaType | null>(null);
  const [editorContent, setEditorContent] = useState(gameData?.description);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [systemMessage, setSystemMessage] = useState("");

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  const saveDescription = async () => {
    if (!id || !gameData) return;

    setIsSaving(true);
    setError("");
    setSystemMessage("");

    try {
      const gameRef = doc(db, "games", id);
      await updateDoc(gameRef, {
        description: editorContent,
      });

      setGameData(
        (prev) => prev && { ...prev, description: editorContent || "" }
      );
      setSystemMessage("Descrição salva com sucesso!");
      setTimeout(() => setSystemMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setError("Algo deu errado ao salvar os dados, tente novamente!");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const getDatabaseGames = async () => {
      setError("");
      setSystemMessage("");

      if (!id) {
        setError("Algo deu errado ao conectar com o banco de dados.");
        return;
      }

      try {
        const gameRef = doc(db, "games", id);
        const gameSnap = await getDoc(gameRef);

        if (!gameSnap.exists()) {
          setError("Jogo não encontrdo, tente novamente");
          return;
        }

        setGameData(gameSnap.data() as DatabaseSchemaType);
      } catch (error) {
        console.error(error);
        setError("Algo deu errado, tente novamente");
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
        <section className="container detailed">
          <Link to="/" className="detailed__link">
            <ArrowLeft /> Voltar
          </Link>

          <h1 className="detailed__title">{gameData.title}</h1>

          <div className="detailed__badges-container">
            <span
              className={`badge badge--${getBadgeModifier(gameData.status)}`}
            >
              {gameData.status}
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

          <Button
            onClick={saveDescription}
            disabled={isSaving || editorContent === gameData.description}
            variant="success"
          >
            {isSaving ? "Salvando..." : "Salvar Descrição"}
          </Button>
        </section>

        {error && (
          <div className="system-message">
            <p className="message-info--dark system-message__text">{error}</p>
          </div>
        )}

        {systemMessage && (
          <div className="system-message">
            <p className="message-info--dark system-message__text">
              {systemMessage}
            </p>
          </div>
        )}
      </>
    );
  }
};

export default DetailedGame;
