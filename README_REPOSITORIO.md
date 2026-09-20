# 🏢 Gestão de Imóveis - Repositório Completo

Sistema completo de gerenciamento de imóveis, inquilinos e contratos de aluguel com **duas versões** disponíveis.

## 📦 Estrutura do Repositório

```
gestao-imoveis/
├── 📁 web/              ← App Web (React + IndexedDB)
│   ├── Deploy automático no GitHub Pages
│   ├── PWA instalável no celular
│   └── Funciona offline
│
├── 📁 php-app/          ← Sistema PHP + MySQL
│   ├── Multi-usuário
│   ├── Acesso remoto
│   └── Requer servidor PHP
│
└── README.md            ← Você está aqui!
```

---

## 🌐 Versão 1: App Web (React + IndexedDB)

### 📍 Localização: `web/`

### ✨ Características:
- ✅ **PWA** instalável no celular
- ✅ **Offline** - funciona sem internet
- ✅ **Deploy fácil** - GitHub Pages automático
- ✅ **Single-user** - uso individual
- ✅ **Dados locais** - salvos no navegador (IndexedDB)

### 🚀 Como Usar:

**Online (GitHub Pages):**
```
https://SEU_USUARIO.github.io/gestao-imoveis/
```

**Local (desenvolvimento):**
```bash
cd web
npm install
npm run dev
```

### 📱 Instalar no Celular:

**iPhone (Safari):**
1. Acesse o link no Safari
2. Toque em **Compartilhar** (⬆️)
3. Toque em **"Adicionar à Tela de Início"**

**Android (Chrome):**
1. Acesse o link no Chrome
2. Toque nos **3 pontos** (⋮)
3. Toque em **"Adicionar à tela inicial"**

### 📚 Documentação:
- [web/README.md](web/README.md) - Documentação completa
- [GUIA_INSTALACAO_IOS.md](GUIA_INSTALACAO_IOS.md) - Guia iPhone
- [COMO_RODAR_NO_CELULAR.md](COMO_RODAR_NO_CELULAR.md) - Guia mobile

---

## 🖥️ Versão 2: Sistema PHP + MySQL

### 📍 Localização: `php-app/`

### ✨ Características:
- ✅ **Multi-usuário** - vários acessos simultâneos
- ✅ **Acesso remoto** - de qualquer dispositivo na rede
- ✅ **Banco MySQL** - persistência robusta
- ✅ **Backup automático** - via MySQL
- ✅ **APIs REST** - integração com outros sistemas

### 🚀 Como Usar:

**Instalação (XAMPP):**
1. Instale o XAMPP: https://www.apachefriends.org/
2. Copie a pasta `php-app/` para `htdocs/gestao-imoveis/`
3. Acesse: `http://localhost/gestao-imoveis/install.php`
4. Clique em **"Instalar Banco de Dados"**
5. Pronto! Acesse: `http://localhost/gestao-imoveis/`

**Instalação (Servidor Linux):**
```bash
# Copie os arquivos para /var/www/html/gestao-imoveis/
sudo cp -r php-app/* /var/www/html/gestao-imoveis/

# Configure as permissões
sudo chown -R www-data:www-data /var/www/html/gestao-imoveis/

# Acesse: http://seu-servidor/gestao-imoveis/install.php
```

### 📚 Documentação:
- [php-app/README.md](php-app/README.md) - Documentação completa
- [php-app/GUIA_RAPIDO.md](php-app/GUIA_RAPIDO.md) - Instalação rápida

---

## 📊 Comparativo das Versões

| Característica | Web (React) | PHP (MySQL) |
|----------------|-------------|-------------|
| **Onde roda** | Navegador | Servidor PHP |
| **Dados** | IndexedDB (local) | MySQL (servidor) |
| **Acesso** | Single-user | Multi-user |
| **Deploy** | GitHub Pages | Servidor PHP |
| **Offline** | ✅ Sim | ❌ Não |
| **Backup** | Manual (JSON) | Automático (MySQL) |
| **Instalação** | Simples (npm) | XAMPP + MySQL |
| **Custo** | Grátis (GitHub) | Servidor necessário |

### 🎯 Qual versão escolher?

**Use a Versão Web (React) se:**
- ✅ Você é o único usuário
- ✅ Quer usar no celular como app
- ✅ Precisa funcionar offline
- ✅ Quer deploy gratuito no GitHub Pages
- ✅ Não quer configurar servidor

**Use a Versão PHP se:**
- ✅ Múltiplos usuários precisam acessar
- ✅ Quer acesso de qualquer dispositivo
- ✅ Precisa de backup automático
- ✅ Tem servidor PHP disponível
- ✅ Quer integrar com outros sistemas

---

## 🎯 Funcionalidades (Ambas as Versões)

### 👥 Gestão de Clientes
- Cadastro completo (nome, CPF, telefone, email)
- Busca e filtros
- Edição e exclusão

### 🏠 Gestão de Imóveis
- Casas, fazendas e suítes
- Vínculo com clientes
- Cronômetro visual do contrato
- Valor do aluguel

### 💰 Controle de Pagamentos
- Marcar como PAGO/pendente
- Histórico de pagamentos
- Status visual (verde/vermelho)

### 📊 Relatórios
- Relatório mensal detalhado
- Relatório anual com gráficos
- Total de receitas e pendências

### 💾 Banco de Dados
- **Web:** IndexedDB (local)
- **PHP:** MySQL (servidor)
- Backup e restauração

---

## 🚀 Começando

### Opção 1: Usar a Versão Web (Recomendado para começar)

1. **Acesse online:**
   ```
   https://SEU_USUARIO.github.io/gestao-imoveis/
   ```

2. **Ou rode localmente:**
   ```bash
   cd web
   npm install
   npm run dev
   ```

3. **Instale no celular** (veja instruções acima)

### Opção 2: Usar a Versão PHP

1. **Instale o XAMPP**
2. **Copie os arquivos** para `htdocs/gestao-imoveis/`
3. **Acesse:** `http://localhost/gestao-imoveis/install.php`
4. **Instale o banco de dados**
5. **Use o sistema:** `http://localhost/gestao-imoveis/`

---

## 📁 Estrutura de Pastas Detalhada

### Pasta `web/` (App React)
```
web/
├── .github/workflows/     # Deploy automático
├── public/                # Arquivos públicos (PWA)
├── src/
│   ├── components/        # Componentes React
│   ├── database/          # Banco de dados IndexedDB
│   └── hooks/             # Hooks React
├── index.html             # HTML principal
├── package.json           # Dependências
└── vite.config.js         # Configuração Vite
```

### Pasta `php-app/` (Sistema PHP)
```
php-app/
├── api/                   # APIs REST
│   ├── clientes.php
│   ├── imoveis.php
│   ├── pagamentos.php
│   └── relatorios.php
├── config/                # Configurações
│   └── database.php
├── index.php              # Interface principal
└── install.php            # Instalação do banco
```

---

## 🛠️ Tecnologias

### Versão Web:
- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Dexie.js** - IndexedDB wrapper
- **Vite** - Build tool
- **PWA** - Progressive Web App

### Versão PHP:
- **PHP 7.4+** - Backend
- **MySQL 5.7+** - Banco de dados
- **PDO** - Conexão com banco
- **REST API** - APIs para integração
- **Tailwind CSS** - Interface moderna

---

## 📞 Suporte

### Problemas com a Versão Web:
1. Verifique os logs no console do navegador (F12)
2. Consulte [web/README.md](web/README.md)
3. Verifique se o build foi feito corretamente

### Problemas com a Versão PHP:
1. Verifique os logs do Apache/MySQL
2. Consulte [php-app/README.md](php-app/README.md)
3. Verifique as credenciais em `php-app/config/database.php`

---

## 📄 Licença

MIT

---

## 🎉 Pronto para Usar!

Escolha a versão que melhor se adapta às suas necessidades e comece a gerenciar seus imóveis!

**Versão Web:** `https://SEU_USUARIO.github.io/gestao-imoveis/`
**Versão PHP:** `http://localhost/gestao-imoveis/` (após instalar XAMPP)

---

**Desenvolvido com ❤️ para gestão imobiliária**
