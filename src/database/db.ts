import Dexie, { Table } from 'dexie';

// ==========================================
// BANCO DE DADOS - GESTÃO DE IMÓVEIS
// ==========================================
// Este banco usa IndexedDB (armazenamento local do navegador)
// Funciona perfeitamente com deploy no GitHub Pages
// Os dados persistem mesmo após fechar o navegador

export interface DBCliente {
  id?: number;
  uuid: string;
  nome: string;
  cpf: string;
  telefone: string;
  email?: string;
  dataCadastro: string;
  ativo: boolean;
}

export interface DBImovel {
  id?: number;
  uuid: string;
  tipo: 'casa' | 'fazenda' | 'suite';
  endereco: string;
  valorAluguel: number;
  contratoMeses: 6 | 12;
  dataInicio: string;
  clienteUuid: string;
  periodoArrendado?: string;
  residencial?: string;
  dataCadastro: string;
  ativo: boolean;
}

export interface DBPagamento {
  id?: number;
  uuid: string;
  imovelUuid: string;
  mes: number;
  ano: number;
  pago: boolean;
  dataPagamento?: string;
  valorPago?: number;
  observacao?: string;
}

export interface DBConfig {
  id?: number;
  chave: string;
  valor: string;
}

// Definição do banco de dados
class GestaoImoveisDB extends Dexie {
  clientes!: Table<DBCliente, number>;
  imoveis!: Table<DBImovel, number>;
  pagamentos!: Table<DBPagamento, number>;
  configs!: Table<DBConfig, number>;

  constructor() {
    super('GestaoImoveisDB');

    // Definição das tabelas e índices
    // Índices permitem buscas rápidas por campos específicos
    this.version(1).stores({
      clientes: '++id, uuid, cpf, nome, telefone, ativo',
      imoveis: '++id, uuid, tipo, clienteUuid, endereco, dataInicio, ativo',
      pagamentos: '++id, uuid, imovelUuid, [mes+ano], [imovelUuid+mes+ano], pago',
      configs: '++id, chave',
    });
  }
}

// Instância única do banco
export const db = new GestaoImoveisDB();

// ==========================================
// FUNÇÕES HELPER - CLIENTES
// ==========================================

export const clienteService = {
  async getAll(): Promise<DBCliente[]> {
    return db.clientes.where('ativo').equals(1).toArray();
  },

  async getAllIncludingInactive(): Promise<DBCliente[]> {
    return db.clientes.toArray();
  },

  async getByUuid(uuid: string): Promise<DBCliente | undefined> {
    return db.clientes.where('uuid').equals(uuid).first();
  },

  async getByCpf(cpf: string): Promise<DBCliente | undefined> {
    return db.clientes.where('cpf').equals(cpf).first();
  },

  async create(cliente: Omit<DBCliente, 'id'>): Promise<number> {
    return db.clientes.add(cliente);
  },

  async update(uuid: string, changes: Partial<DBCliente>): Promise<number> {
    return db.clientes.where('uuid').equals(uuid).modify(changes);
  },

  async delete(uuid: string): Promise<number> {
    return db.clientes.where('uuid').equals(uuid).delete();
  },

  async softDelete(uuid: string): Promise<number> {
    return db.clientes.where('uuid').equals(uuid).modify({ ativo: false });
  },

  async search(termo: string): Promise<DBCliente[]> {
    const all = await db.clientes.where('ativo').equals(1).toArray();
    const lower = termo.toLowerCase();
    return all.filter(c =>
      c.nome.toLowerCase().includes(lower) ||
      c.cpf.includes(termo) ||
      c.telefone.includes(termo)
    );
  },

  async count(): Promise<number> {
    return db.clientes.where('ativo').equals(1).count();
  },
};

// ==========================================
// FUNÇÕES HELPER - IMÓVEIS
// ==========================================

export const imovelService = {
  async getAll(): Promise<DBImovel[]> {
    return db.imoveis.where('ativo').equals(1).toArray();
  },

  async getByUuid(uuid: string): Promise<DBImovel | undefined> {
    return db.imoveis.where('uuid').equals(uuid).first();
  },

  async getByCliente(clienteUuid: string): Promise<DBImovel[]> {
    return db.imoveis.where('clienteUuid').equals(clienteUuid).toArray();
  },

  async getByTipo(tipo: 'casa' | 'fazenda' | 'suite'): Promise<DBImovel[]> {
    return db.imoveis.where('tipo').equals(tipo).toArray();
  },

  async create(imovel: Omit<DBImovel, 'id'>): Promise<number> {
    return db.imoveis.add(imovel);
  },

  async update(uuid: string, changes: Partial<DBImovel>): Promise<number> {
    return db.imoveis.where('uuid').equals(uuid).modify(changes);
  },

  async delete(uuid: string): Promise<number> {
    return db.imoveis.where('uuid').equals(uuid).delete();
  },

  async softDelete(uuid: string): Promise<number> {
    return db.imoveis.where('uuid').equals(uuid).modify({ ativo: false });
  },

  async search(termo: string): Promise<DBImovel[]> {
    const all = await db.imoveis.where('ativo').equals(1).toArray();
    const lower = termo.toLowerCase();
    return all.filter(im =>
      im.endereco.toLowerCase().includes(lower) ||
      im.tipo.includes(lower)
    );
  },

  async count(): Promise<number> {
    return db.imoveis.where('ativo').equals(1).count();
  },

  async countByTipo(tipo: 'casa' | 'fazenda' | 'suite'): Promise<number> {
    return db.imoveis.where('tipo').equals(tipo).count();
  },
};

// ==========================================
// FUNÇÕES HELPER - PAGAMENTOS
// ==========================================

export const pagamentoService = {
  async getAll(): Promise<DBPagamento[]> {
    return db.pagamentos.toArray();
  },

  async getByImovel(imovelUuid: string): Promise<DBPagamento[]> {
    return db.pagamentos.where('imovelUuid').equals(imovelUuid).toArray();
  },

  async getByMesAno(mes: number, ano: number): Promise<DBPagamento[]> {
    return db.pagamentos
      .where('[mes+ano]')
      .equals([mes, ano])
      .toArray();
  },

  async getByImovelMesAno(imovelUuid: string, mes: number, ano: number): Promise<DBPagamento | undefined> {
    return db.pagamentos
      .where('[imovelUuid+mes+ano]')
      .equals([imovelUuid, mes, ano])
      .first();
  },

  async toggle(imovelUuid: string, mes: number, ano: number): Promise<void> {
    const existente = await pagamentoService.getByImovelMesAno(imovelUuid, mes, ano);

    if (existente && existente.id) {
      if (existente.pago) {
        await db.pagamentos.update(existente.id, {
          pago: false,
          dataPagamento: undefined,
          valorPago: undefined,
        });
      } else {
        await db.pagamentos.update(existente.id, {
          pago: true,
          dataPagamento: new Date().toISOString(),
        });
      }
    } else {
      await db.pagamentos.add({
        uuid: crypto.randomUUID(),
        imovelUuid,
        mes,
        ano,
        pago: true,
        dataPagamento: new Date().toISOString(),
      });
    }
  },

  async marcarPago(imovelUuid: string, mes: number, ano: number, valor?: number): Promise<void> {
    const existente = await pagamentoService.getByImovelMesAno(imovelUuid, mes, ano);

    if (existente && existente.id) {
      await db.pagamentos.update(existente.id, {
        pago: true,
        dataPagamento: new Date().toISOString(),
        valorPago: valor,
      });
    } else {
      await db.pagamentos.add({
        uuid: crypto.randomUUID(),
        imovelUuid,
        mes,
        ano,
        pago: true,
        dataPagamento: new Date().toISOString(),
        valorPago: valor,
      });
    }
  },

  async marcarPendente(imovelUuid: string, mes: number, ano: number): Promise<void> {
    const existente = await pagamentoService.getByImovelMesAno(imovelUuid, mes, ano);

    if (existente && existente.id) {
      await db.pagamentos.update(existente.id, {
        pago: false,
        dataPagamento: undefined,
      });
    }
  },

  async getPagosMesAno(mes: number, ano: number): Promise<DBPagamento[]> {
    const pagamentos = await db.pagamentos
      .where('[mes+ano]')
      .equals([mes, ano])
      .toArray();
    return pagamentos.filter(p => p.pago);
  },

  async getPendentesMesAno(mes: number, ano: number): Promise<DBPagamento[]> {
    const pagamentos = await db.pagamentos
      .where('[mes+ano]')
      .equals([mes, ano])
      .toArray();
    return pagamentos.filter(p => !p.pago);
  },

  async delete(imovelUuid: string): Promise<number> {
    return db.pagamentos.where('imovelUuid').equals(imovelUuid).delete();
  },

  async countPagos(): Promise<number> {
    const all = await db.pagamentos.toArray();
    return all.filter(p => p.pago).length;
  },
};

// ==========================================
// FUNÇÕES HELPER - CONFIGURAÇÕES
// ==========================================

export const configService = {
  async get(chave: string): Promise<string | undefined> {
    const config = await db.configs.where('chave').equals(chave).first();
    return config?.valor;
  },

  async set(chave: string, valor: string): Promise<void> {
    const existente = await db.configs.where('chave').equals(chave).first();
    if (existente && existente.id) {
      await db.configs.update(existente.id, { valor });
    } else {
      await db.configs.add({ chave, valor });
    }
  },

  async delete(chave: string): Promise<number> {
    return db.configs.where('chave').equals(chave).delete();
  },
};

// ==========================================
// UTILITÁRIOS
// ==========================================

export const dbUtils = {
  // Exportar todos os dados como JSON
  async exportAll(): Promise<string> {
    const data = {
      clientes: await db.clientes.toArray(),
      imoveis: await db.imoveis.toArray(),
      pagamentos: await db.pagamentos.toArray(),
      configs: await db.configs.toArray(),
      exportadoEm: new Date().toISOString(),
      versao: '1.0.0',
    };
    return JSON.stringify(data, null, 2);
  },

  // Importar dados de JSON
  async importAll(json: string): Promise<void> {
    const data = JSON.parse(json);

    await db.transaction('rw', db.clientes, db.imoveis, db.pagamentos, db.configs, async () => {
      // Limpar dados existentes
      await db.clientes.clear();
      await db.imoveis.clear();
      await db.pagamentos.clear();
      await db.configs.clear();

      // Importar novos dados
      if (data.clientes?.length) await db.clientes.bulkAdd(data.clientes);
      if (data.imoveis?.length) await db.imoveis.bulkAdd(data.imoveis);
      if (data.pagamentos?.length) await db.pagamentos.bulkAdd(data.pagamentos);
      if (data.configs?.length) await db.configs.bulkAdd(data.configs);
    });
  },

  // Limpar todo o banco
  async clearAll(): Promise<void> {
    await db.transaction('rw', db.clientes, db.imoveis, db.pagamentos, db.configs, async () => {
      await db.clientes.clear();
      await db.imoveis.clear();
      await db.pagamentos.clear();
      await db.configs.clear();
    });
  },

  // Obter estatísticas do banco
  async getStats(): Promise<{
    totalClientes: number;
    totalImoveis: number;
    totalPagamentos: number;
    totalPagos: number;
    tamanhoEstimado: string;
  }> {
    const totalClientes = await db.clientes.count();
    const totalImoveis = await db.imoveis.count();
    const totalPagamentos = await db.pagamentos.count();
    const totalPagos = await db.pagamentos.filter(p => p.pago).count();

    // Estimativa de tamanho
    const clientes = await db.clientes.toArray();
    const imoveis = await db.imoveis.toArray();
    const pagamentos = await db.pagamentos.toArray();
    const tamanhoBytes = JSON.stringify({ clientes, imoveis, pagamentos }).length;
    const tamanhoKB = (tamanhoBytes / 1024).toFixed(2);

    return {
      totalClientes,
      totalImoveis,
      totalPagamentos,
      totalPagos,
      tamanhoEstimado: `${tamanhoKB} KB`,
    };
  },
};

// Gerar UUID
export function gerarUUID(): string {
  return crypto.randomUUID();
}
