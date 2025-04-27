import "./GameCard.css";
import { DatabaseSchemaType } from "@/types";
import { getBadgeModifier } from "@/utils/getBadgeModifier";
import { truncateText } from "@/utils/truncateText";
import { X } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import Button from "@/components/Button";
import { useState } from "react";
import { statusDictionary } from "@/utils/statusDictionary ";

interface GameCardProps {
  gameData: DatabaseSchemaType;
  deleteGame: (gameID: string) => void;
}

const GameCard = ({ gameData, deleteGame }: GameCardProps) => {
  const [shouldAnimateWhenRemove, setShouldAnimateWhenRemove] = useState(false);
  const handleClick = () => {
    setShouldAnimateWhenRemove(true);
    setTimeout(() => {
      deleteGame(gameData.id);
    }, 500);
  };

  const cardVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    hover: {
      y: -20,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      animate={shouldAnimateWhenRemove ? "exit" : "animate"}
      transition={{ duration: 0.5 }}
      className="game-card"
    >
      <div className="game-card__controllers">
        <Button
          className="game-card__controllers-button"
          onClick={handleClick}
          title="Ao clicar, o jogo será excluído."
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
        <h6 className="game-card__title">{truncateText(gameData.title, 26)}</h6>
        <div className="game-card__badges">
          <span className={`badge badge--${getBadgeModifier(gameData.status)}`}>
            {statusDictionary(gameData.status)}
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
    </motion.div>
  );
};

export default GameCard;
