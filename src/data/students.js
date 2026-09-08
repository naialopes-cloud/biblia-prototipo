import avatarLucas from "../assets/imagens/avatar-lucas-oliveira.png";
import avatarAnaClara from "../assets/imagens/avatar-ana-clara-mendes.png";

/** Escola única desta versão do protótipo — evita duplicar o nome por engano. */
export const SCHOOL = "Escola Missionária Esperança";

/**
 * DADOS DE DEMONSTRAÇÃO — pessoas fictícias criadas para o protótipo.
 * Nenhuma informação aqui representa um estudante real.
 *
 * `avatar` só existe quando há um retrato próprio no projeto. Sem retrato,
 * o componente Avatar desenha as iniciais — nunca reaproveita o rosto de
 * outra pessoa.
 */
export const students = [
  {
    id: "lucas-oliveira",
    name: "Lucas Oliveira",
    role: "Aluno missionário",
    avatar: avatarLucas,
    avatarAlt: "Retrato de Lucas Oliveira, aluno missionário",
    school: SCHOOL,
    location: "Florianópolis, SC",
    missions: ["Missão Chile", "Missão Sertão", "Missão Calebe"],
    // Missão para a qual o estudante se prepara agora.
    preparingFor: "Missão Uruguai",
  },
  {
    id: "ana-clara-mendes",
    name: "Ana Clara Mendes",
    role: "Aluna missionária",
    avatar: avatarAnaClara,
    avatarAlt:
      "Retrato de Ana Clara Mendes, jovem de cabelos longos castanhos, sorrindo ao entardecer",
    school: SCHOOL,
    location: "Joinville, SC",
    missions: ["Missão Sertão", "Missão Calebe"],
    preparingFor: "Missão Paraguai",
  },
  {
    id: "mateus-rocha",
    name: "Mateus Rocha",
    role: "Aluno missionário",
    avatar: null,
    school: SCHOOL,
    location: "Blumenau, SC",
    missions: ["Missão Calebe", "Missão Litoral"],
    preparingFor: "Missão Bolívia",
  },
];

export const getStudent = (id) => students.find((s) => s.id === id);

/** Busca local por nome, escola ou cidade — sem acentos e sem caixa. */
const normalizar = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const searchStudents = (termo) => {
  const alvo = normalizar(termo);
  if (!alvo) return [];
  return students.filter((s) =>
    [s.name, s.school, s.location].some((campo) =>
      normalizar(campo).includes(alvo)
    )
  );
};

/** Iniciais para o avatar de quem ainda não tem retrato no projeto. */
export const initialsOf = (name) =>
  name
    .split(" ")
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
