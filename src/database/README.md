# 🏢 Gestão de Imóveis - Banco de Dados

## Sobre o Armazenamento

Este aplicativo utiliza **IndexedDB** (via biblioteca Dexie.js) como banco de dados local. O IndexedDB é um banco de dados embutido no navegador, que oferece:

- ✅ **Persistência local** - Dados ficam salvos mesmo após fechar o navegador
- ✅ **Sem servidor** - Funciona 100% no cliente, ideal para GitHub Pages
- ✅ **Alta performance** - Operações assíncronas sem travar a interface
- ✅ **Grande capacidade** - Suporta muito mais dados que localStorage
- ✅ **Índices** - Busca rápida por campos específicos

## Estrutura do Banco de Dados

### Tabelas

```
GestaoImoveisDB
├── clientes        → Dados dos inquilinos
├── imoveis         → Dados dos imóveis (casa, fazenda, suíte)
├── pagamentos       → Registro de pagamentos mensais
└── configs         → Configurações do sistema
```

### Tabela: Clientes
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | number | ID auto-incremento |
| uuid | string | Identificador único |
| nome | string | Nome do inquilino |
| cpf | string | CPF formatado |
| telefone | string | Telefone formatado |
| email | string | Email (opcional) |
| dataCadastro | string | Data de criação (ISO) |
| ativo | boolean | Status ativo/inativo |

**Índices:** `uuid`, `cpf`, `nome`, `telefone`, `ativo`

### Tabela: Imóveis
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | number | ID auto-incremento |
| uuid | string | Identificador único |
| tipo | string | 'casa' \| 'fazenda' \| 'suite' |
| endereco | string | Endereço do imóvel |
| valorAluguel | number | Valor mensal do aluguel |
| contratoMeses | number | 6 ou 12 meses |
| dataInicio | string | Data de início do contrato |
| clienteUuid | string | UUID do cliente vinculado |
| periodoArrendado | string | Período (fazenda) |
| residencial | string | Nome do residencial (suíte) |
| dataCadastro | string | Data de criação (ISO) |
| ativo | boolean | Status ativo/inativo |

**Índices:** `uuid`, `tipo`, `clienteUuid`, `endereco`, `dataInicio`, `ativo`

### Tabela: Pagamentos
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | number | ID auto-incremento |
| uuid | string | Identificador único |
| imovelUuid | string | UUID do imóvel |
| mes | number | Mês (1-12) |
| ano | number | Ano |
| pago | boolean | Status do pagamento |
| dataPagamento | string | Data do pagamento (ISO) |
| valorPago | number | Valor pago |
| observacao | string | Observação |

**Índices:** `uuid`, `imovelUuid`, `[mes+ano]`, `[imovelUuid+mes+ano]`, `pago`

## API do Banco de Dados

### Serviço de Clientes
```typescript
clienteService.getAll()                    // Lista todos ativos
clienteService.getByUuid(uuid)             // Busca por UUID
clienteService.getByCpf(cpf)               // Busca por CPF
clienteService.create(dados)               // Cria novo
clienteService.update(uuid, changes)       // Atualiza
clienteService.softDelete(uuid)            // Desativa (não apaga)
clienteService.search(termo)               // Busca por nome/CPF
```

### Serviço de Imóveis
```typescript
imovelService.getAll()                     // Lista todos ativos
imovelService.getByUuid(uuid)              // Busca por UUID
imovelService.getByCliente(clienteUuid)    // Busca por cliente
imovelService.getByTipo(tipo)              // Busca por tipo
imovelService.create(dados)                // Cria novo
imovelService.update(uuid, changes)        // Atualiza
imovelService.softDelete(uuid)             // Desativa
imovelService.search(termo)                // Busca por endereço
```

### Serviço de Pagamentos
```typescript
pagamentoService.getByImovel(uuid)         // Pagamentos de um imóvel
pagamentoService.getByMesAno(mes, ano)     // Pagamentos do mês
pagamentoService.toggle(uuid, mes, ano)    // Alterna pago/pendente
pagamentoService.marcarPago(uuid, mes, ano)// Marca como pago
pagamentoService.marcarPendente(uuid, mes, ano) // Marca como pendente
```

### Utilitários
```typescript
dbUtils.exportAll()    // Exporta tudo como JSON
dbUtils.importAll(json)// Importa dados de JSON
dbUtils.clearAll()     // Limpa todo o banco
dbUtils.getStats()     // Estatísticas do banco
```

## Backup e Restauração

### Exportar Dados
1. Vá em "Banco de Dados" no menu
2. Clique em "Exportar JSON" ou "Baixar Backup"
3. Salve o arquivo em local seguro

### Importar Dados
1. Vá em "Banco de Dados" no menu
2. Clique em "Importar Arquivo"
3. Selecione o arquivo JSON de backup
4. Confirme a importação

## Deploy no GitHub Pages

O app está pronto para deploy no GitHub Pages:

1. O build gera arquivos estáticos em `dist/`
2. Configure o GitHub Pages para servir a partir da branch `main` ou `gh-pages`
3. Os dados ficam salvos no navegador de cada usuário

### Limitações do GitHub Pages
- ❌ Sem backend/servidor
- ❌ Dados são locais ao navegador
- ✅ Perfeito para uso individual
- ✅ Use backup/export para não perder dados

## Migração para Backend Cloud (Futuro)

Para compartilhar dados entre dispositivos, considere migrar para:
- **Supabase** - PostgreSQL + Auth gratuito
- **Firebase** - Firestore + Auth gratuito
- **PocketBase** - Self-hosted, leve

A estrutura do código já está preparada para essa migração, bastando trocar os serviços no diretório `src/database/`.
