
import React, { useState, useRef } from 'react';

const ProfilePage: React.FC = () => {
  // État pour la configuration des paiements par défaut
  const [defaultPaymentConfig, setDefaultPaymentConfig] = useState({
    acceptCashOnDelivery: true,
    acceptFullOnlinePayment: true,
    acceptDeposit: false,
    depositAmount: 2000 // Valeur par défaut si activé
  });

  const [profileImage, setProfileImage] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuDiDXjli4rZrciYTNuMShiY3sxsdgCTE_RLFuP5w8xvW5fAr1j08XItmyuXbJ1X9jSPOGXImxenqTejRTCNxtIgaq4IgUKm1Ausjvzfbs46AfkpaTSl9SpiZE8X5fOz8dkGb-J1VOGeTEDYLsUBzvBxW8043zOYwJnuvyuYJmJvGgpnjV36oLFHDyUIIYMogLOxOtVsCBIh7jzi2Pqk33Sdhdk9mAph9RX7t4Ezce-Eh6-N6vQ_4LMLktzIUyikEbecdwCLWsutvT44");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeletePhoto = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre photo de profil ?")) {
        setProfileImage(""); // Remplace par une image vide ou un placeholder
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePaymentConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked, type, value } = e.target;
      setDefaultPaymentConfig(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : Number(value)
      }));
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111827] dark:text-white">Profil & Paramètres</h1>
        <p className="text-gray-500 dark:text-gray-400">Gérez vos informations personnelles et la configuration globale de votre boutique.</p>
      </div>

      <div className="space-y-8">
        {/* Profile Info */}
        <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-[#111827] dark:text-white">Informations du profil</h2>
            </div>

            {/* Avatar */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div 
                            className="h-20 w-20 rounded-full bg-cover bg-center bg-gray-100 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 relative overflow-hidden" 
                            style={{ backgroundImage: profileImage ? `url("${profileImage}")` : 'none' }}
                        >
                            {!profileImage && (
                                <span className="material-symbols-outlined text-4xl text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">person</span>
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-[#111827] dark:text-white">Photo de profil</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">PNG ou JPG, taille max 800px.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handlePhotoUpload} 
                            accept="image/*" 
                            className="hidden" 
                        />
                        <button 
                            onClick={handleDeletePhoto}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
                        >
                            Supprimer
                        </button>
                        <button 
                            onClick={triggerFileInput}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
                        >
                            Changer
                        </button>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prénom</label>
                        <input type="text" defaultValue="Amadou" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-3 focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom</label>
                        <input type="text" defaultValue="Diallo" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-3 focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input type="email" defaultValue="amadou.diallo@email.com" readOnly className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 h-11 px-3 cursor-not-allowed" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom de l'entreprise</label>
                        <input type="text" defaultValue="Diallo Commerce" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-3 focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rôle</label>
                        <input type="text" defaultValue="Gérant" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-3 focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                    </div>
                </div>
            </form>
        </div>

        {/* Global Payment Config */}
        <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-[#111827] dark:text-white">Configuration des Paiements par défaut</h2>
                <p className="text-sm text-gray-500 mt-1">Ces paramètres s'appliqueront à tous vos produits, sauf si vous spécifiez une configuration différente sur la page du produit.</p>
            </div>
            <div className="p-6 space-y-4">
                <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Paiement à la livraison (Cash)</p>
                            <p className="text-xs text-gray-500">Le client paie la totalité à la réception.</p>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        name="acceptCashOnDelivery"
                        checked={defaultPaymentConfig.acceptCashOnDelivery}
                        onChange={handlePaymentConfigChange}
                        className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300" 
                    />
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600">
                            <span className="material-symbols-outlined">credit_card</span>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Paiement complet en ligne</p>
                            <p className="text-xs text-gray-500">Mobile Money / Carte avant livraison.</p>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        name="acceptFullOnlinePayment"
                        checked={defaultPaymentConfig.acceptFullOnlinePayment}
                        onChange={handlePaymentConfigChange}
                        className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300" 
                    />
                </label>

                <div className={`border border-gray-200 dark:border-gray-700 rounded-lg transition-colors ${defaultPaymentConfig.acceptDeposit ? 'bg-gray-50 dark:bg-gray-800/30' : ''}`}>
                    <label className="flex items-center justify-between p-4 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600">
                                <span className="material-symbols-outlined">savings</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">Acompte + Reste à la livraison</p>
                                <p className="text-xs text-gray-500">Le client paie une partie maintenant et le reste plus tard.</p>
                            </div>
                        </div>
                        <input 
                            type="checkbox" 
                            name="acceptDeposit"
                            checked={defaultPaymentConfig.acceptDeposit}
                            onChange={handlePaymentConfigChange}
                            className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300" 
                        />
                    </label>
                    
                    {defaultPaymentConfig.acceptDeposit && (
                        <div className="px-4 pb-4 pl-16">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Montant de l'acompte par défaut (XOF)</label>
                            <input 
                                type="number" 
                                name="depositAmount"
                                value={defaultPaymentConfig.depositAmount}
                                onChange={handlePaymentConfigChange}
                                className="w-full max-w-xs rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-10 px-3 focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">Enregistrer la configuration</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
