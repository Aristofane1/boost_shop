import React, { useState } from 'react';

const FinancePage: React.FC = () => {
  // Simuler un solde positif
  const [balance, setBalance] = useState(15000); 

  const handleDeposit = () => {
    // Simuler un dépôt
    const amount = 5000;
    setBalance(prev => prev + amount);
    alert(`Votre compte a été rechargé de ${amount} XOF. Votre solde est maintenant positif.`);
  };

  const handleWithdraw = () => {
      if(balance <= 0) return;
      const amount = prompt("Combien voulez-vous retirer ?");
      if(amount && Number(amount) <= balance) {
          setBalance(prev => prev - Number(amount));
          alert("Demande de retrait effectuée.");
      } else {
          alert("Montant invalide ou solde insuffisant.");
      }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-black text-[#111827] dark:text-white mb-2">Solde & Commissions</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Gérez votre solde de service. Ce solde sert uniquement à payer les commissions de la plateforme (10% par vente).
      </p>

      {/* Balance Card */}
      <div className={`p-8 rounded-2xl border mb-10 transition-colors ${balance < 0 ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-white dark:bg-[#1f2937] border-gray-200 dark:border-gray-800'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-gray-500 dark:text-gray-400">Solde de frais disponible</p>
                <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-black ${balance < 0 ? 'text-red-600 dark:text-red-400' : 'text-[#111827] dark:text-white'}`}>
                        {new Intl.NumberFormat('fr-FR').format(balance)}
                    </span>
                    <span className="text-xl font-medium text-gray-500">XOF</span>
                </div>
                {balance <= 0 && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg text-sm font-bold">
                        <span className="material-symbols-outlined text-lg">error</span>
                        Attention : Votre solde est épuisé. L'IA est arrêtée.
                    </div>
                )}
                 {balance > 0 && balance < 5000 && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-200 rounded-lg text-sm font-bold">
                        <span className="material-symbols-outlined text-lg">warning</span>
                        Solde bas. Rechargez bientôt.
                    </div>
                )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {balance > 0 && (
                     <button onClick={handleWithdraw} className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Retirer le surplus
                    </button>
                )}
                <button onClick={handleDeposit} className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">add_card</span>
                    Recharger le compte
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-lg text-[#111827] dark:text-white">Historique des mouvements</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                    { label: "Commission sur vente #1024", date: "Aujourd'hui, 14:30", amount: -4100, type: "fee" },
                    { label: "Rechargement Mobile Money", date: "Hier, 09:15", amount: 20000, type: "deposit" },
                    { label: "Commission sur vente #1021", date: "18 Juil, 16:20", amount: -2500, type: "fee" },
                    { label: "Commission sur vente #1020", date: "18 Juil, 10:00", amount: -1500, type: "fee" },
                ].map((item, i) => (
                    <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`size-10 rounded-full flex items-center justify-center ${item.type === 'deposit' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                <span className="material-symbols-outlined">{item.type === 'deposit' ? 'arrow_downward' : 'percent'}</span>
                            </div>
                            <div>
                                <p className="font-medium text-[#111827] dark:text-white">{item.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                            </div>
                        </div>
                        <span className={`font-bold ${item.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-[#111827] dark:text-white'}`}>
                            {item.amount > 0 ? '+' : ''}{new Intl.NumberFormat('fr-FR').format(item.amount)} XOF
                        </span>
                    </div>
                ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="space-y-6">
               <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 mt-1">info</span>
                        <div>
                            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Comment ça marche ?</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                                BoostShop ne stocke pas l'argent de vos ventes. Vous recevez directement l'argent de vos clients (Cash ou Mobile Money).
                                <br/><br/>
                                Ce solde sert <strong>uniquement</strong> à payer notre commission de 10%. Assurez-vous qu'il reste positif pour que l'IA continue de vendre.
                            </p>
                        </div>
                    </div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default FinancePage;