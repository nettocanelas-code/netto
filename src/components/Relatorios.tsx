import { useState } from 'react';
import { Cliente, Imovel } from '../types';

interface RelatoriosProps {
  imoveis: Imovel[];
  clientes: Cliente[];
}

export default function Relatorios({ imoveis, clientes }: RelatoriosProps) {
  const [tipoRelatorio, setTipoRelatorio] = useState<'mensal' | 'anual'>('mensal');
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getClienteNome = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'N/A';
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'casa': return '🏠 Casa';
      case 'fazenda': return '🌾 Fazenda';
      case 'suite': return '🏨 Suíte';
      default: return tipo;
    }
  };

  const isContratoAtivoNoPeriodo = (imovel: Imovel, mes: number, ano: number) => {
    const inicio = new Date(imovel.dataInicio);
    const fim = new Date(inicio);
    fim.setMonth(fim.getMonth() + imovel.contratoMeses);
    
    const inicioMes = new Date(ano, mes - 1, 1);
    const fimMes = new Date(ano, mes, 0);
    
    return inicioMes <= fim && fimMes >= inicio;
  };

  const imoveisAtivosMes = imoveis.filter(im => 
    isContratoAtivoNoPeriodo(im, mesSelecionado, anoSelecionado)
  );

  const imoveisPagos = imoveisAtivosMes.filter(im =>
    im.pagamentos.some(p => p.mes === mesSelecionado && p.ano === anoSelecionado && p.pago)
  );

  const imoveisPendentes = imoveisAtivosMes.filter(im =>
    !im.pagamentos.some(p => p.mes === mesSelecionado && p.ano === anoSelecionado && p.pago)
  );

  const totalReceitaMes = imoveisAtivosMes.reduce((acc, im) => acc + im.valorAluguel, 0);
  const totalRecebido = imoveisPagos.reduce((acc, im) => acc + im.valorAluguel, 0);
  const totalPendente = totalReceitaMes - totalRecebido;

  // Relatório anual
  const dadosAnuais = meses.map((_, index) => {
    const mes = index + 1;
    const ativos = imoveis.filter(im => isContratoAtivoNoPeriodo(im, mes, anoSelecionado));
    const pagos = ativos.filter(im =>
      im.pagamentos.some(p => p.mes === mes && p.ano === anoSelecionado && p.pago)
    );
    return {
      mes,
      nome: meses[index],
      total: ativos.reduce((acc, im) => acc + im.valorAluguel, 0),
      recebido: pagos.reduce((acc, im) => acc + im.valorAluguel, 0),
      pendente: ativos.reduce((acc, im) => acc + im.valorAluguel, 0) - pagos.reduce((acc, im) => acc + im.valorAluguel, 0),
      qtdAtivos: ativos.length,
      qtdPagos: pagos.length,
    };
  });

  const totalAnual = dadosAnuais.reduce((acc, d) => acc + d.total, 0);
  const totalRecebidoAnual = dadosAnuais.reduce((acc, d) => acc + d.recebido, 0);
  const maxValor = Math.max(...dadosAnuais.map(d => d.total), 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Relatórios</h2>
        <p className="text-gray-500">Acompanhe receitas e pagamentos</p>
      </div>

      {/* Toggle tipo de relatório */}
      <div className="flex gap-3">
        <button
          onClick={() => setTipoRelatorio('mensal')}
          className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${
            tipoRelatorio === 'mensal'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📅 Relatório Mensal
        </button>
        <button
          onClick={() => setTipoRelatorio('anual')}
          className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${
            tipoRelatorio === 'anual'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📊 Relatório Anual
        </button>
      </div>

      {/* Seletores */}
      <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
        <div className="flex flex-wrap gap-4 items-end">
          {tipoRelatorio === 'mensal' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mês</label>
              <select
                value={mesSelecionado}
                onChange={e => setMesSelecionado(Number(e.target.value))}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {meses.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <select
              value={anoSelecionado}
              onChange={e => setAnoSelecionado(Number(e.target.value))}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[2024, 2025, 2026, 2027].map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {tipoRelatorio === 'mensal' ? (
        <>
          {/* Cards resumo mensal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Receita Total</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {totalReceitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-400 mt-1">{imoveisAtivosMes.length} imóveis ativos</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md border border-green-100 border-l-4 border-l-green-500">
              <p className="text-sm text-gray-500 mb-1">Recebido</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-400 mt-1">{imoveisPagos.length} pagamentos</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md border border-red-100 border-l-4 border-l-red-500">
              <p className="text-sm text-gray-500 mb-1">Pendente</p>
              <p className="text-2xl font-bold text-red-600">
                R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-400 mt-1">{imoveisPendentes.length} pendências</p>
            </div>
          </div>

          {/* Tabela de detalhes mensal */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">
                Detalhes - {meses[mesSelecionado - 1]} / {anoSelecionado}
              </h3>
            </div>
            {imoveisAtivosMes.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Nenhum imóvel ativo neste período.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tipo</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Endereço</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Inquilino</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Valor</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {imoveisAtivosMes.map(imovel => {
                      const pago = imovel.pagamentos.some(p =>
                        p.mes === mesSelecionado && p.ano === anoSelecionado && p.pago
                      );
                      return (
                        <tr key={imovel.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{getTipoLabel(imovel.tipo)}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{imovel.endereco}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{getClienteNome(imovel.clienteId)}</td>
                          <td className="px-4 py-3 text-sm text-right font-medium">
                            R$ {imovel.valorAluguel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              pago ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {pago ? '✅ Pago' : '⏳ Pendente'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50 font-semibold">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-sm text-gray-800">TOTAL</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800">
                        R$ {totalReceitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Resumo anual */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Receita Total Anual</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {totalAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md border border-green-100 border-l-4 border-l-green-500">
              <p className="text-sm text-gray-500 mb-1">Total Recebido</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {totalRecebidoAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md border border-red-100 border-l-4 border-l-red-500">
              <p className="text-sm text-gray-500 mb-1">Total Pendente</p>
              <p className="text-2xl font-bold text-red-600">
                R$ {(totalAnual - totalRecebidoAnual).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Gráfico de barras anual */}
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Receita Mensal - {anoSelecionado}</h3>
            <div className="space-y-3">
              {dadosAnuais.map(d => (
                <div key={d.mes} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-20">{d.nome.slice(0, 3)}</span>
                  <div className="flex-1 relative">
                    <div className="w-full bg-gray-100 rounded-full h-6">
                      <div
                        className="h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${(d.total / maxValor) * 100}%`, minWidth: d.total > 0 ? '60px' : '0' }}
                      >
                        {d.total > 0 && (
                          <span className="text-xs text-white font-medium">
                            R$ {(d.total / 1000).toFixed(1)}k
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 font-medium">
                      {d.qtdPagos}/{d.qtdAtivos}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela anual detalhada */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Detalhamento Anual - {anoSelecionado}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Mês</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Imóveis Ativos</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Pagos</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Receita</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Recebido</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Pendente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dadosAnuais.map(d => (
                    <tr key={d.mes} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{d.nome}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-600">{d.qtdAtivos}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-600">{d.qtdPagos}</td>
                      <td className="px-4 py-3 text-sm text-right">R$ {d.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">R$ {d.recebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">R$ {d.pendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 font-semibold">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-800">TOTAL ANUAL</td>
                    <td></td>
                    <td></td>
                    <td className="px-4 py-3 text-sm text-right text-gray-800">R$ {totalAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-3 text-sm text-right text-green-600">R$ {totalRecebidoAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600">R$ {(totalAnual - totalRecebidoAnual).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
