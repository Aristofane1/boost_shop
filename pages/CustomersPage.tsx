import React, { useState } from 'react';
import { Customer } from '../types';

const CustomersPage: React.FC = () => {
  // Mock Data
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Aminata Traoré',
      phone: '+225 07 48 22 11 00',
      email: 'aminata.traore@gmail.com',
      totalSpent: 450000,
      orderCount: 12,
      lastOrderDate: '2024-07-18',
      tags: ['VIP', 'Fidèle'],
      notes: 'Adore les tissus en Bazin. Paye toujours par Orange Money.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '2',
      name: 'Moussa Diaby',
      phone: '+225 01 02 03 04 05',
      totalSpent: 25000,
      orderCount: 1,
      lastOrderDate: '2024-07-10',
      tags: ['Nouveau'],
      notes: '',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '3',
      name: 'Sarah N\'Goran',
      phone: '+225 05 55 66 77 88',
      totalSpent: 120000,
      orderCount: 3,
      lastOrderDate: '2024-06-25',
      tags: [],
      notes: 'Demande souvent des livraisons le weekend.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: '4',
      name: 'Jean-Marc Kouassi',
      phone: '+225 07 88 99 00 11',
      totalSpent: 0,
      orderCount: 0,
      lastOrderDate: '-',
      tags: ['Risque'],
      notes: 'A annulé 2 commandes à la dernière minute.',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [noteInput, setNoteInput] = useState('');

  // Filtering
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'VIP': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
      case 'Nouveau': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
      case 'Fidèle': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      case 'Risque': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price);

  const handleWhatsAppClick = (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, '').replace('+', '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const openCustomerModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setNoteInput(customer.notes || '');
  };

  const saveNote = () => {
    if (selectedCustomer) {
      setCustomers(customers.map(c => c.id === selectedCustomer.id ? { ...c, notes: noteInput } : c));
      alert('Note enregistrée !');
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white">Clients (CRM)</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez vos relations clients, suivez leur historique et fidélisez-les.</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined">download</span>
          Exporter la liste
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400">search</span>
          </div>
          <input 
            type="text" 
            placeholder="Rechercher par nom ou téléphone..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>

      {/* Customers List */}
      <div className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-medium">
                    <tr>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Valeur Vie (LTV)</th>
                        <th className="px-6 py-4">Commandes</th>
                        <th className="px-6 py-4">Dernière commande</th>
                        <th className="px-6 py-4">Tags</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredCustomers.map(customer => (
                        <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer" onClick={() => openCustomerModal(customer)}>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0 flex items-center justify-center text-gray-500"
                                        style={{ backgroundImage: customer.avatar ? `url("${customer.avatar}")` : 'none' }}
                                    >
                                        {!customer.avatar && <span className="material-symbols-outlined">person</span>}
                                    </div>
                                    <span className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{customer.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-gray-900 dark:text-white">{customer.phone}</span>
                                    {customer.email && <span className="text-xs text-gray-500">{customer.email}</span>}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="font-bold text-gray-900 dark:text-white">{formatPrice(customer.totalSpent)} XOF</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold">
                                    {customer.orderCount}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                {customer.lastOrderDate}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                    {customer.tags.map(tag => (
                                        <span key={tag} className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getTagColor(tag)}`}>
                                            {tag}
                                        </span>
                                    ))}
                                    {customer.tags.length === 0 && <span className="text-gray-400 text-xs">-</span>}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleWhatsAppClick(customer.phone); }}
                                    className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900 transition-colors"
                                    title="Discuter sur WhatsApp"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCustomer(null)}></div>
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#1f2937] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-start justify-between bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex items-center gap-4">
                        <div 
                            className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 bg-cover bg-center border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400"
                            style={{ backgroundImage: selectedCustomer.avatar ? `url("${selectedCustomer.avatar}")` : 'none' }}
                        >
                            {!selectedCustomer.avatar && <span className="material-symbols-outlined text-3xl">person</span>}
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                {selectedCustomer.name}
                                {selectedCustomer.tags.includes('VIP') && <span className="material-symbols-outlined text-yellow-500">verified</span>}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">{selectedCustomer.phone}</p>
                            <div className="flex gap-2 mt-2">
                                {selectedCustomer.tags.map(tag => (
                                    <span key={tag} className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getTagColor(tag)}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    
                    {/* Key Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 text-center">
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Dépenses Totales</p>
                            <p className="text-xl font-black text-primary mt-1">{formatPrice(selectedCustomer.totalSpent)} <span className="text-sm">XOF</span></p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Commandes</p>
                            <p className="text-xl font-black text-gray-900 dark:text-white mt-1">{selectedCustomer.orderCount}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Dernière visite</p>
                            <p className="text-base font-bold text-gray-900 dark:text-white mt-2">{selectedCustomer.lastOrderDate}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <button 
                        onClick={() => handleWhatsAppClick(selectedCustomer.phone)}
                        className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Ouvrir discussion WhatsApp
                    </button>

                    {/* Notes */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-400">edit_note</span>
                            Notes privées
                        </h3>
                        <div className="relative">
                            <textarea 
                                className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[120px] p-3 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                placeholder="Ajoutez des notes sur ce client (préférences, tailles, habitudes...)"
                                value={noteInput}
                                onChange={(e) => setNoteInput(e.target.value)}
                            ></textarea>
                            <button 
                                onClick={saveNote}
                                className="absolute bottom-3 right-3 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded hover:bg-primary hover:text-white transition-colors"
                            >
                                Sauvegarder
                            </button>
                        </div>
                    </div>

                    {/* Order History Preview */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Historique récent</h3>
                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                             {[
                                 { id: '#1024', date: '18 Juil 2024', total: 23000, status: 'Livrée' },
                                 { id: '#1001', date: '01 Juil 2024', total: 45000, status: 'Terminée' },
                             ].map((order, idx) => (
                                 <div key={idx} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                     <div>
                                         <p className="text-sm font-bold text-gray-900 dark:text-white">Commande {order.id}</p>
                                         <p className="text-xs text-gray-500">{order.date}</p>
                                     </div>
                                     <div className="text-right">
                                         <p className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(order.total)} F</p>
                                         <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">{order.status}</span>
                                     </div>
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default CustomersPage;