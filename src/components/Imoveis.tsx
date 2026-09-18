import { useState } from 'react';
import { Cliente, Imovel } from '../types';

interface ImoveisProps {
  imoveis: Imovel[];
  setImoveis: (imoveis: Imovel[]) => void;
  clientes: Cliente[];
}

export default function Imoveis({ imoveis, setImoveis, clientes }: ImoveisProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [tipo, setTipo] = useState<'casa' | 'fazenda' | 'suite'>('casa');
  const [endereco, setEndereco] = useState('');
  const [valorAluguel, setValorAluguel] = useState('');
  const [contratoMeses, setContratoMeses] = useState<6 | 12>(12);
  const [dataInicio, setDataInicio] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [periodoArrendado, setPeriodoArrendado] = useState('');
  const [residencial, setResidencial] = useState('');
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  const resetForm = () => {
    setTipo('casa');
    setEndereco('');
    setValorAluguel('');
    setContratoMeses(12);
    setDataInicio('');
    setClienteId('');
    setPeriodoArrendado('');
    setResidencial('');
    setShowForm(false);
    setEditId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!endereco || !valorAluguel || !dataInicio || !clienteId) return;

    if (editId) {
      setImoveis(imoveis.map(im =>
        im.id === editId ? {
          ...im,
          tipo,
          endereco,
          valorAluguel: parseFloat(valorAluguel),
          contratoMeses,
          dataInicio,
          clienteId,
          periodoArrendado: tipo === 'fazenda' ? periodoArrendado : undefined,
          residencial: tipo === 'suite' ? residencial : undefined,
        } : im
      ));
    } else {
      const novo: Imovel = {
        id: Date.now().toString(),
        tipo,
        endereco,
        valorAluguel: parseFloat(valorAluguel),
        contratoMeses,
        dataInicio,
        clienteId,
        periodoArrendado: tipo === 'fazenda' ? periodoArrendado : undefined,
        residencial: tipo === 'suite' ? residencial : undefined,
        pagamentos: [],
      };
      setImoveis([...imoveis, novo]);
    }
    resetForm();
  };

  const handleEdit = (imovel: Imovel) => {
    setTipo(imovel.tipo);
    setEndereco(imovel.endereco);
    setValorAluguel(imovel.valorAluguel.toString());
    setContratoMeses(imovel.contratoMeses);
    setDataInicio(imovel.dataInicio);
    setClienteId(imovel.clienteId);
    setPeriodoArrendado(imovel.periodoArrendado || '');
    setResidencial(imovel.residencial || '');
    setEditId(imovel.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este imóvel?')) {
      setImoveis(imoveis.filter(im => im.id !== id));
    }
  };

  const togglePagamento = (imovelId: string) => {
    const now = new Date();
    const mes = now.getMonth() + 1;
    const ano = now.getFullYear();

    setImoveis(imoveis.map(im => {
      if (im.id !== imovelId) return im;
      
      const pagamentoExistente = im.pagamentos.find(p => p.mes === mes && p.ano === ano);
      
      if (pagamentoExistente) {
        return {
          ...im,
          pagamentos: im.pagamentos.map(p =>
            p.mes === mes && p.ano === ano
              ? { ...p, pago: !p.pago, dataPagamento: !p.pago ? new Date().toISOString() : undefined }
              : p
          ),
        };
      } else {
        return {
          ...im,
          pagamentos: [...im.pagamentos, {
            id: Date.now().toString(),
            mes,
            ano,
            pago: true,
            dataPagamento: new Date().toISOString(),
          }],
        };
      }
    }));
  };

  const getMesesRestantes = (imovel: Imovel) => {
    const inicio = new Date(imovel.dataInicio);
    const fim = new Date(inicio);
    fim.setMonth(fim.getMonth() + imovel.contratoMeses);
    const now = new Date();
    
    if (now >= fim) return 0;
    
    const diffMs = fim.getTime() - now.getTime();
    const diffMeses = Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30));
    return diffMeses;
  };

  const isContratoAtivo = (imovel: Imovel) => {
    const inicio = new Date(imovel.dataInicio);
    const fim = new Date(inicio);
    fim.setMonth(fim.getMonth() + imovel.contratoMeses);
    return new Date() < fim;
  };

  const isPagoMes = (imovel: Imovel) => {
    const now = new Date();
    return imovel.pagamentos.some(p =>
      p.mes === now.getMonth() + 1 &&
      p.ano === now.getFullYear() &&
      p.pago
    );
  };

  const getClienteNome = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'Cliente não encontrado';
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'casa': return '🏠 Casa';
      case 'fazenda': return '🌾 Fazenda';
      case 'suite': return '🏨 Suíte';
      default: return tipo;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'casa': return 'bg-blue-100 text-blue-800';
      case 'fazenda': return 'bg-green-100 text-green-800';
      case 'suite': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const imoveisFiltrados = imoveis.filter(im => {
    const matchBusca = im.endereco.toLowerCase().includes(busca.toLowerCase()) ||
      getClienteNome(im.clienteId).toLowerCase().includes(busca.toLowerCase());
    const matchTipo = filtroTipo === 'todos' || im.tipo === filtroTipo;
    return matchBusca && matchTipo;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Imóveis</h2>
          <p className="text-gray-500">Gerencie casas, fazendas e suítes</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-md"
        >
          + Novo Imóvel
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editId ? 'Editar Imóvel' : 'Novo Imóvel'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel</label>
              <div className="flex gap-3 flex-wrap">
                {(['casa', 'fazenda', 'suite'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipo(t)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      tipo === t
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t === 'casa' ? '🏠 Casa' : t === 'fazenda' ? '🌾 Fazenda' : '🏨 Suíte'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {tipo === 'casa' ? 'Endereço da Casa' : tipo === 'fazenda' ? 'Endereço da Fazenda' : 'Residencial Incorporada'}
                </label>
                {tipo === 'suite' ? (
                  <input
                    type="text"
                    value={residencial}
                    onChange={e => setResidencial(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome do residencial"
                    required
                  />
                ) : (
                  <input
                    type="text"
                    value={endereco}
                    onChange={e => setEndereco(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Endereço completo"
                    required
                  />
                )}
              </div>

              {tipo === 'suite' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço da Suíte</label>
                  <input
                    type="text"
                    value={endereco}
                    onChange={e => setEndereco(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Endereço completo"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor do Aluguel (R$)</label>
                <input
                  type="number"
                  value={valorAluguel}
                  onChange={e => setValorAluguel(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {tipo !== 'fazenda' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contrato</label>
                  <select
                    value={contratoMeses}
                    onChange={e => setContratoMeses(Number(e.target.value) as 6 | 12)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={6}>6 meses</option>
                    <option value={12}>12 meses</option>
                  </select>
                </div>
              )}

              {tipo === 'fazenda' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Período Arrendado</label>
                  <input
                    type="text"
                    value={periodoArrendado}
                    onChange={e => setPeriodoArrendado(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 2 anos, Safra 2024..."
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={e => setDataInicio(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vincular ao Cliente</label>
                <select
                  value={clienteId}
                  onChange={e => setClienteId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>{c.nome} - {c.cpf}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {editId ? 'Atualizar' : 'Cadastrar'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          placeholder="🔍 Buscar por endereço ou cliente..."
        />
        <select
          value={filtroTipo}
          onChange={e => setFiltroTipo(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="todos">Todos os tipos</option>
          <option value="casa">🏠 Casa</option>
          <option value="fazenda">🌾 Fazenda</option>
          <option value="suite">🏨 Suíte</option>
        </select>
      </div>

      {/* Lista de Imóveis */}
      {imoveisFiltrados.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-md border border-gray-100">
          {imoveis.length === 0 ? 'Nenhum imóvel cadastrado ainda.' : 'Nenhum resultado encontrado.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {imoveisFiltrados.map(imovel => {
            const mesesRestantes = getMesesRestantes(imovel);
            const ativo = isContratoAtivo(imovel);
            const pago = isPagoMes(imovel);
            const progresso = ((imovel.contratoMeses - mesesRestantes) / imovel.contratoMeses) * 100;

            return (
              <div key={imovel.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTipoColor(imovel.tipo)}`}>
                        {getTipoLabel(imovel.tipo)}
                      </span>
                      {ativo && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                          Ativo
                        </span>
                      )}
                      {!ativo && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          Encerrado
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(imovel)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(imovel.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-800 mb-1">{imovel.endereco}</h4>
                  {imovel.residencial && (
                    <p className="text-sm text-gray-500 mb-1">Residencial: {imovel.residencial}</p>
                  )}
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Inquilino:</span> {getClienteNome(imovel.clienteId)}
                  </p>
                  {imovel.periodoArrendado && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Período:</span> {imovel.periodoArrendado}
                    </p>
                  )}
                  <p className="text-lg font-bold text-green-600 mb-3">
                    R$ {imovel.valorAluguel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    <span className="text-sm font-normal text-gray-500">/mês</span>
                  </p>

                  {/* Cronômetro do contrato */}
                  {ativo && (
                    <div className="mb-3 bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">⏱ Tempo restante do contrato</span>
                        <span className="text-sm font-bold text-blue-600">{mesesRestantes} meses</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all ${
                            progresso > 80 ? 'bg-red-500' : progresso > 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(progresso, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Início: {new Date(imovel.dataInicio).toLocaleDateString('pt-BR')} → 
                        Término: {(() => {
                          const fim = new Date(imovel.dataInicio);
                          fim.setMonth(fim.getMonth() + imovel.contratoMeses);
                          return fim.toLocaleDateString('pt-BR');
                        })()}
                      </p>
                    </div>
                  )}

                  {/* Botão PAGO */}
                  {ativo && (
                    <button
                      onClick={() => togglePagamento(imovel.id)}
                      className={`w-full py-2.5 rounded-lg font-semibold transition-all ${
                        pago
                          ? 'bg-green-500 text-white hover:bg-green-600 shadow-md'
                          : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200'
                      }`}
                    >
                      {pago ? '✅ PAGO' : '⏳ PENDENTE - Marcar como PAGO'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
