import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionPage: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black text-[#111827] dark:text-white mb-8">Gestion de l'abonnement</h1>
      
      <h2 className="text-xl font-bold text-[#111827] dark:text-white mb-4">Votre Plan Actuel</h2>
      
      {/* Current Plan Card */}
      <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-bold text-[#111827] dark:text-white">Plan Mensuel</span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">Actif</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Votre abonnement se renouvelle le 15 du mois prochain.</p>
            </div>
             <div className="flex items-center gap-4">
                 <span className="text-gray-600 dark:text-gray-400 font-medium">7 000 FCFA / mois</span>
                 <Link to="/payment" className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                    Renouveler
                 </Link>
             </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-[#111827] dark:text-white mb-4">Nos offres d'abonnement</h2>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         {/* Monthly Plan */}
        <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <h3 className="text-lg font-bold text-[#111827] dark:text-white">Mensuel</h3>
            <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-[#111827] dark:text-white">7 000</span>
                <span className="text-sm text-gray-500">FCFA</span>
            </div>
            
            <ul className="mt-6 space-y-3 flex-1 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Discussions & Closing</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Gestion Produits</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Enregistrement Livreur</li>
            </ul>
            
            <button disabled className="mt-6 w-full py-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-500 font-medium text-sm cursor-not-allowed">
                Plan Actuel
            </button>
        </div>

        {/* 6 Months Plan */}
        <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border-2 border-primary flex flex-col relative shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">Le plus populaire</div>
            <h3 className="text-lg font-bold text-[#111827] dark:text-white">Semestriel (6 mois)</h3>
             <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-[#111827] dark:text-white">30 000</span>
                <span className="text-sm text-gray-500">FCFA</span>
            </div>
            <p className="text-xs text-primary font-medium mt-1">Économisez 12 000 FCFA</p>

             <ul className="mt-6 space-y-3 flex-1 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> <strong>Toutes options incluses</strong></li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Support prioritaire</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Premier message livreur auto</li>
            </ul>

            <Link to="/payment" className="mt-6 w-full py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-medium text-sm text-center">
                Choisir ce plan
            </Link>
        </div>

        {/* Yearly Plan */}
        <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <h3 className="text-lg font-bold text-[#111827] dark:text-white">Annuel (1 an)</h3>
            <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-[#111827] dark:text-white">50 000</span>
                <span className="text-sm text-gray-500">FCFA</span>
            </div>
            <p className="text-xs text-primary font-medium mt-1">Économisez 34 000 FCFA</p>
            
            <ul className="mt-6 space-y-3 flex-1 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> <strong>Toutes options incluses</strong></li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Audit business offert</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Configuration assistée</li>
            </ul>
            
            <Link to="/payment" className="mt-6 w-full py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm text-center">
                Choisir ce plan
            </Link>
        </div>
      </div>

      <h2 className="text-xl font-bold text-[#111827] dark:text-white mb-4">Historique de facturation</h2>
      <div className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Montant</th>
                    <th className="px-6 py-3">Statut</th>
                    <th className="px-6 py-3">Facture</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                    { date: '15 juil. 2024', desc: 'Renouvellement Mensuel', amount: '7 000 FCFA' },
                    { date: '15 juin 2024', desc: 'Renouvellement Mensuel', amount: '7 000 FCFA' },
                ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4">{row.date}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.desc}</td>
                        <td className="px-6 py-4">{row.amount}</td>
                        <td className="px-6 py-4"><span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2.5 py-0.5 rounded-full font-medium">Payé</span></td>
                        <td className="px-6 py-4"><a href="#" className="text-primary hover:underline"><span className="material-symbols-outlined text-base">download</span></a></td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionPage;