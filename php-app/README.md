# 🏢 Gestão de Imóveis - Versão PHP + MySQL

Sistema completo de gerenciamento de imóveis, inquilinos e contratos de aluguel desenvolvido em **PHP + MySQL**.

## ✨ Funcionalidades

- 👥 **Cadastro de Clientes** - CPF, telefone, email
- 🏠 **Gestão de Imóveis** - Casas, fazendas e suítes
- 📊 **Relatórios** - Mensal e anual com gráficos
- 💰 **Controle de Pagamentos** - Marcar como pago/pendente
- ⏱️ **Cronômetro de Contratos** - Tempo restante visual
- 💾 **Banco de Dados MySQL** - Persistência robusta
- 📱 **Responsivo** - Funciona em desktop e mobile

## 📋 Pré-requisitos

- **PHP 7.4 ou superior**
- **MySQL 5.7 ou superior**
- **Servidor Web** (Apache, Nginx, ou XAMPP/WAMP/MAMP)

## 🚀 Instalação

### Opção 1: XAMPP (Windows/Mac/Linux) - MAIS FÁCIL

1. **Baixe e instale o XAMPP:**
   - Acesse: https://www.apachefriends.org/
   - Baixe a versão para seu sistema operacional
   - Instale seguindo as instruções

2. **Inicie os serviços:**
   - Abra o XAMPP Control Panel
   - Clique em "Start" no Apache
   - Clique em "Start" no MySQL

3. **Copie os arquivos:**
   - Copie a pasta `php-app` para `C:\xampp\htdocs\` (Windows) ou `/Applications/XAMPP/htdocs/` (Mac)
   - Renomeie a pasta para `gestao-imoveis` (opcional)

4. **Acesse o sistema:**
   - Abra o navegador
   - Acesse: `http://localhost/gestao-imoveis/install.php`
   - Clique em "Instalar Banco de Dados"

5. **Pronto!**
   - Acesse: `http://localhost/gestao-imoveis/`
   - O sistema está funcionando!

### Opção 2: WAMP (Windows)

1. **Baixe e instale o WAMP:**
   - Acesse: https://www.wampserver.com/
   - Instale seguindo as instruções

2. **Inicie os serviços:**
   - Clique no ícone do WAMP na bandeja do sistema
   - Clique em "Start All Services"

3. **Copie os arquivos:**
   - Copie a pasta `php-app` para `C:\wamp64\www\`
   - Renomeie para `gestao-imoveis`

4. **Acesse:**
   - `http://localhost/gestao-imoveis/install.php`
   - Instale o banco de dados
   - Acesse: `http://localhost/gestao-imoveis/`

### Opção 3: MAMP (Mac)

1. **Baixe e instale o MAMP:**
   - Acesse: https://www.mamp.info/
   - Instale seguindo as instruções

2. **Inicie os serviços:**
   - Abra o MAMP
   - Clique em "Start Servers"

3. **Copie os arquivos:**
   - Copie a pasta `php-app` para `/Applications/MAMP/htdocs/`
   - Renomeie para `gestao-imoveis`

4. **Acesse:**
   - `http://localhost:8888/gestao-imoveis/install.php`
   - Instale o banco de dados
   - Acesse: `http://localhost:8888/gestao-imoveis/`

### Opção 4: Servidor Linux (Apache + MySQL)

1. **Instale Apache e MySQL:**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install apache2 mysql-server php php-mysql php-pdo
   
   # CentOS/RHEL
   sudo yum install httpd mysql-server php php-mysql php-pdo
   ```

2. **Inicie os serviços:**
   ```bash
   sudo systemctl start apache2
   sudo systemctl start mysql
   sudo systemctl enable apache2
   sudo systemctl enable mysql
   ```

3. **Copie os arquivos:**
   ```bash
   sudo cp -r php-app /var/www/html/gestao-imoveis
   sudo chown -R www-data:www-data /var/www/html/gestao-imoveis
   ```

4. **Acesse:**
   - `http://seu-servidor/gestao-imoveis/install.php`
   - Instale o banco de dados
   - Acesse: `http://seu-servidor/gestao-imoveis/`

## ⚙️ Configuração

### Alterar credenciais do banco de dados

Edite o arquivo `config/database.php`:

```php
define('DB_HOST', 'localhost');      // Host do MySQL
define('DB_NAME', 'gestao_imoveis'); // Nome do banco
define('DB_USER', 'root');           // Usuário do MySQL
define('DB_PASS', '');               // Senha do MySQL (vazio por padrão no XAMPP)
define('DB_CHARSET', 'utf8mb4');     // Charset
```

### Instalação do Banco de Dados

1. Acesse: `http://localhost/gestao-imoveis/install.php`
2. O script irá:
   - Criar o banco de dados `gestao_imoveis`
   - Criar as tabelas: `clientes`, `imoveis`, `pagamentos`, `configs`
   - Configurar índices e relacionamentos
3. Clique em "Acessar o Sistema"

## 📁 Estrutura do Projeto

```
php-app/
├── config/
│   └── database.php          # Configuração do banco de dados
├── api/
│   ├── clientes.php          # API REST de clientes
│   ├── imoveis.php           # API REST de imóveis
│   ├── pagamentos.php        # API REST de pagamentos
│   └── relatorios.php        # API REST de relatórios
├── index.php                 # Página principal (frontend)
├── install.php               # Script de instalação do banco
└── README.md                 # Esta documentação
```

## 🗄️ Estrutura do Banco de Dados

### Tabela: clientes
- `id` - ID auto-incremento
- `uuid` - Identificador único (UUID)
- `nome` - Nome do inquilino
- `cpf` - CPF formatado
- `telefone` - Telefone formatado
- `email` - Email (opcional)
- `data_cadastro` - Data de criação
- `ativo` - Status (1=ativo, 0=inativo)

### Tabela: imoveis
- `id` - ID auto-incremento
- `uuid` - Identificador único (UUID)
- `tipo` - Tipo: 'casa', 'fazenda', 'suite'
- `endereco` - Endereço do imóvel
- `valor_aluguel` - Valor mensal do aluguel
- `contrato_meses` - Duração do contrato (6 ou 12)
- `data_inicio` - Data de início do contrato
- `cliente_uuid` - UUID do cliente vinculado
- `periodo_arrendado` - Período (fazenda)
- `residencial` - Nome do residencial (suíte)
- `data_cadastro` - Data de criação
- `ativo` - Status (1=ativo, 0=inativo)

### Tabela: pagamentos
- `id` - ID auto-incremento
- `uuid` - Identificador único (UUID)
- `imovel_uuid` - UUID do imóvel
- `mes` - Mês (1-12)
- `ano` - Ano
- `pago` - Status (1=pago, 0=pendente)
- `data_pagamento` - Data do pagamento
- `valor_pago` - Valor pago
- `observacao` - Observação

## 🔌 APIs REST

### Clientes

**Listar todos:**
```
GET /api/clientes.php?action=all
```

**Buscar por UUID:**
```
GET /api/clientes.php?action=get&uuid=xxx
```

**Buscar por termo:**
```
GET /api/clientes.php?action=search&termo=joao
```

**Criar:**
```
POST /api/clientes.php?action=create
Content-Type: application/json

{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com"
}
```

**Atualizar:**
```
PUT /api/clientes.php?action=update&uuid=xxx
Content-Type: application/json

{
  "nome": "João Silva Santos",
  "telefone": "(11) 88888-8888"
}
```

**Excluir (soft delete):**
```
DELETE /api/clientes.php?action=delete&uuid=xxx
```

### Imóveis

**Listar todos:**
```
GET /api/imoveis.php?action=all
```

**Buscar por cliente:**
```
GET /api/imoveis.php?action=by-cliente&cliente_uuid=xxx
```

**Buscar por tipo:**
```
GET /api/imoveis.php?action=by-tipo&tipo=casa
```

**Criar:**
```
POST /api/imoveis.php?action=create
Content-Type: application/json

{
  "tipo": "casa",
  "endereco": "Rua das Flores, 123",
  "valor_aluguel": 1500.00,
  "contrato_meses": 12,
  "data_inicio": "2025-01-01",
  "cliente_uuid": "xxx"
}
```

### Pagamentos

**Listar por mês/ano:**
```
GET /api/pagamentos.php?action=by-mes&mes=1&ano=2025
```

**Alternar status:**
```
POST /api/pagamentos.php?action=toggle
Content-Type: application/json

{
  "imovel_uuid": "xxx",
  "mes": 1,
  "ano": 2025
}
```

**Marcar como pago:**
```
POST /api/pagamentos.php?action=mark-paid
Content-Type: application/json

{
  "imovel_uuid": "xxx",
  "mes": 1,
  "ano": 2025,
  "valor_pago": 1500.00
}
```

### Relatórios

**Estatísticas gerais:**
```
GET /api/relatorios.php?action=stats
```

**Relatório mensal:**
```
GET /api/relatorios.php?action=mensal&mes=1&ano=2025
```

**Relatório anual:**
```
GET /api/relatorios.php?action=anual&ano=2025
```

## 🐛 Solução de Problemas

### Erro: "SQLSTATE[HY000] [1045] Access denied"
**Solução:** Verifique as credenciais em `config/database.php`

### Erro: "SQLSTATE[HY000] [2002] Connection refused"
**Solução:** Verifique se o MySQL está rodando

### Erro: "404 Not Found" nas APIs
**Solução:** Verifique se o Apache está com mod_rewrite habilitado

### Página em branco
**Solução:** 
1. Verifique os logs de erro do Apache
2. Habilite exibição de erros no PHP:
   ```php
   ini_set('display_errors', 1);
   error_reporting(E_ALL);
   ```

## 📱 Diferenças entre Versões

| Característica | React (IndexedDB) | PHP (MySQL) |
|----------------|-------------------|-------------|
| **Armazenamento** | Local (navegador) | Servidor (MySQL) |
| **Acesso** | Single-user | Multi-user |
| **Backup** | Manual (JSON) | Automático (MySQL) |
| **Performance** | Rápida (local) | Depende do servidor |
| **Deploy** | GitHub Pages | Servidor PHP |
| **Offline** | ✅ Sim | ❌ Não |
| **Multi-dispositivo** | ❌ Não | ✅ Sim |

## 🔒 Segurança

### Recomendações para produção:

1. **Altere as credenciais do banco:**
   - Use um usuário específico (não root)
   - Defina uma senha forte

2. **Habilite HTTPS:**
   - Use Let's Encrypt para certificado gratuito
   - Configure o Apache/Nginx para SSL

3. **Proteja as APIs:**
   - Implemente autenticação (JWT, sessions)
   - Valide todos os inputs
   - Use prepared statements (já implementado)

4. **Backup automático:**
   - Configure backups diários do MySQL
   - Armazene em local seguro

5. **Firewall:**
   - Restrinja acesso ao MySQL (apenas localhost)
   - Configure firewall para permitir apenas HTTP/HTTPS

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs do Apache/MySQL
2. Consulte a documentação do PHP: https://www.php.net/manual/pt_BR/
3. Consulte a documentação do MySQL: https://dev.mysql.com/doc/

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ em PHP + MySQL**
