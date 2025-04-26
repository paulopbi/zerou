import "./WithoutGame.css";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";

const WithoutGame = () => {
  const addGameLinkRef = useRef<null | HTMLAnchorElement>(null);
  useEffect(() => {
    if (addGameLinkRef.current) {
      addGameLinkRef.current.focus();
    }

    return () => {};
  }, []);

  return (
    <div className="empty-state">
      <h6 className="color-info--dark">Sua lista de jogos está vazia</h6>
      <p>Adicione jogos a sua lista no botão abaixo.</p>
      <Link
        to="/adicionar"
        className="empty-state__button button button--default"
        ref={addGameLinkRef}
      >
        Adicionar Jogo <Plus width={24} height={24} />
      </Link>
    </div>
  );
};

export default WithoutGame;
