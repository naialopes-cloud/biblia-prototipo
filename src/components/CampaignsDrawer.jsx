import { useEffect, useMemo, useRef, useState } from "react";
import Avatar from "./Avatar.jsx";
import { CloseIcon } from "./icons.jsx";
import { students } from "../data/students.js";
import {
  getCampaignByStudent,
  getProgressPercent,
  formatBRL,
} from "../data/campaigns.js";
import { useScrollLock } from "../hooks/useScrollLock.js";
import "./CampaignsDrawer.css";

const ORDENACOES = [
  { id: "precisam", rotulo: "Mais precisam" },
  { id: "perto", rotulo: "Perto da meta" },
];

/**
 * Painel lateral com as campanhas de todos os estudantes.
 * Os dados vêm de students.js e campaigns.js — nada é duplicado aqui.
 */
export default function CampaignsDrawer({ id, open, onClose, onOpenStudent }) {
  const [ordem, setOrdem] = useState("precisam");
  const painel = useRef(null);
  const fechar = useRef(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    fechar.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // mantém o foco dentro do painel
      const alvos = painel.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!alvos?.length) return;
      const primeiro = alvos[0];
      const ultimo = alvos[alvos.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const itens = useMemo(() => {
    const lista = students
      .map((aluno) => {
        const campanha = getCampaignByStudent(aluno.id);
        if (!campanha) return null;
        return { aluno, campanha, percent: getProgressPercent(campanha) };
      })
      .filter(Boolean);

    return lista.sort((a, b) => {
      // concluídas sempre por último, nas duas ordenações
      const aFeita = a.percent >= 100;
      const bFeita = b.percent >= 100;
      if (aFeita !== bFeita) return aFeita ? 1 : -1;
      const diff =
        ordem === "precisam" ? a.percent - b.percent : b.percent - a.percent;
      if (diff !== 0) return diff;
      return a.aluno.name.localeCompare(b.aluno.name, "pt-BR");
    });
  }, [ordem]);

  if (!open) return null;

  return (
    <div className="drawer" role="presentation">
      <div className="drawer__backdrop" onClick={onClose} />

      <aside
        id={id}
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Missões para apoiar"
        ref={painel}
      >
        <div className="drawer__head">
          <h2 className="drawer__title">Missões para apoiar</h2>
          <button
            type="button"
            className="drawer__close"
            onClick={onClose}
            aria-label="Fechar missões para apoiar"
            ref={fechar}
          >
            <CloseIcon width="20" height="20" />
          </button>
        </div>

        <div className="drawer__sort" role="group" aria-label="Ordenar missões">
          {ORDENACOES.map(({ id: valor, rotulo }) => (
            <button
              key={valor}
              type="button"
              className={`drawer__sortBtn${ordem === valor ? " is-active" : ""}`}
              onClick={() => setOrdem(valor)}
              aria-pressed={ordem === valor}
            >
              {rotulo}
            </button>
          ))}
        </div>

        <ul className="drawer__list">
          {itens.map(({ aluno, campanha, percent }) => (
            <li key={campanha.id}>
              <button
                type="button"
                className="drawer__card"
                onClick={() => onOpenStudent(aluno.id)}
              >
                <span className="drawer__cardHead">
                  <Avatar student={aluno} size={40} />
                  <span className="drawer__cardText">
                    <span className="drawer__cardName">{aluno.name}</span>
                    <span className="drawer__cardMission">{campanha.title}</span>
                  </span>
                  <span className="drawer__percent">{percent}%</span>
                </span>

                <span
                  className="drawer__track"
                  role="progressbar"
                  aria-valuenow={percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Progresso da campanha ${campanha.title}`}
                >
                  <span
                    className="drawer__fill"
                    style={{ width: `${percent}%` }}
                  />
                </span>

                <span className="drawer__cardFoot">
                  <span className="drawer__valores">
                    {formatBRL(campanha.raisedCents)} /{" "}
                    {formatBRL(campanha.goalCents)}
                  </span>
                  <span className="drawer__acao">Ver missão</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
