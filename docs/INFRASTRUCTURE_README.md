# Infrastructure Layer - Logging

## 📋 Visão Geral

A camada de infrastructure implementa as abstrações definidas no domain, fornecendo implementações concretas para logging, persistência e outras integrações externas.

## 🔧 Implementações Disponíveis

### 📊 LoggerFactory

Factory pattern para criação de loggers baseado em ambiente ou configuração específica.

```typescript
import { LoggerFactory } from "@infrastructure/logging";

// Criação automática baseada em NODE_ENV
const logger = LoggerFactory.createFromEnvironment();

// Criação explícita
const consoleLogger = LoggerFactory.create({ type: "console" });
const silentLogger = LoggerFactory.create({ type: "silent" });
```

### 📝 ConsoleLogger

Logger para desenvolvimento e produção com output estruturado no console.

**Características:**

- Output JSON estruturado
- Timestamp automático
- Contexto enriquecido
- Stack trace completo para erros
- Compatível com ferramentas de APM

```typescript
import { ConsoleLogger } from "@infrastructure/logging";

const logger = new ConsoleLogger({
  metadata: {
    service: "military-rank",
    version: "1.0.0",
  },
});

// Logs estruturados
logger.info("Operação iniciada", {
  operation: "create-military-rank",
  requestId: "req-123",
});

logger.error("Falha na operação", error, {
  operation: "database-save",
  metadata: {
    entityId: "mil-rank-456",
    attempt: 2,
  },
});
```

**Output Exemplo:**

```json
{
  "level": "info",
  "message": "Operação iniciada",
  "timestamp": "2025-08-03T10:30:45.123Z",
  "context": {
    "service": "military-rank",
    "version": "1.0.0",
    "operation": "create-military-rank",
    "requestId": "req-123"
  }
}
```

### 🔇 SilentLogger

Logger silencioso para testes unitários que armazena logs internamente.

**Características:**

- Sem output no console
- Armazenamento interno para verificação
- Métodos de inspeção para testes
- Performance otimizada

```typescript
import { SilentLogger } from "@infrastructure/logging";

const logger = new SilentLogger();

// Durante testes
logger.info("Test operation");
logger.error("Test error", new Error("Test"));

// Verificação em testes
const logs = logger.getLogs();
expect(logs).toHaveLength(2);
expect(logs[0].level).toBe("info");
expect(logs[1].level).toBe("error");

// Filtros específicos
const errorLogs = logger.getLogsByLevel("error");
const operationLogs = logger.getLogsByOperation("test-operation");
```

## 💾 Database (Fake Implementation)

### 🎭 MilitaryRankFakeRepository

Repositório em memória para testes e desenvolvimento local.

```typescript
import { MilitaryRankFakeRepository } from "@infrastructure/database";

const repository = new MilitaryRankFakeRepository();

// Operações básicas
await repository.create({
  name: "General",
  abbreviation: "Gen",
  order: 1,
});

const general = await repository.findByAbbreviation("Gen");
const byOrder = await repository.findByOrder(1);
```

## 🧪 Uso em Testes

### Configuração Recomendada

```typescript
// jest.setup.ts
import { LoggerFactory } from "@infrastructure/logging";

// Garantir que testes usem SilentLogger
process.env.NODE_ENV = "test";
const logger = LoggerFactory.createFromEnvironment();
```

### Exemplo de Teste

```typescript
describe("Service with Logger", () => {
  let logger: SilentLogger;
  let service: MyService;

  beforeEach(() => {
    logger = new SilentLogger();
    service = new MyService(logger);
  });

  it("should log operation", async () => {
    await service.performOperation();

    const logs = logger.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe("Operation completed");
  });
});
```

## 🚀 Produção

### Configuração para Deploy

```typescript
// main.ts
import { LoggerFactory } from "@infrastructure/logging";

const logger = LoggerFactory.createFromEnvironment();
// NODE_ENV=production -> ConsoleLogger com output estruturado

// Logs são automaticamente formatados para ferramentas como:
// - CloudWatch
// - DataDog
// - New Relic
// - Elastic Stack
```

## 🔮 Futuras Implementações

A camada está preparada para expansão com:

### Database Real

```typescript
interface IDatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  transaction<T>(callback: () => Promise<T>): Promise<T>;
}
```

### Configuration Service

```typescript
interface IConfigurationService {
  get<T>(key: string): T;
  getRequired<T>(key: string): T;
}
```

### HTTP Client

```typescript
interface IHttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
}
```

## 📚 Padrões Utilizados

- **Factory Pattern**: LoggerFactory para criação baseada em contexto
- **Dependency Inversion**: Implementações dependem de abstrações do domain
- **Strategy Pattern**: Diferentes estratégias de logging (Console vs Silent)
- **Repository Pattern**: Abstração de persistência de dados
- **Composition**: Contexto base + contexto específico nos logs

## 🎯 Princípios Seguidos

- **Single Responsibility**: Cada classe tem uma responsabilidade específica
- **Open/Closed**: Extensível para novas implementações
- **Liskov Substitution**: Implementações são intercambiáveis
- **Interface Segregation**: Interfaces focadas e coesas
- **Dependency Inversion**: Depende de abstrações, não implementações
