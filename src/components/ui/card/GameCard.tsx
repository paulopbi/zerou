import "./GameCard.css";
import Button from "../Button";
import BadgeStatus from "../badge/BadgeStatus";
import BadgePlatform from "../badge/BadgePlatform";

interface IGame {
  title: string;
  imageUrl: string | null;
  platform: string;
  status: string;
}

const GameCard = ({ title, status, imageUrl, platform }: IGame) => {
  const truncateText =
    title.length < 20 ? title : title.substring(0, 20).concat("...");
  return (
    <div className="game-card-container">
      {imageUrl ? (
        <div className="game-card-container--with-image">
          <img src={imageUrl} alt={title} />
        </div>
      ) : (
        <div className="game-card-container--without-image">
          <span>{title}</span>
        </div>
      )}

      <div>
        <h2 className="game-card__title">{truncateText}</h2>
      </div>

      <div className="game-card-info">
        <BadgeStatus status={status}>{status}</BadgeStatus>
        <BadgePlatform platform={platform}>{platform}</BadgePlatform>
      </div>

      <div>
        <Button variant="ghost">Ver detalhes</Button>
      </div>
    </div>
  );
};

export default GameCard;
