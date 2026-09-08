import { formatBRL, getProgressPercent } from "../data/campaigns.js";
import "./CampaignCard.css";

export default function CampaignCard({ campaign }) {
  // Progresso sempre derivado dos dados; a interface não o edita.
  const percent = getProgressPercent(campaign);

  return (
    <section className="campaign" aria-labelledby="campaign-title">
      <div className="campaign__head">
        <h3 className="campaign__title" id="campaign-title">
          {campaign.title}
        </h3>
        <span className="campaign__percent">{percent}%</span>
      </div>

      <div
        className="campaign__track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso da campanha ${campaign.title}`}
      >
        <div className="campaign__fill" style={{ width: `${percent}%` }} />
      </div>

      <p className="campaign__amounts">
        {formatBRL(campaign.raisedCents)} / {formatBRL(campaign.goalCents)}
      </p>
    </section>
  );
}
