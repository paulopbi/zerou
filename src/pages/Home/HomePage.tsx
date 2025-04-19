import "./HomePage.css";
import GameCard from "../../components/ui/card/GameCard";
import Button from "../../components/ui/Button";
import React from "react";
import AddGameModal from "../../components/ui/modal/AddGameModal";
import Alert from "../../components/ui/error/Alert";
import { Plus } from "lucide-react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { emptyArray } from "../../constants";

interface IDatabaseContent {
  content: string;
  created_at: Timestamp;
  displayName: string;
  imageUrl: string | null;
  platform: string;
  status: string;
  title: string;
  user_id: string;
}

const HomePage = () => {
  //state
  const [isAddGameModalOpen, setIsAddGameModalOpen] = React.useState(false);
  const [databaseContent, setDatabaseContent] = React.useState<
    IDatabaseContent[]
  >([]);

  const getDatabaseData = async () => {
    const gamesCollectionRef = collection(db, "games");
    const snapShot = await getDocs(gamesCollectionRef);

    const firestoreData = snapShot.docs.map(
      (doc) => doc.data() as IDatabaseContent
    );

    return firestoreData;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const databaseResponse = await getDatabaseData();
      setDatabaseContent(databaseResponse);
    };

    fetchData();
  }, []);

  if (databaseContent.length === emptyArray) {
    return (
      <React.Fragment>
        <section className="home-empty">
          {/* heading */}
          <div className="home-empty-heading">
            <h6>Clique no botão "adicionar jogos"</h6>
          </div>

          {/* modal button */}
          <div className="home-empty-modal-button">
            <Button onClick={() => setIsAddGameModalOpen((prev) => !prev)}>
              Adicionar Jogos <Plus size={18} />
            </Button>
          </div>
          {/* warning message */}
          <Alert message="Sua lista de jogos está vazia" variant="info" />
        </section>

        {/* modal */}
        {isAddGameModalOpen && (
          <AddGameModal setIsAddGameModalOpen={setIsAddGameModalOpen} />
        )}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <section className="home">
        <div className="container">
          {/* heading */}
          <div className="home-heading">
            <h6>Pesquise seus jogos</h6>
          </div>

          {/* search */}
          <div className="home-search">
            <div>
              <input
                type="search"
                placeholder="Pesquisar por The Witcher 3, Fallout, Skyrim..."
              />
            </div>
          </div>

          {/* heading button */}
          <div className="home-add-button">
            <Button onClick={() => setIsAddGameModalOpen((prev) => !prev)}>
              Adicionar Jogos <Plus size={18} />
            </Button>
          </div>

          {/* filter */}
          <div className="home-filter">
            <select>
              <option value="" disabled>
                Selecione Uma Opção
              </option>
              <option value="date">Data De Criação</option>
              <option value="desc">Ordem Descendente</option>
              <option value="asc">Ordem Ascendente</option>
            </select>
          </div>

          <div className="card-container">
            {databaseContent.map((game, index) => (
              <GameCard
                title={game.title}
                imageUrl={game.imageUrl}
                platform={game.platform}
                status={game.status}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* add game modal */}
      {isAddGameModalOpen && (
        <AddGameModal setIsAddGameModalOpen={setIsAddGameModalOpen} />
      )}
    </React.Fragment>
  );
};

export default HomePage;
