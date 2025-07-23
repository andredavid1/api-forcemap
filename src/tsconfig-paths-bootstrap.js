const tsConfig = require("../tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");
const path = require("path");

// Ajusta os paths para funcionar a partir do diretório dist
const adjustedPaths = {};
Object.keys(tsConfig.compilerOptions.paths).forEach((key) => {
  const originalPaths = tsConfig.compilerOptions.paths[key];
  adjustedPaths[key] = originalPaths.map((p) => {
    // Remove 'src/' do início do path se existir
    if (p.startsWith("src/")) {
      return p.replace("src/", "");
    }
    // Para paths que não começam com 'src/', adiciona '../' para sair de dist
    return "../" + p;
  });
});

const baseUrl = "./dist";
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: adjustedPaths,
});

// When the process exits, cleanup the paths
process.on("exit", cleanup);
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
