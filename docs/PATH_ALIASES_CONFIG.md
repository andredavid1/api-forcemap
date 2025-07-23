# Configuração de Path Aliases - API ForceMap

## Visão Geral

Este documento descreve a configuração dos path aliases do projeto após a migração da pasta `__tests__` para a raiz, seguindo os princípios da arquitetura limpa.

## Estrutura de Arquivos de Configuração

```
├── tsconfig.json          # Configuração base do TypeScript
├── tsconfig.build.json    # Configuração para build de produção
├── tsconfig.test.json     # Configuração para testes
├── jest.config.ts         # Configuração do Jest
├── tsc-alias.json         # Configuração do tsc-alias
└── src/
    └── tsconfig-paths-bootstrap.js  # Bootstrap para runtime
```

## Aliases Disponíveis

| Alias               | Caminho                | Descrição                                    |
| ------------------- | ---------------------- | -------------------------------------------- |
| `@domain/*`         | `src/domain/*`         | Entidades e interfaces do domínio            |
| `@application/*`    | `src/application/*`    | Casos de uso e serviços                      |
| `@infrastructure/*` | `src/infrastructure/*` | Implementações de infraestrutura             |
| `@presentation/*`   | `src/presentation/*`   | Camada de apresentação (controllers, routes) |
| `@shared/*`         | `src/shared/*`         | Código compartilhado                         |
| `@tests/*`          | `__tests__/*`          | Utilitários e mocks de teste                 |

## Como Funciona

### 1. Durante o Desenvolvimento

```bash
npm run dev
```

- Usa `ts-node` com `tsconfig-paths/register`
- Resolve os aliases diretamente do `tsconfig.json`

### 2. Durante os Testes

```bash
npm test
```

- Jest usa o `moduleNameMapper` definido em `jest.config.ts`
- Configuração `ts-jest` aponta para `tsconfig.test.json`

### 3. Durante o Build

```bash
npm run build
```

- TypeScript compila usando `tsconfig.build.json`
- `tsc-alias` substitui os aliases pelos caminhos relativos no código compilado

### 4. Em Produção

```bash
npm start
```

- Usa o `tsconfig-paths-bootstrap.js` para resolver aliases em runtime
- Ajusta automaticamente os paths para funcionar a partir do diretório `dist`

## Exemplo de Uso

### Em arquivos de código (`src/**/*.ts`):

```typescript
import { MilitaryRank } from "@domain/entities";
import { CreateMilitaryRankService } from "@application/services/military-rank";
```

### Em arquivos de teste (`__tests__/**/*.spec.ts`):

```typescript
import { MilitaryRankPropsSanitizer } from "@application/sanitizers/military-rank/create.military-rank.sanitizer";
import { MilitaryRankProps } from "@domain/entities";
import { mockRepository } from "@tests/mocks/repositories";
```

## Compatibilidade com Render

A configuração foi otimizada para deploy no Render:

1. **Build**: `npm run build` gera arquivos JavaScript puros em `dist/`
2. **Runtime**: `npm start` usa o bootstrap para resolver aliases
3. **Sem dependências de desenvolvimento**: O `tsconfig-paths` é usado apenas em runtime através do bootstrap

## Troubleshooting

### Erro: "Cannot find module '@domain/...'"

**Durante desenvolvimento:**

- Verifique se está usando `npm run dev` (não `node src/index.ts`)
- Confirme que o `tsconfig.json` está na raiz do projeto

**Durante testes:**

- Verifique o `moduleNameMapper` em `jest.config.ts`
- Confirme que o caminho no mapper corresponde à estrutura real

**Em produção:**

- Verifique se o build foi executado com `npm run build`
- Confirme que está usando `npm start` (não `node dist/index.js`)

### Erro: "Module not found" após build

- Execute `npm run build` novamente
- Verifique se o `tsc-alias` está instalado
- Confirme que `tsconfig.build.json` está sendo usado no build

## Manutenção

Ao adicionar novos aliases:

1. Adicione em `tsconfig.json` na seção `paths`
2. Adicione o mapeamento correspondente em `jest.config.ts`
3. Documente o novo alias neste arquivo
4. Execute os testes para garantir que tudo funciona
