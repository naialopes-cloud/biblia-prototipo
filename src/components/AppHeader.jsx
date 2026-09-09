import { SearchIcon } from "./icons.jsx";
import marcaBiblia from "../assets/imagens/marca-biblia.png";
import marcaEscrita from "../assets/imagens/marca-biblia-escrita.png";
import "./AppHeader.css";

/** Cabeçalho compacto da Home: marca à esquerda, busca à direita. */
export default function AppHeader({ onSearch }) {
  return (
    <header className="appHeader">
      {/* Grupo da marca: livro + logotipo. As duas imagens são decorativas;
          o nome acessível fica no grupo, sem texto visível duplicado. */}
      <div className="appHeader__brand" role="img" aria-label="Bibl.ia">
        <span className="appHeader__markWrap">
          <img className="appHeader__mark" src={marcaBiblia} alt="" aria-hidden="true" />
        </span>
        <img
          className="appHeader__wordmark"
          src={marcaEscrita}
          alt=""
          aria-hidden="true"
        />
      </div>

      <button
        type="button"
        className="appHeader__action"
        onClick={onSearch}
        aria-label="Buscar estudantes"
      >
        <SearchIcon className="appHeader__searchIcon" />
      </button>
    </header>
  );
}
