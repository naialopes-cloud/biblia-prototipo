import { SearchIcon, MenuIcon } from "./icons.jsx";
import marcaEscrita from "../assets/imagens/marca-biblia-escrita.png";
import "./AppHeader.css";

/**
 * Cabeçalho compacto da Home: menu à esquerda, marca ao centro e busca
 * à direita. As colunas laterais têm a mesma largura, então a logo cai no
 * centro exato da tela, não no meio do espaço que sobra.
 */
export default function AppHeader({ onSearch, onOpenMenu, menuOpen, menuId }) {
  return (
    <header className="appHeader">
      <button
        type="button"
        className="appHeader__icon appHeader__icon--menu"
        onClick={onOpenMenu}
        aria-label="Abrir missões para apoiar"
        aria-expanded={menuOpen}
        aria-controls={menuId}
      >
        <MenuIcon className="appHeader__glyph" />
      </button>

      {/* O logotipo escrito identifica a marca sozinho. O nome acessível
          fica no grupo; a imagem entra decorativa para não duplicar. */}
      <div className="appHeader__brand" role="img" aria-label="Bibl.ia">
        <img
          className="appHeader__wordmark"
          src={marcaEscrita}
          alt=""
          aria-hidden="true"
        />
      </div>

      <button
        type="button"
        className="appHeader__icon appHeader__icon--search"
        onClick={onSearch}
        aria-label="Buscar estudantes"
      >
        <SearchIcon className="appHeader__glyph" />
      </button>
    </header>
  );
}
