import "./Navbar.css";
import React from "react";
import { Link } from "react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="navbar-heading">
      <nav className="container nav">
        <Link to="/" className="logo">
          Zerou
        </Link>

        <nav className="nav">
          <ul>
            <li>
              <Link to="/sobre" className="link">
                Sobre
              </Link>
            </li>

            {/* if user exist */}
            {user && (
              <React.Fragment>
                <li>
                  <Link to="/" className="link">
                    Inicio
                  </Link>
                </li>
                <li>
                  <button
                    title="Clique para sair"
                    className="nav-logout__btn"
                    onClick={logout}
                  >
                    <LogOut size={24} />
                  </button>
                </li>
              </React.Fragment>
            )}

            {/* if user don't exist */}
            {!user && (
              <React.Fragment>
                <li>
                  <Link to="/login" className="link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/criar-conta" className="link">
                    Criar Conta
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </nav>
    </header>
  );
};

export default Navbar;
