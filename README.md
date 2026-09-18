# 🏢 Gestão de Imóveis

Sistema completo de gerenciamento de imóveis, inquilinos e contratos de aluguel.

## ✨ Funcionalidades

- 👥 **Cadastro de Clientes** - CPF, telefone, email
- 🏠 **Gestão de Imóveis** - Casas, fazendas e suítes
- 📊 **Relatórios** - Mensal e anual com gráficos
- 💰 **Controle de Pagamentos** - Marcar como pago/pendente
- ⏱️ **Cronômetro de Contratos** - Tempo restante visual
- 💾 **Banco de Dados Local** - IndexedDB com backup/restauração
- 📱 **PWA** - Instalável no celular

## 🚀 Como Usar

### No Computador

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### No Celular

Veja o guia completo em [COMO_RODAR_NO_CELULAR.md](COMO_RODAR_NO_CELULAR.md)

**Opções:**
1. **GitHub Pages** - Deploy automático (gratuito)
2. **Rede Local** - Acesse pelo WiFi
3. **ngrok** - URL pública temporária

## 📱 Instalar como App

### iPhone (Safari)
1. Abra o app no Safari
2. Toque em **Compartilhar** (⬆️)
3. Toque em **"Adicionar à Tela de Início"**
4. Confirme em **"Adicionar"**

### Android (Chrome)
1. Abra o app no Chrome
2. Toque nos **3 pontos** (⋮)
3. Toque em **"Adicionar à tela inicial"**
4. Confirme em **"Instalar"**

## 🗄️ Banco de Dados

O app usa **IndexedDB** (via Dexie.js) para armazenar dados localmente no navegador.

### Estrutura
- **clientes** - Dados dos inquilinos
- **imoveis** - Imóveis com contratos
- **pagamentos** - Registro de pagamentos
- **configs** - Configurações

### Backup
- Vá em **Banco de Dados** no menu
- Clique em **Baixar Backup** para exportar
- Use **Importar Arquivo** para restaurar

## 🛠️ Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Dexie.js (IndexedDB)
- Vite

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ para gestão imobiliária**
