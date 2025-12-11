
import React, { useState, useRef } from 'react';

interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  zone: string;
  status: 'Disponible' | 'En livraison' | 'Indisponible';
  cashOnHand: number; // Argent liquide que le livreur détient
  deliveriesCount: number;
  image?: string;
  idCardImage?: string;
}

const DriversPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: '1', name: 'Moussa Koné', phone: '+225 07 07 07 01', vehicle: 'Moto', zone: 'Cocody / Riviera', status: 'Disponible', cashOnHand: 45000, deliveriesCount: 124, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '2', name: 'Jean Kouassi', phone: '+225 05 05 05 02', vehicle: 'Scooter', zone: 'Yopougon', status: 'En livraison', cashOnHand: 15000, deliveriesCount: 89, image: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: '3', name: 'Awa Diop', phone: '+225 01 01 01 03', vehicle: 'Vélo', zone: 'Marcory / Zone 4', status: 'Indisponible', cashOnHand: 0, deliveriesCount: 45, image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [currentDriver, setCurrentDriver] = useState<Partial<Driver>>({});
  const [selectedDriverForSettlement, setSelectedDriverForSettlement] = useState<Driver | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idCardInputRef = useRef<HTMLInputElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'En livraison': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'Indisponible': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  // CRUD Handlers
  const handleOpenModal = (driver?: Driver) => {
    if (driver) {
      setCurrentDriver(driver);
    } else {
      setCurrentDriver({ status: 'Disponible', vehicle: 'Moto', cashOnHand: 0, deliveriesCount: 0, zone: 'Abidjan Nord' });
    }
    setIsModalOpen(true);
  };

  const handleSaveDriver = () => {
    if (currentDriver.id) {
      setDrivers(drivers.map(d => d.id === currentDriver.id ? { ...d, ...currentDriver } as Driver : d));
    } else {
      const newDriver = { ...currentDriver, id: Date.now().toString(), cashOnHand: 0, deliveriesCount: 0 } as Driver;
      setDrivers([...drivers, newDriver]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteDriver = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livreur ? Cette action est irréversible.')) {
      setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentDriver(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentDriver(prev => ({ ...prev, idCardImage: imageUrl }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerIdCardInput = () => {
    idCardInputRef.current?.click();
  };

  // Settlement Handlers (Encaissement)
  const handleOpenSettlement = (driver: Driver) => {
    setSelectedDriverForSettlement(driver);
    setIsSettleModalOpen(true);
  };

  const confirmSettlement = () => {
    if (selectedDriverForSettlement) {
        setDrivers(drivers.map(d => d.id === selectedDriverForSettlement.id ? { ...d, cashOnHand: 0 } : d));
        setIsSettleModalOpen(false);
        setSelectedDriverForSettlement(null);
        alert("Encaissement validé avec succès. Le solde du livreur est remis à zéro.");
    }
  };

  const handleWhatsAppContact = (phone: string) => {
      // Nettoyage du numéro et ouverture WhatsApp
      const cleanPhone = phone.replace(/\s+/g, '').replace('+', '');
      window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white">Gestion des Livreurs</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Gérez votre flotte, suivez les encaissements et les zones.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">person_add</span>
          Ajouter un livreur
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Espèces en main (Flotte)</p>
            <p className="text-3xl font-black text-[#111827] dark:text-white mt-2">
                {formatPrice(drivers.reduce((acc, d) => acc + d.cashOnHand, 0))} XOF
            </p>
            <p className="text-xs text-orange-500 mt-1 font-medium">Argent à récupérer auprès des livreurs</p>
        </div>
        <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Livreurs Actifs</p>
            <p className="text-3xl font-black text-[#111827] dark:text-white mt-2">
                {drivers.filter(d => d.status === 'Disponible' || d.status === 'En livraison').length} / {drivers.length}
            </p>
        </div>
        <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Courses ce mois</p>
            <p className="text-3xl font-black text-[#111827] dark:text-white mt-2">
                {drivers.reduce((acc, d) => acc + d.deliveriesCount, 0)}
            </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111621] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-medium">
                    <tr>
                        <th className="px-6 py-4">Livreur</th>
                        <th className="px-6 py-4">Zone & Véhicule</th>
                        <th className="px-6 py-4">Statut</th>
                        <th className="px-6 py-4">
                            <div className="flex items-center gap-1">
                                Espèces à reverser
                                <span className="material-symbols-outlined text-gray-400 text-sm" title="Argent liquide encaissé par le livreur lors des livraisons">info</span>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {drivers.map(driver => (
                        <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0"
                                        style={{ backgroundImage: driver.image ? `url("${driver.image}")` : 'none' }}
                                    >
                                        {!driver.image && <span className="flex items-center justify-center w-full h-full material-symbols-outlined text-gray-400">person</span>}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 dark:text-white">{driver.name}</span>
                                        <span className="text-xs text-gray-500">{driver.phone}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-gray-900 dark:text-white font-medium">{driver.zone}</span>
                                    <span className="text-xs text-gray-500">{driver.vehicle}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center justify-center rounded-full py-1 px-3 text-xs font-medium ${getStatusColor(driver.status)}`}>
                                    {driver.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className={`font-bold ${driver.cashOnHand > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'}`}>
                                        {formatPrice(driver.cashOnHand)} XOF
                                    </span>
                                    {driver.cashOnHand > 0 && (
                                        <button 
                                            onClick={() => handleOpenSettlement(driver)}
                                            className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-900 transition-colors"
                                        >
                                            Encaisser
                                        </button>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button 
                                        onClick={() => handleWhatsAppContact(driver.phone)}
                                        className="text-green-500 hover:text-green-600 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                                        title="Contacter sur WhatsApp"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                    </button>
                                    <button 
                                        onClick={() => handleOpenModal(driver)}
                                        className="text-gray-400 hover:text-primary dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteDriver(driver.id)}
                                        className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {drivers.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                Aucun livreur enregistré.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative w-full max-w-md bg-white dark:bg-[#1f2937] rounded-xl shadow-2xl p-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {currentDriver.id ? 'Modifier le livreur' : 'Nouveau livreur'}
                </h3>
                
                <div className="flex justify-center mb-6">
                    <div 
                        className="relative w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 cursor-pointer group border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary transition-colors overflow-hidden"
                        onClick={triggerFileInput}
                    >
                        {currentDriver.image ? (
                             <img src={currentDriver.image} alt="Driver" className="w-full h-full object-cover" />
                        ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-primary">
                                 <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                             </div>
                        )}
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold">Modifier</span>
                        </div>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom complet</label>
                        <input 
                            type="text" 
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-10 px-3 focus:ring-2 focus:ring-primary/50"
                            value={currentDriver.name || ''}
                            onChange={(e) => setCurrentDriver({...currentDriver, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone (avec indicatif)</label>
                        <input 
                            type="text" 
                            placeholder="+225..."
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-10 px-3 focus:ring-2 focus:ring-primary/50"
                            value={currentDriver.phone || ''}
                            onChange={(e) => setCurrentDriver({...currentDriver, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zone de livraison principale</label>
                        <input 
                            type="text" 
                            placeholder="Ex: Cocody, Yopougon..."
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-10 px-3 focus:ring-2 focus:ring-primary/50"
                            value={currentDriver.zone || ''}
                            onChange={(e) => setCurrentDriver({...currentDriver, zone: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Véhicule</label>
                            <select 
                                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-10 px-3 focus:ring-2 focus:ring-primary/50"
                                value={currentDriver.vehicle || 'Moto'}
                                onChange={(e) => setCurrentDriver({...currentDriver, vehicle: e.target.value})}
                            >
                                <option value="Moto">Moto</option>
                                <option value="Scooter">Scooter</option>
                                <option value="Vélo">Vélo</option>
                                <option value="Voiture">Voiture</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
                            <select 
                                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-10 px-3 focus:ring-2 focus:ring-primary/50"
                                value={currentDriver.status || 'Disponible'}
                                onChange={(e) => setCurrentDriver({...currentDriver, status: e.target.value as any})}
                            >
                                <option value="Disponible">Disponible</option>
                                <option value="En livraison">En livraison</option>
                                <option value="Indisponible">Indisponible</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pièce d'identité (Photo)</label>
                        <div 
                            onClick={triggerIdCardInput}
                            className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-32 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative overflow-hidden ${currentDriver.idCardImage ? 'border-primary' : ''}`}
                        >
                            {currentDriver.idCardImage ? (
                                 <img src={currentDriver.idCardImage} alt="ID Card" className="w-full h-full object-cover" />
                            ) : (
                                 <div className="flex flex-col items-center text-gray-400">
                                     <span className="material-symbols-outlined text-2xl mb-1">id_card</span>
                                     <span className="text-xs">Cliquez pour ajouter la CNI / Permis</span>
                                 </div>
                            )}
                            <input 
                                type="file" 
                                ref={idCardInputRef}
                                onChange={handleIdCardUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        Annuler
                    </button>
                    <button 
                        onClick={handleSaveDriver}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Settlement (Encaissement) Modal */}
      {isSettleModalOpen && selectedDriverForSettlement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm" onClick={() => setIsSettleModalOpen(false)}></div>
            <div className="relative w-full max-w-sm bg-white dark:bg-[#1f2937] rounded-xl shadow-2xl p-6 animate-fadeIn">
                 <div className="size-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-4 mx-auto">
                    <span className="material-symbols-outlined text-2xl">payments</span>
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                    Encaisser {selectedDriverForSettlement.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-6">
                    Confirmez-vous avoir reçu la somme de <span className="font-bold text-gray-900 dark:text-white">{formatPrice(selectedDriverForSettlement.cashOnHand)} XOF</span> en espèces de la part de ce livreur ?
                </p>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={confirmSettlement}
                        className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/20"
                    >
                        Oui, j'ai reçu l'argent
                    </button>
                    <button 
                        onClick={() => setIsSettleModalOpen(false)}
                        className="w-full py-3 bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white font-medium"
                    >
                        Annuler
                    </button>
                </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default DriversPage;
