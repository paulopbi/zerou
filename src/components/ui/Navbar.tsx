import styles from "./Navbar.module.css";
import { Link } from "react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className={styles.heading}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo}>
          Zerou
        </Link>
        <ul className={styles.navList}>
          {user && (
            <li>
              <Link to="/" className="link">
                Inicio
              </Link>
            </li>
          )}
          <li>
            <Link to="/sobre" className="link">
              Sobre
            </Link>
          </li>
          {user && (
            <button
              title="Clique para sair"
              className={styles.logout}
              onClick={logout}
            >
              <LogOut />
            </button>
          )}
          {!user && (
            <li>
              <Link to="/login" className="link">
                Fazer Login
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/criar-conta" className="link">
                Criar Conta
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
