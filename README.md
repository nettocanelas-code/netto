# 🏢 Gestão de Imóveis - Sistema Completo

Sistema completo de gerenciamento de imóveis, inquilinos e contratos de aluguel com **TRÊS versões** disponíveis.

## 📦 Três Versões Disponíveis

### 1️⃣ **Versão React + IndexedDB** (Pasta `src/`)
- 📱 **PWA** instalável no celular
- 💾 Dados salvos localmente no navegador (IndexedDB)
- 🌐 Deploy fácil no GitHub Pages
- 👤 Uso individual (single-user)
- 📶 Funciona offline

### 2️⃣ **Versão PHP + MySQL** (Pasta `php-app/`)
- 🖥️ Roda em servidor PHP
- 💾 Banco de dados MySQL robusto
- 👥 Multi-usuário (vários acessos)
- 🌐 Acesso de qualquer dispositivo na rede
- 🔄 Backup automático via MySQL

### 3️⃣ **Versão Python + Flask** (Pasta `python-app/`) ⭐ NOVO
- 🐍 Desenvolvido em Python
- 💾 Banco de dados SQLite (local)
- 🔌 APIs REST completas
- 🚀 Fácil instalação e configuração
- 📊 Interface moderna e responsiva

---

## 🚀 Como Usar Cada Versão

### Versão React (Padrão)

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Versão PHP

1. Instale o XAMPP (https://www.apachefriends.org/)
2. Copie a pasta `php-app/` para `htdocs/gestao-imoveis/`
3. Acesse: `http://localhost/gestao-imoveis/install.php`
4. Instale o banco de dados
5. Acesse: `http://localhost/gestao-imoveis/`

**Guia completo:** Veja `php-app/GUIA_RAPIDO.md`

### Versão Python ⭐

```bash
# Navegue até a pasta
cd python-app

# Criar ambiente virtual (recomendado)
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -r requirements.txt

# Rodar a aplicação
python app.py

# Acessar: http://localhost:5000
```

**Guia completo:** Veja `python-app/GUIA_RAPIDO.md`

---

## 📊 Comparativo das Versões

| Característica | React + IndexedDB | PHP + MySQL | Python + Flask |
|----------------|-------------------|-------------|----------------|
| **Linguagem** | JavaScript | PHP | Python |
| **Banco** | IndexedDB | MySQL | SQLite |
| **Instalação** | npm | XAMPP | pip |
| **Complexidade** | Média | Média | Baixa |
| **Performance** | Rápida | Depende | Rápida |
| **Portabilidade** | Alta | Média | Alta |
| **Multi-user** | ❌ Não | ✅ Sim | ✅ Sim |
| **Offline** | ✅ Sim | ❌ Não | ❌ Não |
| **Deploy** | GitHub Pages | Servidor PHP | Qualquer servidor |

### 🎯 Qual versão escolher?

**Use a Versão React se:**
- ✅ Você é o único usuário
- ✅ Quer usar no celular como app
- ✅ Precisa funcionar offline
- ✅ Quer deploy gratuito no GitHub Pages

**Use a Versão PHP se:**
- ✅ Múltiplos usuários precisam acessar
- ✅ Já tem um servidor PHP/MySQL
- ✅ Precisa de backup automático

**Use a Versão Python se:** ⭐
- ✅ Quer a instalação mais simples
- ✅ Prefere Python
- ✅ Quer APIs REST completas
- ✅ Não quer configurar servidor web complexo

---

## 🎯 Funcionalidades (Todas as Versões)

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
- **React:** IndexedDB (local)
- **PHP:** MySQL (servidor)
- **Python:** SQLite (local)

---

## 📁 Estrutura do Repositório

```
gestao-imoveis/
│
├── 📁 src/                    # Versão React + IndexedDB
│   ├── components/            # Componentes React
│   ├── database/              # Banco de dados IndexedDB
│   └── hooks/                 # Hooks React
│
├── 📁 php-app/                # Versão PHP + MySQL
│   ├── api/                   # APIs REST
│   ├── config/                # Configurações
│   ├── index.php              # Frontend
│   └── install.php            # Instalação do banco
│
├── 📁 python-app/             # Versão Python + Flask ⭐
│   ├── routes/                # APIs REST
│   ├── templates/             # Frontend HTML
│   ├── app.py                 # Aplicação principal
│   ├── models.py              # Modelos do banco
│   └── requirements.txt       # Dependências
│
└── README.md                  # Esta documentação
```

---

## 🛠️ Tecnologias

### Versão React:
- React 18
- TypeScript
- Tailwind CSS
- Dexie.js (IndexedDB)
- Vite

### Versão PHP:
- PHP 7.4+
- MySQL 5.7+
- PDO
- REST API
- Tailwind CSS

### Versão Python:
- Python 3.8+
- Flask 3.0
- SQLAlchemy
- SQLite
- Tailwind CSS

---

## 📞 Suporte

### Problemas com a Versão React:
1. Verifique os logs no console do navegador (F12)
2. Consulte `src/README.md`

### Problemas com a Versão PHP:
1. Verifique os logs do Apache/MySQL
2. Consulte `php-app/README.md`

### Problemas com a Versão Python:
1. Verifique os logs no terminal
2. Consulte `python-app/README.md`

---

## 📄 Licença

MIT

---

## 🎉 Pronto para Usar!

Escolha a versão que melhor se adapta às suas necessidades e comece a gerenciar seus imóveis!

**Versão React:** `npm run dev` → `http://localhost:3000`
**Versão PHP:** `http://localhost/gestao-imoveis/` (após instalar XAMPP)
**Versão Python:** `python app.py` → `http://localhost:5000` ⭐

---

**Desenvolvido com ❤️ para gestão imobiliária**
