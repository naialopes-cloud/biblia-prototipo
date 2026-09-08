import { initialsOf } from "../data/students.js";
import "./Avatar.css";

/**
 * Avatar do estudante: retrato quando existe no projeto, iniciais quando não.
 * Nunca reaproveita o rosto de outra pessoa.
 */
export default function Avatar({ student, size = 40, ring = false }) {
  const estilo = { width: size, height: size };
  const classe = `avatar${ring ? " avatar--ring" : ""}`;

  if (student.avatar) {
    return (
      <span className={classe} style={estilo}>
        <img
          className="avatar__img"
          src={student.avatar}
          alt={student.avatarAlt ?? `Retrato de ${student.name}`}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
        />
      </span>
    );
  }

  return (
    <span
      className={`${classe} avatar--initials`}
      style={{ ...estilo, fontSize: Math.round(size * 0.38) }}
      role="img"
      aria-label={`Avatar de ${student.name}`}
    >
      {initialsOf(student.name)}
    </span>
  );
}
