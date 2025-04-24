import "./WithoutGame.css";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const WithoutGame = () => {
  return (
    <div className="empty-state">
      <h6 className="empty-state__title">Sua lista de jogos está vazia</h6>
      <p className="message-info--dark">
        Adicione jogos a sua lista no botão abaixo.
      </p>
      <Link
        to="/adicionar"
        className="empty-state__button button button--default"
      >
        Adicionar Jogo <Plus width={24} height={24} />
      </Link>
    </div>
  );
};

export default WithoutGame;
