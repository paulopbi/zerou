import "./HomePage.css";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { DatabaseSchemaType } from "@/types";
import Navbar from "@/components/Navbar";
import WithoutGame from "@/components/WithoutGame";
import GameCard from "@/components/GameCard";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import useSearchCollection from "@/hooks/useSearchCollection";

const HomePage = () => {
  const { user } = useAuth();
  const {
    data: database,
    isLoading,
    systemMessage,
    setData,
  } = useSearchCollection<DatabaseSchemaType>("games");
  return (
    <>
      <Navbar />

      {database && database.length > 0 && (
        <main className="home container">
          <div className="home__heading">
            {user?.displayName ? (
              <p className="home__title">
                Olá {user.displayName}, adicione algum jogo clicando no botão
                abaixo.
              </p>
            ) : (
              <p>Adicione algum jogo clicando no botão abaixo.</p>
            )}
            <Link
              to="/adicionar"
              className="home__button button button--default"
            >
              Adicionar Jogo <PlusIcon width={24} height={24} />
            </Link>
          </div>

          <article className="home__cards">
            {database.map((game) => (
              <GameCard
                key={game.id}
                gameData={game}
                onDelete={(id) =>
                  setData(
                    (prev) => prev?.filter((game) => game.id !== id) || []
                  )
                }
              />
            ))}
          </article>
        </main>
      )}

      {(!database || database.length === 0) && (
        <section className="container">
          <WithoutGame user={user} />
        </section>
      )}

      {systemMessage.message && systemMessage.variant && (
        <Toast variant={systemMessage.variant}>{systemMessage.message}</Toast>
      )}

      {isLoading && <Loading />}
    </>
  );
};

export default HomePage;
