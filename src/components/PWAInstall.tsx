import { useState, useEffect } from 'react';

export default function PWAInstall() {
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detectar se já está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(isStandalone);

    // Detectar sistema operacional
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua));
    setIsAndroid(/Android/.test(ua));

    // Mostrar banner se não estiver instalado
    if (!isStandalone) {
      const dismissed = localStorage.getItem('pwa-dismissed');
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    }
  }, []);

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-dismissed', 'true');
  };

  if (isInstalled || !showBanner) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            📱 Instalar no Celular
          </h3>
          <button
            onClick={dismissBanner}
            className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Instale o app na tela inicial para acesso rápido e experiência completa!
        </p>

        {isIOS && (
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800 font-medium mb-2">📲 No iPhone:</p>
            <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
              <li>Toque no botão <strong>Compartilhar</strong> (⬆️)</li>
              <li>Role e toque em <strong>"Adicionar à Tela de Início"</strong></li>
              <li>Toque em <strong>"Adicionar"</strong></li>
            </ol>
          </div>
        )}

        {isAndroid && (
          <div className="bg-green-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-800 font-medium mb-2">📲 No Android:</p>
            <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside">
              <li>Toque nos <strong>3 pontos</strong> (⋮) no Chrome</li>
              <li>Toque em <strong>"Adicionar à tela inicial"</strong></li>
              <li>Confirme tocando em <strong>"Instalar"</strong></li>
            </ol>
          </div>
        )}

        {!isIOS && !isAndroid && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700">
              Acesse este site no seu celular e use o menu do navegador para adicionar à tela inicial.
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={dismissBanner}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Entendi
          </button>
          <button
            onClick={dismissBanner}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            Depois
          </button>
        </div>
      </div>
    </div>
  );
}
