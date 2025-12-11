
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111621] text-[#111827] dark:text-white font-sans overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-[#111621]/80 backdrop-blur-md z-50 transition-all">
        <div className="flex items-center gap-2">
            <div className="size-8">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect width="40" height="40" rx="12" fill="#16a34a" />
                    <path d="M20 8C22.2091 8 24 9.79086 24 12V14H16V12C16 9.79086 17.7909 8 20 8Z" stroke="white" strokeWidth="2.5"/>
                    <path d="M10 15C10 13.8954 10.8954 13 12 13H28C29.1046 13 30 13.8954 30 15V30C30 31.1046 29.1046 32 28 32H12C10.8954 32 10 31.1046 10 30V15Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                    <path d="M21 18L17 24H22L19 30L24 23H18L21 18Z" fill="white"/>
                </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">BoostShop</span>
        </div>
        <nav className="hidden md:flex gap-8">
            <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">Avantages</a>
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Fonctionnalités</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Avis</a>
        </nav>
        <div className="flex items-center gap-3">
            <Link to="/auth/login" className="hidden sm:block px-4 py-2 text-sm font-bold text-[#111827] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Se connecter</Link>
            <Link to="/auth/register" className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 transform hover:scale-105 duration-200">Créer un compte</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 px-4 text-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 dark:bg-green-900/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 text-green-700 dark:text-green-300 text-xs font-semibold uppercase tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Nouveau : Gestion des livreurs incluse
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                Votre WhatsApp devient une <br/>
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400">Machine à Vendre.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Automatisez vos ventes, gérez vos livraisons et boostez votre chiffre d'affaires sans effort technique.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                 <Link to="/auth/register" className="h-14 px-8 flex items-center justify-center bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-dark hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    Commencer maintenant
                    <span className="material-symbols-outlined ml-2">arrow_forward</span>
                 </Link>
                 <a href="#demo" className="h-14 px-8 flex items-center justify-center bg-white dark:bg-[#1f2937] text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 font-bold text-lg rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                    Voir la démo
                 </a>
            </div>
            
            <div className="pt-16 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#111621] via-transparent to-transparent h-20 bottom-0 z-20"></div>
                <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" 
                    alt="Tableau de bord de croissance business avec graphiques sur écran" 
                    className="rounded-2xl shadow-2xl border-4 border-gray-100 dark:border-gray-800 max-w-full w-[1000px] mx-auto transform hover:scale-[1.01] transition-transform duration-500"
                />
            </div>
        </div>
      </section>

      {/* Value Proposition (Boost, Time, AI) */}
      <section id="benefits" className="py-20 bg-gray-50 dark:bg-[#161b26]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#111827] dark:text-white">Pourquoi choisir BoostShop ?</h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg">Plus qu'un simple outil, un véritable partenaire de croissance pour votre business en Afrique.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white dark:bg-[#111621] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-9xl text-green-500">trending_up</span>
                    </div>
                    <div className="size-14 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[#111827] dark:text-white">Boostez vos ventes</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Ne perdez plus aucun client. Notre système relance automatiquement les paniers abandonnés et convertit 3x plus de prospects en clients fidèles.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-[#111621] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-9xl text-blue-500">schedule</span>
                    </div>
                    <div className="size-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[#111827] dark:text-white">Gagnez du temps</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Fini les réponses manuelles répétitives. Automatisez 80% de vos conversations : prix, infos produits et disponibilité sont envoyés instantanément.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-[#111621] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-9xl text-purple-500">psychology</span>
                    </div>
                    <div className="size-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-3xl">auto_fix_high</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[#111827] dark:text-white">IA Personnalisée</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Une IA qui parle comme vous. Configurez le ton, le style et les règles de négociation. Elle vend vos produits comme votre meilleur commercial, 24/7.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Deep Features */}
      <section id="features" className="py-20 bg-white dark:bg-[#111621]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#111827] dark:text-white">Tout ce dont vous avez besoin pour exploser.</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                        BoostShop n'est pas juste un chatbot. C'est une suite complète d'outils e-commerce intégrée à WhatsApp pour gérer votre business de A à Z.
                    </p>
                    
                    <div className="space-y-4">
                        {[
                            "Catalogue produits synchronisé en temps réel",
                            "Assignation automatique des livreurs",
                            "Tableau de bord financier détaillé",
                            "Gestion des stocks et alertes",
                            "Lien de paiement Mobile Money intégré (bientôt)"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="size-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
                    <div className="relative bg-gray-50 dark:bg-[#161b26] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-[#1f2937] p-4 rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-primary text-3xl mb-2">qr_code_2</span>
                            <p className="font-bold text-sm">Générateur QR</p>
                        </div>
                        <div className="bg-white dark:bg-[#1f2937] p-4 rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-blue-500 text-3xl mb-2">group_add</span>
                            <p className="font-bold text-sm">CRM Clients</p>
                        </div>
                        <div className="bg-white dark:bg-[#1f2937] p-4 rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-orange-500 text-3xl mb-2">campaign</span>
                            <p className="font-bold text-sm">Broadcast</p>
                        </div>
                        <div className="bg-white dark:bg-[#1f2937] p-4 rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-purple-500 text-3xl mb-2">analytics</span>
                            <p className="font-bold text-sm">Rapports</p>
                        </div>
                        <div className="col-span-2 bg-primary/10 p-4 rounded-xl text-center">
                            <p className="text-primary font-bold text-sm">+ Et bien plus encore...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-[#161b26]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#111827] dark:text-white">Ils nous font confiance</h2>
                <p className="text-gray-500 dark:text-gray-400">Découvrez comment BoostShop transforme le quotidien des entrepreneurs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        name: "Aminata Traoré",
                        role: "Boutique de Mode, Abidjan",
                        img: "https://randomuser.me/api/portraits/women/44.jpg",
                        quote: "Avant, je passais mes nuits à répondre aux messages pour des robes. Maintenant, BoostShop gère tout. J'ai doublé mes ventes en 2 mois !"
                    },
                    {
                        name: "Moussa Koné",
                        role: "Vendeur Électronique, Dakar",
                        img: "https://randomuser.me/api/portraits/men/32.jpg",
                        quote: "L'IA est incroyable. Elle négocie les prix selon mes règles et ferme la vente. C'est comme avoir un employé modèle qui ne dort jamais."
                    },
                    {
                        name: "Chloé N'Guessan",
                        role: "Cosmétiques Bio, Douala",
                        img: "https://randomuser.me/api/portraits/women/68.jpg",
                        quote: "La gestion des livreurs est un vrai plus. Dès qu'une commande est validée, mon livreur reçoit les infos. Un gain de temps énorme."
                    }
                ].map((testim, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#111621] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full">
                        <div className="flex items-center gap-1 text-yellow-400 mb-4">
                            <span className="material-symbols-outlined fill text-xl">star</span>
                            <span className="material-symbols-outlined fill text-xl">star</span>
                            <span className="material-symbols-outlined fill text-xl">star</span>
                            <span className="material-symbols-outlined fill text-xl">star</span>
                            <span className="material-symbols-outlined fill text-xl">star</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 italic mb-6 flex-grow">"{testim.quote}"</p>
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <img src={testim.img} alt={testim.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <p className="font-bold text-[#111827] dark:text-white">{testim.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{testim.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-5xl font-black">Prêt à faire décoller vos ventes ?</h2>
                <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
                    Rejoignez des centaines d'entrepreneurs qui automatisent leur succès. <br/>
                    <span className="font-bold text-white">Pas de carte bancaire requise. Inscription en 2 minutes.</span>
                </p>
                <div className="pt-4">
                    <Link to="/auth/register" className="inline-flex h-14 px-8 items-center justify-center bg-white text-primary font-bold text-lg rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                        Créer mon compte gratuit
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0d111a] py-12 px-6 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-xs">
                <div className="flex items-center gap-2 mb-4">
                    <div className="size-8">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <rect width="40" height="40" rx="12" fill="#16a34a" />
                            <path d="M20 8C22.2091 8 24 9.79086 24 12V14H16V12C16 9.79086 17.7909 8 20 8Z" stroke="white" strokeWidth="2.5"/>
                            <path d="M10 15C10 13.8954 10.8954 13 12 13H28C29.1046 13 30 13.8954 30 15V30C30 31.1046 29.1046 32 28 32H12C10.8954 32 10 31.1046 10 30V15Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                            <path d="M21 18L17 24H22L19 30L24 23H18L21 18Z" fill="white"/>
                        </svg>
                    </div>
                    <span className="font-bold text-xl text-[#111827] dark:text-white">BoostShop</span>
                </div>
                <p className="text-sm text-gray-500">Automatisez vos ventes WhatsApp sans effort et concentrez-vous sur ce qui compte vraiment.</p>
            </div>
            <div className="flex gap-16 flex-wrap">
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold uppercase text-sm text-[#111827] dark:text-white">Produit</h4>
                    <a href="#benefits" className="text-sm text-gray-500 hover:text-primary transition-colors">Avantages</a>
                    <a href="#features" className="text-sm text-gray-500 hover:text-primary transition-colors">Fonctionnalités</a>
                    <Link to="/auth/login" className="text-sm text-gray-500 hover:text-primary transition-colors">Connexion</Link>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold uppercase text-sm text-[#111827] dark:text-white">Légal</h4>
                    <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-primary transition-colors">Confidentialité</Link>
                    <Link to="/terms-of-service" className="text-sm text-gray-500 hover:text-primary transition-colors">CGU</Link>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500">
            © 2024 BoostShop. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
