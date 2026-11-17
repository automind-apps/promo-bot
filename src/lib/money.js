/**
 * Converte "R$ 1.299,90" -> 129990 (centavos, inteiro).
 * Retorna null para entradas inválidas.
 */
export function parseBRL(input) {
  if (typeof input !== 'string') return null;

  // Remove "R$", espaços (inclusive o não-separável  ) e qualquer coisa fora de dígitos/vírgula/ponto.
  const limpo = input.replace(/R\$/i, '').replace(/[\s ]/g, '');
  if (!/^-?[\d.,]+$/.test(limpo)) return null;

  // No BR: ponto é separador de milhar, vírgula é decimal.
  // Tira pontos, troca vírgula por ponto → número normal.
  const normalizado = limpo.replace(/\./g, '').replace(',', '.');
  const n = Number(normalizado);
  if (!Number.isFinite(n)) return null;

  // Multiplica por 100 e arredonda para inteiro de centavos.
  return Math.round(n * 100);
}

/**
 * Converte 129990 (centavos) -> "R$ 1.299,90".
 */
export function formatBRL(centavos) {
  if (!Number.isInteger(centavos)) return null;
  const reais = (centavos / 100).toFixed(2);           // "1299.90"
  const [inteira, decimal] = reais.split('.');
  // Separador de milhar: insere ponto a cada 3 dígitos da direita.
  const comMilhar = inteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${comMilhar},${decimal}`;
}
