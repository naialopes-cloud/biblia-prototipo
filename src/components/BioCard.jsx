import { SchoolIcon, PinIcon, MissionIcon, HandHeartIcon } from "./icons.jsx";
import "./BioCard.css";

function Chip({ icon: Icon, children }) {
  return (
    <span className="chip">
      <Icon className="chip__icon" width="16" height="16" />
      <span className="chip__label">{children}</span>
    </span>
  );
}

export default function BioCard({ student, onDonate }) {
  return (
    <section className="bioCard" aria-label="Sobre o estudante">
      <div className="bioCard__row">
        <Chip icon={SchoolIcon}>{student.school}</Chip>
      </div>
      <div className="bioCard__row">
        <Chip icon={PinIcon}>{student.location}</Chip>
      </div>

      <p className="bioCard__label bioCard__label--group">Missões realizadas</p>
      <div className="bioCard__row bioCard__row--missions">
        {student.missions.map((mission) => (
          <Chip key={mission} icon={MissionIcon}>
            {mission}
          </Chip>
        ))}
      </div>

      <p className="bioCard__prep">
        <span className="bioCard__label">Preparo-me para:</span>
        <Chip icon={MissionIcon}>{student.preparingFor}</Chip>
      </p>

      <button type="button" className="btnYellow btnYellow--sm" onClick={onDonate}>
        <HandHeartIcon width="18" height="18" />
        <span>Doar</span>
      </button>
    </section>
  );
}
