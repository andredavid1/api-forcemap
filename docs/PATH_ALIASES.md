# Path Aliases Configuration

Este projeto utiliza path aliases para melhorar a organização e legibilidade dos imports.

## Aliases Disponíveis

- `@domain/*` - Mapeia para `src/domain/*`
- `@application/*` - Mapeia para `src/application/*`
- `@infrastructure/*` - Mapeia para `src/infrastructure/*`
- `@presentation/*` - Mapeia para `src/presentation/*`
- `@shared/*` - Mapeia para `src/shared/*`
- `@tests/*` - Mapeia para `src/__tests__/*`

## Exemplo de Uso

Ao invés de usar imports relativos:
```typescript
import { MilitaryRankProps } from "../../../domain/entities";
```

Use os aliases:
```typescript
import { MilitaryRankProps } from "@domain/entities";
```

## Configuração

### TypeScript
Os aliases são configurados no `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@domain/*": ["domain/*"],
      "@application/*": ["application/*"],
      // ...
    }
  }
}
```

### Jest
Para os testes, os aliases são mapeados no `jest.config.ts`:
```typescript
moduleNameMapper: {
  "^@domain/(.*)$": "<rootDir>/src/domain/$1",
  // ...
}
```

### Build para Produção
O projeto usa `tsc-alias` para resolver os aliases durante o build:
```bash
pnpm build  # Compila e resolve os aliases
```

### Execução em Produção
Para executar em produção (como no Render), use:
```bash
pnpm start:prod  # Usa tsconfig-paths para resolver aliases em runtime
```

## Compatibilidade com Render

A configuração foi otimizada para funcionar no Render:
1. O build resolve os aliases em tempo de compilação usando `tsc-alias`
2. Para desenvolvimento, use `pnpm dev` que carrega `tsconfig-paths`
3. Em produção, use `pnpm start:prod` que carrega o bootstrap necessário

## Troubleshooting

### ESLint mostrando erros de tipo
Isso pode ser um falso positivo. Verifique se:
1. O TypeScript compila sem erros: `pnpm build`
2. Os testes passam: `pnpm test`

Se ambos funcionam, os erros do ESLint podem ser ignorados ou você pode reiniciar o servidor de linguagem do TypeScript no VSCode.