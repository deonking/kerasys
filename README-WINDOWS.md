# 🚀 Kerasys Brasil - Comandos para Windows

## Pré-requisitos
1. **Node.js 20+**: Download em https://nodejs.org/
2. **Git**: Download em https://git-scm.com/download/win

## Instalação
```cmd
# 1. Baixar o projeto
git clone <URL_DO_SEU_REPLIT>
cd kerasys-brasil

# 2. Instalar dependências
npm install
```

## 🔥 Comandos Rápidos

### **Desenvolvimento (Recomendado)**
```cmd
# Para Windows - Use este comando!
dev-windows.bat
```
**OU** se preferir PowerShell:
```powershell
$env:NODE_ENV="development"; npx tsx server/index.ts
```

### **Produção**
```cmd
# Para Windows - Build + Start
start-windows.bat
```

### **Comandos NPM Alternativos**
```cmd
# Se os arquivos .bat não funcionarem:

# Desenvolvimento com cross-env (instalar se necessário)
npm install -g cross-env
cross-env NODE_ENV=development tsx server/index.ts

# OU usar PowerShell
powershell -Command "$env:NODE_ENV='development'; npx tsx server/index.ts"
```

## 🌐 Acessar o Site
Após rodar qualquer comando acima:
- **Site**: http://localhost:5000
- **API**: http://localhost:5000/api/products

## ⚡ Solução Rápida para Erros
Se aparecer: `'NODE_ENV' não é reconhecido...`

**Solução 1**: Use os arquivos `.bat`:
```cmd
dev-windows.bat
```

**Solução 2**: Use PowerShell:
```powershell
powershell
$env:NODE_ENV="development"
npx tsx server/index.ts
```

**Solução 3**: Instale cross-env:
```cmd
npm install -g cross-env
cross-env NODE_ENV=development tsx server/index.ts
```

## 📁 Estrutura do Projeto
```
kerasys-brasil/
├── server/          # Backend Express.js
├── client/          # Frontend React
├── shared/          # Types compartilhados
├── dev-windows.bat  # Script para desenvolvimento
└── start-windows.bat # Script para produção
```

Tudo funcionando! 🎯