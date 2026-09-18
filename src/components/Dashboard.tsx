import { Cliente, Imovel } from '../types';

interface DashboardProps {
  clientes: Cliente[];
  imoveis: Imovel[];
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ clientes, imoveis, onNavigate }: DashboardProps) {
  const totalReceita = imoveis.reduce((acc, im) => acc + im.valorAluguel, 0);
  const imoveisAlugados = imoveis.length;
  const contratosAtivos = imoveis.filter(im => {
    const inicio = new Date(im.dataInicio);
    const fim = new Date(inicio);
    fim.setMonth(fim.getMonth() + im.contratoMeses);
    return new Date() < fim;
  }).length;

  const now = new Date();
  const pagamentosMes = imoveis.filter(im => {
    const inicio = new Date(im.dataInicio);
    const fim = new Date(inicio);
    fim.setMonth(fim.getMonth() + im.contratoMeses);
    return now < fim;
  });

  const pagosMes = pagamentosMes.filter(im => {
    return im.pagamentos.some(p => 
      p.mes === now.getMonth() + 1 && 
      p.ano === now.getFullYear() && 
      p.pago
    );
  }).length;

  const pendentesMes = pagamentosMes.length - pagosMes;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Gestão de Imóveis</h2>
        <p className="text-blue-100">Gerencie seus imóveis, clientes e contratos em um só lugar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Clientes</p>
              <p className="text-2xl font-bold text-gray-800">{clientes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Imóveis</p>
              <p className="text-2xl font-bold text-gray-800">{imoveisAlugados}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contratos Ativos</p>
              <p className="text-2xl font-bold text-gray-800">{contratosAtivos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Receita Mensal</p>
              <p className="text-2xl font-bold text-gray-800">R$ {totalReceita.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pagos este mês</p>
              <p className="text-xl font-bold text-green-600">{pagosMes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pendentes este mês</p>
              <p className="text-xl font-bold text-red-600">{pendentesMes}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onNavigate('clientes')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          + Cadastrar Cliente
        </button>
        <button
          onClick={() => onNavigate('imoveis')}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-md"
        >
          + Cadastrar Imóvel
        </button>
        <button
          onClick={() => onNavigate('relatorios')}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-md"
        >
          📊 Ver Relatórios
        </button>
      </div>
    </div>
  );
}
