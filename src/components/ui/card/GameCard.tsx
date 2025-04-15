import styles from "./GameCard.module.css";
import Button from "../Button";
import BadgeStatus from "../badge/BadgeStatus";
import BadgePlatform from "../badge/BadgePlatform";

interface IGame {
  title: string;
  imageSource: string;
  platform: string;
  status: string;
}

const GameCard = ({ title, status, imageSource, platform }: IGame) => {
  const truncateText = title.substring(0, 20).concat("...");
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImageContainer}>
        <img src={imageSource} alt={title} />
      </div>

      <div>
        <h2 className={styles.cardTitle}>{truncateText}</h2>
      </div>

      <div className={styles.cardInfos}>
        <BadgeStatus status={status}>{status}</BadgeStatus>
        <BadgePlatform platform={platform}>{platform}</BadgePlatform>
      </div>

      <div>
        <Button>Ver detalhes</Button>
      </div>
    </div>
  );
};

export default GameCard;
