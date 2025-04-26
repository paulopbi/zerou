import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Link } from "react-router";
import { LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div>
        <Link to="/" className="logo">
          Zerou
        </Link>
      </div>
      <nav>
        <ul className="navbar__links-list">
          <li>
            <Link to="/" className="link">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/sobre" className="link">
              Sobre
            </Link>
          </li>
          <li>
            <button
              title="Ao clicar, irá sair da sua conta o usuário"
              className="navbar__logout"
              onClick={() => signOut(auth)}
            >
              <LogOut height={24} width={24} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
