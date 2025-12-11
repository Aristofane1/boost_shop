import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PaymentConfig, Product, StockStatus } from '../types';

const AddProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    category: 'Vêtements',
    description: '',
    price: '',
    promoPrice: '',
    minPrice: '',
    image: null as string | null
  });

  // Stock Management State
  const [stockStatus, setStockStatus] = useState<StockStatus>('unlimited');
  const [stockQuantity, setStockQuantity] = useState<string>('');
  const [lowStockThreshold, setLowStockThreshold] = useState<string>('5');

  // Payment Configuration State
  const [useDefaultPaymentConfig, setUseDefaultPaymentConfig] = useState(true);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>({
    acceptCashOnDelivery: true,
    acceptFullOnlinePayment: true,
    acceptDeposit: false,
    depositAmount: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      // Check if data was passed via router state (from edit button)
      if (location.state && location.state.product) {
          const product = location.state.product as Product;
          setFormData({
              name: product.name,
              category: product.category,
              description: product.description,
              price: product.price.toString(),
              promoPrice: product.promoPrice ? product.promoPrice.toString() : '',
              minPrice: product.minPrice ? product.minPrice.toString() : '',
              image: product.image
          });
          
          setStockStatus(product.stockStatus);
          if (product.stockQuantity !== undefined) setStockQuantity(product.stockQuantity.toString());
          if (product.lowStockThreshold !== undefined) setLowStockThreshold(product.lowStockThreshold.toString());

          if (product.paymentConfig) {
              setUseDefaultPaymentConfig(false);
              setPaymentConfig(product.paymentConfig);
          }
      }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked, type, value } = e.target;
      setPaymentConfig(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : Number(value)
      }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatPrice = (price: string | number) => {
    if (!price) return '0';
    return new Intl.NumberFormat('fr-FR').format(Number(price));
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Link to="/dashboard" className="hover:text-primary transition-colors">Tableau de bord</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary transition-colors">Produits</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{isEditMode ? 'Modifier' : 'Ajouter'} un produit</span>
      </nav>

      <h1 className="text-3xl font-bold text-[#111827] dark:text-white mb-8">
        {isEditMode ? `Modifier: ${formData.name || 'Produit'}` : 'Ajouter un nouveau produit'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Info */}
          <section className="bg-white dark:bg-[#1f2937] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Informations générales</h2>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Nom du produit</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ex: Bazin Riche" 
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Catégorie</label>
                        <select 
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-[#1f2937]"
                        >
                            <option>Vêtements</option>
                            <option>Électronique</option>
                            <option>Accessoires</option>
                            <option>Maison</option>
                            <option>Beauté</option>
                        </select>
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Description détaillée</label>
                     <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Décrivez votre produit en détail..." 
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white min-h-[140px] p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                     ></textarea>
                </div>
                
                 <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Images</label>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        accept="image/*" 
                        className="hidden" 
                    />
                    <div 
                        onClick={triggerFileInput}
                        className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${formData.image ? 'border-primary bg-primary/5' : ''}`}
                    >
                        {formData.image ? (
                            <div className="relative">
                                <img src={formData.image} alt="Preview" className="h-40 object-contain rounded-md" />
                                <p className="mt-2 text-sm text-primary font-medium">Changer l'image</p>
                            </div>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                                <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-bold text-primary">Cliquez pour téléverser</span> ou glissez-déposez</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG or GIF (MAX. 800x400px)</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
          </section>

          {/* Stock Management (New Section) */}
          <section className="bg-white dark:bg-[#1f2937] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Gestion des Stocks</h2>
             <div className="space-y-6">
                <div className="flex gap-6">
                    <label className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all ${stockStatus === 'unlimited' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
                        <div className="flex items-center gap-3 mb-2">
                             <input type="radio" name="stockStatus" value="unlimited" checked={stockStatus === 'unlimited'} onChange={() => setStockStatus('unlimited')} className="text-primary focus:ring-primary" />
                             <span className="font-bold text-gray-900 dark:text-white">Stock Illimité</span>
                        </div>
                        <p className="text-xs text-gray-500">Pour les produits numériques ou sur commande.</p>
                    </label>
                    <label className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all ${stockStatus === 'finite' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
                        <div className="flex items-center gap-3 mb-2">
                             <input type="radio" name="stockStatus" value="finite" checked={stockStatus === 'finite'} onChange={() => setStockStatus('finite')} className="text-primary focus:ring-primary" />
                             <span className="font-bold text-gray-900 dark:text-white">Quantité Limitée</span>
                        </div>
                        <p className="text-xs text-gray-500">Le stock sera décrémenté après chaque vente.</p>
                    </label>
                </div>

                {stockStatus === 'finite' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Quantité en stock</label>
                            <input 
                                type="number" 
                                value={stockQuantity}
                                onChange={(e) => setStockQuantity(e.target.value)}
                                placeholder="Ex: 50" 
                                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Seuil d'alerte stock bas</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">notifications</span>
                                <input 
                                    type="number" 
                                    value={lowStockThreshold}
                                    onChange={(e) => setLowStockThreshold(e.target.value)}
                                    placeholder="Ex: 5" 
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 pl-10 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Vous serez notifié quand le stock atteindra ce niveau.</p>
                        </div>
                    </div>
                )}
             </div>
          </section>

           {/* Pricing */}
          <section className="bg-white dark:bg-[#1f2937] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Tarification</h2>
            
            {/* Commission Notice */}
            <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 shrink-0">info</span>
                <div>
                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Information importante sur la commission</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">BoostShop prélève une commission de <span className="font-bold">10%</span> sur chaque vente. Assurez-vous d'avoir assez de solde prépayé.</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Prix normal (XOF)</label>
                        <input 
                            type="number" 
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Ex: 20000" 
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                        />
                         {formData.price && (
                            <p className="text-xs text-gray-500 mt-1">Commission estimée (10%): <span className="font-bold text-red-500">-{formatPrice(Number(formData.price) * 0.1)} XOF</span></p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Prix promotionnel (XOF) <span className="font-normal text-gray-500">(Optionnel)</span></label>
                        <input 
                            type="number" 
                            name="promoPrice"
                            value={formData.promoPrice}
                            onChange={handleInputChange}
                            placeholder="Ex: 15000" 
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                        />
                    </div>
                </div>
                <div>
                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Prix minimum accepté par l'IA (XOF)
                        <span className="material-symbols-outlined text-sm text-gray-400 cursor-help" title="Minimum price AI can negotiate down to">info</span>
                     </label>
                     <input 
                        type="number" 
                        name="minPrice"
                        value={formData.minPrice}
                        onChange={handleInputChange}
                        placeholder="Ex: 12000" 
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                     />
                     <p className="text-xs text-gray-500 mt-1">Le prix plancher que l'IA ne pourra pas dépasser lors des négociations.</p>
                </div>
            </div>
          </section>

          {/* Payment Configuration */}
          <section className="bg-white dark:bg-[#1f2937] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Options de paiement</h2>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="useDefault" 
                        checked={useDefaultPaymentConfig} 
                        onChange={(e) => setUseDefaultPaymentConfig(e.target.checked)}
                        className="rounded text-primary focus:ring-primary border-gray-300" 
                    />
                    <label htmlFor="useDefault" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Utiliser la configuration par défaut</label>
                </div>
             </div>

             {!useDefaultPaymentConfig && (
                 <div className="space-y-4 animate-fadeIn">
                    <p className="text-sm text-gray-500 mb-2">Sélectionnez les modes de paiement acceptés pour <span className="font-bold">ce produit spécifique</span>.</p>
                    
                    <label className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer">
                        <span className="text-gray-900 dark:text-white font-medium">Paiement à la livraison (Cash)</span>
                        <input 
                            type="checkbox" 
                            name="acceptCashOnDelivery"
                            checked={paymentConfig.acceptCashOnDelivery}
                            onChange={handlePaymentConfigChange}
                            className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300" 
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer">
                         <span className="text-gray-900 dark:text-white font-medium">Paiement complet en ligne</span>
                        <input 
                            type="checkbox" 
                            name="acceptFullOnlinePayment"
                            checked={paymentConfig.acceptFullOnlinePayment}
                            onChange={handlePaymentConfigChange}
                            className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300" 
                        />
                    </label>

                    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg p-3 ${paymentConfig.acceptDeposit ? 'bg-gray-50 dark:bg-gray-800/30' : ''}`}>
                        <label className="flex items-center justify-between cursor-pointer mb-2">
                             <span className="text-gray-900 dark:text-white font-medium">Acompte + Reste à la livraison</span>
                            <input 
                                type="checkbox" 
                                name="acceptDeposit"
                                checked={paymentConfig.acceptDeposit}
                                onChange={handlePaymentConfigChange}
                                className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300" 
                            />
                        </label>
                        {paymentConfig.acceptDeposit && (
                            <div className="mt-2 pl-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Montant de l'acompte (XOF)</label>
                                <input 
                                    type="number" 
                                    name="depositAmount"
                                    value={paymentConfig.depositAmount}
                                    onChange={handlePaymentConfigChange}
                                    placeholder="Ex: 5000"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm h-9 px-2"
                                />
                            </div>
                        )}
                    </div>
                 </div>
             )}
             {useDefaultPaymentConfig && (
                 <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center text-gray-500 text-sm italic">
                    Ce produit utilisera les paramètres de paiement définis dans votre <Link to="/profile" className="text-primary hover:underline">Profil</Link>.
                 </div>
             )}
          </section>
        </div>

        {/* Sidebar Column (Preview) */}
        <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-8">
                <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-4">Aperçu en temps réel</h3>
                <div className="bg-[#e7ffdb] dark:bg-[#075e54]/30 p-4 rounded-xl flex justify-center">
                    <div className="bg-white dark:bg-[#1f2937] rounded-lg shadow-md w-full max-w-sm overflow-hidden">
                        <div className="bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center overflow-hidden relative">
                            {formData.image ? (
                                <img src={formData.image} alt="Product Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="material-symbols-outlined text-5xl text-gray-400">photo_camera</span>
                            )}
                            
                            {/* Stock Badge Preview */}
                             <div className="absolute top-2 left-2">
                                {stockStatus === 'unlimited' ? (
                                    <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Illimité</span>
                                ) : (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm text-white ${Number(stockQuantity) === 0 ? 'bg-red-500' : 'bg-green-500'}`}>
                                        {Number(stockQuantity) === 0 ? 'Rupture' : `Stock: ${stockQuantity}`}
                                    </span>
                                )}
                             </div>
                        </div>
                        <div className="p-4 border-t border-gray-100 dark:border-gray-600">
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                                {formData.name || 'Nom de votre produit ici'}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 min-h-[2.5em]">
                                {formData.description || 'Votre description détaillée apparaîtra ici une fois que vous commencerez à l\'écrire...'}
                            </p>
                            <div className="flex items-baseline gap-2 mt-3">
                                {formData.promoPrice ? (
                                    <>
                                        <span className="text-xl font-bold text-primary">{formatPrice(formData.promoPrice)} XOF</span>
                                        <span className="text-base text-gray-400 line-through">{formatPrice(formData.price || '0')} XOF</span>
                                    </>
                                ) : (
                                    <span className="text-xl font-bold text-primary">{formatPrice(formData.price || '0')} XOF</span>
                                )}
                            </div>
                            
                            {/* Payment Badges Preview */}
                            <div className="flex flex-wrap gap-1 mt-3">
                                {((!useDefaultPaymentConfig && paymentConfig.acceptCashOnDelivery) || useDefaultPaymentConfig) && (
                                    <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">Cash</span>
                                )}
                                {((!useDefaultPaymentConfig && paymentConfig.acceptFullOnlinePayment) || useDefaultPaymentConfig) && (
                                    <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">Mobile Money</span>
                                )}
                                {(!useDefaultPaymentConfig && paymentConfig.acceptDeposit) && (
                                    <span className="text-[10px] bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full">Acompte: {paymentConfig.depositAmount}F</span>
                                )}
                            </div>

                            <button className="mt-4 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">chat</span>
                                <span>Discuter & Acheter</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Link to="/products" className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Annuler</Link>
                    <button className="px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined">save</span>
                        {isEditMode ? 'Enregistrer les modifications' : 'Créer le produit'}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;