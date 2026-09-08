import Sheet from "./Sheet.jsx";
import { formatBRL, getProgressPercent } from "../data/campaigns.js";
import "./DonateSheet.css";

/**
 * Painel demonstrativo de doação.
 * Não coleta dados bancários, não simula cobrança e não altera o progresso.
 *
 * Sem campanha em contexto (ao tocar "Doar" na navegação fora de um perfil),
 * explica onde a doação acontece em vez de inventar uma campanha.
 */
export default function DonateSheet({ open, campaign = null, onClose }) {
  const percent = campaign ? getProgressPercent(campaign) : 0;

  return (
    <Sheet
      open={open}
      title={campaign ? campaign.title : "Apoiar um estudante"}
      subtitle="Demonstração do protótipo. Nenhum pagamento será realizado."
      onClose={onClose}
    >
      <div className="donate">
        {campaign ? (
          <dl className="donate__facts">
            <div className="donate__fact">
              <dt>Meta</dt>
              <dd>{formatBRL(campaign.goalCents)}</dd>
            </div>
            <div className="donate__fact">
              <dt>Progresso</dt>
              <dd>{percent}% da meta</dd>
            </div>
          </dl>
        ) : (
          <p className="donate__note donate__note--lead">
            Abra o perfil de um estudante para ver a campanha dele e o botão de
            doação.
          </p>
        )}

        <p className="donate__note">
          Nesta etapa do protótipo não há formulário de pagamento, cobrança nem
          coleta de dados bancários.
        </p>

        <button type="button" className="btnYellow donate__close" onClick={onClose}>
          Entendi
        </button>
      </div>
    </Sheet>
  );
}
