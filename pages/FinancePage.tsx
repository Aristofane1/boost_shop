import React, { useEffect, useState } from 'react';

const FinancePage: React.FC = () => {
  const [balance, setBalance] = useState(15000);
  const [bonusBalance, setBonusBalance] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => {
        setSnackbar(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setSnackbar({ message, type });
  };

  const handleDeposit = () => {
    // Simuler un dépôt
    const amount = 5000;
    setBalance(prev => prev + amount);
    showSnackbar(`Votre compte a été rechargé de ${amount} XOF. Votre solde est maintenant positif.`, 'success');
  };

  const handleWithdraw = () => {
      if(balance <= 0) return;
      const amount = prompt("Combien voulez-vous retirer ?");
      if(amount && Number(amount) <= balance) {
          setBalance(prev => prev - Number(amount));
          showSnackbar("Demande de retrait effectuée.", 'success');
      } else {
          showSnackbar("Montant invalide ou solde insuffisant.", 'error');
      }
  };

  const handleApplyCoupon = () => {
      if(couponCode.trim()) {
          setBonusBalance(30000);
          setCouponCode('');
          showSnackbar('Coupon appliqué ! +30 000 XOF de bonus ajouté.', 'success');
      } else {
          showSnackbar('Veuillez entrer un code promo.', 'error');
      }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white mb-2">Solde & Commissions</h1>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
        Gérez votre solde de service. Ce solde sert uniquement à payer les commissions de la plateforme (entre 1,5% et 5% par vente).
      </p>

      {/* Balance Card */}
      <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl border mb-6 sm:mb-10 transition-colors ${balance < 0 ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-white dark:bg-[#1f2937] border-gray-200 dark:border-gray-800'}`}>
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 text-gray-500 dark:text-gray-400">Solde de frais disponible</p>
                <div className="flex items-baseline gap-2 flex-wrap">
                    <span className={`text-3xl sm:text-4xl lg:text-5xl font-black ${balance < 0 ? 'text-red-600 dark:text-red-400' : 'text-[#111827] dark:text-white'}`}>
                        {new Intl.NumberFormat('fr-FR').format(balance)}
                    </span>
                    <span className="text-lg sm:text-xl font-medium text-gray-500">XOF</span>
                </div>
                {bonusBalance > 0 && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm sm:text-base font-bold shadow-lg shadow-blue-500/30">
                        <span className="material-symbols-outlined text-lg sm:text-xl">card_giftcard</span>
                        <span>Bonus : +{new Intl.NumberFormat('fr-FR').format(bonusBalance)} XOF</span>
                    </div>
                )}
                {balance <= 0 && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg text-xs sm:text-sm font-bold">
                        <span className="material-symbols-outlined text-base sm:text-lg">error</span>
                        Attention : Votre solde est épuisé. L'IA est arrêtée.
                    </div>
                )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {balance > 0 && (
                     <button onClick={handleWithdraw} className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-bold text-sm sm:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Retirer le surplus
                    </button>
                )}
                <button onClick={handleDeposit} className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-white font-bold text-sm sm:text-base hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg sm:text-xl">add_card</span>
                    Recharger le compte
                </button>
            </div>
        </div>
        
        {/* Coupon Section */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm sm:text-base font-semibold mb-3 text-gray-700 dark:text-gray-300">Avez-vous un code promo ?</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Entrez votre code"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button 
                    onClick={handleApplyCoupon}
                    className="px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap"
                >
                    Appliquer
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-base sm:text-lg text-[#111827] dark:text-white">Historique des mouvements</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                    { label: "Commission sur vente #1024", date: "Aujourd'hui, 14:30", amount: -4100, type: "fee" },
                    { label: "Rechargement Mobile Money", date: "Hier, 09:15", amount: 20000, type: "deposit" },
                    { label: "Commission sur vente #1021", date: "18 Juil, 16:20", amount: -2500, type: "fee" },
                    { label: "Commission sur vente #1020", date: "18 Juil, 10:00", amount: -1500, type: "fee" },
                ].map((item, i) => (
                    <div key={i} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className={`size-8 sm:size-10 rounded-full flex items-center justify-center shrink-0 ${item.type === 'deposit' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                <span className="material-symbols-outlined text-lg sm:text-xl">{item.type === 'deposit' ? 'arrow_downward' : 'percent'}</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-sm sm:text-base text-[#111827] dark:text-white truncate">{item.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                            </div>
                        </div>
                        <span className={`font-bold text-sm sm:text-base whitespace-nowrap ${item.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-[#111827] dark:text-white'}`}>
                            {item.amount > 0 ? '+' : ''}{new Intl.NumberFormat('fr-FR').format(item.amount)} XOF
                        </span>
                    </div>
                ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="space-y-6">
               <div className="bg-blue-50 dark:bg-blue-900/20 p-4 sm:p-6 rounded-xl border border-blue-100 dark:border-blue-900">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 mt-1 text-lg sm:text-xl">info</span>
                        <div>
                            <h4 className="font-bold text-sm sm:text-base text-blue-800 dark:text-blue-300 mb-2">Comment ça marche ?</h4>
                            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                                BoostShop ne stocke pas l'argent de vos ventes. Vous recevez directement l'argent de vos clients (Cash ou Mobile Money).
                                <br/><br/>
                                Ce solde sert <strong>uniquement</strong> à payer notre commission (entre 1,5% et 5%). Assurez-vous qu'il reste positif pour que l'IA continue de vendre.
                            </p>
                        </div>
                    </div>
               </div>
          </div>
      </div>

      {/* Snackbar */}
      {snackbar && (
        <div className={`fixed bottom-6 right-6 z-50 animate-slideIn flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm ${
          snackbar.type === 'success' ? 'bg-green-500/95 text-white' :
          snackbar.type === 'error' ? 'bg-red-500/95 text-white' :
          'bg-blue-500/95 text-white'
        }`}>
          <span className="material-symbols-outlined">
            {snackbar.type === 'success' ? 'check_circle' : snackbar.type === 'error' ? 'error' : 'info'}
          </span>
          <span className="font-medium text-sm sm:text-base">{snackbar.message}</span>
          <button 
            onClick={() => setSnackbar(null)}
            className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FinancePage;