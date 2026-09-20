# 🏢 Gestão de Imóveis - Versão Python + Flask

Sistema completo de gerenciamento de imóveis, inquilinos e contratos de aluguel desenvolvido em **Python + Flask + SQLite**.

## ✨ Funcionalidades

- 👥 **Cadastro de Clientes** - CPF, telefone, email
- 🏠 **Gestão de Imóveis** - Casas, fazendas e suítes
- 📊 **Relatórios** - Mensal e anual com gráficos
- 💰 **Controle de Pagamentos** - Marcar como pago/pendente
- ⏱️ **Cronômetro de Contratos** - Tempo restante visual
- 💾 **Banco de Dados SQLite** - Persistência local robusta
- 📱 **Responsivo** - Funciona em desktop e mobile
- 🔌 **APIs REST** - Integração com outros sistemas

## 📋 Pré-requisitos

- **Python 3.8 ou superior**
- **pip** (gerenciador de pacotes Python)

## 🚀 Instalação Rápida

### Passo 1: Clonar ou baixar o projeto

```bash
# Se estiver usando Git
git clone https://github.com/SEU_USUARIO/gestao-imoveis.git
cd gestao-imoveis/python-app

# Ou simplesmente navegue até a pasta python-app
```

### Passo 2: Criar ambiente virtual (recomendado)

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

### Passo 3: Instalar dependências

```bash
pip install -r requirements.txt
```

### Passo 4: Rodar a aplicação

```bash
python app.py
```

### Passo 5: Acessar o sistema

Abra o navegador e acesse:
```
http://localhost:5000
```

**🎉 Pronto! O sistema está funcionando!**

---

## 📁 Estrutura do Projeto

```
python-app/
├── app.py                  # Aplicação principal Flask
├── models.py               # Modelos do banco de dados (SQLAlchemy)
├── requirements.txt        # Dependências Python
├── routes/
│   ├── __init__.py
│   ├── main.py            # Rota principal e estatísticas
│   ├── clientes.py        # API de clientes
│   ├── imoveis.py         # API de imóveis
│   ├── pagamentos.py      # API de pagamentos
│   └── relatorios.py      # API de relatórios
├── templates/
│   └── index.html         # Interface web (frontend)
└── README.md              # Esta documentação
```

## 🗄️ Banco de Dados

O sistema usa **SQLite** como banco de dados local. O arquivo do banco (`gestao_imoveis.db`) é criado automaticamente na primeira execução.

### Tabelas criadas:

- **clientes** - Dados dos inquilinos
- **imoveis** - Imóveis com contratos
- **pagamentos** - Registro de pagamentos

### Fazer backup do banco:

O banco de dados é um arquivo SQLite chamado `gestao_imoveis.db`. Para fazer backup, basta copiar este arquivo.

---

## 🔌 APIs REST

### Clientes

**Listar todos:**
```bash
GET /api/clientes/
```

**Buscar por UUID:**
```bash
GET /api/clientes/<uuid>
```

**Buscar por termo:**
```bash
GET /api/clientes/search?termo=joao
```

**Criar:**
```bash
POST /api/clientes/
Content-Type: application/json

{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com"
}
```

**Atualizar:**
```bash
PUT /api/clientes/<uuid>
Content-Type: application/json

{
  "nome": "João Silva Santos",
  "telefone": "(11) 88888-8888"
}
```

**Excluir (soft delete):**
```bash
DELETE /api/clientes/<uuid>
```

### Imóveis

**Listar todos:**
```bash
GET /api/imoveis/
```

**Buscar por cliente:**
```bash
GET /api/imoveis/cliente/<cliente_uuid>
```

**Buscar por tipo:**
```bash
GET /api/imoveis/tipo/casa
```

**Criar:**
```bash
POST /api/imoveis/
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
```bash
GET /api/pagamentos/mes/1/2025
```

**Alternar status:**
```bash
POST /api/pagamentos/toggle
Content-Type: application/json

{
  "imovel_uuid": "xxx",
  "mes": 1,
  "ano": 2025
}
```

### Relatórios

**Estatísticas gerais:**
```bash
GET /api/relatorios/stats
```

**Relatório mensal:**
```bash
GET /api/relatorios/mensal?mes=1&ano=2025
```

**Relatório anual:**
```bash
GET /api/relatorios/anual?ano=2025
```

---

## ⚙️ Configurações

### Variáveis de ambiente (opcional)

Crie um arquivo `.env` na raiz do projeto:

```env
SECRET_KEY=sua-chave-secreta-aqui
DATABASE_URL=sqlite:///gestao_imoveis.db
```

### Alterar porta do servidor

Edite o arquivo `app.py`:

```python
app.run(debug=True, host='0.0.0.0', port=5000)  # Altere a porta aqui
```

---

## 🌐 Acessar de Outros Dispositivos

### Na mesma rede WiFi:

1. Descubra o IP do seu computador:
   - **Windows:** `ipconfig` (procure por IPv4)
   - **Mac/Linux:** `ifconfig` ou `ip addr`

2. O app já está configurado para aceitar conexões externas (`host='0.0.0.0'`)

3. No outro dispositivo, acesse:
   ```
   http://192.168.1.100:5000
   ```
   (Use o IP do seu computador)

---

## 🐛 Solução de Problemas

### ❌ "ModuleNotFoundError: No module named 'flask'"
**Solução:**
```bash
pip install -r requirements.txt
```

### ❌ "Porta 5000 já está em uso"
**Solução:**
- Altere a porta no `app.py`
- Ou encerre o processo que está usando a porta 5000

### ❌ "Permission denied" ao criar o banco
**Solução:**
- Verifique as permissões da pasta
- Execute como administrador (Windows) ou com sudo (Linux/Mac)

### ❌ Banco de dados corrompido
**Solução:**
- Delete o arquivo `gestao_imoveis.db`
- Reinicie o app (o banco será recriado)
- ⚠️ Isso apagará todos os dados!

---

## 📊 Comparativo das Versões

| Característica | React (IndexedDB) | PHP (MySQL) | Python (SQLite) |
|----------------|-------------------|-------------|-----------------|
| **Linguagem** | JavaScript | PHP | Python |
| **Banco** | IndexedDB | MySQL | SQLite |
| **Instalação** | npm | XAMPP | pip |
| **Complexidade** | Média | Média | Baixa |
| **Performance** | Rápida | Depende | Rápida |
| **Portabilidade** | Alta | Média | Alta |
| **Multi-user** | ❌ Não | ✅ Sim | ✅ Sim (com config) |

---

## 🚀 Deploy

### Opção 1: Servidor Local (Desenvolvimento)

```bash
python app.py
```

### Opção 2: Produção com Gunicorn

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:create_app()
```

### Opção 3: Docker (futuro)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

---

## 🛠️ Tecnologias Utilizadas

- **Flask 3.0** - Framework web
- **SQLAlchemy** - ORM para banco de dados
- **SQLite** - Banco de dados local
- **Jinja2** - Templates HTML
- **Tailwind CSS** - Framework CSS (via CDN)
- **JavaScript** - Frontend interativo

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs no terminal onde o app está rodando
2. Consulte a documentação do Flask: https://flask.palletsprojects.com/
3. Consulte a documentação do SQLAlchemy: https://www.sqlalchemy.org/

---

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ em Python + Flask**
