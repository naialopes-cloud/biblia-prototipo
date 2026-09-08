# Bibl.ia — protótipo mobile (etapa 1)

Perfil público de um estudante missionário, visto por outra pessoa.
**Somente UI/UX.** Sem backend, banco de dados, autenticação, pagamentos ou IA.
Perfil, campanha e publicação são **fictícios**.

## Rodar

```bash
npm install
npm run dev       # desenvolvimento — http://192.168.0.69:5173
npm run build     # build de produção em dist/
npm run preview   # serve dist/ em http://192.168.0.69:4173
```

Ambos os servidores escutam em `0.0.0.0`, então o celular abre pelo IP da
máquina, desde que esteja no mesmo Wi-Fi.

### Link público temporário

O preview é exposto por um túnel do Cloudflare (`trycloudflare.com`), que
publica **apenas o conteúdo de `dist/`**. Para recriar:

```bash
npm run build
npm run preview
# em outro terminal:
cloudflared tunnel --url http://localhost:4173 --no-autoupdate
```

O domínio sorteado precisa ser aceito em `preview.allowedHosts`
(`vite.config.js` já libera `.trycloudflare.com`).

## Estrutura

```
src/
  assets/imagens/       todas as fotografias usadas pelo app (originais + .webp)
  styles/tokens.css     cores, espaçamentos, raios, tipografia — comece por aqui
  styles/global.css     reset e regras da página
  data/                 dados fictícios: students, campaigns, posts
  hooks/                trava de rolagem e persistência de demonstração
  components/           um .jsx + um .css por componente
  App.jsx / App.css     montagem da tela e fundo azul com manchas de luz
```

O **perfil** e a **campanha** são objetos separados, ligados por `studentId`.
O progresso (75%) é sempre derivado de `raisedCents / goalCents` e não pode ser
editado pela interface.

## Fotografias e otimização

Todas as imagens do app ficam em `src/assets/imagens/`. `npm run images`
gera as versões WebP das fotos listadas em `scripts/optimize-images.mjs`,
preservando os originais — o PostCard usa `<picture>` e cai no original
quando o WebP não existe.

## Publicações

Três publicações independentes, empilhadas na rolagem principal do perfil:
Amazônia, Missão Calebe e Missão Chile. Cada uma tem um `id` estável, que é
também a chave das curtidas e comentários salvos localmente — curtir ou
comentar em uma nunca afeta as outras.

## Interações simuladas

- Curtir/descurtir alterna entre a contagem base do post e base + 1
  (24/25, 32/33, 41/42), sem acumular.
- Painel de comentários por publicação, com dois comentários iniciais cada;
  novos entram como "Você" apenas na publicação correspondente. Comentários
  vazios não são publicados. Ao fechar, a rolagem volta ao mesmo ponto.
- Botões "Doar" (bio, campanha e navegação) abrem o mesmo painel demonstrativo:
  *"Demonstração do protótipo. Nenhum pagamento será realizado."* Não há coleta
  de dados bancários e o progresso não muda.
- Curtidas e comentários ficam no `localStorage` sob o prefixo `biblia.demo.`
  — dados de demonstração, só naquele navegador (ver `hooks/useDemoStorage.js`).

## Decisões provisórias

- **"Início" e "Guia"** mostram um aviso de que a área ainda não faz parte do
  protótipo. A função do Guia não foi definida — nada de recursos bíblicos ou
  de IA foi inventado.
- **"Doar" na navegação** abre o mesmo painel da campanha, porque a campanha do
  perfil visitado é a única doação existente nesta etapa.
- **Voltar** usa o histórico interno quando existir; como esta é a primeira e
  única tela, hoje sempre avisa isso.
- **Compartilhar** usa `navigator.share` quando disponível e cai para copiar o
  link. Cancelamento ou falha não mostram confirmação.

## Fotografias

`src/assets/` contém as duas fotos fornecidas, usadas sem alteração de rosto.
A selfie ilustra uma **lembrança de uma visita anterior** à Amazônia; ela não
comprova nenhuma missão real e a campanha atual financia uma nova etapa.

`referencias/referencia-perfil.png` é a captura usada como referência visual —
a interface foi reconstruída com elementos reais, não sobreposta à imagem.
