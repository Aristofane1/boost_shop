import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConnectionStatus } from '../types';

const ConnectWhatsAppPage: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  // Simulation of Evolution API WebSocket / Polling
  useEffect(() => {
    // Phase 1: Request QR
    const timer1 = setTimeout(() => {
      setStatus('qrcode_ready');
      setQrCodeData('https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EvolutionAPI-Session-Start-12345');
    }, 1500);

    // Phase 2: User scans (Simulated)
    const timer2 = setTimeout(() => {
      // setStatus('connected'); // Uncomment to simulate connection after 5s
    }, 8000);

    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const handleSimulateScan = () => {
      setStatus('connected');
  };

  const handleDisconnect = () => {
      if(window.confirm("Voulez-vous vraiment déconnecter votre session WhatsApp ? L'IA cessera de répondre.")) {
          setStatus('disconnected');
          setQrCodeData(null);
          // Restart flow
          setTimeout(() => {
              setStatus('qrcode_ready');
              setQrCodeData('https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EvolutionAPI-Session-New-67890');
          }, 1000);
      }
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full mb-8">
        <Link to="/dashboard" className="text-gray-500 hover:text-primary flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Retour au tableau de bord
        </Link>
        <h1 className="text-3xl font-black text-[#111827] dark:text-white text-center">Connexion WhatsApp (Evolution API)</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
            Gestion de session sécurisée et maintenance automatique.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1f2937] p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg w-full max-w-2xl">
        
        {/* Status Banner */}
        <div className={`mb-8 p-4 rounded-lg flex items-center justify-between ${
            status === 'connected' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
            status === 'disconnected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
        }`}>
            <div className="flex items-center gap-3">
                {status === 'connected' && <span className="material-symbols-outlined">check_circle</span>}
                {status === 'disconnected' && <span className="material-symbols-outlined">signal_disconnected</span>}
                {(status === 'connecting' || status === 'qrcode_ready') && <span className="material-symbols-outlined animate-spin">sync</span>}
                
                <div className="flex flex-col">
                    <span className="font-bold uppercase text-xs tracking-wider">État de la connexion</span>
                    <span className="font-bold text-lg">
                        {status === 'connected' ? 'Connecté & Actif' : 
                         status === 'disconnected' ? 'Déconnecté' : 
                         status === 'qrcode_ready' ? 'En attente du scan' : 'Initialisation...'}
                    </span>
                </div>
            </div>
            {status === 'connected' && (
                <button onClick={handleDisconnect} className="text-sm font-bold underline hover:no-underline text-green-900 dark:text-green-200">
                    Déconnecter
                </button>
            )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Instructions / Info */}
            <div className="flex-1 space-y-6">
                {status === 'connected' ? (
                    <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            Votre instance WhatsApp est correctement liée. L'IA écoute désormais les messages entrants.
                        </p>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">security</span>
                                Surveillance de session
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Notre système vérifie la connexion toutes les 5 minutes. Si WhatsApp Web est déconnecté, vous recevrez immédiatement un <strong>Email d'alerte</strong> avec un lien pour vous reconnecter.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-4">Nouvelle Connexion</h3>
                        <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-300 text-sm">
                            <li>Ouvrez <strong>WhatsApp</strong> sur votre téléphone.</li>
                            <li>Allez dans <strong>Réglages</strong> {'>'} <strong>Appareils connectés</strong>.</li>
                            <li>Scannez le code QR ci-contre.</li>
                        </ol>
                        <p className="mt-4 text-xs text-gray-400">
                            Propulsé par <span className="font-bold">Evolution API</span>. Connexion sécurisée de bout en bout.
                        </p>
                    </div>
                )}
            </div>

            {/* QR Code / Success Visual */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 bg-white p-4 rounded-xl shadow-inner border border-gray-200 flex items-center justify-center overflow-hidden">
                    {status === 'connected' ? (
                        <div className="flex flex-col items-center animate-fadeIn">
                             <div className="size-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <span className="material-symbols-outlined text-5xl">smartphone</span>
                             </div>
                             <p className="font-bold text-gray-800">Prêt à vendre</p>
                        </div>
                    ) : status === 'qrcode_ready' && qrCodeData ? (
                        <img 
                            src={qrCodeData} 
                            alt="Scan QR" 
                            className="w-full h-full object-contain cursor-pointer"
                            onClick={handleSimulateScan}
                            title="Cliquez pour simuler le scan (Demo)"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <span className="material-symbols-outlined animate-spin text-4xl text-gray-400">progress_activity</span>
                            <p className="text-xs text-gray-500">Génération du code...</p>
                        </div>
                    )}
                </div>
                {status === 'qrcode_ready' && (
                    <p className="mt-4 text-xs text-gray-400 text-center">
                        Actualisation automatique en cas d'expiration.
                    </p>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ConnectWhatsAppPage;