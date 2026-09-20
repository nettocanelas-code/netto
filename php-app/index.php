<?php
// ==========================================
// PÁGINA PRINCIPAL - GESTÃO DE IMÓVEIS
// ==========================================
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Imóveis - Controle de Aluguéis</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    </style>
</head>
<body class="bg-gray-50">
    <div id="app" class="min-h-screen flex">
        <!-- Sidebar -->
        <aside class="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
            <div class="p-6 border-b border-gray-100">
                <h1 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span class="text-2xl">🏢</span>
                    <span>Gestão Imóveis</span>
                </h1>
                <p class="text-xs text-gray-400 mt-1">PHP + MySQL</p>
            </div>
            <nav class="flex-1 p-4 space-y-1">
                <button onclick="showPage('dashboard')" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all bg-blue-50 text-blue-700 font-semibold shadow-sm" data-page="dashboard">
                    <span class="text-xl">🏠</span>
                    <span>Dashboard</span>
                </button>
                <button onclick="showPage('clientes')" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-gray-600 hover:bg-gray-50" data-page="clientes">
                    <span class="text-xl">👥</span>
                    <span>Clientes</span>
                </button>
                <button onclick="showPage('imoveis')" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-gray-600 hover:bg-gray-50" data-page="imoveis">
                    <span class="text-xl">🏗️</span>
                    <span>Imóveis</span>
                </button>
                <button onclick="showPage('relatorios')" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-gray-600 hover:bg-gray-50" data-page="relatorios">
                    <span class="text-xl">📊</span>
                    <span>Relatórios</span>
                </button>
            </nav>
            <div class="p-4 border-t border-gray-100">
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <p class="text-xs text-gray-600 font-medium">Total de Imóveis</p>
                    <p class="text-2xl font-bold text-blue-700" id="totalImoveis">0</p>
                    <p class="text-xs text-gray-500 mt-1"><span id="totalClientes">0</span> clientes</p>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col min-h-screen">
            <!-- Mobile Header -->
            <header class="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                <button onclick="toggleMobileMenu()" class="p-2 hover:bg-gray-100 rounded-lg">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span>🏢</span> Gestão Imóveis
                </h1>
                <div class="w-10" />
            </header>

            <!-- Mobile Bottom Nav -->
            <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
                <div class="flex justify-around">
                    <button onclick="showPage('dashboard')" class="mobile-nav-btn flex flex-col items-center py-2 px-3 flex-1 text-blue-600" data-page="dashboard">
                        <span class="text-xl">🏠</span>
                        <span class="text-[10px] mt-0.5 font-medium">Dashboard</span>
                    </button>
                    <button onclick="showPage('clientes')" class="mobile-nav-btn flex flex-col items-center py-2 px-3 flex-1 text-gray-500" data-page="clientes">
                        <span class="text-xl">👥</span>
                        <span class="text-[10px] mt-0.5 font-medium">Clientes</span>
                    </button>
                    <button onclick="showPage('imoveis')" class="mobile-nav-btn flex flex-col items-center py-2 px-3 flex-1 text-gray-500" data-page="imoveis">
                        <span class="text-xl">🏗️</span>
                        <span class="text-[10px] mt-0.5 font-medium">Imóveis</span>
                    </button>
                    <button onclick="showPage('relatorios')" class="mobile-nav-btn flex flex-col items-center py-2 px-3 flex-1 text-gray-500" data-page="relatorios">
                        <span class="text-xl">📊</span>
                        <span class="text-[10px] mt-0.5 font-medium">Relatórios</span>
                    </button>
                </div>
            </nav>

            <!-- Page Content -->
            <div class="flex-1 p-4 md:p-8 pb-20 md:pb-8">
                <!-- Dashboard Page -->
                <div id="page-dashboard" class="page-content">
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg mb-6">
                        <h2 class="text-2xl font-bold mb-2">Bem-vindo ao Gestão de Imóveis</h2>
                        <p class="text-blue-100">Sistema PHP + MySQL para gerenciamento de imóveis e aluguéis</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span class="text-2xl">👥</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Clientes</p>
                                    <p class="text-2xl font-bold text-gray-800" id="dashClientes">0</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span class="text-2xl">🏠</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Imóveis</p>
                                    <p class="text-2xl font-bold text-gray-800" id="dashImoveis">0</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <span class="text-2xl">✅</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Pagamentos</p>
                                    <p class="text-2xl font-bold text-gray-800" id="dashPagos">0</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <span class="text-2xl">💰</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Receita Mensal</p>
                                    <p class="text-2xl font-bold text-gray-800">R$ <span id="dashReceita">0</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-3">
                        <button onclick="showPage('clientes')" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md">
                            + Cadastrar Cliente
                        </button>
                        <button onclick="showPage('imoveis')" class="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-md">
                            + Cadastrar Imóvel
                        </button>
                        <button onclick="showPage('relatorios')" class="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-md">
                            📊 Ver Relatórios
                        </button>
                    </div>
                </div>

                <!-- Clientes Page -->
                <div id="page-clientes" class="page-content hidden">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-800">Clientes / Inquilinos</h2>
                            <p class="text-gray-500">Gerencie os dados dos seus inquilinos</p>
                        </div>
                        <button onclick="showClienteForm()" class="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md">
                            + Novo Cliente
                        </button>
                    </div>

                    <div id="clienteForm" class="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6 hidden">
                        <h3 class="text-lg font-semibold mb-4 text-gray-800" id="clienteFormTitle">Novo Cliente</h3>
                        <form onsubmit="saveCliente(event)" class="space-y-4">
                            <input type="hidden" id="clienteUuid">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                    <input type="text" id="clienteNome" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                                    <input type="text" id="clienteCpf" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                                    <input type="text" id="clienteTelefone" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="clienteEmail" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                </div>
                            </div>
                            <div class="flex gap-3">
                                <button type="submit" class="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Salvar</button>
                                <button type="button" onclick="hideClienteForm()" class="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">Cancelar</button>
                            </div>
                        </form>
                    </div>

                    <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div class="p-4 border-b border-gray-100">
                            <input type="text" id="buscaCliente" onkeyup="searchClientes()" placeholder="🔍 Buscar por nome ou CPF..." class="w-full px-4 py-2.5 border border-gray-300 rounded-lg">
                        </div>
                        <div id="clientesList" class="overflow-x-auto">
                            <p class="p-8 text-center text-gray-500">Carregando...</p>
                        </div>
                    </div>
                </div>

                <!-- Imóveis Page -->
                <div id="page-imoveis" class="page-content hidden">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-800">Imóveis</h2>
                            <p class="text-gray-500">Gerencie casas, fazendas e suítes</p>
                        </div>
                        <button onclick="showImovelForm()" class="px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-md">
                            + Novo Imóvel
                        </button>
                    </div>

                    <div id="imovelForm" class="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6 hidden">
                        <h3 class="text-lg font-semibold mb-4 text-gray-800" id="imovelFormTitle">Novo Imóvel</h3>
                        <form onsubmit="saveImovel(event)" class="space-y-4">
                            <input type="hidden" id="imovelUuid">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel</label>
                                <div class="flex gap-3 flex-wrap">
                                    <button type="button" onclick="setTipoImovel('casa')" class="tipo-btn px-4 py-2 rounded-lg font-medium bg-blue-600 text-white" data-tipo="casa">🏠 Casa</button>
                                    <button type="button" onclick="setTipoImovel('fazenda')" class="tipo-btn px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700" data-tipo="fazenda">🌾 Fazenda</button>
                                    <button type="button" onclick="setTipoImovel('suite')" class="tipo-btn px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700" data-tipo="suite">🏨 Suíte</button>
                                </div>
                                <input type="hidden" id="imovelTipo" value="casa" required>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                                    <input type="text" id="imovelEndereco" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Valor do Aluguel (R$)</label>
                                    <input type="number" id="imovelValor" step="0.01" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Contrato (meses)</label>
                                    <select id="imovelContrato" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg">
                                        <option value="6">6 meses</option>
                                        <option value="12" selected>12 meses</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                                    <input type="date" id="imovelDataInicio" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                                    <select id="imovelCliente" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg">
                                        <option value="">Selecione um cliente</option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex gap-3">
                                <button type="submit" class="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Salvar</button>
                                <button type="button" onclick="hideImovelForm()" class="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">Cancelar</button>
                            </div>
                        </form>
                    </div>

                    <div id="imoveisList" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <p class="p-8 text-center text-gray-500 col-span-2">Carregando...</p>
                    </div>
                </div>

                <!-- Relatórios Page -->
                <div id="page-relatorios" class="page-content hidden">
                    <div class="mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Relatórios</h2>
                        <p class="text-gray-500">Acompanhe receitas e pagamentos</p>
                    </div>

                    <div class="flex gap-3 mb-6">
                        <button onclick="showRelatorioMensal()" class="px-5 py-2.5 rounded-xl font-medium bg-blue-600 text-white shadow-md" id="btnMensal">📅 Mensal</button>
                        <button onclick="showRelatorioAnual()" class="px-5 py-2.5 rounded-xl font-medium bg-gray-100 text-gray-700" id="btnAnual">📊 Anual</button>
                    </div>

                    <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100 mb-6">
                        <div class="flex flex-wrap gap-4 items-end">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Mês</label>
                                <select id="relMes" onchange="loadRelatorioMensal()" class="px-4 py-2.5 border border-gray-300 rounded-lg">
                                    <option value="1">Janeiro</option>
                                    <option value="2">Fevereiro</option>
                                    <option value="3">Março</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Maio</option>
                                    <option value="6">Junho</option>
                                    <option value="7">Julho</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                                <select id="relAno" onchange="loadRelatorio()" class="px-4 py-2.5 border border-gray-300 rounded-lg">
                                    <option value="2024">2024</option>
                                    <option value="2025" selected>2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div id="relatorioContent">
                        <p class="p-8 text-center text-gray-500">Selecione um período para ver o relatório</p>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        // API Base URL
        const API_BASE = 'api';
        
        // State
        let currentPage = 'dashboard';
        let clientes = [];
        let imoveis = [];
        
        // Navigation
        function showPage(page) {
            currentPage = page;
            
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(el => el.classList.add('hidden'));
            
            // Show selected page
            document.getElementById(`page-${page}`).classList.remove('hidden');
            
            // Update nav buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
                if (btn.dataset.page === page) {
                    btn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all bg-blue-50 text-blue-700 font-semibold shadow-sm';
                } else {
                    btn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-gray-600 hover:bg-gray-50';
                }
            });
            
            document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
                if (btn.dataset.page === page) {
                    btn.className = 'mobile-nav-btn flex flex-col items-center py-2 px-3 flex-1 text-blue-600';
                } else {
                    btn.className = 'mobile-nav-btn flex flex-col items-center py-2 px-3 flex-1 text-gray-500';
                }
            });
            
            // Load data for page
            if (page === 'dashboard') loadDashboard();
            if (page === 'clientes') loadClientes();
            if (page === 'imoveis') loadImoveis();
            if (page === 'relatorios') {
                const now = new Date();
                document.getElementById('relMes').value = now.getMonth() + 1;
                document.getElementById('relAno').value = now.getFullYear();
                showRelatorioMensal();
            }
        }
        
        // Dashboard
        async function loadDashboard() {
            try {
                const res = await fetch(`${API_BASE}/relatorios.php?action=stats`);
                const data = await res.json();
                
                document.getElementById('dashClientes').textContent = data.total_clientes;
                document.getElementById('dashImoveis').textContent = data.total_imoveis;
                document.getElementById('dashPagos').textContent = data.total_pagos;
                document.getElementById('dashReceita').textContent = parseFloat(data.receita_mensal).toLocaleString('pt-BR', {minimumFractionDigits: 2});
                document.getElementById('totalClientes').textContent = data.total_clientes;
                document.getElementById('totalImoveis').textContent = data.total_imoveis;
            } catch (e) {
                console.error('Erro ao carregar dashboard:', e);
            }
        }
        
        // Clientes
        async function loadClientes() {
            try {
                const res = await fetch(`${API_BASE}/clientes.php?action=all`);
                clientes = await res.json();
                renderClientes(clientes);
            } catch (e) {
                console.error('Erro ao carregar clientes:', e);
            }
        }
        
        function renderClientes(list) {
            const container = document.getElementById('clientesList');
            
            if (list.length === 0) {
                container.innerHTML = '<p class="p-8 text-center text-gray-500">Nenhum cliente cadastrado</p>';
                return;
            }
            
            container.innerHTML = `
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">CPF</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Telefone</th>
                            <th class="px-4 py-3 text-right text-sm font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${list.map(c => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 text-sm text-gray-800 font-medium">${c.nome}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${c.cpf}</td>
                                <td class="px-4 py-3 text-sm text-gray-600">${c.telefone}</td>
                                <td class="px-4 py-3 text-right">
                                    <button onclick="editCliente('${c.uuid}')" class="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 mr-2">Editar</button>
                                    <button onclick="deleteCliente('${c.uuid}')" class="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Excluir</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
        
        function showClienteForm(cliente = null) {
            document.getElementById('clienteForm').classList.remove('hidden');
            document.getElementById('clienteFormTitle').textContent = cliente ? 'Editar Cliente' : 'Novo Cliente';
            document.getElementById('clienteUuid').value = cliente ? cliente.uuid : '';
            document.getElementById('clienteNome').value = cliente ? cliente.nome : '';
            document.getElementById('clienteCpf').value = cliente ? cliente.cpf : '';
            document.getElementById('clienteTelefone').value = cliente ? cliente.telefone : '';
            document.getElementById('clienteEmail').value = cliente ? cliente.email || '' : '';
        }
        
        function hideClienteForm() {
            document.getElementById('clienteForm').classList.add('hidden');
        }
        
        async function saveCliente(e) {
            e.preventDefault();
            
            const uuid = document.getElementById('clienteUuid').value;
            const data = {
                nome: document.getElementById('clienteNome').value,
                cpf: document.getElementById('clienteCpf').value,
                telefone: document.getElementById('clienteTelefone').value,
                email: document.getElementById('clienteEmail').value
            };
            
            try {
                if (uuid) {
                    await fetch(`${API_BASE}/clientes.php?action=update&uuid=${uuid}`, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                } else {
                    await fetch(`${API_BASE}/clientes.php?action=create`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                }
                
                hideClienteForm();
                loadClientes();
            } catch (e) {
                alert('Erro ao salvar cliente');
            }
        }
        
        function editCliente(uuid) {
            const cliente = clientes.find(c => c.uuid === uuid);
            if (cliente) showClienteForm(cliente);
        }
        
        async function deleteCliente(uuid) {
            if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
            
            try {
                await fetch(`${API_BASE}/clientes.php?action=delete&uuid=${uuid}`, {method: 'DELETE'});
                loadClientes();
            } catch (e) {
                alert('Erro ao excluir cliente');
            }
        }
        
        function searchClientes() {
            const termo = document.getElementById('buscaCliente').value.toLowerCase();
            const filtered = clientes.filter(c => 
                c.nome.toLowerCase().includes(termo) || 
                c.cpf.includes(termo)
            );
            renderClientes(filtered);
        }
        
        // Imóveis
        async function loadImoveis() {
            try {
                const [imoveisRes, clientesRes] = await Promise.all([
                    fetch(`${API_BASE}/imoveis.php?action=all`),
                    fetch(`${API_BASE}/clientes.php?action=all`)
                ]);
                
                imoveis = await imoveisRes.json();
                clientes = await clientesRes.json();
                
                // Populate cliente select
                const select = document.getElementById('imovelCliente');
                select.innerHTML = '<option value="">Selecione um cliente</option>' + 
                    clientes.map(c => `<option value="${c.uuid}">${c.nome} - ${c.cpf}</option>`).join('');
                
                renderImoveis(imoveis);
            } catch (e) {
                console.error('Erro ao carregar imóveis:', e);
            }
        }
        
        function renderImoveis(list) {
            const container = document.getElementById('imoveisList');
            
            if (list.length === 0) {
                container.innerHTML = '<p class="p-8 text-center text-gray-500 col-span-2">Nenhum imóvel cadastrado</p>';
                return;
            }
            
            container.innerHTML = list.map(imovel => {
                const ativo = isContratoAtivo(imovel);
                const mesesRestantes = getMesesRestantes(imovel);
                const tipoLabel = imovel.tipo === 'casa' ? '🏠 Casa' : imovel.tipo === 'fazenda' ? '🌾 Fazenda' : '🏨 Suíte';
                const tipoColor = imovel.tipo === 'casa' ? 'bg-blue-100 text-blue-800' : imovel.tipo === 'fazenda' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800';
                
                return `
                    <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div class="p-5">
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex items-center gap-2">
                                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${tipoColor}">${tipoLabel}</span>
                                    ${ativo ? '<span class="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Ativo</span>' : '<span class="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Encerrado</span>'}
                                </div>
                                <div class="flex gap-1">
                                    <button onclick="editImovel('${imovel.uuid}')" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                    <button onclick="deleteImovel('${imovel.uuid}')" class="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                                </div>
                            </div>
                            <h4 class="font-semibold text-gray-800 mb-1">${imovel.endereco}</h4>
                            <p class="text-sm text-gray-600 mb-1"><span class="font-medium">Inquilino:</span> ${imovel.cliente_nome}</p>
                            <p class="text-lg font-bold text-green-600 mb-3">R$ ${parseFloat(imovel.valor_aluguel).toLocaleString('pt-BR', {minimumFractionDigits: 2})}<span class="text-sm font-normal text-gray-500">/mês</span></p>
                            ${ativo ? `
                                <div class="mb-3 bg-gray-50 rounded-lg p-3">
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="text-sm font-medium text-gray-700">⏱ Tempo restante</span>
                                        <span class="text-sm font-bold text-blue-600">${mesesRestantes} meses</span>
                                    </div>
                                </div>
                                <button onclick="togglePagamento('${imovel.uuid}')" class="w-full py-2.5 rounded-lg font-semibold bg-red-100 text-red-700 hover:bg-red-200 border border-red-200" id="btn-pag-${imovel.uuid}">
                                    ⏳ PENDENTE - Marcar como PAGO
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        function showImovelForm() {
            document.getElementById('imovelForm').classList.remove('hidden');
        }
        
        function hideImovelForm() {
            document.getElementById('imovelForm').classList.add('hidden');
        }
        
        function setTipoImovel(tipo) {
            document.getElementById('imovelTipo').value = tipo;
            document.querySelectorAll('.tipo-btn').forEach(btn => {
                if (btn.dataset.tipo === tipo) {
                    btn.className = 'tipo-btn px-4 py-2 rounded-lg font-medium bg-blue-600 text-white';
                } else {
                    btn.className = 'tipo-btn px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700';
                }
            });
        }
        
        async function saveImovel(e) {
            e.preventDefault();
            
            const data = {
                tipo: document.getElementById('imovelTipo').value,
                endereco: document.getElementById('imovelEndereco').value,
                valor_aluguel: parseFloat(document.getElementById('imovelValor').value),
                contrato_meses: parseInt(document.getElementById('imovelContrato').value),
                data_inicio: document.getElementById('imovelDataInicio').value,
                cliente_uuid: document.getElementById('imovelCliente').value
            };
            
            try {
                await fetch(`${API_BASE}/imoveis.php?action=create`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                });
                
                hideImovelForm();
                loadImoveis();
            } catch (e) {
                alert('Erro ao salvar imóvel');
            }
        }
        
        async function deleteImovel(uuid) {
            if (!confirm('Tem certeza que deseja excluir este imóvel?')) return;
            
            try {
                await fetch(`${API_BASE}/imoveis.php?action=delete&uuid=${uuid}`, {method: 'DELETE'});
                loadImoveis();
            } catch (e) {
                alert('Erro ao excluir imóvel');
            }
        }
        
        async function togglePagamento(imovelUuid) {
            const now = new Date();
            const mes = now.getMonth() + 1;
            const ano = now.getFullYear();
            
            try {
                await fetch(`${API_BASE}/pagamentos.php?action=toggle`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({imovel_uuid: imovelUuid, mes, ano})
                });
                
                const btn = document.getElementById(`btn-pag-${imovelUuid}`);
                if (btn.textContent.includes('PENDENTE')) {
                    btn.textContent = '✅ PAGO';
                    btn.className = 'w-full py-2.5 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 shadow-md';
                } else {
                    btn.textContent = '⏳ PENDENTE - Marcar como PAGO';
                    btn.className = 'w-full py-2.5 rounded-lg font-semibold bg-red-100 text-red-700 hover:bg-red-200 border border-red-200';
                }
            } catch (e) {
                alert('Erro ao atualizar pagamento');
            }
        }
        
        // Relatórios
        function showRelatorioMensal() {
            document.getElementById('btnMensal').className = 'px-5 py-2.5 rounded-xl font-medium bg-blue-600 text-white shadow-md';
            document.getElementById('btnAnual').className = 'px-5 py-2.5 rounded-xl font-medium bg-gray-100 text-gray-700';
            document.getElementById('relMes').parentElement.style.display = 'block';
            loadRelatorioMensal();
        }
        
        function showRelatorioAnual() {
            document.getElementById('btnAnual').className = 'px-5 py-2.5 rounded-xl font-medium bg-blue-600 text-white shadow-md';
            document.getElementById('btnMensal').className = 'px-5 py-2.5 rounded-xl font-medium bg-gray-100 text-gray-700';
            document.getElementById('relMes').parentElement.style.display = 'none';
            loadRelatorioAnual();
        }
        
        function loadRelatorio() {
            if (document.getElementById('btnMensal').className.includes('bg-blue-600')) {
                loadRelatorioMensal();
            } else {
                loadRelatorioAnual();
            }
        }
        
        async function loadRelatorioMensal() {
            const mes = document.getElementById('relMes').value;
            const ano = document.getElementById('relAno').value;
            
            try {
                const res = await fetch(`${API_BASE}/relatorios.php?action=mensal&mes=${mes}&ano=${ano}`);
                const data = await res.json();
                
                const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                
                document.getElementById('relatorioContent').innerHTML = `
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <p class="text-sm text-gray-500 mb-1">Receita Total</p>
                            <p class="text-2xl font-bold text-gray-800">R$ ${parseFloat(data.total_receita).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        </div>
                        <div class="bg-white rounded-xl p-5 shadow-md border border-green-100 border-l-4 border-l-green-500">
                            <p class="text-sm text-gray-500 mb-1">Recebido</p>
                            <p class="text-2xl font-bold text-green-600">R$ ${parseFloat(data.total_recebido).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        </div>
                        <div class="bg-white rounded-xl p-5 shadow-md border border-red-100 border-l-4 border-l-red-500">
                            <p class="text-sm text-gray-500 mb-1">Pendente</p>
                            <p class="text-2xl font-bold text-red-600">R$ ${parseFloat(data.total_pendente).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div class="p-4 border-b border-gray-100">
                            <h3 class="font-semibold text-gray-800">Detalhes - ${meses[mes-1]} / ${ano}</h3>
                        </div>
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Endereço</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Inquilino</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-600">Valor</th>
                                    <th class="px-4 py-3 text-center text-sm font-semibold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${data.imoveis.map(im => `
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-4 py-3 text-sm text-gray-800">${im.endereco}</td>
                                        <td class="px-4 py-3 text-sm text-gray-600">${im.cliente_nome}</td>
                                        <td class="px-4 py-3 text-sm text-right font-medium">R$ ${parseFloat(im.valor_aluguel).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                        <td class="px-4 py-3 text-center">
                                            <span class="px-3 py-1 rounded-full text-xs font-semibold ${im.pago ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                                                ${im.pago ? '✅ Pago' : '⏳ Pendente'}
                                            </span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            } catch (e) {
                document.getElementById('relatorioContent').innerHTML = '<p class="p-8 text-center text-red-500">Erro ao carregar relatório</p>';
            }
        }
        
        async function loadRelatorioAnual() {
            const ano = document.getElementById('relAno').value;
            
            try {
                const res = await fetch(`${API_BASE}/relatorios.php?action=anual&ano=${ano}`);
                const data = await res.json();
                
                document.getElementById('relatorioContent').innerHTML = `
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <p class="text-sm text-gray-500 mb-1">Receita Total Anual</p>
                            <p class="text-2xl font-bold text-gray-800">R$ ${parseFloat(data.total_anual).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        </div>
                        <div class="bg-white rounded-xl p-5 shadow-md border border-green-100 border-l-4 border-l-green-500">
                            <p class="text-sm text-gray-500 mb-1">Total Recebido</p>
                            <p class="text-2xl font-bold text-green-600">R$ ${parseFloat(data.total_recebido).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        </div>
                        <div class="bg-white rounded-xl p-5 shadow-md border border-red-100 border-l-4 border-l-red-500">
                            <p class="text-sm text-gray-500 mb-1">Total Pendente</p>
                            <p class="text-2xl font-bold text-red-600">R$ ${parseFloat(data.total_pendente).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div class="p-4 border-b border-gray-100">
                            <h3 class="font-semibold text-gray-800">Detalhamento Anual - ${ano}</h3>
                        </div>
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Mês</th>
                                    <th class="px-4 py-3 text-center text-sm font-semibold text-gray-600">Imóveis</th>
                                    <th class="px-4 py-3 text-center text-sm font-semibold text-gray-600">Pagos</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-600">Receita</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-600">Recebido</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${data.meses.map(m => `
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-4 py-3 text-sm font-medium text-gray-800">${m.nome}</td>
                                        <td class="px-4 py-3 text-sm text-center text-gray-600">${m.qtd_imoveis}</td>
                                        <td class="px-4 py-3 text-sm text-center text-gray-600">${m.qtd_pagos}</td>
                                        <td class="px-4 py-3 text-sm text-right">R$ ${parseFloat(m.total).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                        <td class="px-4 py-3 text-sm text-right text-green-600 font-medium">R$ ${parseFloat(m.recebido).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            } catch (e) {
                document.getElementById('relatorioContent').innerHTML = '<p class="p-8 text-center text-red-500">Erro ao carregar relatório</p>';
            }
        }
        
        // Helper functions
        function isContratoAtivo(imovel) {
            const inicio = new Date(imovel.data_inicio);
            const fim = new Date(inicio);
            fim.setMonth(fim.getMonth() + parseInt(imovel.contrato_meses));
            return new Date() < fim;
        }
        
        function getMesesRestantes(imovel) {
            const inicio = new Date(imovel.data_inicio);
            const fim = new Date(inicio);
            fim.setMonth(fim.getMonth() + parseInt(imovel.contrato_meses));
            const now = new Date();
            
            if (now >= fim) return 0;
            
            const diffMs = fim.getTime() - now.getTime();
            return Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30));
        }
        
        // Initialize
        showPage('dashboard');
    </script>
</body>
</html>
