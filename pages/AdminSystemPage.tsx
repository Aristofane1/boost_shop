
import React, { useState } from 'react';
import { GlobalSystemConfig, AIModel } from '../types';

const AdminSystemPage: React.FC = () => {
  const [config, setConfig] = useState<GlobalSystemConfig>({
      commissionPercentage: 10,
      minBalanceThreshold: 500,
      defaultAIModel: 'mistral-large',
      evolutionApiUrl: 'https://api.whatsapp-evolution.com',
      systemStatus: 'healthy',
      totalActiveInstances: 142
  });

  const handleSave = () => {
      alert("Configuration système mise à jour ! Tous les nouveaux vendeurs utiliseront ces paramètres.");
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white">Super Admin Système</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Contrôle global de la plateforme, des commissions et des instances WhatsApp.</p>
        </div>
        <div className="flex items-center gap-3">
             <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                 config.systemStatus === 'healthy' ? 'bg-green-100 text-green-700' : 
                 config.systemStatus === 'degraded' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
             }`}>
                 <span className="size-2 rounded-full bg-current animate-pulse"></span>
                 {config.systemStatus === 'healthy' ? 'Système Opérationnel' : config.systemStatus}
             </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Config Column */}
          <div className="lg:col-span-2 space-y-8">
              {/* Business Model Config */}
              <section className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h2 className="text-xl font-bold text-[#111827] dark:text-white mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">paid</span>
                      Modèle Économique Global
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Commission sur les ventes (%)</label>
                          <div className="relative">
                              <input 
                                  type="number" 
                                  value={config.commissionPercentage}
                                  onChange={(e) => setConfig({...config, commissionPercentage: Number(e.target.value)})}
                                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-12 px-4 focus:ring-2 focus:ring-primary/50 text-lg font-bold" 
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Appliqué sur chaque commande validée.</p>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Seuil de Solde Minimum (XOF)</label>
                          <input 
                              type="number" 
                              value={config.minBalanceThreshold}
                              onChange={(e) => setConfig({...config, minBalanceThreshold: Number(e.target.value)})}
                              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-12 px-4 focus:ring-2 focus:ring-primary/50 text-lg font-bold" 
                          />
                          <p className="text-xs text-gray-500 mt-2">En dessous de ce montant, l'IA du vendeur est suspendue.</p>
                      </div>
                  </div>
              </section>

              {/* Technical Config */}
              <section className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h2 className="text-xl font-bold text-[#111827] dark:text-white mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-500">memory</span>
                      Configuration Technique
                  </h2>
                  
                  <div className="space-y-6">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modèle IA par défaut</label>
                          <div className="grid grid-cols-3 gap-4">
                              {['mistral-large', 'qwen-2.5', 'gpt-4o-mini'].map(model => (
                                  <button
                                    key={model}
                                    onClick={() => setConfig({...config, defaultAIModel: model})}
                                    className={`p-3 rounded-lg border text-sm font-bold transition-all ${
                                        config.defaultAIModel === model 
                                        ? 'border-primary bg-primary/10 text-primary' 
                                        : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                                  >
                                      {model}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Evolution API (Gateway)</label>
                          <input 
                              type="text" 
                              value={config.evolutionApiUrl}
                              onChange={(e) => setConfig({...config, evolutionApiUrl: e.target.value})}
                              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-11 px-4 focus:ring-2 focus:ring-primary/50 font-mono text-sm" 
                          />
                      </div>
                  </div>
              </section>

              <div className="flex justify-end">
                  <button 
                    onClick={handleSave}
                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                  >
                      <span className="material-symbols-outlined">save</span>
                      Sauvegarder la configuration Système
                  </button>
              </div>
          </div>

          {/* Monitoring Column */}
          <div className="space-y-6">
              <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined">dns</span>
                      Monitoring Serveur
                  </h3>
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Instances Actives</span>
                              <span className="font-bold">{config.totalActiveInstances}</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 w-3/4"></div>
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Charge CPU</span>
                              <span className="font-bold">45%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-[45%]"></div>
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Mémoire Redis</span>
                              <span className="font-bold">1.2GB / 4GB</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 w-[30%]"></div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h3 className="font-bold text-lg text-[#111827] dark:text-white mb-4">Actions de Maintenance</h3>
                  <div className="space-y-3">
                      <button className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-sm flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-lg">sync</span>
                          Redémarrer Evolution API
                      </button>
                      <button className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-sm flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-lg">cleaning_services</span>
                          Vider le cache Redis
                      </button>
                      <button className="w-full py-2 px-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 text-sm flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-lg">block</span>
                          Mode Maintenance (Arrêt Ventes)
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminSystemPage;
