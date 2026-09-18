export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
}

export interface Imovel {
  id: string;
  tipo: 'casa' | 'fazenda' | 'suite';
  endereco: string;
  valorAluguel: number;
  contratoMeses: 6 | 12;
  dataInicio: string;
  clienteId: string;
  // específico para fazenda
  periodoArrendado?: string;
  // específico para suíte
  residencial?: string;
  pagamentos: Pagamento[];
}

export interface Pagamento {
  id: string;
  mes: number; // 1-12
  ano: number;
  pago: boolean;
  dataPagamento?: string;
}

export type TabType = 'dashboard' | 'clientes' | 'imoveis' | 'relatorios';
