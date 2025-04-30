import "./DetailedGames.css";
import { Link, useParams } from "react-router";
import { getBadgeModifier } from "@/utils/getBadgeModifier";
import { ArrowLeft } from "lucide-react";
import { statusDictionary } from "@/utils/statusDictionary ";
import RichTextEditor from "@/components/RichTextEditor";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
import useGameDetails from "@/hooks/useGameDetails";

const DetailedGame = () => {
  const { id } = useParams<{ id: string }>();

  const {
    gameData,
    editorContent,
    isSaving,
    systemMessage,
    handleEditorChange,
    saveDescription,
  } = useGameDetails(id);

  if (!gameData) return null;

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
          <span className={`badge badge--${getBadgeModifier(gameData.status)}`}>
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
              content={editorContent || ""}
              onChange={handleEditorChange}
            />
          </div>
        )}

        <div className="detailed__btn-controll">
          {isSaving ? (
            <Button disabled={isSaving} variant="success">
              Salvando...
            </Button>
          ) : (
            <Button onClick={saveDescription} variant="success">
              Salvar Descrição
            </Button>
          )}
        </div>
      </section>

      {systemMessage.message && systemMessage.variant && (
        <Toast variant={systemMessage.variant}>{systemMessage.message}</Toast>
      )}
    </>
  );
};

export default DetailedGame;
