import "./HomePage.css";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getFirestoreCollection } from "@/utils/getFirestoreCollection";
import { useAuth } from "@/contexts/AuthContext";
import { DatabaseSchemaType, ToastType } from "@/types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { TIMEOUT_TO_REMOVE_TOAST } from "@/constants";
import Navbar from "@/components/Navbar";
import WithoutGame from "@/components/WithoutGame";
import GameCard from "@/components/GameCard";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";

const HomePage = () => {
  const [database, setDatabase] = useState<null | DatabaseSchemaType[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });
  const { user } = useAuth();

  const handleDeleteGame = async (gameID: string) => {
    setSystemMessage({ message: "", variant: null });
    try {
      await deleteDoc(doc(db, "games", gameID));
      setDatabase((prev) => prev?.filter((game) => game.id !== gameID) || []);
      setSystemMessage({
        message: "Jogo excluido com sucesso!",
        variant: "success",
      });

      setTimeout(() => {
        setSystemMessage({ message: "", variant: null });
      }, TIMEOUT_TO_REMOVE_TOAST);
    } catch (error) {
      console.error("Algo deu errado: " + error);
      setSystemMessage({
        message: "Algo deu errado ao excluir o jogo, tente novamente!",
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setSystemMessage({ message: "", variant: null });
      setIsLoading(true);
      try {
        const databaseResponse = await getFirestoreCollection("games");
        setDatabase(databaseResponse);
      } catch (error) {
        console.error("algo deu errado: " + error);
        setSystemMessage({
          message: "Algo deu errado, tente novamente.",
          variant: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!database || database.length === 0) {
    return (
      <>
        <Navbar />
        {/* no content */}
        <section className="container">
          <WithoutGame user={user} />
        </section>
      </>
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      <Navbar />
      <section className="home container">
        <div className="home__heading">
          <p className="home__title">
            {user?.displayName
              ? `Olá ${user.displayName}, adicione algum jogo clicando no botão abaixo.`
              : "Adicione algum jogo clicando no botão abaixo."}
          </p>
          <Link to="/adicionar" className="home__button button button--default">
            Adicionar Jogo <PlusIcon width={24} height={24} />
          </Link>
        </div>

        <article className="home__cards">
          {database.map((game) => (
            <GameCard
              key={game.id}
              gameData={game}
              deleteGame={handleDeleteGame}
            />
          ))}
        </article>
      </section>
      {systemMessage.message && systemMessage.variant && (
        <Toast variant={systemMessage.variant}>{systemMessage.message}</Toast>
      )}
    </>
  );
};

export default HomePage;
