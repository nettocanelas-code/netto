# 🚀 GUIA RÁPIDO - Sistema PHP + MySQL

## ⚡ INSTALAÇÃO EM 5 MINUTOS (XAMPP)

### Passo 1: Baixar XAMPP
1. Acesse: https://www.apachefriends.org/
2. Baixe a versão para seu sistema (Windows/Mac/Linux)
3. Instale seguindo as instruções padrão

### Passo 2: Iniciar Serviços
1. Abra o **XAMPP Control Panel**
2. Clique em **"Start"** no **Apache**
3. Clique em **"Start"** no **MySQL**
4. Ambos devem ficar verdes ✅

### Passo 3: Copiar Arquivos
1. Abra a pasta `php-app` deste projeto
2. Copie TODOS os arquivos
3. Cole em: `C:\xampp\htdocs\gestao-imoveis\` (Windows)
   - Ou `/Applications/XAMPP/htdocs/gestao-imoveis/` (Mac)
   - Ou `/opt/lampp/htdocs/gestao-imoveis/` (Linux)

### Passo 4: Instalar Banco de Dados
1. Abra o navegador
2. Acesse: `http://localhost/gestao-imoveis/install.php`
3. Clique em **"Instalar Banco de Dados"**
4. Aguarde a mensagem de sucesso ✅

### Passo 5: Usar o Sistema
1. Acesse: `http://localhost/gestao-imoveis/`
2. **Pronto!** O sistema está funcionando! 🎉

---

## 📋 O QUE FAZER AGORA

### 1. Cadastrar Clientes
- Clique em **"Clientes"** no menu
- Clique em **"+ Novo Cliente"**
- Preencha: Nome, CPF, Telefone, Email
- Clique em **"Salvar"**

### 2. Cadastrar Imóveis
- Clique em **"Imóveis"** no menu
- Clique em **"+ Novo Imóvel"**
- Selecione o tipo (Casa, Fazenda, Suíte)
- Preencha os dados
- Selecione o cliente
- Clique em **"Salvar"**

### 3. Marcar Pagamentos
- Na lista de imóveis, clique em **"⏳ PENDENTE - Marcar como PAGO"**
- O botão mudará para **"✅ PAGO"**

### 4. Ver Relatórios
- Clique em **"Relatórios"** no menu
- Selecione o mês/ano
- Veja o resumo de receitas e pagamentos

---

## 🔧 CONFIGURAÇÕES IMPORTANTES

### Alterar Senha do MySQL (Recomendado)

Por padrão, o XAMPP usa senha vazia para o MySQL. Para produção:

1. Acesse: `http://localhost/phpmyadmin/`
2. Clique em **"Usuários"**
3. Encontre o usuário `root`
4. Clique em **"Editar privilégios"**
5. Defina uma senha forte
6. Atualize o arquivo `config/database.php`:
   ```php
   define('DB_PASS', 'SUA_SENHA_AQUI');
   ```

### Backup Automático

Para fazer backup do banco de dados:

1. Acesse: `http://localhost/phpmyadmin/`
2. Selecione o banco `gestao_imoveis`
3. Clique em **"Exportar"**
4. Escolha o formato **SQL**
5. Clique em **"Executar"**
6. Salve o arquivo `.sql`

Para restaurar:
1. Acesse o phpMyAdmin
2. Selecione o banco
3. Clique em **"Importar"**
4. Selecione o arquivo `.sql`
5. Clique em **"Executar"**

---

## 🌐 ACESSAR DE OUTROS DISPOSITIVOS

### Na mesma rede WiFi:

1. Descubra o IP do seu computador:
   - **Windows:** Abra CMD e digite `ipconfig`
   - **Mac/Linux:** Abra Terminal e digite `ifconfig`
   - Procure por "IPv4" ou "inet" (ex: 192.168.1.100)

2. No outro dispositivo (celular, tablet, outro PC):
   - Abra o navegador
   - Acesse: `http://192.168.1.100/gestao-imoveis/`
   - (Use o IP do seu computador)

---

## 🐛 PROBLEMAS COMUNS

### ❌ "Não consigo acessar http://localhost"
**Solução:**
- Verifique se o Apache está rodando no XAMPP
- Tente reiniciar o Apache
- Verifique se a porta 80 não está em uso

### ❌ "Erro de conexão com MySQL"
**Solução:**
- Verifique se o MySQL está rodando no XAMPP
- Verifique as credenciais em `config/database.php`
- Tente acessar: `http://localhost/phpmyadmin/`

### ❌ "Página em branco"
**Solução:**
- Verifique os logs em: `C:\xampp\apache\logs\error.log`
- Habilite exibição de erros no PHP
- Verifique se todos os arquivos foram copiados

### ❌ "404 Not Found" nas APIs
**Solução:**
- Verifique se a pasta `api` existe
- Verifique permissões de arquivo
- Reinicie o Apache

---

## 📱 INSTALAR NO CELULAR

### Como PWA (Progressive Web App):

1. No celular, acesse: `http://192.168.1.100/gestao-imoveis/`
2. **iPhone (Safari):**
   - Toque em **Compartilhar** (⬆️)
   - Toque em **"Adicionar à Tela de Início"**
3. **Android (Chrome):**
   - Toque nos **3 pontos** (⋮)
   - Toque em **"Adicionar à tela inicial"**

---

## 🔄 DIFERENÇAS: React vs PHP

| Característica | React (IndexedDB) | PHP (MySQL) |
|----------------|-------------------|-------------|
| **Onde roda** | Navegador (local) | Servidor |
| **Dados** | Salvos no navegador | Salvos no MySQL |
| **Acesso** | Só no seu navegador | Qualquer dispositivo na rede |
| **Backup** | Manual (exportar JSON) | Automático (MySQL) |
| **Multi-usuário** | ❌ Não | ✅ Sim |
| **Deploy** | GitHub Pages | Servidor PHP |
| **Offline** | ✅ Funciona | ❌ Precisa de servidor |

**Quando usar cada um:**
- **React (IndexedDB):** Uso pessoal, single-user, offline
- **PHP (MySQL):** Multi-usuário, acesso remoto, produção

---

## 📊 ESTRUTURA DO BANCO

### Tabelas criadas:

1. **clientes** - Dados dos inquilinos
2. **imoveis** - Imóveis com contratos
3. **pagamentos** - Registro de pagamentos
4. **configs** - Configurações do sistema

### Relacionamentos:
- Um **cliente** pode ter vários **imóveis**
- Um **imóvel** pode ter vários **pagamentos**
- Pagamentos são vinculados a imóvel + mês + ano

---

## 🎯 PRÓXIMOS PASSOS

### Para desenvolvimento:
1. Estude o código em `api/` para entender as APIs REST
2. Modifique `index.php` para personalizar a interface
3. Adicione novas funcionalidades conforme necessário

### Para produção:
1. Configure HTTPS (SSL)
2. Implemente autenticação de usuários
3. Configure backups automáticos
4. Monitore os logs do servidor
5. Implemente validações adicionais

---

## 📞 PRECISA DE AJUDA?

### Documentação:
- **README completo:** `php-app/README.md`
- **Documentação PHP:** https://www.php.net/manual/pt_BR/
- **Documentação MySQL:** https://dev.mysql.com/doc/

### Logs:
- **Apache:** `C:\xampp\apache\logs\error.log`
- **MySQL:** `C:\xampp\mysql\data\mysql_error.log`
- **PHP:** Habilite `display_errors` no `php.ini`

---

## ✅ CHECKLIST DE INSTALAÇÃO

- [ ] XAMPP instalado e rodando
- [ ] Apache iniciado (verde ✅)
- [ ] MySQL iniciado (verde ✅)
- [ ] Arquivos copiados para `htdocs/gestao-imoveis/`
- [ ] Banco de dados instalado (`install.php`)
- [ ] Sistema acessível em `http://localhost/gestao-imoveis/`
- [ ] Primeiro cliente cadastrado
- [ ] Primeiro imóvel cadastrado
- [ ] Pagamento testado

---

**🎉 PRONTO! Seu sistema PHP + MySQL está funcionando!**

Acesse: `http://localhost/gestao-imoveis/`
