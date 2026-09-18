import { useState, useRef } from 'react';
import { useDatabase } from '../hooks/useDatabase';

export default function AdminDB() {
  const { stats, exportarDados, importarDados, limparDados, baixarBackup, recarregarStats } = useDatabase();
  const [importando, setImportando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [exportData, setExportData] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    const data = await exportarDados();
    setExportData(data);
    setShowExport(true);
  };

  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportData);
    setMensagem({ tipo: 'sucesso', texto: 'Dados copiados para a área de transferência!' });
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleDownload = async () => {
    await baixarBackup();
    setMensagem({ tipo: 'sucesso', texto: 'Backup baixado com sucesso!' });
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleImport = async () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportando(true);
    try {
      const text = await file.text();
      await importarDados(text);
      await recarregarStats();
      setMensagem({ tipo: 'sucesso', texto: 'Dados importados com sucesso!' });
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: 'Erro ao importar dados. Verifique o formato do arquivo.' });
    }
    setImportando(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleClear = async () => {
    if (confirm('⚠️ ATENÇÃO: Isso irá apagar TODOS os dados permanentemente. Deseja continuar?')) {
      if (confirm('Tem CERTEZA ABSOLUTA? Esta ação não pode ser desfeita!')) {
        await limparDados();
        await recarregarStats();
        setMensagem({ tipo: 'sucesso', texto: 'Todos os dados foram apagados.' });
        setTimeout(() => setMensagem(null), 3000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Banco de Dados</h2>
        <p className="text-gray-500">Gerencie e faça backup dos seus dados</p>
      </div>

      {/* Mensagem */}
      {mensagem && (
        <div className={`p-4 rounded-xl ${
          mensagem.tipo === 'sucesso'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {mensagem.texto}
        </div>
      )}

      {/* Estatísticas */}
      {stats && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Estatísticas do Banco</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">{stats.totalClientes}</p>
              <p className="text-xs text-blue-600 font-medium">Clientes</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{stats.totalImoveis}</p>
              <p className="text-xs text-green-600 font-medium">Imóveis</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-700">{stats.totalPagamentos}</p>
              <p className="text-xs text-purple-600 font-medium">Registros Pag.</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-emerald-700">{stats.totalPagos}</p>
              <p className="text-xs text-emerald-600 font-medium">Pagos</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-700">{stats.tamanhoEstimado}</p>
              <p className="text-xs text-gray-600 font-medium">Tamanho</p>
            </div>
          </div>
        </div>
      )}

      {/* Info sobre o banco */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">💾 Sobre o Armazenamento</h3>
        <p className="text-sm text-indigo-700 mb-3">
          Os dados são armazenados no <strong>IndexedDB</strong> do navegador, um banco de dados local robusto.
          Os dados persistem mesmo após fechar o navegador e são mantidos no dispositivo.
        </p>
        <div className="bg-white/60 rounded-lg p-3 text-sm text-indigo-600">
          <p className="font-medium mb-1">📌 Dicas importantes:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Faça backups regulares exportando os dados</li>
            <li>Os dados são locais ao dispositivo/navegador</li>
            <li>Limpar dados do navegador apagará o banco</li>
            <li>Use "Exportar" para salvar uma cópia de segurança</li>
            <li>Use "Importar" para restaurar dados de um backup</li>
          </ul>
        </div>
      </div>

      {/* Ações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📤 Exportar / Backup</h3>
          <p className="text-sm text-gray-500 mb-4">
            Exporte todos os dados em formato JSON para backup ou transferência.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              📋 Exportar JSON
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              💾 Baixar Backup
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📥 Importar / Restaurar</h3>
          <p className="text-sm text-gray-500 mb-4">
            Importe dados de um arquivo JSON de backup. Isso substituirá os dados atuais.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleImport}
              disabled={importando}
              className="px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {importando ? '⏳ Importando...' : '📂 Importar Arquivo'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Zona de perigo */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-red-200">
        <h3 className="text-lg font-semibold text-red-700 mb-4">⚠️ Zona de Perigo</h3>
        <p className="text-sm text-gray-500 mb-4">
          Apagar todos os dados é irreversível. Faça um backup antes de continuar.
        </p>
        <button
          onClick={handleClear}
          className="px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          🗑️ Apagar Todos os Dados
        </button>
      </div>

      {/* Export Modal */}
      {showExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowExport(false)} />
          <div className="relative bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Dados Exportados</h3>
              <button
                onClick={() => setShowExport(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <textarea
              readOnly
              value={exportData}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg text-xs font-mono bg-gray-50"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleCopyExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                📋 Copiar
              </button>
              <button
                onClick={() => setShowExport(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
