import 'dotenv/config';
import { z } from 'zod';

// Schema: zod valida E coage tipos (string "true" -> boolean true, etc).
const Schema = z.object({
  OPENAI_API_KEY: z.string().min(10, 'OPENAI_API_KEY ausente ou inválida'),

  DATA_DIR: z.string().default('./data'),
  DRY_RUN: z.enum(['true', 'false']).default('true').transform(v => v === 'true'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  EMBEDDING_MODEL: z.string().default('text-embedding-3-small'),
  AGENT_MODEL: z.string().default('gpt-4o-mini'),
  COPY_MODEL: z.string().default('gpt-4o-mini'),

  COOLDOWN_PRODUTO_MS: z.coerce.number().int().positive().default(86_400_000),
});

const parsed = Schema.safeParse(process.env);

if (!parsed.success) {
  // Imprime os erros de forma legível e encerra ANTES de qualquer outra coisa rodar.
  console.error('Configuração inválida:');
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  }
  process.exit(1);
}

export const config = parsed.data;
