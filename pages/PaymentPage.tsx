import React, { useState } from 'react';

const PaymentPage: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>('orange');

  return (
    <div className="p-6 lg:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#111827] dark:text-white">Finaliser votre paiement</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Réabonnement - Plan Mensuel | Total à payer : 7.000 XOF</p>
      </div>

      <div className="bg-white dark:bg-[#1f2937] p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-8">
        
        {/* Provider Selection */}
        <div>
            <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-4">1. Choisissez votre opérateur Mobile Money</h3>
            <div className="grid grid-cols-3 gap-4">
                {[
                    { id: 'orange', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxPqPbWT9PMTelN2lP1PlE6D7aNgzbaxXa-mFYr1REZnhd_vZOBm6sIaEF7W30-TcI7Ablla2Jch5R61SvcDOsT4p9OPJihSRYEKFvuJOzhUvr0DBn5BzwyTFkOl9Pck6BeT2-4SnoGj3DetFcY5YfZJ7mYvME1T2SejWg2bqbE1NGkAhe2pY1OwD6_MKkI_rLzAGRhZeoGFrw2gw0yN4x0jKLdeo7E4HCc7WZpKJBjNy2PZBrns5_nz7KHGH8YRMWV67YWb4WsYVR' },
                    { id: 'mtn', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASZyifHdrr0BPwhWYyPUSPfbJEGc-bd0fvsDbhsy7aiNnCbkndsnucmafiLOlEwjRgXQ81D3p6g5BKFfKzf5hOP9w4PJtge-U-0jveW4TDy4CVnlA8dL3VUz2Jqjich4Lvhh62yxRMyy1SXG6bTLC4HSRgajxwaVSnPIcrckeAQBRrBMb9mkQmUR7XbpODbCB5VvD1mfBsOj6Ttoghwed7FBfABNEbm0Hcr4mDGA2DbRw1ric4CrnBVgGxlklBqKNpERYkqhfz_Jgw' },
                    { id: 'moov', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRiiB0Z-zWQBvY5b_OJ3u2D8ZoJ7ShcCPT4inJxETX8y34F0ftE35JUmRlVFdHxm628-Z7SpNpsz9-Gan-M2uH2DjW7hBJwwpInxaEuaIr32mWmadTsoGh9XKFbkVZBxdcaCXQeSATiZTmyoulo08VSYq3B_NvMdKmmyCv9m9b8C_G_BKS8xpjLNbyaJ5f7acriUrvoFxpQ6x3KKDGORk0ZrXGOKE0qrv7fOzOhRHZ8eHVYdp-sv94vP7av_EBZjzOblDHFYwy9Qix' }
                ].map(provider => (
                     <div 
                        key={provider.id}
                        onClick={() => setSelectedProvider(provider.id)}
                        className={`cursor-pointer rounded-xl p-2 border-2 transition-all ${selectedProvider === provider.id ? 'border-primary ring-4 ring-primary/20 opacity-100' : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100'}`}
                    >
                        <div 
                            className="w-full aspect-video bg-contain bg-center bg-no-repeat rounded-lg"
                            style={{ backgroundImage: `url("${provider.img}")` }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>

        {/* Phone Input */}
        <div>
             <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-4">2. Saisissez le numéro de téléphone associé</h3>
             <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">phone</span>
                <input type="tel" placeholder="Votre numéro de téléphone" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-white/5 py-3 pl-10 pr-4 text-gray-900 dark:text-white focus:border-primary focus:ring-primary/50" />
             </div>
        </div>

        {/* CTA */}
        <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-lg bg-gray-100 dark:bg-white/5 p-4">
                <span className="material-symbols-outlined text-gray-500 mt-0.5">info</span>
                <p className="text-sm text-gray-600 dark:text-gray-300">Une fois validé, vous recevrez une notification sur votre téléphone pour confirmer le paiement en saisissant votre code secret.</p>
            </div>
            <button className="w-full rounded-lg bg-primary py-3 px-6 text-white font-bold hover:bg-primary-dark transition-all shadow-sm">
                Payer 7.000 XOF
            </button>
        </div>

        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="material-symbols-outlined text-sm text-gray-400">lock</span>
            <p className="text-sm text-gray-500">Paiement 100% sécurisé</p>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;