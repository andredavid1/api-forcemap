# Guia de Deploy no Render

## Problemas Comuns e Soluções

### 1. **Build Failing** ❌

**Problema**: O build falha durante o deploy  
**Soluções**:

- ✅ Removido `postinstall` script que causava builds duplicados
- ✅ Adicionado `.nvmrc` para garantir versão Node.js 18.20.0
- ✅ Especificado `engines` no package.json
- ✅ Usado `--frozen-lockfile` no comando de build

### 2. **Port Configuration** 🌐

**Problema**: Aplicação não responde na porta correta  
**Soluções**:

- ✅ Configurado `process.env.PORT` no código
- ✅ Definido PORT no render.yaml usando `fromService`
- ✅ HOST configurado como `0.0.0.0`

### 3. **Path Resolution** 📁

**Problema**: Imports com alias não funcionam em produção  
**Soluções**:

- ✅ Arquivo `tsconfig-paths-bootstrap.js` configurado
- ✅ Script `start:prod` usa o bootstrap para resolver paths
- ✅ Build com `tsc-alias` para converter aliases

### 4. **Health Check** 🏥

**Problema**: Health check falha  
**Soluções**:

- ✅ Rota `/health` implementada
- ✅ Health check path configurado no render.yaml
- ✅ Script prestart verifica arquivos essenciais

### 5. **Environment Variables** 🌍

**Problema**: Variáveis de ambiente não configuradas  
**Soluções**:

- ✅ NODE_ENV=production definido
- ✅ PORT configurado dinamicamente pelo Render
- ✅ HOST=0.0.0.0 para aceitar conexões externas
- ✅ PNPM_VERSION especificada

## Comandos de Verificação

### Teste local do ambiente Render:

```bash
pnpm render:check
```

### Teste do build e start:

```bash
NODE_ENV=production PORT=3333 HOST=0.0.0.0 pnpm prestart:prod && pnpm start:prod
```

### Build Docker para simular ambiente:

```bash
docker build -t api-forcemap .
docker run -p 3333:3333 -e NODE_ENV=production api-forcemap
```

## Arquivos de Configuração

### render.yaml

- ✅ Comando de build otimizado
- ✅ Script prestart para verificações
- ✅ Variáveis de ambiente configuradas
- ✅ Health check configurado

### package.json

- ✅ Engines especificados
- ✅ Scripts otimizados
- ✅ Sem postinstall problemático

### .nvmrc

- ✅ Versão Node.js fixa (18.20.0)

## Status do Deploy

✅ **Configuração local**: Funcionando  
✅ **Build process**: Otimizado  
✅ **Scripts verificação**: Criados  
✅ **Docker**: Configurado para testes  
🔄 **Deploy Render**: Pronto para teste

## Próximos Passos

1. Fazer commit das mudanças
2. Push para o repositório
3. Verificar logs do Render
4. Se necessário, ajustar configurações com base nos logs
