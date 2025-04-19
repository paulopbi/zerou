import "./AddGameModal.css";
import React from "react";
import InputWithLabel from "../InputWithLabel";
import Button from "../Button";
import { useAuth } from "../../../hooks/useAuth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import Alert from "../error/Alert";
import { firebaseErrorHandler } from "../../../firebase/firebaseErrorHandler";
import { FirebaseError } from "firebase/app";

interface IAddGameModal {
  setIsAddGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddGameModal = ({ setIsAddGameModalOpen }: IAddGameModal) => {
  const [title, setTitle] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [platform, setPlatform] = React.useState("xbox");
  const [status, setStatus] = React.useState("playing");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (!user) {
        throw new Error("Não foi possível adicionar os jogos");
      }
      await addDoc(collection(db, "games"), {
        user_id: user.uid,
        displayName: user.displayName,
        title,
        imageUrl,
        platform,
        status,
        content,
        created_at: Timestamp.now(),
      });

      setIsAddGameModalOpen(false);
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errorMessage = firebaseErrorHandler(err);
        setError(errorMessage);
        console.error(errorMessage);
        return;
      }
      setError("Ops, algo deu errado, tente novamente mais tarde!");
      console.error(err);
    }
  };
  return (
    <React.Fragment>
      <div className="modal">
        {/* modal container */}
        <div className="modal-container">
          {/* modal heading */}
          <div className="add-game-heading">
            <h6>Adicione um jogo a sua lista</h6>
          </div>

          {/* modal form */}
          <form className="add-game-form" onSubmit={handleSubmit}>
            {/* title */}
            <div>
              <InputWithLabel
                required
                type="text"
                label="Adicionar titulo"
                placeholder="Digite o titulo"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* image */}
            <div>
              <InputWithLabel
                type="text"
                label="Adicionar a url da imagem"
                placeholder="https://exemplo-imagem.png"
                id="image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            {/* platform */}
            <div>
              <label htmlFor="platform" className="label">
                Plataforma
              </label>
              <select
                name="platform"
                id="platform"
                onChange={(e) => setPlatform(e.target.value)}
                value={platform}
                required
              >
                <option value="" disabled>
                  Plataforma
                </option>
                <option value="xbox">Xbox</option>
                <option value="pc">PC</option>
                <option value="playstation">Playstation</option>
                <option value="nintendo">Nintendo</option>
                <option value="mobile">Mobile</option>
                <option value="steam deck">Steam Deck</option>
              </select>
            </div>

            {/* status */}
            <div>
              <label htmlFor="status" className="label">
                Status
              </label>
              <select
                name="status"
                id="status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                required
              >
                <option value="" disabled>
                  Status
                </option>
                <option value="completed">Finalizado</option>
                <option value="playing">Jogando</option>
                <option value="wishlist">Na lista</option>
                <option value="replaying">Rejogando</option>
                <option value="dont started">Não começei</option>
              </select>
            </div>

            {/* content */}
            <div>
              <label htmlFor="content" className="label">
                Conteúdo
              </label>
              {/* text area */}
              <div>
                <textarea
                  required
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            {/* error  */}
            {error && <Alert message={error} />}
            {/* buttons */}
            <div className="add-game-buttons">
              <Button variant="sucess" type="submit">
                Salvar
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => setIsAddGameModalOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
          <div
            className="modal-close-btn"
            onClick={() => setIsAddGameModalOpen(false)}
          >
            <X />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddGameModal;
