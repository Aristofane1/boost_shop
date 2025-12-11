
import React, { useState } from 'react';
import { Ticket } from '../types';

const SupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: '#T-102', subject: "L'IA a donné le mauvais prix pour le Bazin", category: 'bug_ai', status: 'closed', date: '18/07/2024', lastUpdate: 'Résolu' },
    { id: '#T-105', subject: "Problème avec le lien de paiement", category: 'billing', status: 'pending', date: '20/07/2024', lastUpdate: 'En cours' }
  ]);

  const [newTicket, setNewTicket] = useState({
      subject: '',
      description: '',
      category: 'bug_ai'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const ticket: Ticket = {
          id: `#T-${Math.floor(Math.random() * 1000)}`,
          subject: newTicket.subject,
          category: newTicket.category as any,
          status: 'open',
          date: new Date().toLocaleDateString('fr-FR'),
          lastUpdate: 'Ouvert'
      };
      setTickets([ticket, ...tickets]);
      setIsModalOpen(false);
      setNewTicket({ subject: '', description: '', category: 'bug_ai' });
      alert("Votre signalement a été envoyé à l'équipe technique.");
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'open': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
          case 'pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
          case 'closed': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
          default: return 'bg-gray-100 text-gray-700';
      }
  };

  const getCategoryLabel = (cat: string) => {
      switch(cat) {
          case 'bug_ai': return 'Erreur IA / Chat';
          case 'billing': return 'Finance / Commission';
          case 'feature': return 'Suggestion';
          default: return 'Autre';
      }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white">Aide & Support</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Un problème avec l'IA ? Une question sur vos factures ? Nous sommes là.</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => window.open('https://wa.me/22500000000', '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
            >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Contacter le support
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors"
            >
                <span className="material-symbols-outlined">add</span>
                Ouvrir un ticket
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket List */}
          <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                      <h2 className="font-bold text-lg text-[#111827] dark:text-white">Vos signalements récents</h2>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                      {tickets.map(ticket => (
                          <div key={ticket.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between">
                              <div className="flex-1 min-w-0 pr-4">
                                  <div className="flex items-center gap-2 mb-1">
                                      <span className="font-mono text-xs text-gray-500">{ticket.id}</span>
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusColor(ticket.status)}`}>
                                          {ticket.status === 'open' ? 'Ouvert' : ticket.status === 'pending' ? 'En cours' : 'Fermé'}
                                      </span>
                                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                                          {getCategoryLabel(ticket.category)}
                                      </span>
                                  </div>
                                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{ticket.subject}</h3>
                                  <p className="text-xs text-gray-500 mt-1">Dernière mise à jour : {ticket.lastUpdate}</p>
                              </div>
                              <span className="text-xs text-gray-400 whitespace-nowrap">{ticket.date}</span>
                          </div>
                      ))}
                      {tickets.length === 0 && (
                          <div className="p-8 text-center text-gray-500">Aucun ticket ouvert. Tout va bien !</div>
                      )}
                  </div>
              </div>
          </div>

          {/* FAQ & Quick Help */}
          <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                  <div className="flex gap-3">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">psychology_alt</span>
                      <div>
                          <h3 className="font-bold text-blue-900 dark:text-blue-300">Comment signaler une erreur de l'IA ?</h3>
                          <p className="text-sm text-blue-800 dark:text-blue-400 mt-2 leading-relaxed">
                              L'IA apprend en continu. Si elle se trompe, ouvrez un ticket de type <strong>"Erreur IA"</strong> et copiez le message problématique.
                              <br/><br/>
                              En cas d'urgence (client en colère), le système vous enverra automatiquement une alerte sur votre téléphone.
                          </p>
                      </div>
                  </div>
              </div>

              <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h3 className="font-bold text-[#111827] dark:text-white mb-4">Questions Fréquentes</h3>
                  <div className="space-y-3">
                      <details className="group">
                          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-gray-700 dark:text-gray-300">
                              <span>Comment changer mon IBAN ?</span>
                              <span className="transition group-open:rotate-180">
                                  <span className="material-symbols-outlined text-sm">expand_more</span>
                              </span>
                          </summary>
                          <p className="text-xs text-gray-500 mt-2 group-open:animate-fadeIn">
                              Allez dans la section Finance {'>'} Retrait {'>'} Configurer. Vous pouvez ajouter un numéro Mobile Money.
                          </p>
                      </details>
                      <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                      <details className="group">
                          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-gray-700 dark:text-gray-300">
                              <span>L'IA ne répond plus ?</span>
                              <span className="transition group-open:rotate-180">
                                  <span className="material-symbols-outlined text-sm">expand_more</span>
                              </span>
                          </summary>
                          <p className="text-xs text-gray-500 mt-2 group-open:animate-fadeIn">
                              Vérifiez que votre solde de commission est positif (Page Finance) et que votre WhatsApp est bien connecté (Page Connexion).
                          </p>
                      </details>
                  </div>
              </div>
          </div>
      </div>

      {/* New Ticket Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative w-full max-w-lg bg-white dark:bg-[#1f2937] rounded-xl shadow-2xl p-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#111827] dark:text-white">Nouveau Ticket</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined">close</span></button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catégorie</label>
                        <select 
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-10 px-3 text-gray-900 dark:text-white"
                            value={newTicket.category}
                            onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                        >
                            <option value="bug_ai">Problème avec l'IA (Réponse incorrecte)</option>
                            <option value="billing">Problème de Solde / Commission</option>
                            <option value="feature">Suggestion d'amélioration</option>
                            <option value="other">Autre</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sujet</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Ex: L'IA ne comprend pas le mot 'Bazin'"
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-10 px-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                            value={newTicket.subject}
                            onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description détaillée</label>
                        <textarea 
                            required
                            placeholder="Décrivez le problème en détail. Si c'est une erreur de l'IA, copiez le message concerné ici."
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-[120px] p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                            value={newTicket.description}
                            onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200">Annuler</button>
                        <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark">Envoyer le signalement</button>
                    </div>
                </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default SupportPage;
