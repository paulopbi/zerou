import "./GameCard.css";
import Button from "../Button";
import BadgeStatus from "../badge/BadgeStatus";
import BadgePlatform from "../badge/BadgePlatform";
import { truncateText } from "../../../util/truncateText";

interface IGame {
  title: string;
  imageUrl: string | null;
  platform: string;
  status: string;
}

const GameCard = ({ title, status, imageUrl, platform }: IGame) => {
  const truncateTitle = truncateText(title, 30);
  return (
    <div className="game-card-container">
      {/* image or card */}
      {imageUrl ? (
        <div className="game-card-container--with-image">
          <img src={imageUrl} alt={title} />
        </div>
      ) : (
        <div className="game-card-container--without-image">
          <span>{title}</span>
        </div>
      )}

      {/* title */}
      <div>
        <h6 className="game-card__title">{truncateTitle}</h6>
      </div>

      {/* badges */}
      <div className="game-card-info">
        <BadgeStatus status={status}>{status}</BadgeStatus>
        <BadgePlatform platform={platform}>{platform}</BadgePlatform>
      </div>

      {/* button */}
      <div>
        <Button variant="ghost">Ver detalhes</Button>
      </div>
    </div>
  );
};

export default GameCard;
