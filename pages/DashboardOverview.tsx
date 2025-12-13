import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Lun', value: 12 },
  { name: 'Mar', value: 19 },
  { name: 'Mer', value: 3 },
  { name: 'Jeu', value: 5 },
  { name: 'Ven', value: 2 },
  { name: 'Sam', value: 3 },
  { name: 'Dim', value: 9 },
];

const DashboardOverview: React.FC = () => {
  const [balance, setBalance] = useState(15000);
  const [bonusBalance, setBonusBalance] = useState(0); 

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-[#111827] dark:text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">Dashboard Overview</h2>
        <div className="hidden sm:flex items-center gap-4">
            <button className="flex items-center justify-center rounded-full w-10 h-10 lg:w-11 lg:h-11 hover:bg-gray-100 dark:hover:bg-white/10">
                <span className="material-symbols-outlined text-xl lg:text-2xl">notifications</span>
            </button>
            <Link to="/profile">
                <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 lg:h-11 lg:w-11" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWIkTo4dowN2xnfimwoWwE_SwjmLgN8A_p5NcZsdEnajAL8AOJDcFhugAjfqsOjWkf00EF1WeFNgxHgIUe1dkCMOUoaUvWXLndAxMm0v2J2GnTcD750UjupCF9CvJz2LYLtYPSC3TDa71xVHRPtfldYGDTaMTM8-JXovB3vJKjcyNnIzZpZiI7C5pTVm5w806wbCPWRr7nWDWzCAO6B7RJp04LdWAuG2yVtWCZfAHyKSMi-NvfDv6zEPPHKr7RQkPrUms94KbYsp45")' }}></div>
            </Link>
        </div>
      </header>

      {/* Critical Alerts - seulement si solde <= 0 */}
      {balance <= 0 && (
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                  <div className="size-8 sm:size-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                      <span className="material-symbols-outlined text-lg sm:text-xl">warning</span>
                  </div>
                  <div>
                      <h3 className="font-bold text-sm sm:text-base text-red-800 dark:text-red-300">Solde de frais critique</h3>
                      <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                          Votre solde est épuisé. L'IA a été stoppée. Veuillez recharger pour reprendre les ventes.
                      </p>
                  </div>
              </div>
              <Link to="/finance" className="whitespace-nowrap px-3 sm:px-4 py-2 bg-red-600 text-white font-bold rounded-lg text-xs sm:text-sm hover:bg-red-700 transition-colors">
                  Recharger
              </Link>
          </div>
      )}

      {/* Status Cards */}
      <div className="grid grid-cols-1 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-[#181e29] p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-white/10 flex justify-between items-center">
            <div>
                <p className="text-[#111827] dark:text-white font-bold mb-2 text-sm sm:text-base">Statut WhatsApp & IA</p>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${balance > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                        {balance > 0 ? 'Connecté & Actif' : 'Stoppé (Solde insuffisant)'}
                    </span>
                </div>
            </div>
            <Link to="/connect-whatsapp" className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                <span className="material-symbols-outlined text-base sm:text-lg">qr_code_scanner</span>
                <span className="hidden sm:inline">Réglages</span>
            </Link>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#111827] dark:text-white">Statistiques</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[
            { label: 'Commandes traitées', value: '1,204', icon: 'shopping_cart' },
            { label: 'Solde de frais', value: `${new Intl.NumberFormat('fr-FR').format(balance)} XOF`, icon: 'account_balance_wallet', bonus: bonusBalance },
            { label: 'Produits actifs', value: '57', icon: 'label' }
        ].map((stat, idx) => (
             <div key={idx} className="bg-white dark:bg-[#181e29] p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-3 sm:gap-4">
                <div className="size-10 sm:size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">{stat.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">{stat.label}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">{stat.value}</p>
                        {stat.bonus !== undefined && stat.bonus > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                                <span className="material-symbols-outlined text-sm">card_giftcard</span>
                                +{new Intl.NumberFormat('fr-FR').format(stat.bonus)}
                            </span>
                        )}
                    </div>
                </div>
             </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-[#181e29] p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h4 className="font-bold text-sm sm:text-base text-[#111827] dark:text-white">Évolution des Ventes (Directes)</h4>
            <div className="flex bg-gray-100 dark:bg-white/10 rounded-lg p-1">
                {['Jour', 'Mois', 'Année'].map((filter, i) => (
                    <button key={filter} className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors ${i === 0 ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                        {filter}
                    </button>
                ))}
            </div>
        </div>
        <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.3} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
       <div className="mt-6 sm:mt-8">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#111827] dark:text-white">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
                { label: 'Ajouter un produit', icon: 'add_circle', path: '/products/add' },
                { label: 'Recharger solde', icon: 'payments', path: '/finance' },
                { label: 'Connecter WhatsApp', icon: 'smartphone', path: '/connect-whatsapp' },
            ].map((action, idx) => (
                <Link key={idx} to={action.path} className="bg-white dark:bg-[#181e29] p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-3 sm:gap-4 hover:border-primary/50 transition-colors group">
                    <div className="size-8 sm:size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                        <span className="material-symbols-outlined text-xl sm:text-2xl">{action.icon}</span>
                    </div>
                    <p className="font-semibold text-sm sm:text-base text-[#111827] dark:text-white">{action.label}</p>
                </Link>
            ))}
        </div>
       </div>
    </div>
  );
};

export default DashboardOverview;