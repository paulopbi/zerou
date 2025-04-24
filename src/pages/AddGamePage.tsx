import "./AddGamePage.css";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { Link, useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/contexts/AuthContext";
import RichTextEditor from "@/components/RichTextEditor";

const AddGamePage = () => {
  const [title, setTitle] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();
  const Navigate = useNavigate();

  const createGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!platform || !status) {
      setError("Selecione a plataforma e status");
    }

    if (!user) {
      return;
    }

    try {
      const databaseSchema = {
        user_id: user.uid,
        title: title,
        image_source: imageSource,
        platform,
        status,
        description: editorContent,
        created_at: Timestamp.now(),
      };

      const gameCollectionRef = collection(db, "games");
      const databaseResp = await addDoc(gameCollectionRef, databaseSchema);

      if (!databaseResp) {
        setError(
          "Algo deu errado ao criar o jogo, por favor, tente novamente!"
        );
      }

      window.alert("Jogo adicionado com sucesso!");
      Navigate("/");
    } catch (error) {
      console.error(error);
      setError("Algo deu errado, tente novamente mais tarde.");
    }
  };

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  return (
    <>
      <Navbar />
      <section className="add-game container">
        <h5>Adicione Um Jogo</h5>

        <form className="add-game__form" onSubmit={createGame}>
          <input
            type="text"
            placeholder="Nome do jogo"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="url"
            placeholder="Digite a url da imagem"
            value={imageSource}
            onChange={(e) => setImageSource(e.target.value)}
          />

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="" disabled>
              Selecione a Plataforma
            </option>
            <option value="xbox">Xbox</option>
            <option value="pc">PC</option>
            <option value="playstation">Playstation</option>
            <option value="nintendo">Nintendo</option>
            <option value="mobile">Mobile</option>
            <option value="steam deck">Steam Deck</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" disabled>
              Selecione o Status
            </option>
            <option value="completed">Finalizado</option>
            <option value="playing">Jogando</option>
            <option value="wishlist">Na lista</option>
            <option value="replaying">Rejogando</option>
            <option value="dont started">Não começei</option>
          </select>

          <RichTextEditor
            content={editorContent}
            onChange={handleEditorChange}
          />
          {error && <p className="error-message">{error}</p>}

          <div className="add-game__form-buttons">
            <Button type="submit" variant="success">
              Salvar
            </Button>
            <Link to="/" className="button button--ghost">
              Voltar
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddGamePage;
