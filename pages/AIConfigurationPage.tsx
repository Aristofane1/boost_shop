import React, { useState } from 'react';
import { AIConfig, AIModel } from '../types';

const AIConfigurationPage: React.FC = () => {
  const [config, setConfig] = useState<AIConfig>({
      model: 'mistral-large',
      contextWindowSize: 20,
      adminAlertPhone: '',
      personality: '',
      instructions: ''
  });

  const handleSave = () => {
      alert('Configuration IA sauvegardée avec succès ! Le backend utilisera ces paramètres pour les prochaines conversations.');
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-[#111827] dark:text-white">Cerveau de l'IA</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Configurez le modèle de langage et les règles de gestion des conversations.</p>
        </div>
        <button onClick={handleSave} className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold shadow-sm hover:bg-primary-dark transition-colors">
            Appliquer les changements
        </button>
      </header>

      <div className="space-y-8">
        
        {/* Model Selection */}
        <section className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold text-[#111827] dark:text-white mb-4">Moteur d'Intelligence Artificielle</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { id: 'mistral-large', name: 'Mistral Large', desc: 'Excellent en Français. Équilibré.', tag: 'Recommandé' },
                    { id: 'qwen-2.5', name: 'Qwen 2.5 (72B)', desc: 'Logique supérieure. Idéal pour négocier.', tag: 'Populaire' },
                    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'Très rapide et économique.', tag: 'Éco' }
                ].map((model) => (
                    <div 
                        key={model.id}
                        onClick={() => setConfig({...config, model: model.id as AIModel})}
                        className={`cursor-pointer border rounded-xl p-4 transition-all relative ${config.model === model.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                    >
                        {model.tag && (
                            <span className="absolute -top-2.5 right-4 bg-gray-900 dark:bg-white text-white dark:text-black text-[10px] px-2 py-0.5 rounded-full font-bold">
                                {model.tag}
                            </span>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                             <div className={`size-4 rounded-full border-4 ${config.model === model.id ? 'border-primary' : 'border-gray-300'}`}></div>
                             <span className="font-bold text-gray-900 dark:text-white">{model.name}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 ml-6">{model.desc}</p>
                    </div>
                ))}
            </div>
            
            <div className="mt-6">
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Profondeur de Mémoire (Contexte)</label>
                    <span className="text-sm font-bold text-primary">{config.contextWindowSize} messages</span>
                </div>
                <input 
                    type="range" 
                    min="5" 
                    max="50" 
                    step="5"
                    value={config.contextWindowSize} 
                    onChange={(e) => setConfig({...config, contextWindowSize: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                />
                <p className="text-xs text-gray-500 mt-2">
                    L'IA récupérera les <strong>{config.contextWindowSize} derniers messages</strong> via Evolution API avant de répondre. Plus ce nombre est élevé, plus la réponse est précise, mais plus c'est lent.
                </p>
            </div>
        </section>

        {/* Audio Handling */}
        <section className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm border-l-4 border-l-blue-500">
             <div className="flex items-start gap-4">
                 <div className="size-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                    <span className="material-symbols-outlined">mic</span>
                 </div>
                 <div className="flex-1">
                     <h2 className="text-lg font-bold text-[#111827] dark:text-white">Gestion des Vocaux (Audio)</h2>
                     <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-4">
                         Pour réduire les coûts et éviter les erreurs, l'IA ne transcrit pas les audios. Elle vous envoie une alerte pour que vous preniez le relais.
                     </p>
                     
                     <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Numéro Admin pour les alertes</label>
                     <div className="flex gap-2">
                         <input 
                            type="tel" 
                            placeholder="+225 07..." 
                            value={config.adminAlertPhone}
                            onChange={(e) => setConfig({...config, adminAlertPhone: e.target.value})}
                            className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 bg-transparent dark:text-white h-11 px-3 focus:ring-2 focus:ring-primary/50" 
                        />
                     </div>
                     <p className="text-xs text-gray-500 mt-2">
                         Quand un client envoie un vocal, vous recevrez un message WhatsApp sur ce numéro : <br/>
                         <em>"🎤 Nouveau vocal de [Client]. Cliquez ici pour répondre : wa.me/[Client]"</em>
                     </p>
                 </div>
             </div>
        </section>

        {/* Personality Section */}
        <section className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-[#111827] dark:text-white">Personna</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Comment l'IA doit-elle se comporter ?</p>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Rôle & Ton</label>
                    <textarea 
                        value={config.personality}
                        onChange={(e) => setConfig({...config, personality: e.target.value})}
                        placeholder="Ex: Tu es un vendeur expert, poli mais persuasif. Tu utilises des émojis. Tu tutoyes le client..." 
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-transparent dark:text-white min-h-[100px] p-3 focus:ring-2 focus:ring-primary/50"
                    ></textarea>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Règles métier strictes</label>
                    <textarea 
                        value={config.instructions}
                        onChange={(e) => setConfig({...config, instructions: e.target.value})}
                        placeholder="Ex: Ne jamais donner le prix sans avoir présenté le produit. Ne jamais accepter de paiement par chèque..." 
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-transparent dark:text-white min-h-[120px] p-3 focus:ring-2 focus:ring-primary/50"
                    ></textarea>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default AIConfigurationPage;