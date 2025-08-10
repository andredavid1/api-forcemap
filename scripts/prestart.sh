#!/bin/bash

echo "🚀 Iniciando verificações pré-start para Render..."

# Verificar se o arquivo principal existe
if [ ! -f "dist/index.js" ]; then
    echo "❌ Erro: dist/index.js não encontrado!"
    echo "📋 Arquivos em dist/:"
    ls -la dist/ || echo "❌ Diretório dist/ não existe!"
    exit 1
fi

# Verificar se o bootstrap existe
if [ ! -f "src/tsconfig-paths-bootstrap.js" ]; then
    echo "❌ Erro: src/tsconfig-paths-bootstrap.js não encontrado!"
    exit 1
fi

# Verificar variáveis de ambiente essenciais
if [ -z "$PORT" ]; then
    echo "⚠️ Aviso: PORT não definida, usando padrão 3333"
    export PORT=3333
fi

if [ -z "$HOST" ]; then
    echo "⚠️ Aviso: HOST não definido, usando padrão 0.0.0.0"
    export HOST=0.0.0.0
fi

if [ -z "$NODE_ENV" ]; then
    echo "⚠️ Aviso: NODE_ENV não definido, usando padrão production"
    export NODE_ENV=production
fi

echo "✅ Verificações concluídas com sucesso!"
echo "🌍 PORT: $PORT"
echo "🌍 HOST: $HOST"  
echo "🌍 NODE_ENV: $NODE_ENV"
echo "🚀 Iniciando aplicação..."
