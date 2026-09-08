/**
 * Gera versões WebP das fotografias das publicações.
 *
 * Os arquivos originais são preservados: o script apenas escreve um `.webp`
 * ao lado de cada alvo. O PostCard usa a versão WebP quando ela existe e
 * mantém o original como alternativa dentro de <picture>.
 *
 * Para otimizar outra imagem, acrescente o nome do arquivo em TARGETS.
 *
 *   npm run images
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, "..", "src", "assets", "imagens");

// Qualidade alta o bastante para não degradar rostos nem cenas noturnas.
const QUALITY = 82;

const TARGETS = ["missao-calebe.png", "missao-chile.png"];

const existing = new Set(await readdir(dir));

for (const file of TARGETS) {
  if (!existing.has(file)) {
    console.log(`ausente: ${file}`);
    continue;
  }

  const from = path.join(dir, file);
  const to = from.replace(/\.(png|jpe?g)$/i, ".webp");

  const meta = await sharp(from).metadata();
  await sharp(from).webp({ quality: QUALITY }).toFile(to);

  const before = (await stat(from)).size;
  const after = (await stat(to)).size;
  const saved = Math.round((1 - after / before) * 100);

  console.log(
    `${file}  ${meta.width}x${meta.height}  ` +
      `${(before / 1024 / 1024).toFixed(2)} MB -> ` +
      `${(after / 1024 / 1024).toFixed(2)} MB  (-${saved}%)  ` +
      `width={${meta.width}} height={${meta.height}}`
  );
}
