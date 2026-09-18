import { useState } from 'react';
import { TabType } from './types';
import Dashboard from './components/Dashboard';
import Clientes from './components/Clientes';
import Imoveis from './components/Imoveis';
import Relatorios from './components/Relatorios';
import AdminDB from './components/AdminDB';
import { useClientes } from './hooks/useDatabase';
import { useImoveis } from './hooks/useDatabase';
import { usePagamentos } from './hooks/useDatabase';
import { useDatabase } from './hooks/useDatabase';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { clientes, loading: loadingClientes, adicionar: addCliente, atualizar: updateCliente, remover: removeCliente } = useClientes();
  const { imoveis, loading: loadingImoveis, adicionar: addImovel, atualizar: updateImovel, remover: removeImovel } = useImoveis();
  const { toggle: togglePagamento, isPago, recarregar: recarregarPagamentos } = usePagamentos();
  const { stats } = useDatabase();

  const loading = loadingClientes || loadingImoveis;

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'clientes', label: 'Clientes', icon: '👥' },
    { id: 'imoveis', label: 'Imóveis', icon: '🏗️' },
    { id: 'relatorios', label: 'Relatórios', icon: '📊' },
    { id: 'admin', label: 'Banco de Dados', icon: '💾' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando banco de dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar para desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">🏢</span>
            <span>Gestão Imóveis</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Controle de Aluguéis</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <p className="text-xs text-gray-600 font-medium">Total de Imóveis</p>
            <p className="text-2xl font-bold text-blue-700">{stats?.totalImoveis ?? imoveis.length}</p>
            <p className="text-xs text-gray-500 mt-1">{stats?.totalClientes ?? clientes.length} clientes cadastrados</p>
            <p className="text-xs text-gray-400 mt-1">💾 IndexedDB</p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🏢</span>
                <span>Gestão</span>
              </h1>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>🏢</span> Gestão Imóveis
          </h1>
          <div className="w-10" />
        </header>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
          <div className="flex justify-around">
            {tabs.slice(0, 4).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 flex-1 transition-colors ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Page content */}
        <div className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              clientes={clientes}
              imoveis={imoveis}
              onNavigate={(tab) => setActiveTab(tab as TabType)}
            />
          )}
          {activeTab === 'clientes' && (
            <Clientes
              clientes={clientes}
              onAdd={addCliente}
              onUpdate={updateCliente}
              onRemove={removeCliente}
            />
          )}
          {activeTab === 'imoveis' && (
            <Imoveis
              imoveis={imoveis}
              clientes={clientes}
              onAdd={addImovel}
              onUpdate={updateImovel}
              onRemove={removeImovel}
              onTogglePagamento={togglePagamento}
              isPago={isPago}
              onRecarregarPagamentos={recarregarPagamentos}
            />
          )}
          {activeTab === 'relatorios' && (
            <Relatorios
              imoveis={imoveis}
              clientes={clientes}
              isPago={isPago}
            />
          )}
          {activeTab === 'admin' && (
            <AdminDB />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
