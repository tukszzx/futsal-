import React, { useState } from 'react';
import { Smartphone, Download, Share, PlusSquare, CheckCircle, ExternalLink, X, ShieldAlert } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* If already running in standalone mode, show a small badge or hide */}
      {isInstalled ? (
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>App Instalado</span>
        </div>
      ) : (
        <button
          onClick={() => {
            if (isInstallable) {
              install();
            } else {
              setShowModal(true);
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-lg text-xs shadow-md transition-all whitespace-nowrap shrink-0"
        >
          <Smartphone className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Instalar no Celular</span>
        </button>
      )}

      {/* Installation & APK Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Como Usar como Aplicativo (APP)</h3>
                  <p className="text-xs text-slate-400">
                    Instale direto no seu celular (Android ou iPhone) ou gere um APK para a Play Store
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-300">
              {/* Option 1: Direct Install on Android / Chrome */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>No Celular Android (Chrome)</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Abra o link compartilhado do app no <strong>Google Chrome</strong> do seu celular:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-slate-300">
                  <li>Toque nos <strong>3 pontinhos (⋮)</strong> no canto superior direito do Chrome.</li>
                  <li>Selecione <strong>&quot;Instalar aplicativo&quot;</strong> ou <strong>&quot;Adicionar à tela inicial&quot;</strong>.</li>
                  <li>O ícone do <strong>FutsalTactics Pro</strong> aparecerá junto com seus outros apps no celular, abrindo em tela cheia sem barras de navegador e funcionando offline!</li>
                </ol>
              </div>

              {/* Option 2: iOS Safari (iPhone / iPad) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>No iPhone / iPad (Safari)</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Abra o link no navegador <strong>Safari</strong> do iOS:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-slate-300">
                  <li>Toque no botão <strong>Compartilhar</strong> (ícone com quadrado e seta para cima).</li>
                  <li>Role as opções e toque em <strong>&quot;Adicionar à Tela de Início&quot;</strong>.</li>
                  <li>Toque em <strong>Adicionar</strong> no canto superior direito.</li>
                </ol>
              </div>

              {/* Option 3: Convert to Native APK for Google Play Store */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Quer transformar em arquivo APK (.apk) para publicar na Play Store?</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Como este app já é um <strong>PWA Oficial 100% em conformidade</strong> com ícones, manifest e Service Worker, você pode transformá-lo em APK em minutos:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>
                    Acesse <strong>PWABuilder</strong> (<a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">pwabuilder.com</a>).
                  </li>
                  <li>Cole a URL pública do seu app.</li>
                  <li>Clique em <strong>&quot;Package for Android&quot;</strong> e baixe o arquivo APK / AAB pronto para publicar na Google Play Store!</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
