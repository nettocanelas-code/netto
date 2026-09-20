# 📁 ESTRUTURA DO REPOSITÓRIO NO GITHUB

## 🎯 Estrutura Final Desejada

```
gestao-imoveis/              ← Nome do repositório no GitHub
│
├── 📁 web/                  ← Pasta com o app React/Vite
│   ├── 📁 .github/
│   │   └── 📁 workflows/
│   │       └── deploy.yml
│   ├── 📁 public/
│   │   └── manifest.json
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── AdminDB.tsx
│   │   │   ├── Clientes.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Imoveis.tsx
│   │   │   ├── PWAInstall.tsx
│   │   │   └── Relatorios.tsx
│   │   ├── 📁 database/
│   │   │   ├── db.ts
│   │   │   └── README.md
│   │   ├── 📁 hooks/
│   │   │   └── useDatabase.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── types.ts
│   │   └── index.css
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── vite.config.js
│   └── README.md
│
├── 📁 php-app/              ← Pasta com o sistema PHP + MySQL
│   ├── 📁 api/
│   │   ├── clientes.php
│   │   ├── imoveis.php
│   │   ├── pagamentos.php
│   │   └── relatorios.php
│   ├── 📁 config/
│   │   └── database.php
│   ├── index.php
│   ├── install.php
│   ├── README.md
│   └── GUIA_RAPIDO.md
│
└── README.md                ← README principal do repositório
```

---

## 🚀 COMO CRIAR ESSA ESTRUTURA NO GITHUB

### Opção 1: Criar a pasta "web" pelo GitHub (MAIS FÁCIL)

1. **Acesse seu repositório** no GitHub
2. **Clique em "Add file"** → **"Create new file"**
3. **No campo de nome**, digite: `web/README.md`
   - Quando você digitar `web/`, o GitHub cria a pasta automaticamente!
4. **Adicione algum conteúdo** no README (pode ser só um título)
5. **Clique em "Commit new file"**
6. ✅ **Pasta "web" criada!**

Agora você pode arrastar os arquivos do app React para dentro da pasta `web/`.

---

### Opção 2: Criar via Terminal (Git)

```bash
# 1. Clone o repositório (se já existe)
git clone https://github.com/SEU_USUARIO/gestao-imoveis.git
cd gestao-imoveis

# 2. Crie a pasta web
mkdir web

# 3. Mova os arquivos do React para dentro da pasta web
mv src/ web/
mv public/ web/
mv index.html web/
mv package.json web/
mv package-lock.json web/
mv tsconfig.json web/
mv vite.config.js web/
mv .gitignore web/
mv .github web/

# 4. Crie um README na pasta web
echo "# 🌐 App Web (React + IndexedDB)" > web/README.md

# 5. Commit e push
git add .
git commit -m "📁 Reorganizar: mover app React para pasta web/"
git push
```

---

### Opção 3: Reorganizar Tudo do Zero

Se você quer começar limpo:

```bash
# 1. Crie uma nova pasta para o projeto
mkdir gestao-imoveis
cd gestao-imoveis

# 2. Inicialize o Git
git init

# 3. Crie as pastas
mkdir web
mkdir php-app

# 4. Copie os arquivos para os lugares certos
# (faça isso manualmente ou via script)

# 5. Commit e push
git add .
git commit -m "🎉 Initial commit com estrutura web/ e php-app/"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/gestao-imoveis.git
git push -u origin main
```

---

## 📋 PASSO A PASSO VISUAL (Opção 1 - Pelo GitHub)

### Passo 1: Criar a pasta "web"

1. Vá para seu repositório no GitHub
2. Clique no botão **"Add file"** (botão verde, canto superior direito)
3. Selecione **"Create new file"**
4. No campo "Name your file...", digite:
   ```
   web/README.md
   ```
5. **IMPORTANTE:** Quando você digitar `web/` e apertar `/`, o GitHub cria a pasta!
6. No corpo do arquivo, escreva:
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
7. Clique em **"Commit new file"**

### Passo 2: Mover os arquivos do React para dentro de "web/"

**Método A: Arrastar e soltar (mais fácil)**
1. No GitHub, navegue até a pasta `web/`
2. Clique em **"Add file"** → **"Upload files"**
3. Arraste todos os arquivos do app React para a área de upload
4. Clique em **"Commit changes"**

**Método B: Via Git (terminal)**
```bash
# Na pasta do projeto local
git add .
git commit -m "📁 Mover arquivos React para pasta web/"
git push
```

### Passo 3: Atualizar o workflow do GitHub Pages

Como o app agora está na pasta `web/`, você precisa atualizar o workflow:

1. Edite o arquivo `.github/workflows/deploy.yml`
2. Mude as referências de `./` para `./web/`

**Novo deploy.yml:**
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
        working-directory: ./web    # ← MUDANÇA AQUI
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
          path: './web/dist'    # ← MUDANÇA AQUI

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

---

## ✅ RESULTADO FINAL

Depois de fazer isso, seu repositório terá:

```
gestao-imoveis/
├── 📁 web/              ← App React (GitHub Pages)
└── 📁 php-app/          ← Sistema PHP (servidor próprio)
```

### URLs finais:
- **App Web (React):** `https://SEU_USUARIO.github.io/gestao-imoveis/`
- **App PHP:** `http://seu-servidor.com/gestao-imoveis/php-app/`

---

## 🎯 RESUMO RÁPIDO

**Para criar a pasta "web" no GitHub:**

1. Vá ao repositório
2. Clique em **"Add file"** → **"Create new file"**
3. Digite: `web/README.md`
4. O GitHub cria a pasta automaticamente!
5. Commit!

**Pronto! Pasta criada em 30 segundos!** 🎉
