# 💻 Como Rodar o App no PC (Computador)

## 🚀 Opções Disponíveis

| Opção | Dificuldade | Ideal Para |
|-------|-------------|------------|
| 1. GitHub Pages | ⭐ Fácil | Uso diário, acesso de qualquer lugar |
| 2. Rodar Localmente | ⭐⭐ Médio | Desenvolvimento e testes |
| 3. Abrir arquivo HTML | ⭐ Fácil | Visualização rápida |

---

## 🌐 Opção 1: Via GitHub Pages (Recomendado)

### ✅ Vantagens
- Acesso de qualquer lugar
- Não precisa instalar nada
- Funciona em qualquer navegador
- Link permanente

### 📋 Passo a Passo

#### 1. Subir o código para o GitHub

Abra o terminal (CMD, PowerShell ou Git Bash) na pasta do projeto:

```bash
# Configurar Git (primeira vez apenas)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Inicializar e subir o código
git init
git add .
git commit -m "🎉 Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/gestao-imoveis.git
git push -u origin main
```

⚠️ **Substitua `SEU_USUARIO` pelo seu username do GitHub!**

#### 2. Habilitar o GitHub Pages

1. Acesse seu repositório em `https://github.com/SEU_USUARIO/gestao-imoveis`
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione **GitHub Actions**
5. Aguarde 2-3 minutos

#### 3. Acessar o app

Abra no navegador:
```
https://SEU_USUARIO.github.io/gestao-imoveis/
```

**Pronto!** O app está rodando no seu PC! 🎉

---

## 💻 Opção 2: Rodar Localmente (Desenvolvimento)

### ✅ Vantagens
- Mudanças aparecem em tempo real
- Não precisa de internet
- Ideal para desenvolvimento

### 📋 Pré-requisitos

1. **Node.js** (versão 18 ou superior)
   - Baixe em: https://nodejs.org/
   - Escolha a versão LTS
   - Instale seguindo as instruções

2. **Verificar instalação**
   ```bash
   node --version
   npm --version
   ```

### 📋 Passo a Passo

#### 1. Abrir o terminal na pasta do projeto

**Windows:**
- Abra a pasta do projeto
- Clique na barra de endereços (onde mostra o caminho)
- Digite `cmd` e pressione Enter

**Mac/Linux:**
```bash
cd /caminho/para/gestao-imoveis
```

#### 2. Instalar dependências

```bash
npm install
```

⏳ Aguarde o download (pode demorar 1-2 minutos na primeira vez)

#### 3. Rodar o app em modo desenvolvimento

```bash
npm run dev
```

Você verá algo como:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
```

#### 4. Abrir no navegador

Abra seu navegador e acesse:
```
http://localhost:3000/
```

**Pronto!** O app está rodando localmente! 🎉

#### 5. Parar o servidor

Para parar o servidor, pressione:
```
Ctrl + C
```

---

## 📦 Opção 3: Rodar via Arquivo HTML (Produção Local)

### ✅ Vantagens
- Não precisa de servidor
- Abre direto no navegador
- Mais rápido

### 📋 Passo a Passo

#### 1. Gerar a versão de produção

No terminal, na pasta do projeto:

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Gerar build de produção
npm run build
```

Você verá:
```
✓ built in 2.40s
```

#### 2. Localizar os arquivos

Os arquivos estarão na pasta `dist/`:
```
dist/
├── index.html          ← Abra este arquivo!
├── assets/
│   ├── index-xxxxx.css
│   └── index-xxxxx.js
└── manifest.json
```

#### 3. Abrir no navegador

**Opção A: Abrir diretamente**
- Navegue até a pasta `dist/`
- Dê duplo clique em `index.html`
- O app abrirá no navegador padrão

**Opção B: Arrastar para o navegador**
- Abra seu navegador
- Arraste o arquivo `index.html` para a janela

**Opção C: Via terminal**
```bash
# Windows
start dist/index.html

# Mac
open dist/index.html

# Linux
xdg-open dist/index.html
```

**Pronto!** O app está rodando! 🎉

---

## 🔧 Solução de Problemas

### ❌ Problema: `npm` não é reconhecido

**Solução:**
1. Instale o Node.js: https://nodejs.org/
2. Reinicie o terminal
3. Tente novamente: `npm --version`

### ❌ Problema: `npm install` falha

**Solução:**
```bash
# Limpar cache do npm
npm cache clean --force

# Remover node_modules e package-lock.json
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s /q node_modules               # Windows
del package-lock.json                  # Windows

# Instalar novamente
npm install
```

### ❌ Problema: Porta 3000 já está em uso

**Solução:**
```bash
# Usar outra porta
npm run dev -- --port 3001
```

Depois acesse: `http://localhost:3001/`

### ❌ Problema: Página em branco

**Solução:**
1. Abra o console do navegador (F12)
2. Verifique se há erros
3. Limpe o cache do navegador (Ctrl+Shift+Del)
4. Recarregue a página (Ctrl+F5)

### ❌ Problema: Build falha

**Solução:**
```bash
# Verificar se há erros de TypeScript
npm run typecheck

# Corrigir os erros e tentar novamente
npm run build
```

---

## 🌐 Acessar pelo Celular (Mesma Rede WiFi)

### Passo a Passo

1. **Descobrir o IP do seu PC**

   **Windows:**
   ```bash
   ipconfig
   ```
   Procure por "IPv4 Address" (ex: 192.168.1.100)

   **Mac/Linux:**
   ```bash
   ifconfig
   # ou
   ip addr
   ```
   Procure por "inet" (ex: 192.168.1.100)

2. **Rodar o app com acesso de rede**

   ```bash
   npm run dev -- --host
   ```

3. **Acessar pelo celular**

   No celular (mesmo WiFi), acesse:
   ```
   http://192.168.1.100:3000/
   ```
   *(Use o IP do seu PC)*

---

## 📊 Comparativo das Opções

| Característica | GitHub Pages | Local (Dev) | Arquivo HTML |
|----------------|--------------|-------------|--------------|
| **Facilidade** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Acesso remoto** | ✅ Sim | ❌ Não | ❌ Não |
| **Precisa internet** | ✅ Sim | ❌ Não | ❌ Não |
| **Tempo real** | ❌ Não | ✅ Sim | ❌ Não |
| **Instalação** | ❌ Não | ✅ Sim | ❌ Não |
| **Ideal para** | Uso diário | Desenvolvimento | Testes rápidos |

---

## 🎯 Recomendações

### Para uso diário:
✅ **GitHub Pages** - Mais prático, acesso de qualquer lugar

### Para desenvolvimento:
✅ **Local (npm run dev)** - Mudanças em tempo real

### Para testes rápidos:
✅ **Arquivo HTML** - Abre direto, sem configuração

---

## 🔗 Links Úteis

- Node.js: https://nodejs.org/
- GitHub: https://github.com/
- Documentação Vite: https://vitejs.dev/
- Documentação React: https://react.dev/

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs no terminal
2. Abra o console do navegador (F12)
3. Consulte os guias:
   - `GUIA_GITHUB.md` - Deploy no GitHub
   - `COMO_RODAR_NO_CELULAR.md` - Acesso pelo celular
   - `TESTES.md` - Guia de testes

---

**Pronto para rodar! Escolha a opção que melhor se adapta às suas necessidades! 🚀**
