import "./ProfileHeader.css";

export default function ProfileHeader({ student }) {
  return (
    <div className="profileHeader">
      <div className="profileHeader__avatarRing">
        <img
          className="profileHeader__avatar"
          src={student.avatar}
          alt={student.avatarAlt}
          width="240"
          height="240"
        />
      </div>
      <h2 className="profileHeader__name">{student.name}</h2>
      <p className="profileHeader__role">{student.role}</p>
    </div>
  );
}
