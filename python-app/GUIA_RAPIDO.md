# 🚀 GUIA RÁPIDO - Sistema Python + Flask

## ⚡ INSTALAÇÃO EM 3 MINUTOS

### Passo 1: Verificar Python instalado

Abra o terminal e execute:

**Windows:**
```bash
python --version
```

**Mac/Linux:**
```bash
python3 --version
```

Se não estiver instalado, baixe em: https://www.python.org/downloads/

---

### Passo 2: Navegar até a pasta do projeto

```bash
cd python-app
```

---

### Passo 3: Criar ambiente virtual (RECOMENDADO)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

Você verá `(venv)` no início da linha do terminal.

---

### Passo 4: Instalar dependências

```bash
pip install -r requirements.txt
```

Aguarde o download (1-2 minutos).

---

### Passo 5: Rodar a aplicação

```bash
python app.py
```

Você verá:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

---

### Passo 6: Acessar o sistema

Abra o navegador e acesse:
```
http://localhost:5000
```

**🎉 PRONTO! O sistema está funcionando!**

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

## 🌐 ACESSAR DE OUTROS DISPOSITIVOS

### Na mesma rede WiFi:

1. Descubra o IP do seu computador:
   - **Windows:** Abra CMD e digite `ipconfig`
   - **Mac/Linux:** Abra Terminal e digite `ifconfig`
   - Procure por "IPv4" ou "inet" (ex: 192.168.1.100)

2. No outro dispositivo (celular, tablet, outro PC):
   - Abra o navegador
   - Acesse: `http://192.168.1.100:5000`
   - (Use o IP do seu computador)

---

## 🐛 PROBLEMAS COMUNS

### ❌ "python não é reconhecido"
**Solução:**
- Instale o Python: https://www.python.org/downloads/
- Marque a opção "Add Python to PATH" durante a instalação
- Reinicie o terminal

### ❌ "pip não é reconhecido"
**Solução:**
```bash
python -m ensurepip --upgrade
```

### ❌ "ModuleNotFoundError: No module named 'flask'"
**Solução:**
```bash
pip install -r requirements.txt
```

### ❌ "Porta 5000 já está em uso"
**Solução:**
- Edite `app.py` e mude a porta:
  ```python
  app.run(debug=True, host='0.0.0.0', port=5001)
  ```
- Acesse: `http://localhost:5001`

### ❌ "Permission denied" ao criar o banco
**Solução:**
- Verifique as permissões da pasta
- Execute como administrador (Windows) ou com sudo (Linux/Mac)

---

## 🔄 PARAR O SERVIDOR

Para parar o servidor, pressione:
```
Ctrl + C
```

---

## 💾 BACKUP DO BANCO DE DADOS

O banco de dados é um arquivo SQLite chamado `gestao_imoveis.db`.

**Para fazer backup:**
1. Pare o servidor (Ctrl + C)
2. Copie o arquivo `gestao_imoveis.db`
3. Guarde em local seguro

**Para restaurar:**
1. Pare o servidor (Ctrl + C)
2. Delete o arquivo `gestao_imoveis.db` atual
3. Copie o backup para a pasta
4. Inicie o servidor novamente

---

## 📊 ESTRUTURA DO BANCO

### Tabelas criadas:

1. **clientes** - Dados dos inquilinos
2. **imoveis** - Imóveis com contratos
3. **pagamentos** - Registro de pagamentos

### Relacionamentos:
- Um **cliente** pode ter vários **imóveis**
- Um **imóvel** pode ter vários **pagamentos**
- Pagamentos são vinculados a imóvel + mês + ano

---

## 🎯 PRÓXIMOS PASSOS

### Para desenvolvimento:
1. Estude o código em `routes/` para entender as APIs REST
2. Modifique `templates/index.html` para personalizar a interface
3. Adicione novas funcionalidades conforme necessário

### Para produção:
1. Use Gunicorn como servidor:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:create_app()
   ```
2. Configure um reverse proxy (Nginx, Apache)
3. Use um banco de dados mais robusto (PostgreSQL, MySQL)
4. Implemente autenticação de usuários

---

## 📚 DOCUMENTAÇÃO COMPLETA

- **README.md** - Documentação completa com APIs
- **Flask:** https://flask.palletsprojects.com/
- **SQLAlchemy:** https://www.sqlalchemy.org/
- **SQLite:** https://www.sqlite.org/docs.html

---

## ✅ CHECKLIST DE INSTALAÇÃO

- [ ] Python instalado (3.8+)
- [ ] Navegou até a pasta `python-app/`
- [ ] Criou ambiente virtual (venv)
- [ ] Ativou o ambiente virtual
- [ ] Instalou dependências (`pip install -r requirements.txt`)
- [ ] Rodou o app (`python app.py`)
- [ ] Acessou `http://localhost:5000`
- [ ] Primeiro cliente cadastrado
- [ ] Primeiro imóvel cadastrado
- [ ] Pagamento testado

---

**🎉 PRONTO! Seu sistema Python + Flask está funcionando!**

Acesse: `http://localhost:5000`
