import { useState, useEffect, useCallback } from 'react';
import {
  db,
  clienteService,
  imovelService,
  pagamentoService,
  dbUtils,
  gerarUUID,
  DBCliente,
  DBImovel,
  DBPagamento,
} from '../database/db';

// ==========================================
// HOOK - CLIENTES
// ==========================================
export function useClientes() {
  const [clientes, setClientes] = useState<DBCliente[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    setLoading(true);
    const data = await clienteService.getAll();
    setClientes(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const adicionar = async (dados: Omit<DBCliente, 'id' | 'uuid' | 'dataCadastro' | 'ativo'>) => {
    const novo: Omit<DBCliente, 'id'> = {
      ...dados,
      uuid: gerarUUID(),
      dataCadastro: new Date().toISOString(),
      ativo: true,
    };
    await clienteService.create(novo);
    await carregar();
  };

  const atualizar = async (uuid: string, dados: Partial<DBCliente>) => {
    await clienteService.update(uuid, dados);
    await carregar();
  };

  const remover = async (uuid: string) => {
    await clienteService.softDelete(uuid);
    await carregar();
  };

  const buscar = async (termo: string) => {
    return clienteService.search(termo);
  };

  return {
    clientes,
    loading,
    adicionar,
    atualizar,
    remover,
    buscar,
    recarregar: carregar,
  };
}

// ==========================================
// HOOK - IMÓVEIS
// ==========================================
export function useImoveis() {
  const [imoveis, setImoveis] = useState<DBImovel[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    setLoading(true);
    const data = await imovelService.getAll();
    setImoveis(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const adicionar = async (dados: Omit<DBImovel, 'id' | 'uuid' | 'dataCadastro' | 'ativo'>) => {
    const novo: Omit<DBImovel, 'id'> = {
      ...dados,
      uuid: gerarUUID(),
      dataCadastro: new Date().toISOString(),
      ativo: true,
    };
    await imovelService.create(novo);
    await carregar();
  };

  const atualizar = async (uuid: string, dados: Partial<DBImovel>) => {
    await imovelService.update(uuid, dados);
    await carregar();
  };

  const remover = async (uuid: string) => {
    await imovelService.softDelete(uuid);
    await carregar();
  };

  const buscar = async (termo: string) => {
    return imovelService.search(termo);
  };

  const buscarPorCliente = async (clienteUuid: string) => {
    return imovelService.getByCliente(clienteUuid);
  };

  return {
    imoveis,
    loading,
    adicionar,
    atualizar,
    remover,
    buscar,
    buscarPorCliente,
    recarregar: carregar,
  };
}

// ==========================================
// HOOK - PAGAMENTOS
// ==========================================
export function usePagamentos() {
  const [pagamentos, setPagamentos] = useState<DBPagamento[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    setLoading(true);
    const data = await pagamentoService.getAll();
    setPagamentos(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const toggle = async (imovelUuid: string, mes: number, ano: number) => {
    await pagamentoService.toggle(imovelUuid, mes, ano);
    await carregar();
  };

  const marcarPago = async (imovelUuid: string, mes: number, ano: number, valor?: number) => {
    await pagamentoService.marcarPago(imovelUuid, mes, ano, valor);
    await carregar();
  };

  const marcarPendente = async (imovelUuid: string, mes: number, ano: number) => {
    await pagamentoService.marcarPendente(imovelUuid, mes, ano);
    await carregar();
  };

  const getPorImovel = async (imovelUuid: string) => {
    return pagamentoService.getByImovel(imovelUuid);
  };

  const getPorMesAno = async (mes: number, ano: number) => {
    return pagamentoService.getByMesAno(mes, ano);
  };

  const isPago = (imovelUuid: string, mes: number, ano: number): boolean => {
    return pagamentos.some(
      p => p.imovelUuid === imovelUuid && p.mes === mes && p.ano === ano && p.pago
    );
  };

  return {
    pagamentos,
    loading,
    toggle,
    marcarPago,
    marcarPendente,
    getPorImovel,
    getPorMesAno,
    isPago,
    recarregar: carregar,
  };
}

// ==========================================
// HOOK - UTILITÁRIOS DO BANCO
// ==========================================
export function useDatabase() {
  const [stats, setStats] = useState<{
    totalClientes: number;
    totalImoveis: number;
    totalPagamentos: number;
    totalPagos: number;
    tamanhoEstimado: string;
  } | null>(null);

  const carregarStats = useCallback(async () => {
    const data = await dbUtils.getStats();
    setStats(data);
  }, []);

  useEffect(() => {
    carregarStats();
  }, [carregarStats]);

  const exportarDados = async (): Promise<string> => {
    return dbUtils.exportAll();
  };

  const importarDados = async (json: string) => {
    await dbUtils.importAll(json);
    await carregarStats();
  };

  const limparDados = async () => {
    await dbUtils.clearAll();
    await carregarStats();
  };

  const baixarBackup = async () => {
    const data = await dbUtils.exportAll();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-gestao-imoveis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    stats,
    exportarDados,
    importarDados,
    limparDados,
    baixarBackup,
    recarregarStats: carregarStats,
  };
}
