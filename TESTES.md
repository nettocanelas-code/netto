# 🧪 Guia de Testes - Gestão de Imóveis

## ✅ Checklist de Testes

### 1️⃣ Teste do Dashboard

**Objetivo:** Verificar se o dashboard carrega corretamente

- [ ] O app abre sem erros
- [ ] O dashboard exibe as estatísticas (clientes, imóveis, contratos ativos)
- [ ] Os botões de navegação funcionam
- [ ] O layout está responsivo (desktop e mobile)

**Como testar:**
1. Abra o app no navegador
2. Verifique se o dashboard aparece com as estatísticas
3. Clique nos botões de navegação

---

### 2️⃣ Teste de Cadastro de Clientes

**Objetivo:** Verificar se é possível cadastrar, editar e excluir clientes

**Passo 1: Cadastrar cliente**
- [ ] Clique em "Clientes" no menu
- [ ] Clique em "+ Novo Cliente"
- [ ] Preencha os campos:
  - Nome: "João Silva"
  - CPF: "123.456.789-00"
  - Telefone: "(11) 99999-9999"
  - Email: "joao@email.com" (opcional)
- [ ] Clique em "Cadastrar"
- [ ] Verifique se o cliente aparece na lista

**Passo 2: Editar cliente**
- [ ] Clique em "Editar" no cliente criado
- [ ] Altere o nome para "João Silva Santos"
- [ ] Clique em "Atualizar"
- [ ] Verifique se o nome foi atualizado

**Passo 3: Buscar cliente**
- [ ] Use o campo de busca
- [ ] Digite "João" ou "123"
- [ ] Verifique se o cliente aparece nos resultados

**Passo 4: Excluir cliente**
- [ ] Clique em "Excluir"
- [ ] Confirme a exclusão
- [ ] Verifique se o cliente foi removido da lista

---

### 3️⃣ Teste de Cadastro de Imóveis

**Objetivo:** Verificar se é possível cadastrar imóveis dos 3 tipos

**Passo 1: Cadastrar Casa**
- [ ] Clique em "Imóveis" no menu
- [ ] Clique em "+ Novo Imóvel"
- [ ] Selecione o tipo "🏠 Casa"
- [ ] Preencha:
  - Endereço: "Rua das Flores, 123"
  - Valor: "1500"
  - Contrato: "12 meses"
  - Data de Início: selecione uma data
  - Cliente: selecione o cliente criado
- [ ] Clique em "Cadastrar"
- [ ] Verifique se o imóvel aparece no card

**Passo 2: Cadastrar Fazenda**
- [ ] Clique em "+ Novo Imóvel"
- [ ] Selecione o tipo "🌾 Fazenda"
- [ ] Preencha:
  - Endereço: "Fazenda Boa Vista, Km 5"
  - Valor: "5000"
  - Período Arrendado: "2 anos"
  - Data de Início: selecione uma data
  - Cliente: selecione o cliente
- [ ] Clique em "Cadastrar"

**Passo 3: Cadastrar Suíte**
- [ ] Clique em "+ Novo Imóvel"
- [ ] Selecione o tipo "🏨 Suíte"
- [ ] Preencha:
  - Residencial: "Residencial Parque das Águas"
  - Endereço: "Apto 302, Bloco B"
  - Valor: "800"
  - Contrato: "6 meses"
  - Data de Início: selecione uma data
  - Cliente: selecione o cliente
- [ ] Clique em "Cadastrar"

**Passo 4: Verificar Cronômetro**
- [ ] Verifique se o cronômetro do contrato aparece
- [ ] Verifique se a barra de progresso está visível
- [ ] Verifique se as datas de início e término estão corretas

---

### 4️⃣ Teste de Pagamentos

**Objetivo:** Verificar se é possível marcar pagamentos como pago/pendente

**Passo 1: Marcar como PAGO**
- [ ] Encontre um imóvel com contrato ativo
- [ ] Clique no botão "⏳ PENDENTE - Marcar como PAGO"
- [ ] Verifique se o botão muda para "✅ PAGO"
- [ ] Verifique se a cor muda para verde

**Passo 2: Desmarcar pagamento**
- [ ] Clique novamente no botão "✅ PAGO"
- [ ] Verifique se volta para "⏳ PENDENTE"
- [ ] Verifique se a cor volta para vermelho

**Passo 3: Verificar persistência**
- [ ] Recarregue a página (F5)
- [ ] Verifique se o status do pagamento foi mantido

---

### 5️⃣ Teste de Relatórios

**Objetivo:** Verificar se os relatórios mensal e anual funcionam

**Passo 1: Relatório Mensal**
- [ ] Clique em "Relatórios" no menu
- [ ] Selecione "📅 Relatório Mensal"
- [ ] Selecione o mês e ano atuais
- [ ] Verifique se os cards mostram:
  - Receita Total
  - Recebido
  - Pendente
- [ ] Verifique se a tabela lista os imóveis ativos
- [ ] Verifique se o status (Pago/Pendente) está correto

**Passo 2: Relatório Anual**
- [ ] Selecione "📊 Relatório Anual"
- [ ] Selecione o ano atual
- [ ] Verifique se o gráfico de barras aparece
- [ ] Verifique se a tabela anual está correta
- [ ] Verifique se os totais estão calculados corretamente

---

### 6️⃣ Teste do Banco de Dados

**Objetivo:** Verificar se o backup e restauração funcionam

**Passo 1: Exportar dados**
- [ ] Clique em "Banco de Dados" no menu
- [ ] Verifique se as estatísticas aparecem
- [ ] Clique em "📋 Exportar JSON"
- [ ] Verifique se os dados aparecem no modal
- [ ] Clique em "📋 Copiar"
- [ ] Cole em um arquivo de texto e salve

**Passo 2: Baixar backup**
- [ ] Clique em "💾 Baixar Backup"
- [ ] Verifique se o arquivo JSON foi baixado
- [ ] Abra o arquivo e verifique se contém os dados

**Passo 3: Importar dados**
- [ ] Clique em "📂 Importar Arquivo"
- [ ] Selecione o arquivo JSON baixado
- [ ] Verifique se os dados foram importados
- [ ] Verifique se as estatísticas foram atualizadas

---

### 7️⃣ Teste de Responsividade

**Objetivo:** Verificar se o app funciona em diferentes tamanhos de tela

**Teste Desktop:**
- [ ] Abra em tela cheia (1920x1080)
- [ ] Verifique se o sidebar aparece
- [ ] Verifique se o layout está correto

**Teste Tablet:**
- [ ] Redimensione para 768x1024
- [ ] Verifique se o layout se adapta
- [ ] Verifique se os botões estão acessíveis

**Teste Mobile:**
- [ ] Redimensione para 375x667 (iPhone)
- [ ] Verifique se o menu hambúrguer aparece
- [ ] Verifique se a navegação inferior funciona
- [ ] Verifique se os formulários são responsivos

---

### 8️⃣ Teste de Persistência

**Objetivo:** Verificar se os dados são salvos corretamente

**Passo 1: Criar dados**
- [ ] Cadastre 2 clientes
- [ ] Cadastre 3 imóveis
- [ ] Marque 1 pagamento como pago

**Passo 2: Fechar e reabrir**
- [ ] Feche o navegador completamente
- [ ] Reabra o navegador
- [ ] Acesse o app novamente
- [ ] Verifique se todos os dados estão lá

**Passo 3: Limpar cache (opcional)**
- [ ] Limpe o cache do navegador
- [ ] Recarregue a página
- [ ] Verifique se os dados ainda estão lá (IndexedDB não é limpo com cache)

---

### 9️⃣ Teste de PWA

**Objetivo:** Verificar se o app pode ser instalado como PWA

**No iPhone (Safari):**
- [ ] Abra o app no Safari
- [ ] Toque em Compartilhar
- [ ] Toque em "Adicionar à Tela de Início"
- [ ] Verifique se o ícone aparece na tela inicial
- [ ] Abra o app a partir do ícone
- [ ] Verifique se abre em tela cheia

**No Android (Chrome):**
- [ ] Abra o app no Chrome
- [ ] Toque nos 3 pontos (menu)
- [ ] Toque em "Adicionar à tela inicial"
- [ ] Verifique se o ícone aparece
- [ ] Abra o app a partir do ícone
- [ ] Verifique se abre em tela cheia

---

### 🔟 Teste de Filtros e Buscas

**Objetivo:** Verificar se os filtros e buscas funcionam

**Filtro de imóveis por tipo:**
- [ ] Vá em "Imóveis"
- [ ] Selecione "🏠 Casa" no filtro
- [ ] Verifique se só casas aparecem
- [ ] Selecione "🌾 Fazenda"
- [ ] Verifique se só fazendas aparecem
- [ ] Selecione "Todos os tipos"
- [ ] Verifique se todos aparecem

**Busca de imóveis:**
- [ ] Use o campo de busca
- [ ] Digite parte do endereço
- [ ] Verifique se os resultados são filtrados
- [ ] Limpe a busca
- [ ] Verifique se todos voltam

---

## 🐛 Problemas Comuns e Soluções

### Problema: App não carrega
**Solução:**
1. Verifique o console do navegador (F12)
2. Limpe o cache do navegador
3. Verifique se o IndexedDB está habilitado

### Problema: Dados não salvam
**Solução:**
1. Verifique se não está em modo privado/anônimo
2. Verifique se o navegador suporta IndexedDB
3. Tente outro navegador

### Problema: Pagamentos não atualizam
**Solução:**
1. Recarregue a página
2. Verifique o console para erros
3. Verifique se o hook de pagamentos está funcionando

### Problema: Layout quebrado no mobile
**Solução:**
1. Verifique se o viewport está configurado corretamente
2. Teste em outro navegador mobile
3. Verifique se o CSS está sendo carregado

---

## 📊 Resultado dos Testes

### Status Geral:
- [ ] ✅ Todos os testes passaram
- [ ] ⚠️ Alguns testes falharam (listar abaixo)
- [ ] ❌ Testes críticos falharam

### Testes que falharam:
1. 
2. 
3. 

### Observações:
- 
- 
- 

---

## 🎯 Próximos Passos

Se todos os testes passaram:
- ✅ O app está pronto para uso
- ✅ Pode ser deployado no GitHub Pages
- ✅ Pode ser instalado no celular como PWA

Se alguns testes falharam:
- 🔧 Corrigir os problemas identificados
- 🔄 Rodar os testes novamente
- 📝 Documentar as correções

---

**Data do teste:** ___/___/______
**Testado por:** _______________
**Navegador:** _______________
**Dispositivo:** _______________
