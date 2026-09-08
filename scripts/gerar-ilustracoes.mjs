/**
 * Gera as imagens ILUSTRATIVAS das publicações de Ana Clara e Mateus.
 *
 * As fotografias reais do projeto mostram o rosto de Lucas Oliveira; usá-las
 * em publicações de outros estudantes falsearia a autoria. Enquanto não houver
 * fotos próprias, estas ilustrações na identidade da marca ocupam o lugar —
 * são claramente gráficas, não simulam uma fotografia.
 *
 * Basta substituir os arquivos por fotos reais e ajustar width/height em
 * posts.js quando elas existirem.
 *
 *   node scripts/gerar-ilustracoes.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const dir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "assets",
  "imagens"
);

const W = 1440;
const H = 1080;

const cena = ({ ceu1, ceu2, brilho, chao, motivo }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${ceu1}"/>
      <stop offset="100%" stop-color="${ceu2}"/>
    </linearGradient>
    <radialGradient id="sol" cx="0.5" cy="0.52" r="0.5">
      <stop offset="0%" stop-color="${brilho}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${brilho}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#ceu)"/>
  <circle cx="${W * 0.5}" cy="${H * 0.52}" r="${W * 0.42}" fill="url(#sol)"/>

  <!-- colinas -->
  <path d="M0 ${H * 0.74} Q ${W * 0.24} ${H * 0.62} ${W * 0.5} ${H * 0.73}
           T ${W} ${H * 0.7} L ${W} ${H} L 0 ${H} Z" fill="${chao}" opacity="0.55"/>
  <path d="M0 ${H * 0.83} Q ${W * 0.3} ${H * 0.72} ${W * 0.62} ${H * 0.82}
           T ${W} ${H * 0.79} L ${W} ${H} L 0 ${H} Z" fill="${chao}" opacity="0.85"/>

  ${motivo}
</svg>`;

// Mãos abertas segurando um coração — o mesmo motivo do ícone de doação.
const maosComCoracao = `
<g transform="translate(${W / 2}, ${H * 0.5}) scale(15)" fill="none"
   stroke="#ffffff" stroke-opacity="0.92" stroke-width="1.25"
   stroke-linecap="round" stroke-linejoin="round">
  <g transform="translate(-12,-12)">
    <path d="M12 8.9c-.9-1.6-3.4-1.4-3.4.6 0 1.5 2 2.9 3.4 3.8 1.4-.9 3.4-2.3 3.4-3.8 0-2-2.5-2.2-3.4-.6Z"/>
    <path d="M4 15.4h2.6l2.7 1.6h3.3a1 1 0 0 0 0-2h-2.2"/>
    <path d="m13 16.6 4.6-1.7a1.4 1.4 0 0 1 1.7 2l-4.1 3a3 3 0 0 1-1.8.6H9.3L6.6 19H4"/>
  </g>
</g>`;

// Globo simples — o mesmo motivo do ícone de missão.
const globo = `
<g transform="translate(${W / 2}, ${H * 0.48}) scale(15)" fill="none"
   stroke="#ffffff" stroke-opacity="0.92" stroke-width="1.25"
   stroke-linecap="round" stroke-linejoin="round">
  <g transform="translate(-12,-12)">
    <circle cx="12" cy="12" r="7.5"/>
    <path d="M4.5 12h15"/>
    <path d="M12 4.5c1.95 2.05 3 4.7 3 7.5s-1.05 5.45-3 7.5c-1.95-2.05-3-4.7-3-7.5s1.05-5.45 3-7.5Z"/>
  </g>
</g>`;

const arquivos = [
  {
    nome: "publicacao-ana-clara",
    svg: cena({
      ceu1: "#0a2f63",
      ceu2: "#164a86",
      brilho: "#dfb62e",
      chao: "#07203f",
      motivo: maosComCoracao,
    }),
  },
  {
    nome: "publicacao-mateus",
    svg: cena({
      ceu1: "#07203f",
      ceu2: "#104175",
      brilho: "#67b2f5",
      chao: "#041329",
      motivo: globo,
    }),
  },
];

for (const { nome, svg } of arquivos) {
  const buf = Buffer.from(svg);
  await sharp(buf).png().toFile(path.join(dir, `${nome}.png`));
  await sharp(buf).webp({ quality: 88 }).toFile(path.join(dir, `${nome}.webp`));
  console.log(`${nome}: ${W}x${H}  png + webp`);
}
