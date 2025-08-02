import { ILogger } from "@domain/services";
import { LoggerFactory } from "@infrastructure/logging";

/**
 * Exemplo de como usar o sistema de logging na aplicação
 */

// 1. Criando um logger baseado no ambiente
const logger: ILogger = LoggerFactory.createFromEnvironment();

// 2. Logs básicos
logger.info("Aplicação iniciada");
logger.debug("Configurações carregadas", {
  metadata: { config: "military-rank" },
});
logger.warn("Atenção: configuração não encontrada", {
  metadata: { setting: "db-pool" },
});

// 3. Log de erro com exceção
try {
  // Alguma operação que pode falhar
  throw new Error("Falha na conexão com banco");
} catch (error) {
  logger.error("Erro crítico no sistema", error as Error, {
    operation: "database-connection",
    userId: "123",
  });
}

// 4. Logger com contexto específico
const militaryRankLogger = logger.withContext({
  metadata: {
    service: "military-rank",
    module: "create",
  },
});

militaryRankLogger.info("Criando novo posto militar", {
  requestId: "abc-123",
  metadata: {
    abbreviation: "Gen",
    order: 1,
  },
});

// 5. Logger para operações específicas
const operationLogger = militaryRankLogger.withContext({
  operation: "create-military-rank",
  entityId: "mil-rank-456",
  userId: "user-789",
});

operationLogger.debug("Validando dados de entrada");
operationLogger.info("Dados validados com sucesso");
operationLogger.debug("Salvando no repositório");
operationLogger.info("Posto militar criado com sucesso", {
  duration: 150, // ms
  metadata: {
    abbreviation: "Gen",
    order: 1,
  },
});

/**
 * Exemplos de saída esperada:
 *
 * Console Logger (desenvolvimento/produção):
 * {
 *   "level": "info",
 *   "message": "Posto militar criado com sucesso",
 *   "timestamp": "2025-08-01T10:30:45.123Z",
 *   "context": {
 *     "service": "military-rank",
 *     "module": "create",
 *     "operation": "create-military-rank",
 *     "entityId": "mil-rank-456",
 *     "userId": "user-789",
 *     "duration": 150,
 *     "metadata": {
 *       "abbreviation": "Gen",
 *       "order": 1
 *     }
 *   }
 * }
 *
 * Silent Logger (testes):
 * - Nenhuma saída no console
 * - Logs armazenados internamente para verificação
 */
export { logger };
