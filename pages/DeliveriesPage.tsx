
import React, { useState } from 'react';
import { DeliveryMode, Order, PaymentMethod, PaymentStatus } from '../types';

const mockOrders: Order[] = [
  { 
    id: '#1024', 
    customerName: 'Mamadou Sy', 
    address: 'Abidjan, Cocody', 
    status: 'En attente', 
    deliveryMode: 'delivery',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    paidAmount: 0,
    remainingAmount: 41000,
    items: [{ name: 'Bazin Riche', quantity: 1, price: 23000 }, { name: 'T-shirt', quantity: 1, price: 15000 }], 
    total: 41000 
  },
  { 
    id: '#1025', 
    customerName: 'Aminata Traoré', 
    address: 'Bamako, Quartier du Fleuve', 
    driver: 'Koffi N\'Guessan', 
    status: 'En cours', 
    deliveryMode: 'delivery',
    paymentMethod: 'deposit', // Acompte versé
    paymentStatus: 'partial',
    paidAmount: 5000,
    remainingAmount: 25000,
    items: [{ name: 'Robe Soirée', quantity: 1, price: 30000 }], 
    total: 30000 
  },
  { 
    id: '#1026', 
    customerName: 'Seydou Keita', 
    address: 'Boutique Treichville', 
    status: 'En attente', 
    deliveryMode: 'pickup', 
    paymentMethod: 'online', // Payé totalement en ligne
    paymentStatus: 'paid',
    paidAmount: 65000,
    remainingAmount: 0,
    items: [{ name: 'Casque Audio', quantity: 1, price: 65000 }], 
    total: 65000 
  },
  { 
    id: '#1027', 
    customerName: 'Aïcha Diallo', 
    address: 'aicha.diallo@email.com', 
    status: 'Terminée', 
    deliveryMode: 'digital', 
    paymentMethod: 'online',
    paymentStatus: 'paid',
    paidAmount: 5000,
    remainingAmount: 0,
    items: [{ name: 'Ebook Business', quantity: 1, price: 5000 }], 
    total: 5000 
  },
];

const DeliveriesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('En attente');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'En cours': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'Livrée': 
      case 'Terminée':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'Annulée': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModeInfo = (mode: DeliveryMode) => {
    switch (mode) {
        case 'delivery': return { icon: 'local_shipping', label: 'Livraison', color: 'text-blue-500', type: 'Produit Physique' };
        case 'pickup': return { icon: 'store', label: 'Retrait', color: 'text-orange-500', type: 'Produit Physique' };
        case 'digital': return { icon: 'alternate_email', label: 'Numérique', color: 'text-purple-500', type: 'Produit Numérique' };
    }
  };

  const getPaymentInfo = (method: PaymentMethod, status: PaymentStatus) => {
      let icon = 'payments';
      let label = 'Cash';
      let color = 'text-gray-600 dark:text-gray-400';

      if (method === 'online') {
          icon = 'credit_card';
          label = 'Mobile Money';
          color = 'text-blue-600 dark:text-blue-400';
      } else if (method === 'deposit') {
          icon = 'savings';
          label = 'Acompte + Cash';
          color = 'text-purple-600 dark:text-purple-400';
      }

      return { icon, label, color };
  };

  const formatPrice = (price: number) => {
      return new Intl.NumberFormat('fr-FR').format(price);
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-[#111827] dark:text-white">Gestion des Commandes</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">search</span>
            </div>
            <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Rechercher par client, commande..."
            />
        </div>
        <div className="flex bg-gray-200/50 dark:bg-gray-800/50 p-1.5 rounded-lg overflow-x-auto">
             {['En attente', 'En cours', 'Terminée'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white dark:bg-[#111621] shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                >
                    {tab}
                </button>
             ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#111621] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-medium">
                    <tr>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Type Produit</th>
                        <th className="px-4 py-3">Client</th>
                        <th className="px-4 py-3">Paiement</th>
                        <th className="px-4 py-3">Statut</th>
                        <th className="px-4 py-3 text-right">Total</th>
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {mockOrders.map(order => {
                        const mode = getModeInfo(order.deliveryMode);
                        const payment = getPaymentInfo(order.paymentMethod, order.paymentStatus);
                        return (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="px-4 py-4 text-gray-500 dark:text-gray-400 font-mono font-bold">{order.id}</td>
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                    <span className={`material-symbols-outlined ${mode.color}`}>{mode.icon}</span>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{mode.type}</span>
                                        <span className="text-[10px] text-gray-500 uppercase">{mode.label}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 dark:text-white">{order.customerName}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 max-w-[150px] truncate">{order.address}</span>
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                     <span className={`material-symbols-outlined text-lg ${payment.color}`}>{payment.icon}</span>
                                     <div className="flex flex-col">
                                         <span className="text-xs font-medium text-gray-900 dark:text-gray-200">{payment.label}</span>
                                         <span className={`text-[10px] px-1.5 rounded-full w-fit ${
                                             order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 
                                             order.paymentStatus === 'partial' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30' : 
                                             'bg-gray-100 text-gray-600 dark:bg-gray-800'
                                         }`}>
                                             {order.paymentStatus === 'paid' ? 'Payé' : order.paymentStatus === 'partial' ? 'Partiel' : 'En attente'}
                                         </span>
                                     </div>
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <span className={`inline-flex items-center justify-center rounded-full py-1 px-3 text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-4 py-4 text-right font-bold text-gray-900 dark:text-white">
                                {formatPrice(order.total)}
                            </td>
                            <td className="px-4 py-4 text-center">
                                <button 
                                    onClick={() => setSelectedOrder(order)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#111621] rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-fadeIn">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Commande {selectedOrder.id}</h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${selectedOrder.deliveryMode === 'delivery' ? 'bg-blue-50 text-blue-600 border-blue-100' : selectedOrder.deliveryMode === 'pickup' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>
                                {selectedOrder.deliveryMode === 'delivery' ? 'LIVRAISON' : selectedOrder.deliveryMode === 'pickup' ? 'RETRAIT' : 'DIGITAL'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Client: <span className="font-medium text-gray-900 dark:text-white">{selectedOrder.customerName}</span></p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6">
                    {/* Financial Details */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                            Détails du paiement
                        </h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-white dark:bg-[#1f2937] rounded-lg shadow-sm">
                                <p className="text-xs text-gray-500 uppercase font-semibold">Méthode</p>
                                <p className="font-bold text-gray-900 dark:text-white flex items-center justify-center gap-1 mt-1">
                                    {selectedOrder.paymentMethod === 'online' ? (
                                        <><span className="material-symbols-outlined text-sm text-blue-500">credit_card</span> Mobile Money</>
                                    ) : selectedOrder.paymentMethod === 'deposit' ? (
                                        <><span className="material-symbols-outlined text-sm text-purple-500">savings</span> Acompte</>
                                    ) : (
                                        <><span className="material-symbols-outlined text-sm text-gray-500">payments</span> Cash</>
                                    )}
                                </p>
                            </div>
                            <div className="p-3 bg-white dark:bg-[#1f2937] rounded-lg shadow-sm">
                                <p className="text-xs text-gray-500 uppercase font-semibold">Déjà Payé</p>
                                <p className="font-bold text-green-600 dark:text-green-400 mt-1">{formatPrice(selectedOrder.paidAmount)} XOF</p>
                            </div>
                            <div className="p-3 bg-white dark:bg-[#1f2937] rounded-lg shadow-sm border-2 border-primary/10">
                                <p className="text-xs text-gray-500 uppercase font-semibold">Reste à payer</p>
                                <p className="font-black text-primary text-lg mt-1">{formatPrice(selectedOrder.remainingAmount)} XOF</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Articles commandés</h4>
                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                             {selectedOrder.items.length > 0 ? (
                                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between p-4 bg-white dark:bg-[#111621]">
                                            <div className="flex gap-4">
                                                <div className="size-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                                                    <span className="material-symbols-outlined">inventory_2</span>
                                                </div> 
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-medium text-gray-900 dark:text-white">{formatPrice(item.price)} XOF</p>
                                        </div>
                                    ))}
                                </div>
                             ) : (
                                 <div className="p-4 text-gray-500 italic">Détails des articles non disponibles.</div>
                             )}
                             <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700">
                                <span>Total Commande</span>
                                <span>{formatPrice(selectedOrder.total)} XOF</span>
                             </div>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-white dark:bg-[#1f2937] p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                        <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
                            {selectedOrder.deliveryMode === 'digital' ? 'Livraison Numérique' : 'Livraison Physique'}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Destination / Contact</p>
                                <p className="text-gray-900 dark:text-white font-medium">{selectedOrder.address}</p>
                             </div>
                             {selectedOrder.deliveryMode === 'delivery' && (
                                 <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Livreur assigné</p>
                                    {selectedOrder.driver ? (
                                        <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                            {selectedOrder.driver}
                                        </p>
                                    ) : (
                                        <p className="text-orange-500 font-medium flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">warning</span>
                                            Non assigné
                                        </p>
                                    )}
                                 </div>
                             )}
                        </div>
                    </div>

                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3 rounded-b-xl">
                    <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Fermer</button>
                    
                    {selectedOrder.remainingAmount > 0 && selectedOrder.status === 'Livrée' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">payments</span>
                            Encaisser {formatPrice(selectedOrder.remainingAmount)} XOF
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default DeliveriesPage;
