# Decisões Arquiteturais

Este documento registra as principais decisões arquiteturais tomadas durante o desenvolvimento do sistema, seguindo o formato ADR (Architecture Decision Record).

## ADR-001: Adoção de Clean Architecture

### Status

Aceito

### Contexto

Precisamos de uma arquitetura que permita:

- Testabilidade completa
- Independência de frameworks
- Facilidade de manutenção
- Separação clara de responsabilidades

### Decisão

Adotamos Clean Architecture com as seguintes camadas:

- **Domain**: Entidades e regras de negócio puras
- **Application**: Casos de uso e lógica de aplicação
- **Infrastructure**: Implementações concretas (BD, APIs externas)
- **Presentation**: Interface com o usuário (HTTP, CLI)

### Consequências

**Positivas:**

- Alta testabilidade (podemos testar sem dependências externas)
- Flexibilidade para trocar implementações
- Código mais organizado e manutenível

**Negativas:**

- Maior complexidade inicial
- Mais arquivos e abstrações
- Curva de aprendizado para novos desenvolvedores

## ADR-002: Separação entre Sanitização e Validação

### Status

Aceito

### Contexto

Dados de entrada precisam ser normalizados e validados, mas misturar essas responsabilidades viola o SRP (Single Responsibility Principle).

### Decisão

Criamos componentes separados:

- **Sanitizers**: Normalizam dados (trim, conversão de tipos)
- **Validators**: Aplicam regras de negócio

### Consequências

**Positivas:**

- Responsabilidades bem definidas
- Facilita testes unitários
- Reutilização de lógica

**Negativas:**

- Mais classes para manter
- Fluxo de dados mais complexo

## ADR-003: Uso de Erros Customizados Semânticos

### Status

Aceito

### Contexto

Erros genéricos dificultam o tratamento adequado e a comunicação clara com o cliente.

### Decisão

Implementamos erros customizados específicos:

- `MissingParamError`: Campo obrigatório ausente (400)
- `InvalidParamError`: Valor inválido (422)
- `DuplicatedKeyError`: Violação de unicidade (409)

### Consequências

**Positivas:**

- Mensagens de erro mais claras
- Códigos HTTP apropriados
- Facilita tratamento de erros no frontend

**Negativas:**

- Mais classes de erro para manter
- Necessidade de documentação clara

## ADR-004: Command-Query Separation (CQS)

### Status

Aceito

### Contexto

Misturar comandos (que alteram estado) com queries (que retornam dados) pode levar a efeitos colaterais indesejados.

### Decisão

- Commands (CREATE, UPDATE, DELETE) retornam `void`
- Queries (READ) retornam dados mas não alteram estado

### Consequências

**Positivas:**

- Intenção clara do código
- Menos efeitos colaterais
- Facilita cache de queries

**Negativas:**

- Às vezes precisamos do ID após criar (solução: eventos ou callback)
- Pode requerer chamadas adicionais

## ADR-005: Preservação de undefined/null no Sanitizador

### Status

Aceito

### Contexto

Converter `undefined`/`null` para valores padrão (como 0 ou "") no sanitizador impede a detecção correta de campos ausentes.

### Decisão

O sanitizador preserva `undefined`/`null` para permitir que o validador detecte campos ausentes vs. campos com valores inválidos.

### Consequências

**Positivas:**

- Distinção clara entre ausente e inválido
- Mensagens de erro mais precisas
- Melhor experiência do usuário

**Negativas:**

- Lógica do sanitizador mais complexa
- Necessidade de type assertions em alguns casos

## ADR-006: Validação no Nível de Aplicação

### Status

Aceito

### Contexto

Validações poderiam estar no domínio, na aplicação ou na apresentação.

### Decisão

Colocamos validações na camada de aplicação porque:

- Podem depender de infraestrutura (verificar duplicatas)
- São específicas do caso de uso
- Mantém o domínio puro

### Consequências

**Positivas:**

- Domínio permanece puro
- Validações podem usar repositórios
- Flexibilidade por caso de uso

**Negativas:**

- Validações não são reutilizadas automaticamente
- Possível duplicação entre casos de uso

## ADR-007: DTOs e Mappers

### Status

Aceito

### Contexto

Expor entidades de domínio diretamente na API viola o princípio de encapsulamento.

### Decisão

Implementamos:

- DTOs para entrada (Request) e saída (Response)
- Mappers para conversão entre camadas

### Consequências

**Positivas:**

- API estável independente do domínio
- Controle fino sobre dados expostos
- Facilita versionamento da API

**Negativas:**

- Mais código boilerplate
- Possível duplicação de propriedades

## ADR-008: Testes como Documentação Viva

### Status

Aceito

### Contexto

Documentação tende a ficar desatualizada. Testes sempre refletem o comportamento atual.

### Decisão

- Nomes de testes descritivos
- Cenários completos nos testes
- Testes de integração como exemplos de uso

### Consequências

**Positivas:**

- Documentação sempre atualizada
- Exemplos executáveis
- Confiança nas mudanças

**Negativas:**

- Testes mais verbosos
- Maior tempo de escrita inicial

## ADR-009: Injeção de Dependências Manual

### Status

Aceito

### Contexto

Podemos usar um container de IoC ou fazer injeção manual.

### Decisão

Optamos por injeção manual (constructor injection) por enquanto.

### Consequências

**Positivas:**

- Simplicidade
- Transparência total
- Sem dependência de framework

**Negativas:**

- Código de composição manual
- Pode ficar complexo com muitas dependências

## ADR-010: Estrutura de Pastas por Feature

### Status

Proposto

### Contexto

Podemos organizar por tipo (controllers/, services/) ou por feature (military-rank/).

### Decisão

Organizar por feature quando o projeto crescer:

```
src/modules/
  military-rank/
    domain/
    application/
    infrastructure/
    presentation/
```

### Consequências

**Positivas:**

- Módulos coesos
- Facilita trabalho em equipe
- Boundaries claros

**Negativas:**

- Possível duplicação inicial
- Necessidade de shared kernel

## Princípios Guia

1. **SOLID** em todas as decisões
2. **KISS** - Simplicidade onde possível
3. **YAGNI** - Não adicionar complexidade desnecessária
4. **DRY** - Mas não ao custo de acoplamento

## Revisão

Estas decisões devem ser revisadas periodicamente e atualizadas conforme o projeto evolui. Novas ADRs devem ser adicionadas para decisões significativas.
