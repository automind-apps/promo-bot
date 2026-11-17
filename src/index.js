import { config } from './config.js';
import { logger } from './lib/logger.js';

// Loga uma versão "segura" da config (sem a chave).
const { OPENAI_API_KEY: _omit, ...safe } = config;
logger.info({ config: safe }, 'promo-bot subindo');

// Handlers de shutdown: fecha o processo de forma limpa.
function shutdown(signal) {
  logger.info({ signal }, 'encerrando');
  // Aqui depois vamos fechar conexão com banco, WhatsApp, etc.
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));   // Ctrl+C
process.on('SIGTERM', () => shutdown('SIGTERM')); // kill

// Loop para o processo não morrer: um placeholder até termos o scheduler.
setInterval(() => {}, 1 << 30);
