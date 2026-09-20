# 🏢 Gestão de Imóveis

Sistema completo de gerenciamento de imóveis, inquilinos e contratos de aluguel.

## 📦 Duas Versões Disponíveis

Este projeto possui **duas versões** do sistema:

### 1️⃣ **Versão React + IndexedDB** (Padrão)
- 📱 **PWA** instalável no celular
- 💾 Dados salvos localmente no navegador (IndexedDB)
- 🌐 Deploy fácil no GitHub Pages
- 👤 Uso individual (single-user)
- 📶 Funciona offline

**Para usar:** Basta abrir o app no navegador ou fazer deploy no GitHub Pages.

### 2️⃣ **Versão PHP + MySQL** (Servidor)
- 🖥️ Roda em servidor PHP
- 💾 Banco de dados MySQL robusto
- 👥 Multi-usuário (vários acessos)
- 🌐 Acesso de qualquer dispositivo na rede
- 🔄 Backup automático via MySQL

**Para usar:** Veja a pasta `php-app/` para instruções completas.

---

## 🚀 Como Usar Cada Versão

### Versão React (Esta pasta)

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Versão PHP (Pasta `php-app/`)

1. Instale o XAMPP (https://www.apachefriends.org/)
2. Copie a pasta `php-app/` para `htdocs/gestao-imoveis/`
3. Acesse: `http://localhost/gestao-imoveis/install.php`
4. Instale o banco de dados
5. Acesse: `http://localhost/gestao-imoveis/`

**Guia completo:** Veja `php-app/GUIA_RAPIDO.md`

---

## 📊 Comparativo

| Característica | React + IndexedDB | PHP + MySQL |
|----------------|-------------------|-------------|
| **Onde roda** | Navegador (local) | Servidor PHP |
| **Dados** | IndexedDB (local) | MySQL (servidor) |
| **Acesso** | Single-user | Multi-user |
| **Deploy** | GitHub Pages | Servidor PHP |
| **Offline** | ✅ Sim | ❌ Não |
| **Backup** | Manual (JSON) | Automático (MySQL) |
| **Instalação** | Simples (npm) | XAMPP + MySQL |

---

## 📁 Estrutura do Projeto

```
gestao-imoveis/
├── src/                    # Versão React + IndexedDB
│   ├── components/         # Componentes React
│   ├── database/           # Banco de dados IndexedDB
│   └── hooks/              # Hooks React
├── php-app/                # Versão PHP + MySQL
│   ├── api/                # APIs REST
│   ├── config/             # Configurações
│   ├── index.php           # Frontend
│   └── install.php         # Instalação do banco
├── README.md               # Esta documentação
└── (outros arquivos)
```

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
