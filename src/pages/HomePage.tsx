import "./HomePage.css";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getFirestoreCollection } from "@/utils/getFirestoreCollection";
import { useAuth } from "@/contexts/AuthContext";
import { DatabaseSchemaType } from "@/types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import Navbar from "@/components/Navbar";
import WithoutGame from "@/components/WithoutGame";
import GameCard from "@/components/GameCard";
import Loading from "@/components/Loading";

const HomePage = () => {
  const [database, setDatabase] = useState<null | DatabaseSchemaType[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleDeleteGame = async (gameID: string) => {
    await deleteDoc(doc(db, "games", gameID));
    setDatabase((prev) => prev?.filter((game) => game.id !== gameID) || []);
    return;
  };

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      setIsLoading(true);

      try {
        const databaseResponse = await getFirestoreCollection("games");
        setDatabase(databaseResponse);
      } catch (error) {
        console.log("algo deu errado: " + error);
        setError("Algo deu errado, tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  console.log(database);
  if (isLoading) {
    return <Loading />;
  }

  if (!database || database.length === 0) {
    return (
      <>
        <Navbar />
        {/* no content */}
        <section className="container">
          <WithoutGame />
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="home container">
        <div className="home__heading">
          <h6 className="home__title">
            {user?.displayName
              ? `Olá ${user.displayName}, Pesquise por algum jogo...`
              : "Pesquise por algum jogo..."}
          </h6>
          <input
            type="text"
            className="home__input"
            placeholder="Pesquise pelos seus jogos..."
          />
          <Link to="/adicionar" className="home__button button button--default">
            Adicionar Jogo <PlusIcon width={24} height={24} />
          </Link>
        </div>

        {error && <p className="message-error text-center">{error}</p>}

        <article className="home__cards">
          {database.map((game) => (
            <GameCard
              key={game.title}
              gameData={game}
              deleteGame={handleDeleteGame}
            />
          ))}
        </article>
      </section>
    </>
  );
};

export default HomePage;
