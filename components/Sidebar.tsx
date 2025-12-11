
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const navItems: NavItem[] = [
    { label: 'Tableau de bord', icon: 'dashboard', path: '/dashboard' },
    { label: 'Clients (CRM)', icon: 'groups', path: '/customers' },
    { label: 'Produits', icon: 'inventory_2', path: '/products' },
    { label: 'Livraisons', icon: 'local_shipping', path: '/deliveries' },
    { label: 'Livreurs', icon: 'sports_motorsports', path: '/drivers' },
    { label: 'Finance', icon: 'account_balance_wallet', path: '/finance' },
    { label: 'Marketing', icon: 'campaign', path: '/marketing' },
    { label: 'Cerveau IA', icon: 'psychology', path: '/ai-config', activeIconStyle: true },
    { label: 'Aide & Support', icon: 'help', path: '/support' },
  ];

  return (
    <>
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-white dark:bg-[#111621] border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="size-10">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect width="40" height="40" rx="12" fill="#16a34a" />
                    <path d="M20 8C22.2091 8 24 9.79086 24 12V14H16V12C16 9.79086 17.7909 8 20 8Z" stroke="white" strokeWidth="2.5"/>
                    <path d="M10 15C10 13.8954 10.8954 13 12 13H28C29.1046 13 30 13.8954 30 15V30C30 31.1046 29.1046 32 28 32H12C10.8954 32 10 31.1046 10 30V15Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                    <path d="M21 18L17 24H22L19 30L24 23H18L21 18Z" fill="white"/>
                </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#111827] dark:text-white">BoostShop</span>
          </Link>
          <button 
            onClick={onClose} 
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => onClose()} // Close sidebar on mobile when clicking a link
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${isActive(item.path) 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              <span className={`material-symbols-outlined ${item.activeIconStyle && isActive(item.path) ? 'fill' : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d111a]/50">
             {/* Admin Link (Demo) */}
             <Link 
                to="/admin-system"
                onClick={() => onClose()}
                className="flex items-center gap-3 px-4 py-2 mb-2 rounded-lg text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors uppercase tracking-wider"
             >
                 <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                 Super Admin
             </Link>

             <Link 
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-[#1f2937] transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
             >
                <div 
                    className="size-10 rounded-full bg-cover bg-center bg-gray-200"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiDXjli4rZrciYTNuMShiY3sxsdgCTE_RLFuP5w8xvW5fAr1j08XItmyuXbJ1X9jSPOGXImxenqTejRTCNxtIgaq4IgUKm1Ausjvzfbs46AfkpaTSl9SpiZE8X5fOz8dkGb-J1VOGeTEDYLsUBzvBxW8043zOYwJnuvyuYJmJvGgpnjV36oLFHDyUIIYMogLOxOtVsCBIh7jzi2Pqk33Sdhdk9mAph9RX7t4Ezce-Eh6-N6vQ_4LMLktzIUyikEbecdwCLWsutvT44")' }}
                ></div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827] dark:text-white truncate">Amadou Diallo</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Gérant</p>
                </div>
                <span className="material-symbols-outlined text-gray-400">logout</span>
             </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
