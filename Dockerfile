# Dockerfile para testar o ambiente Render localmente
FROM node:18.20.0-slim

# Instalar pnpm
RUN npm install -g pnpm@10.13.1

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json pnpm-lock.yaml ./
COPY tsconfig*.json tsc-alias.json ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY src/ ./src/

# Build da aplicação
RUN pnpm build

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0

# Expor porta
EXPOSE 3333

# Comando de start
CMD ["pnpm", "start:prod"]
