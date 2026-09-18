# 📱 Como Rodar o App no Celular

## 🚀 Opção 1: GitHub Pages (Recomendado - Gratuito)

### Passo 1: Criar repositório no GitHub
```bash
# No terminal, dentro da pasta do projeto
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/gestao-imoveis.git
git push -u origin main
```

### Passo 2: Configurar GitHub Pages
1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Passo 3: Acessar no celular
- Após o deploy (2-3 minutos), acesse: `https://SEU_USUARIO.github.io/gestao-imoveis/`
- **Adicione à tela inicial** (veja instruções abaixo)

---

## 📲 Opção 2: Rodar Localmente na Rede WiFi

### No computador:
```bash
# Instale dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

O Vite vai mostrar algo como:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/  ← Use este IP!
```

### No celular:
1. Conecte no **mesmo WiFi** do computador
2. Abra o navegador e acesse: `http://192.168.1.100:5173/`
   (use o IP mostrado no terminal)

### Problemas comuns:
- **Não conecta?** Verifique se está no mesmo WiFi
- **Firewall?** Desative temporariamente ou libere a porta 5173
- **IP mudou?** Rode `npm run dev -- --host` e veja o IP atualizado

---

## 📲 Opção 3: Usar ngrok (Acesso de qualquer lugar)

### Instale ngrok:
```bash
# macOS
brew install ngrok

# Windows (com Chocolatey)
choco install ngrok

# Ou baixe em: https://ngrok.com/download
```

### Use ngrok:
```bash
# Terminal 1: rode o app
npm run dev

# Terminal 2: exponha com ngrok
ngrok http 5173
```

Ngrok vai gerar uma URL pública como: `https://abc123.ngrok.io`

Acesse essa URL de qualquer celular, em qualquer lugar!

---

## 📲 Como Instalar como App (PWA)

### No iPhone (Safari):
1. Abra o app no Safari
2. Toque no botão **Compartilhar** (quadrado com seta)
3. Role para baixo e toque em **"Adicionar à Tela de Início"**
4. Toque em **"Adicionar"**
5. Pronto! O ícone aparecerá na tela inicial

### No Android (Chrome):
1. Abra o app no Chrome
2. Toque nos **3 pontos** (menu) no canto superior
3. Toque em **"Adicionar à tela inicial"** ou **"Instalar aplicativo"**
4. Confirme tocando em **"Instalar"**
5. Pronto! O app abrirá em tela cheia, como um app nativo

---

## 🔧 Opção 4: Usar Vercel/Netlify (Deploy automático)

### Vercel:
```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify:
```bash
# Instale Netlify CLI
npm i -g netlify-cli

# Build e deploy
npm run build
netlify deploy --prod --dir=dist
```

Ambos geram URLs públicas gratuitas e fazem deploy automático a cada push no GitHub.

---

## 💡 Dicas Importantes

### Dados no Celular
- Os dados ficam salvos no **navegador do celular**
- Se limpar dados do navegador, perde os dados do app
- **Faça backup regular** em "Banco de Dados" → "Baixar Backup"

### Performance
- O app é otimizado para mobile
- Funciona offline após primeiro carregamento (PWA)
- Dados ficam salvos localmente (IndexedDB)

### Navegador Recomendado
- **Android:** Chrome (melhor suporte PWA)
- **iPhone:** Safari (único que suporta PWA no iOS)

---

## 🆘 Solução de Problemas

### App não abre no celular
- Verifique se está na mesma rede (Opção 2)
- Tente outro navegador
- Limpe cache do navegador

### Dados não salvam
- Verifique se o navegador suporta IndexedDB
- Não use modo privado/anônimo
- Tente outro navegador

### Ícone não aparece ao instalar
- Aguarde alguns segundos após carregar a página
- Certifique-se de que o manifest.json está acessível
- No iOS, use Safari (outros navegadores não suportam PWA)

---

## 📞 Suporte

Se tiver problemas, verifique:
1. Console do navegador (F12) para erros
2. Se o build foi feito corretamente (`npm run build`)
3. Se as dependências estão instaladas (`npm install`)
