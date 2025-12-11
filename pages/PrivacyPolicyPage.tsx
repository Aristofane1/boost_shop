import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111621] text-[#111827] dark:text-white p-6 lg:p-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Retour à l'accueil
        </Link>
        
        <h1 className="text-3xl font-black mb-8">Politique de Confidentialité</h1>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>Dernière mise à jour : 19 Juillet 2024</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. Introduction</h2>
            <p>Bienvenue sur BoostShop. Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité vous informera sur la manière dont nous traitons vos données lorsque vous visitez notre site web et utilisez nos services.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Les données que nous collectons</h2>
            <p>Nous pouvons collecter, utiliser, stocker et transférer différents types de données personnelles vous concernant, notamment :</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Données d'identité (nom, prénom).</li>
                <li>Données de contact (adresse email, numéro de téléphone).</li>
                <li>Données techniques (adresse IP, type de navigateur).</li>
                <li>Données d'utilisation (comment vous utilisez notre site et nos services).</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Comment nous utilisons vos données</h2>
            <p>Nous utilisons vos données personnelles uniquement lorsque la loi nous y autorise. Le plus souvent, nous utilisons vos données personnelles pour :</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Vous fournir nos services.</li>
                <li>Gérer notre relation avec vous.</li>
                <li>Améliorer notre site web et nos services.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">4. Sécurité des données</h2>
            <p>Nous avons mis en place des mesures de sécurité appropriées pour empêcher que vos données personnelles ne soient accidentellement perdues, utilisées ou consultées de manière non autorisée.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">5. Vos droits légaux</h2>
            <p>Dans certaines circonstances, vous avez des droits en vertu des lois sur la protection des données concernant vos données personnelles, y compris le droit d'accès, de correction, d'effacement et de limitation du traitement.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">6. Contactez-nous</h2>
            <p>Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à support@boostshop.com.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;