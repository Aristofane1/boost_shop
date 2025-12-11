import React, { useState } from 'react';
import { Campaign } from '../types';

const MarketingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'tools'>('campaigns');

  // Campaign State
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Promo Tabaski', status: 'Sent', audience: 'All', sentCount: 1240, openRate: 68, date: '12 Juin 2024', message: 'Salam {name}, profitez de -20% pour la Tabaski !' },
    { id: '2', name: 'Relance Paniers', status: 'Scheduled', audience: 'VIP', sentCount: 0, openRate: 0, date: 'Demain, 10:00', message: 'Bonjour {name}, nous avons du nouveau stock pour vous.' },
  ]);

  const [newCampaign, setNewCampaign] = useState({
      name: '',
      audience: 'All',
      message: 'Bonjour {name}, ',
      image: null as string | null
  });

  // Link Builder State
  const [linkBuilder, setLinkBuilder] = useState({
      phone: '22507070701',
      text: 'Bonjour, je suis intéressé par...'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewCampaign(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const generatedLink = `https://wa.me/${linkBuilder.phone}?text=${encodeURIComponent(linkBuilder.text)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedLink)}`;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white">Marketing & Relance</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Fidélisez vos clients avec des campagnes ciblées et des outils de conversion.</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('campaigns')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'campaigns' ? 'bg-white dark:bg-[#1f2937] shadow-sm text-primary' : 'text-gray-500'}`}
            >
                Campagnes WhatsApp
            </button>
            <button 
                onClick={() => setActiveTab('tools')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'tools' ? 'bg-white dark:bg-[#1f2937] shadow-sm text-primary' : 'text-gray-500'}`}
            >
                Générateur de Liens & QR
            </button>
        </div>
      </div>

      {activeTab === 'campaigns' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Campaign List */}
              <div className="lg:col-span-2 space-y-6">
                  {/* Create New */}
                  <div className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
                      <h3 className="font-bold text-lg text-[#111827] dark:text-white mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">add_circle</span>
                          Nouvelle Campagne
                      </h3>
                      <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom de la campagne</label>
                                    <input 
                                        type="text" 
                                        value={newCampaign.name}
                                        onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                                        placeholder="Ex: Promo Fin de Mois" 
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-10 px-3 focus:ring-2 focus:ring-primary/50" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Audience Cible</label>
                                    <select 
                                        value={newCampaign.audience}
                                        onChange={(e) => setNewCampaign({...newCampaign, audience: e.target.value})}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-10 px-3 focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option value="All">Tous les clients (143)</option>
                                        <option value="VIP">Clients VIP (24)</option>
                                        <option value="New">Nouveaux Clients (12)</option>
                                        <option value="Inactive">Inactifs (+30 jours)</option>
                                    </select>
                                </div>
                          </div>
                          <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea 
                                    value={newCampaign.message}
                                    onChange={(e) => setNewCampaign({...newCampaign, message: e.target.value})}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-[100px] p-3 focus:ring-2 focus:ring-primary/50"
                                    placeholder="Bonjour {name}, ..."
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-1">Utilisez <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{`{name}`}</code> pour personnaliser avec le nom du client.</p>
                          </div>
                          
                          {/* Image Upload */}
                          <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image (Optionnel)</label>
                                <div className="flex items-center gap-4">
                                    <label className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <span className="material-symbols-outlined text-gray-500">image</span>
                                        <span className="text-sm font-medium">Ajouter une image</span>
                                        <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                                    </label>
                                    {newCampaign.image && (
                                        <div className="h-10 w-10 rounded overflow-hidden border border-gray-200">
                                            <img src={newCampaign.image} alt="Preview" className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                </div>
                          </div>

                          <div className="flex justify-end pt-2">
                              <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                                  <span className="material-symbols-outlined">send</span>
                                  Envoyer la campagne
                              </button>
                          </div>
                      </div>
                  </div>

                  {/* History */}
                  <div>
                      <h3 className="font-bold text-lg text-[#111827] dark:text-white mb-4">Historique</h3>
                      <div className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
                          <table className="w-full text-sm text-left">
                              <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-medium">
                                  <tr>
                                      <th className="px-6 py-4">Campagne</th>
                                      <th className="px-6 py-4">Statut</th>
                                      <th className="px-6 py-4">Envoyés</th>
                                      <th className="px-6 py-4">Ouverture</th>
                                      <th className="px-6 py-4 text-right">Date</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                  {campaigns.map(camp => (
                                      <tr key={camp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{camp.name}</td>
                                          <td className="px-6 py-4">
                                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                                  camp.status === 'Sent' ? 'bg-green-100 text-green-700' :
                                                  camp.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                                  'bg-gray-100 text-gray-600'
                                              }`}>
                                                  {camp.status === 'Sent' ? 'Envoyé' : camp.status === 'Scheduled' ? 'Planifié' : 'Brouillon'}
                                              </span>
                                          </td>
                                          <td className="px-6 py-4 text-gray-500">{camp.sentCount}</td>
                                          <td className="px-6 py-4">
                                              {camp.status === 'Sent' ? (
                                                  <div className="flex items-center gap-2">
                                                      <span className="text-gray-900 dark:text-white font-bold">{camp.openRate}%</span>
                                                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                          <div className="h-full bg-green-500" style={{ width: `${camp.openRate}%` }}></div>
                                                      </div>
                                                  </div>
                                              ) : '-'}
                                          </td>
                                          <td className="px-6 py-4 text-right text-gray-500">{camp.date}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>

              {/* Live Preview Sidebar */}
              <div className="lg:col-span-1">
                  <div className="sticky top-8">
                      <h3 className="font-bold text-lg text-[#111827] dark:text-white mb-4">Aperçu WhatsApp</h3>
                      <div className="bg-[#e5ddd5] dark:bg-[#0b141a] rounded-xl p-4 shadow-md min-h-[400px] relative border border-gray-300 dark:border-gray-700 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">
                            <div className="bg-white dark:bg-[#202c33] p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%] relative mb-2">
                                {newCampaign.image && (
                                    <div className="mb-2 rounded-lg overflow-hidden">
                                        <img src={newCampaign.image} alt="Campaign Content" className="w-full h-auto" />
                                    </div>
                                )}
                                <p className="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
                                    {newCampaign.message.replace('{name}', 'Moussa')}
                                </p>
                                <span className="text-[10px] text-gray-400 block text-right mt-1">10:42</span>
                            </div>
                      </div>
                      <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                          <div className="flex gap-2">
                              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">tips_and_updates</span>
                              <div>
                                  <p className="text-sm font-bold text-blue-800 dark:text-blue-300">Conseil Pro</p>
                                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Ajoutez une image attractive pour augmenter le taux d'ouverture de 35%.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tool Config */}
              <div className="bg-white dark:bg-[#1f2937] p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
                  <div>
                      <h3 className="font-bold text-xl text-[#111827] dark:text-white mb-2">Générateur de Lien WhatsApp</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Créez des liens pré-remplis pour faciliter le premier contact.</p>
                  </div>
                  
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Votre Numéro WhatsApp</label>
                      <input 
                          type="text" 
                          value={linkBuilder.phone}
                          onChange={(e) => setLinkBuilder({...linkBuilder, phone: e.target.value})}
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-10 px-3 focus:ring-2 focus:ring-primary/50" 
                      />
                  </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message pré-rempli pour le client</label>
                      <textarea 
                          value={linkBuilder.text}
                          onChange={(e) => setLinkBuilder({...linkBuilder, text: e.target.value})}
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-[100px] p-3 focus:ring-2 focus:ring-primary/50"
                      ></textarea>
                  </div>
              </div>

              {/* Preview & Download */}
              <div className="bg-white dark:bg-[#1f2937] p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                  <h3 className="font-bold text-lg text-[#111827] dark:text-white mb-6">Votre QR Code Marketing</h3>
                  
                  <div className="bg-white p-4 rounded-xl border-2 border-gray-100 shadow-inner mb-6">
                      <img src={qrCodeUrl} alt="Generated QR Code" className="w-48 h-48" />
                  </div>

                  <div className="w-full space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg flex items-center justify-between border border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 truncate max-w-[200px]">{generatedLink}</p>
                          <button 
                            onClick={() => {navigator.clipboard.writeText(generatedLink); alert('Lien copié !')}}
                            className="text-primary font-bold text-xs hover:underline"
                          >
                              Copier
                          </button>
                      </div>
                      <button className="w-full py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined">download</span>
                          Télécharger le QR Code
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                          Idéal pour : Flyers, Emballages, Cartes de visite.
                      </p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default MarketingPage;