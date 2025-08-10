#!/bin/bash
echo "🔍 Verificando configuração do Render..."

echo "📦 Versão do Node.js:"
node --version

echo "📦 Versão do PNPM:"
pnpm --version

echo "🌍 Variáveis de ambiente:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "HOST: $HOST"

echo "📁 Estrutura de arquivos:"
ls -la

echo "📂 Verificando se dist/ existe:"
if [ -d "dist" ]; then
    echo "✅ Diretório dist/ encontrado"
    ls -la dist/
else
    echo "❌ Diretório dist/ não encontrado"
fi

echo "🏗️ Executando build..."
pnpm build

echo "📂 Verificando dist/ após build:"
if [ -d "dist" ]; then
    echo "✅ Build executado com sucesso"
    ls -la dist/
else
    echo "❌ Build falhou - dist/ não foi criado"
    exit 1
fi

echo "🚀 Verificação concluída!"
