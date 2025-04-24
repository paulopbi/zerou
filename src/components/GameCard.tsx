import "./GameCard.css";
import { IDatabaseSchema } from "@/types";
import { getBadgeModifier } from "@/utils/getBadgeModifier";
import { truncateText } from "@/utils/truncateText";
import { X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import Button from "@/components/Button";

interface GameCardProps {
  gameData: IDatabaseSchema;
  deleteGame: (gameID: string) => void;
}

const GameCard = ({ gameData, deleteGame }: GameCardProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClick = () => {
    setIsRemoving(true);

    setTimeout(() => {
      deleteGame(gameData.id);
    }, 300); // tempo da animação em ms
  };

  return (
    <div className={`game-card ${isRemoving ? "removing" : ""}`}>
      <div className="game-card__controllers">
        <Button
          className="game-card__controllers-button"
          onClick={handleClick}
          title="Ao clicar, o jogo será excluido."
        >
          <X width={22} height={22} color="var(--color-danger-dark)" />
        </Button>
      </div>
      <div className="game-card__image-container">
        {gameData.image_source ? (
          <img
            className="game-card__image-picture"
            src={gameData.image_source}
            alt={`Foto do Jogo ${gameData.title}`}
            loading="lazy"
          />
        ) : (
          <div className="game-card__image-label">
            <span className="game-card__image-label-text">
              {truncateText(gameData.title, 40)}
            </span>
          </div>
        )}
      </div>

      <div className="game-card__content">
        <h6 className="game-card__title">{truncateText(gameData.title, 28)}</h6>
        <div className="game-card__badges">
          <span className={`badge badge--${getBadgeModifier(gameData.status)}`}>
            {gameData.status}
          </span>
          <span
            className={`badge badge--${getBadgeModifier(gameData.platform)}`}
          >
            {gameData.platform}
          </span>
        </div>
        <Link
          to={`/jogo/${gameData.id}`}
          className="game-card__button button button--ghost"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
