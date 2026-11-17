import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // Redact: pino nunca loga esses caminhos, mesmo que caiam num objeto.
  redact: {
    paths: ['*.apiKey', '*.api_key', 'OPENAI_API_KEY', 'headers.authorization'],
    censor: '[REDACTED]',
  },
  // Em dev, usa pino-pretty (transport) para colorir/formatar.
  // Em prod, deixa JSON cru (mais rápido e parseável por ferramentas).
  transport: isProd
    ? undefined
    : {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'HH:MM:ss', ignore: 'pid,hostname' },
      },
});
