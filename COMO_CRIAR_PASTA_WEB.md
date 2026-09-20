# 📁 COMO CRIAR A PASTA "web" NO GITHUB

## 🎯 MÉTODO 1: Pelo Site do GitHub (MAIS FÁCIL - 30 segundos)

### Passo a Passo com Imagens Descritivas:

**1. Acesse seu repositório no GitHub**
```
https://github.com/SEU_USUARIO/gestao-imoveis
```

**2. Procure o botão "Add file"**
- Está no canto superior direito da lista de arquivos
- É um botão verde escrito **"Add file"**
- Clique nele

**3. Selecione "Create new file"**
- Um menu dropdown vai aparecer
- Clique em **"Create new file"**

**4. Crie a pasta "web"**
- No campo "Name your file..." (campo de texto grande)
- Digite exatamente: `web/README.md`
- **IMPORTANTE:** Quando você digitar `web/` e apertar a tecla `/`, o GitHub automaticamente cria a pasta!
- Você vai ver algo assim:
  ```
  web/
    └── README.md
  ```

**5. Adicione conteúdo ao README**
- No corpo do arquivo (área de texto grande abaixo), escreva:
```markdown
# 🌐 App Web - Gestão de Imóveis

Aplicação React + IndexedDB para gestão de imóveis e aluguéis.

## 🚀 Como usar

```bash
cd web
npm install
npm run dev
```

## 📱 Deploy

Acesse via GitHub Pages após o deploy automático.
```

**6. Faça o Commit**
- Role para baixo
- Você verá dois campos:
  - "Commit message" (título)
  - "Extended description" (descrição opcional)
- No primeiro campo escreva: `📁 Criar pasta web para app React`
- Clique no botão verde **"Commit new file"**

**✅ PRONTO! Pasta "web" criada!**

---

## 🎯 MÉTODO 2: Via Terminal (Git)

Se você prefere usar o terminal:

```bash
# 1. Clone o repositório (se ainda não clonou)
git clone https://github.com/SEU_USUARIO/gestao-imoveis.git
cd gestao-imoveis

# 2. Crie a pasta web
mkdir web

# 3. Crie um README na pasta web
echo "# 🌐 App Web - Gestão de Imóveis" > web/README.md

# 4. Adicione ao Git
git add web/

# 5. Faça commit
git commit -m "📁 Criar pasta web para app React"

# 6. Envie para o GitHub
git push
```

**✅ PRONTO! Pasta "web" criada!**

---

## 🎯 MÉTODO 3: Arrastar e Soltar (Upload)

Se você já tem os arquivos localmente:

**1. Acesse seu repositório no GitHub**

**2. Clique em "Add file" → "Upload files"**

**3. Crie a pasta web localmente primeiro**
- No seu computador, crie uma pasta chamada `web`
- Coloque todos os arquivos do app React dentro dela

**4. Arraste a pasta inteira**
- Arraste a pasta `web/` para a área de upload no GitHub
- O GitHub vai criar a pasta automaticamente

**5. Clique em "Commit changes"**

**✅ PRONTO! Pasta "web" criada com todos os arquivos!**

---

## 📋 DEPOIS DE CRIAR A PASTA "web"

### Agora você precisa mover os arquivos do React para dentro dela:

**Opção A: Pelo GitHub (arrastar e soltar)**

1. Navegue até a pasta `web/` no GitHub
2. Clique em **"Add file" → "Upload files"**
3. Arraste todos estes arquivos:
   - `src/` (pasta inteira)
   - `public/` (pasta inteira)
   - `index.html`
   - `package.json`
   - `package-lock.json`
   - `tsconfig.json`
   - `vite.config.js`
   - `.gitignore`
4. Clique em **"Commit changes"**

**Opção B: Via Git (terminal)**

```bash
# Na pasta do projeto local

# Mova os arquivos para dentro da pasta web/
mv src/ web/
mv public/ web/
mv index.html web/
mv package.json web/
mv package-lock.json web/
mv tsconfig.json web/
mv vite.config.js web/
mv .gitignore web/
mv .github web/

# Commit e push
git add .
git commit -m "📁 Mover arquivos React para pasta web/"
git push
```

---

## ⚙️ ATUALIZAR O WORKFLOW DO GITHUB PAGES

Depois de mover os arquivos para `web/`, você precisa atualizar o workflow:

**1. Edite o arquivo `.github/workflows/deploy.yml`**

**2. Substitua TODO o conteúdo por este:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./web    # ← MUDANÇA IMPORTANTE
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: ./web/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './web/dist'    # ← MUDANÇA IMPORTANTE

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**3. Faça commit:**
```bash
git add .github/workflows/deploy.yml
git commit -m "⚙️ Atualizar workflow para pasta web/"
git push
```

---

## ✅ CHECKLIST FINAL

Depois de fazer tudo, seu repositório deve ter esta estrutura:

```
gestao-imoveis/
├── 📁 web/                  ← App React
│   ├── 📁 src/
│   ├── 📁 public/
│   ├── 📁 .github/workflows/
│   ├── index.html
│   ├── package.json
│   └── (outros arquivos)
│
├── 📁 php-app/              ← Sistema PHP
│   ├── 📁 api/
│   ├── 📁 config/
│   ├── index.php
│   └── install.php
│
└── README.md
```

### URLs finais:
- **App Web:** `https://SEU_USUARIO.github.io/gestao-imoveis/`
- **App PHP:** `http://localhost/gestao-imoveis/php-app/` (se usar XAMPP)

---

## 🎯 RESUMO RÁPIDO

**Para criar a pasta "web" no GitHub:**

1. Vá ao repositório
2. Clique em **"Add file" → "Create new file"**
3. Digite: `web/README.md`
4. Adicione conteúdo
5. Commit!

**Tempo:** 30 segundos
**Dificuldade:** ⭐ (Muito fácil)

---

## 🆘 PROBLEMAS COMUNS

### ❌ "Não sei onde está o botão Add file"
**Solução:** Está no canto superior direito da lista de arquivos, é um botão verde

### ❌ "A pasta não foi criada"
**Solução:** Certifique-se de digitar `web/` com a barra no final

### ❌ "Não consigo mover os arquivos"
**Solução:** Use o método de arrastar e soltar ou faça via Git

---

**🎉 PRONTO! Agora você tem a pasta "web" no GitHub!**
