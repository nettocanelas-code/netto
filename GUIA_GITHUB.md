# 🚀 Guia Passo a Passo: Subir para o GitHub

## 📋 Pré-requisitos

1. **Conta no GitHub** - Se não tem, crie em https://github.com (gratuito)
2. **Git instalado** - Baixe em https://git-scm.com/downloads
3. **Terminal/Command Prompt** - Para executar comandos

---

## 🔧 Passo 1: Instalar e Configurar Git

### Verificar se Git está instalado:
```bash
git --version
```

Se não estiver instalado:
- **Windows:** Baixe em https://git-scm.com/download/win
- **Mac:** `brew install git` ou baixe em https://git-scm.com/download/mac
- **Linux:** `sudo apt-get install git`

### Configurar Git (primeira vez):
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

---

## 📦 Passo 2: Criar Repositório no GitHub

### Opção A: Pelo Site do GitHub

1. Acesse https://github.com
2. Faça login na sua conta
3. Clique no botão **+** no canto superior direito
4. Selecione **"New repository"**
5. Preencha:
   - **Repository name:** `gestao-imoveis` (ou o nome que preferir)
   - **Description:** `Sistema de gestão de imóveis e aluguéis`
   - **Public** (para GitHub Pages gratuito)
   - **❌ NÃO marque** "Add a README file" (já temos um)
   - **❌ NÃO marque** "Add .gitignore"
   - **❌ NÃO marque** "Choose a license"
6. Clique em **"Create repository"**

### Opção B: Pela Linha de Comando

```bash
# Cria o repositório (precisa do GitHub CLI instalado)
gh repo create gestao-imoveis --public --source=. --remote=origin
```

---

## 📤 Passo 3: Subir o Código

### 3.1 - Abrir Terminal na Pasta do Projeto

**Windows:**
- Abra a pasta do projeto
- Segure `Shift` + clique com botão direito
- Selecione "Abrir janela do PowerShell aqui" ou "Abrir terminal aqui"

**Mac/Linux:**
```bash
cd /caminho/para/sua/pasta/gestao-imoveis
```

### 3.2 - Inicializar Git e Fazer Push

Copie e execute estes comandos **um por vez**:

```bash
# 1. Inicializar Git
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Criar primeiro commit
git commit -m "🎉 Initial commit - Sistema de gestão de imóveis"

# 4. Renomear branch para main
git branch -M main

# 5. Conectar ao GitHub (SUBSTITUA SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/gestao-imoveis.git

# 6. Enviar o código para o GitHub
git push -u origin main
```

### 3.3 - Autenticação

Quando pedir credenciais:

**Opção 1: GitHub CLI (Recomendado)**
```bash
# Instale GitHub CLI: https://cli.github.com/
gh auth login
```

**Opção 2: Personal Access Token**
1. Vá em https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Marque a opção **"repo"**
4. Copie o token gerado
5. Use esse token como senha quando pedir

**Opção 3: GitHub Desktop**
- Baixe em https://desktop.github.com/
- Faça login com sua conta
- Adicione o repositório local

---

## 🌐 Passo 4: Configurar GitHub Pages (Deploy Automático)

### 4.1 - Habilitar GitHub Pages

1. Acesse seu repositório no GitHub
2. Clique em **"Settings"** (configurações)
3. No menu lateral, clique em **"Pages"**
4. Em **"Build and deployment"**:
   - **Source:** Selecione **"GitHub Actions"**
5. O workflow já está configurado no arquivo `.github/workflows/deploy.yml`

### 4.2 - Aguardar o Deploy

1. Vá na aba **"Actions"** do repositório
2. Você verá o workflow rodando
3. Aguarde até aparecer ✅ (geralmente 2-3 minutos)
4. Quando terminar, volte em **Settings → Pages**
5. O link estará disponível em algo como:
   ```
   https://SEU_USUARIO.github.io/gestao-imoveis/
   ```

### 4.3 - Acessar o App

Abra o link no navegador:
- **Computador:** `https://SEU_USUARIO.github.io/gestao-imoveis/`
- **Celular:** Mesmo link, pode instalar como PWA!

---

## 🔄 Passo 5: Atualizações Futuras

Quando fizer mudanças no código:

```bash
# 1. Verificar mudanças
git status

# 2. Adicionar mudanças
git add .

# 3. Criar commit
git commit -m "✨ Descrição da mudança"

# 4. Enviar para o GitHub
git push
```

O GitHub Actions vai automaticamente fazer o deploy!

---

## ❓ Problemas Comuns

### "Permission denied (publickey)"
```bash
# Configure SSH ou use HTTPS
git remote set-url origin https://github.com/SEU_USUARIO/gestao-imoveis.git
```

### "Updates were rejected"
```bash
# Force push (cuidado!)
git push -u origin main --force
```

### Deploy não funciona
1. Verifique se o workflow está habilitado em **Settings → Actions**
2. Verifique se o arquivo `.github/workflows/deploy.yml` existe
3. Aguarde alguns minutos e atualize a página

### Página em branco após deploy
- Verifique se o build foi bem-sucedido na aba **Actions**
- Abra o console do navegador (F12) para ver erros

---

## 📱 Passo 6: Acessar no Celular

### Opção 1: Link Direto
1. Abra o link do GitHub Pages no celular
2. Instale como PWA (veja README.md)

### Opção 2: QR Code
1. Gere um QR Code do link do GitHub Pages
2. Escaneie com o celular
3. Instale como PWA

### Opção 3: Compartilhar
1. Abra o link no computador
2. Compartilhe por WhatsApp/Email
3. Abra no celular e instale

---

## 🎯 Checklist Final

- [ ] Conta no GitHub criada
- [ ] Git instalado e configurado
- [ ] Repositório criado no GitHub
- [ ] Código enviado com `git push`
- [ ] GitHub Pages habilitado
- [ ] Deploy bem-sucedido (✅ na aba Actions)
- [ ] App acessível pelo link
- [ ] App instalado no celular (PWA)

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs na aba **Actions**
2. Consulte o arquivo `COMO_RODAR_NO_CELULAR.md`
3. Abra uma issue no repositório

---

**Pronto! Seu app está no ar! 🎉**
