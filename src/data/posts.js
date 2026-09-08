import postAmazonas from "../assets/imagens/post-amazonas-lucas.png";
import postCalebe from "../assets/imagens/missao-calebe.png";
import postCalebeWebp from "../assets/imagens/missao-calebe.webp";
import postChile from "../assets/imagens/missao-chile.png";
import postChileWebp from "../assets/imagens/missao-chile.webp";
import postAna from "../assets/imagens/publicacao-ana-clara.png";
import postAnaWebp from "../assets/imagens/publicacao-ana-clara.webp";
import postMateus from "../assets/imagens/publicacao-mateus.png";
import postMateusWebp from "../assets/imagens/publicacao-mateus.webp";

/**
 * DADOS DE DEMONSTRAÇÃO — publicações fictícias.
 *
 * Cada publicação tem um `id` estável e exclusivo, que também é a chave das
 * curtidas e comentários salvos localmente — mudar um id descarta o que já
 * estava salvo daquele post. Os ids das três publicações de Lucas são os
 * originais, para não perder o que já foi salvo.
 *
 * A publicação NÃO carrega dado financeiro nenhum: meta, arrecadação e
 * progresso vivem em campaigns.js e aparecem apenas no perfil.
 *
 * `date` é a data em ISO (AAAA-MM-DD); o texto exibido é derivado por
 * formatPostDate, sempre em data absoluta.
 *
 * `width` e `height` são as medidas originais da imagem; servem para reservar
 * a proporção antes do download e evitar saltos de layout.
 *
 * As fotografias ilustram lembranças de etapas anteriores e não comprovam
 * nenhuma missão real. As imagens de Ana Clara e Mateus são ILUSTRAÇÕES
 * geradas na identidade da marca (ver scripts/gerar-ilustracoes.mjs), porque
 * as fotos do projeto mostram o rosto de Lucas e atribuí-las a outra pessoa
 * falsearia a autoria.
 */
export const posts = [
  {
    id: "post-missao-chile",
    studentId: "lucas-oliveira",
    title: "Missão Chile",
    image: postChile,
    imageWebp: postChileWebp,
    width: 1448,
    height: 1086,
    imageAlt:
      "Lucas Oliveira, à esquerda, de camisa branca e lenço amarelo, com o grupo da Missão Chile segurando as bandeiras do Chile e do Brasil",
    caption: "Missão Chile: unidos pela fé, além das fronteiras. 💛",
    date: "2026-08-29",
    likes: 41,
    comments: [
      { id: "chi1", author: "Beatriz Lima", text: "Que experiência especial!" },
      { id: "chi2", author: "Gabriel Alves", text: "Que Deus abençoe essa caminhada!" },
    ],
  },
  {
    id: "post-mateus-litoral",
    studentId: "mateus-rocha",
    title: "Missão Litoral",
    image: postMateus,
    imageWebp: postMateusWebp,
    width: 1440,
    height: 1080,
    imageAlt: "Ilustração de um globo sobre um horizonte azul da Missão Litoral",
    caption: "Servindo juntos e compartilhando o amor de Deus.",
    date: "2026-08-24",
    likes: 27,
    comments: [
      { id: "mat1", author: "Helena Dias", text: "Lindo trabalho, Mateus!" },
      { id: "mat2", author: "Tiago Nunes", text: "Contem comigo em oração. 🙏" },
    ],
  },
  {
    id: "post-missao-calebe",
    studentId: "lucas-oliveira",
    title: "Missão Calebe",
    image: postCalebe,
    imageWebp: postCalebeWebp,
    width: 1672,
    height: 940,
    imageAlt:
      "Lucas Oliveira, de camiseta amarela da Missão Calebe, em uma selfie durante a entrega de alimentos em uma praça à noite",
    caption: "Missão Calebe: fé em ação e amor ao próximo. 💛",
    date: "2026-08-18",
    likes: 32,
    comments: [
      { id: "cal1", author: "Mariana Costa", text: "Que lindo ver essa união!" },
      { id: "cal2", author: "Rafael Santos", text: "Servir faz a diferença! 🙏" },
    ],
  },
  {
    id: "post-ana-sertao",
    studentId: "ana-clara-mendes",
    title: "Missão Sertão",
    image: postAna,
    imageWebp: postAnaWebp,
    width: 1440,
    height: 1080,
    imageAlt:
      "Ilustração de mãos abertas segurando um coração sobre um horizonte dourado da Missão Sertão",
    caption: "Cada encontro renova nossa esperança. 🙏",
    date: "2026-08-05",
    likes: 35,
    comments: [
      { id: "ana1", author: "Juliana Freire", text: "Que testemunho lindo! 💛" },
      { id: "ana2", author: "Marcos Vieira", text: "Deus abençoe vocês." },
    ],
  },
  {
    id: "post-amazonia-2024",
    studentId: "lucas-oliveira",
    title: "Amazônia",
    image: postAmazonas,
    width: 1023,
    height: 1468,
    imageAlt:
      "Lucas Oliveira sorrindo ao lado de uma criança em uma comunidade da Amazônia",
    caption: "Na Amazônia, servindo com amor e compartilhando a fé. 💛",
    date: "2026-07-12",
    likes: 24,
    comments: [
      { id: "c1", author: "Ana Souza", text: "Que Deus abençoe essa missão! 💛" },
      { id: "c2", author: "Pedro Lima", text: "Muito bom acompanhar vocês!" },
    ],
  },
];

/** Feed da Home: todas as publicações, da mais recente para a mais antiga. */
export const getFeedPosts = () =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPostsByStudent = (studentId) =>
  getFeedPosts().filter((p) => p.studentId === studentId);

export const getPost = (id) => posts.find((p) => p.id === id);

/**
 * "12 de julho de 2026". A data é montada no fuso local a partir dos
 * componentes da string ISO, para não escorregar um dia.
 */
export const formatPostDate = (iso) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
    new Date(year, month - 1, day)
  );
};
