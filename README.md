# API ForceMap 🏆

[![Architecture Score](https://img.shields.io/badge/Architecture-10%2F10-brightgreen)](https://github.com/andredavid1/api-forcemap)
[![Tests](https://img.shields.io/badge/Tests-254%20passing-success)](https://github.com/andredavid1/api-forcemap)
[![Coverage](https://img.shields.io/badge/Coverage-99.89%25-brightgreen)](https://github.com/andredavid1/api-forcemap)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://github.com/andredavid1/api-forcemap)

## 🎯 Sobre o Projeto

API REST para gerenciamento de postos e graduações militares, implementada seguindo **Clean Architecture**, **SOLID Principles**, **TDD** e **Command-Query Separation (CQS)**.

### ✨ Características

- 🏗️ **Clean Architecture** com separação total de responsabilidades
- 🔧 **SOLID Principles** implementados rigorosamente
- 🧪 **TDD** com 254 testes e 99.89% de cobertura
- ⚡ **CQS** com separação clara entre Commands e Queries
- 🔄 **Dependency Inversion** - Framework agnóstico
- 📝 **TypeScript** com type safety 100%
- 📊 **Logging estruturado** para observabilidade
- 🐳 **Deploy ready** para Render

## 🚀 Deploy no Render

### Pré-requisitos

- Conta no [Render](https://render.com)
- Repositório no GitHub

### Passos para Deploy

1. **Fork/Clone este repositório**
2. **Conectar ao Render:**
   - Vá para [render.com](https://render.com)
   - Clique em "New Web Service"
   - Conecte seu repositório GitHub
   - Configure conforme abaixo:

```yaml
Build Command: npm install && npm run build
Start Command: npm run start:prod
Environment: Node
Node Version: 18+
```

3. **Variáveis de Ambiente:**

```
NODE_ENV=production
PORT=(automático pelo Render)
HOST=0.0.0.0
```

## 📡 Endpoints Disponíveis

### Health Check

```bash
GET /health
# Retorna status da aplicação
```

### Postos/Graduações Militares

#### ✅ Criar Graduação (Implementado)

```bash
POST /api/v1/military-ranks/
Content-Type: application/json

{
  "data": {
    "abbreviation": "GEN",
    "order": 1
  }
}
```

**Resposta de Sucesso (201):**

```json
{
  "statusCode": 201,
  "body": {
    "message": "Created successfully"
  }
}
```

#### 🔄 Listar Graduações (Interface definida)

```bash
GET /api/v1/military-ranks/
# TODO: Implementar
```

#### 🔄 Buscar por ID (Interface definida)

```bash
GET /api/v1/military-ranks/:id
# TODO: Implementar
```

#### 🔄 Atualizar Graduação (Interface definida)

```bash
PUT /api/v1/military-ranks/:id
# TODO: Implementar
```

#### 🔄 Deletar Graduação (Interface definida)

```bash
DELETE /api/v1/military-ranks/:id
# TODO: Implementar
```

## 🛠️ Desenvolvimento Local

### Instalação

```bash
# Clone o repositório
git clone https://github.com/andredavid1/api-forcemap.git
cd api-forcemap

# Instale as dependências
pnpm install

# Execute os testes
pnpm test

# Inicie em modo desenvolvimento
pnpm dev
```

### Scripts Disponíveis

```bash
pnpm dev          # Desenvolvimento com hot reload
pnpm build        # Build para produção
pnpm start:prod   # Executa versão de produção
pnpm test         # Executa todos os testes
pnpm test:coverage # Testes com cobertura
pnpm lint         # Verifica código com ESLint
```

## 🏗️ Arquitetura

```
src/
├── domain/          # Regras de negócio puras
├── application/     # Casos de uso e lógica de aplicação
├── infrastructure/  # Implementações concretas (HTTP, DB, Log)
└── presentation/    # Interface com usuário (Controllers, Routes)
```

### 🎯 Princípios Implementados

- **Single Responsibility**: Cada classe tem uma responsabilidade
- **Open/Closed**: Extensível via interfaces
- **Liskov Substitution**: Implementações substituíveis
- **Interface Segregation**: Interfaces pequenas e específicas
- **Dependency Inversion**: Depende de abstrações, não implementações

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Testes com cobertura
pnpm test:coverage

# Testes em modo watch
pnpm test:watch
```

**Cobertura Atual: 99.89%**

- 254 testes passando
- Testes unitários e de integração
- Documentação viva através dos testes

## 📚 Documentação

- [Decisões Arquiteturais (ADRs)](./docs/ARCHITECTURAL_DECISIONS.md)
- [Configuração de Path Aliases](./docs/PATH_ALIASES_CONFIG.md)

## 🔧 Exemplo de Uso (Quando Deployed)

```bash
# Criar uma graduação
curl -X POST https://sua-app.onrender.com/api/v1/military-ranks/ \
  -H "Content-Type: application/json" \
  -d '{"data": {"abbreviation": "CEL", "order": 5}}'

# Verificar health
curl https://sua-app.onrender.com/health
```

## 🌟 Próximos Passos

1. ✅ **CREATE** - Implementado
2. 🔄 **READ** - Implementar serviços de consulta
3. 🔄 **UPDATE** - Implementar atualização
4. 🔄 **DELETE** - Implementar remoção
5. 🔄 **Database** - Integrar PostgreSQL/MongoDB
6. 🔄 **Validações** - Expandir regras de negócio
7. 🔄 **Autenticação** - JWT/OAuth2
8. 🔄 **Rate Limiting** - Controle de taxa
9. 🔄 **API Docs** - Swagger/OpenAPI

## 📄 Licença

ISC License

---

**Desenvolvido com Clean Architecture e boas práticas de engenharia de software** 🚀
