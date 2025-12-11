
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import DashboardOverview from './pages/DashboardOverview';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import DeliveriesPage from './pages/DeliveriesPage';
import DriversPage from './pages/DriversPage';
import AIConfigurationPage from './pages/AIConfigurationPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import ConnectWhatsAppPage from './pages/ConnectWhatsAppPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import FinancePage from './pages/FinancePage';
import CustomersPage from './pages/CustomersPage';
import MarketingPage from './pages/MarketingPage';
import SupportPage from './pages/SupportPage';
import AdminSystemPage from './pages/AdminSystemPage';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white relative">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-[#111621] border-b border-gray-200 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="size-8">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <rect width="40" height="40" rx="12" fill="#16a34a" />
                            <path d="M20 8C22.2091 8 24 9.79086 24 12V14H16V12C16 9.79086 17.7909 8 20 8Z" stroke="white" strokeWidth="2.5"/>
                            <path d="M10 15C10 13.8954 10.8954 13 12 13H28C29.1046 13 30 13.8954 30 15V30C30 31.1046 29.1046 32 28 32H12C10.8954 32 10 31.1046 10 30V15Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                            <path d="M21 18L17 24H22L19 30L24 23H18L21 18Z" fill="white"/>
                        </svg>
                    </div>
                    <span className="font-bold text-lg">BoostShop</span>
                </Link>
            </div>
            <div className="size-8 bg-center bg-no-repeat bg-cover rounded-full" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMN1DRw4KLSu3wy2Xeg-0tHuOO8XUSeelJv1yqujp4J3Pr0w9Dom7j2SJzznDwq3UZXe90u2yqtyZjDPLEbgRiq1WDrrPTtBFNu8wEGO7gKPEXFkH-sBEW-jthiSG7KrRaIslhq3LFL-5Shy0AQiJUfJzz4jmGbcrf5crR8Cfnr4HjxTRiZUxrMp9Cd-hiDTDg8Ah8SJ5jSreIZ4M5j-7dvXdxRWpWQlkE1guAJzYA4shOb7sWNGXCpjUHPYPdFZq5jNFcKc129cQZ")' }}></div>
        </header>

        <main className="flex-1 overflow-y-auto">
            {children}
        </main>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isPublic = location.pathname === '/' || location.pathname.startsWith('/auth') || location.pathname === '/privacy-policy' || location.pathname === '/terms-of-service';

  if (isPublic) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />
      </Routes>
    );
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/products/edit/:id" element={<AddProductPage />} />
        <Route path="/deliveries" element={<DeliveriesPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/ai-config" element={<AIConfigurationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/connect-whatsapp" element={<ConnectWhatsAppPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/admin-system" element={<AdminSystemPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
