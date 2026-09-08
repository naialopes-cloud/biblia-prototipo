import { useEffect, useRef, useState } from "react";
import Avatar from "../components/Avatar.jsx";
import { ChevronLeftIcon, SearchIcon, CloseIcon } from "../components/icons.jsx";
import { searchStudents } from "../data/students.js";
import "./SearchScreen.css";

/** Busca local pelos três estudantes fictícios. Sem backend, sem rede. */
export default function SearchScreen({ onBack, onOpenProfile }) {
  const [termo, setTermo] = useState("");
  const campo = useRef(null);

  useEffect(() => {
    campo.current?.focus();
  }, []);

  const resultados = searchStudents(termo);
  const buscou = termo.trim().length > 0;

  return (
    <div className="search">
      <div className="search__bar">
        <button
          type="button"
          className="search__back"
          onClick={onBack}
          aria-label="Voltar para o início"
        >
          <ChevronLeftIcon width="22" height="22" />
        </button>

        <div className="search__field">
          <SearchIcon className="search__fieldIcon" width="18" height="18" />
          <label className="visually-hidden" htmlFor="search-input">
            Buscar por nome, escola ou cidade
          </label>
          <input
            id="search-input"
            ref={campo}
            className="search__input"
            type="search"
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="Nome, escola ou cidade"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
          />
          {buscou && (
            <button
              type="button"
              className="search__clear"
              onClick={() => {
                setTermo("");
                campo.current?.focus();
              }}
              aria-label="Limpar busca"
            >
              <CloseIcon width="16" height="16" />
            </button>
          )}
        </div>
      </div>

      <div className="search__results">
        {!buscou && (
          <p className="search__hint">
            Digite para encontrar estudantes por nome, escola ou cidade.
          </p>
        )}

        {buscou && resultados.length === 0 && (
          <p className="search__empty">
            Nenhum estudante encontrado para “{termo.trim()}”.
          </p>
        )}

        {resultados.length > 0 && (
          <ul className="search__list">
            {resultados.map((student) => (
              <li key={student.id}>
                <button
                  type="button"
                  className="search__item"
                  onClick={() => onOpenProfile(student.id)}
                >
                  <Avatar student={student} size={44} />
                  <span className="search__itemText">
                    <span className="search__itemName">{student.name}</span>
                    <span className="search__itemSchool">{student.school}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
