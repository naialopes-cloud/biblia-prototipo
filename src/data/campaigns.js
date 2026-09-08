/**
 * DADOS DE DEMONSTRAÇÃO — campanhas fictícias.
 * A campanha é um objeto separado do perfil e se liga a ele por `studentId`.
 * Valores financeiros vivem SOMENTE aqui: nunca dentro de uma publicação,
 * e as campanhas aparecem apenas no perfil do respectivo estudante.
 * Nenhum valor aqui corresponde a uma arrecadação real.
 */
export const campaigns = [
  {
    id: "missao-uruguai",
    studentId: "lucas-oliveira",
    title: "Missão Uruguai",
    goalCents: 1000000, // R$ 10.000,00
    raisedCents: 750000, // R$ 7.500,00
  },
  {
    id: "missao-paraguai",
    studentId: "ana-clara-mendes",
    title: "Missão Paraguai",
    goalCents: 800000, // R$ 8.000,00
    raisedCents: 320000, // R$ 3.200,00
  },
  {
    id: "missao-bolivia",
    studentId: "mateus-rocha",
    title: "Missão Bolívia",
    goalCents: 1200000, // R$ 12.000,00
    raisedCents: 660000, // R$ 6.600,00
  },
];

export const getCampaignByStudent = (studentId) =>
  campaigns.find((c) => c.studentId === studentId);

/** Progresso derivado dos dados — nunca editável pela interface. */
export const getProgressPercent = (campaign) => {
  if (!campaign?.goalCents) return 0;
  const pct = (campaign.raisedCents / campaign.goalCents) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
};

/** R$ 10.000 — sem centavos quando o valor é redondo. */
export const formatBRL = (cents) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
