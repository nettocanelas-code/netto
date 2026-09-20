from flask import Blueprint, request, jsonify
from models import Cliente, Imovel, Pagamento
from app import db
from datetime import datetime, date
from dateutil.relativedelta import relativedelta

relatorios_bp = Blueprint('relatorios', __name__)

def is_contrato_ativo_no_periodo(imovel, mes, ano):
    """Verifica se o contrato está ativo no mês/ano especificado"""
    data_inicio_mes = date(ano, mes, 1)
    if mes == 12:
        data_fim_mes = date(ano + 1, 1, 1) - relativedelta(days=1)
    else:
        data_fim_mes = date(ano, mes + 1, 1) - relativedelta(days=1)
    
    data_fim_contrato = imovel.data_inicio + relativedelta(months=imovel.contrato_meses)
    
    return data_inicio_mes <= data_fim_contrato and data_fim_mes >= imovel.data_inicio

@relatorios_bp.route('/stats', methods=['GET'])
def stats():
    """Estatísticas gerais"""
    total_clientes = Cliente.query.filter_by(ativo=True).count()
    total_imoveis = Imovel.query.filter_by(ativo=True).count()
    total_pagamentos = Pagamento.query.count()
    total_pagos = Pagamento.query.filter_by(pago=True).count()
    
    # Receita mensal (imóveis ativos hoje)
    hoje = date.today()
    imoveis_ativos = Imovel.query.filter_by(ativo=True).all()
    receita_mensal = sum([
        imovel.valor_aluguel for imovel in imoveis_ativos
        if is_contrato_ativo_no_periodo(imovel, hoje.month, hoje.year)
    ])
    
    return jsonify({
        'total_clientes': total_clientes,
        'total_imoveis': total_imoveis,
        'total_pagamentos': total_pagamentos,
        'total_pagos': total_pagos,
        'receita_mensal': receita_mensal
    })

@relatorios_bp.route('/mensal', methods=['GET'])
def relatorio_mensal():
    """Relatório mensal"""
    mes = request.args.get('mes', type=int)
    ano = request.args.get('ano', type=int)
    
    if not mes or not ano:
        return jsonify({'error': 'Parâmetros obrigatórios: mes, ano'}), 400
    
    # Buscar imóveis ativos no período
    imoveis = Imovel.query.filter_by(ativo=True).all()
    imoveis_ativos = [
        imovel for imovel in imoveis
        if is_contrato_ativo_no_periodo(imovel, mes, ano)
    ]
    
    # Buscar pagamentos do mês
    pagamentos = Pagamento.query.filter_by(mes=mes, ano=ano).all()
    pagamentos_map = {p.imovel_uuid: p for p in pagamentos}
    
    # Calcular totais
    total_receita = 0
    total_recebido = 0
    imoveis_dados = []
    
    for imovel in imoveis_ativos:
        total_receita += imovel.valor_aluguel
        
        pagamento = pagamentos_map.get(imovel.uuid)
        pago = pagamento.pago if pagamento else False
        
        if pago:
            total_recebido += imovel.valor_aluguel
        
        imoveis_dados.append({
            'uuid': imovel.uuid,
            'endereco': imovel.endereco,
            'tipo': imovel.tipo,
            'valor_aluguel': imovel.valor_aluguel,
            'cliente_nome': imovel.cliente.nome if imovel.cliente else None,
            'cliente_cpf': imovel.cliente.cpf if imovel.cliente else None,
            'pago': pago,
            'data_pagamento': pagamento.data_pagamento.isoformat() if pagamento and pagamento.data_pagamento else None
        })
    
    return jsonify({
        'mes': mes,
        'ano': ano,
        'total_receita': total_receita,
        'total_recebido': total_recebido,
        'total_pendente': total_receita - total_recebido,
        'imoveis_pagos': sum(1 for i in imoveis_dados if i['pago']),
        'imoveis_pendentes': sum(1 for i in imoveis_dados if not i['pago']),
        'total_imoveis': len(imoveis_ativos),
        'imoveis': imoveis_dados
    })

@relatorios_bp.route('/anual', methods=['GET'])
def relatorio_anual():
    """Relatório anual"""
    ano = request.args.get('ano', type=int)
    
    if not ano:
        return jsonify({'error': 'Parâmetro obrigatório: ano'}), 400
    
    meses_nomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    
    meses_dados = []
    total_anual = 0
    total_recebido_anual = 0
    
    for mes in range(1, 13):
        # Buscar imóveis ativos no mês
        imoveis = Imovel.query.filter_by(ativo=True).all()
        imoveis_ativos = [
            imovel for imovel in imoveis
            if is_contrato_ativo_no_periodo(imovel, mes, ano)
        ]
        
        total_mes = sum(imovel.valor_aluguel for imovel in imoveis_ativos)
        
        # Buscar pagamentos do mês
        pagamentos = Pagamento.query.filter_by(mes=mes, ano=ano, pago=True).all()
        recebido_mes = sum(
            imovel.valor_aluguel for imovel in imoveis_ativos
            if any(p.imovel_uuid == imovel.uuid for p in pagamentos)
        )
        
        meses_dados.append({
            'mes': mes,
            'nome': meses_nomes[mes - 1],
            'total': total_mes,
            'recebido': recebido_mes,
            'pendente': total_mes - recebido_mes,
            'qtd_imoveis': len(imoveis_ativos),
            'qtd_pagos': len(pagamentos)
        })
        
        total_anual += total_mes
        total_recebido_anual += recebido_mes
    
    return jsonify({
        'ano': ano,
        'total_anual': total_anual,
        'total_recebido': total_recebido_anual,
        'total_pendente': total_anual - total_recebido_anual,
        'meses': meses_dados
    })
