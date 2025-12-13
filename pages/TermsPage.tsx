import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111621] text-[#111827] dark:text-white p-6 lg:p-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Retour à l'accueil
        </Link>
        
        <h1 className="text-3xl font-black mb-8">Conditions Générales d'Utilisation</h1>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>Dernière mise à jour : 19 Juillet 2024</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. Acceptation des conditions</h2>
            <p>En accédant et en utilisant BoostShop, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation (CGU). Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Description du service</h2>
            <p>BoostShop fournit des outils d'automatisation pour WhatsApp, incluant la gestion des discussions, des produits et des livreurs. Nous nous réservons le droit de modifier ou d'interrompre le service à tout moment.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Inscription et Compte</h2>
            <p>Pour utiliser le service, vous devez créer un compte. Vous êtes responsable du maintien de la confidentialité de votre compte et de votre mot de passe. Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">4. Modèle de Commission</h2>
            <p>L'inscription à BoostShop est gratuite. Nous prélevons une commission variable entre 1,5% et 5% sur chaque vente réalisée via notre plateforme. En utilisant nos services pour vendre des produits, vous acceptez ce prélèvement automatique sur vos transactions.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">5. Utilisation acceptable</h2>
            <p>Vous acceptez de ne pas utiliser le service à des fins illégales ou interdites par ces conditions. Vous ne devez pas violer les lois de votre juridiction (y compris, mais sans s'y limiter, les lois sur le droit d'auteur).</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">6. Limitation de responsabilité</h2>
            <p>BoostShop ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de votre utilisation ou de votre incapacité à utiliser le service.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">7. Modifications des conditions</h2>
            <p>Nous nous réservons le droit de mettre à jour et de modifier les conditions d'utilisation de temps à autre. Votre utilisation continue du service après de telles modifications constitue votre acceptation des nouvelles conditions.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;