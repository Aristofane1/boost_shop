import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const AuthLayout: React.FC<{ children: React.ReactNode; title: string; subtitle?: string }> = ({ children, title, subtitle }) => (
  <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
    <div className="w-full max-w-md bg-white dark:bg-[#1f2937] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-6">
            <span className="material-symbols-outlined text-3xl">webhook</span>
        </Link>
        <h1 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">{title}</h1>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>}
      </div>
      {children}
    </div>
  </div>
);

const Login = () => {
    const navigate = useNavigate();
    return (
        <AuthLayout title="Bienvenue !" subtitle="Connectez-vous à votre compte pour continuer.">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">Email</label>
                    <input type="email" placeholder="vous@exemple.com" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="block text-sm font-medium dark:text-gray-200">Mot de passe</label>
                        <Link to="/auth/forgot-password" className="text-xs text-primary font-medium hover:underline">Oublié ?</Link>
                    </div>
                    <input type="password" placeholder="••••••••" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
                </div>
                <button type="submit" className="w-full h-11 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark">Se connecter</button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
                Pas encore de compte ? <Link to="/auth/register" className="text-primary font-semibold hover:underline">Créer un compte</Link>
            </p>
        </AuthLayout>
    );
};

const Register = () => (
    <AuthLayout title="Créez votre compte" subtitle="Commencez à automatiser vos ventes aujourd'hui.">
         <div className="space-y-3 mb-6">
            <button className="w-full h-11 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors">
                 <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                 S'inscrire avec Google
            </button>
            <button className="w-full h-11 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors">
                 <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                 S'inscrire avec Facebook
            </button>
         </div>
         
         <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-[#1f2937] text-gray-500">ou continuer avec</span></div>
         </div>

         <form className="space-y-4">
             <input type="text" placeholder="Nom complet" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
             <input type="email" placeholder="Email" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
             <input type="password" placeholder="Mot de passe" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
             <Link to="/dashboard" className="w-full h-11 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark flex items-center justify-center">S'inscrire</Link>
         </form>
         
         <p className="mt-6 text-center text-sm text-gray-500">
            Déjà un compte ? <Link to="/auth/login" className="text-primary font-semibold hover:underline">Se connecter</Link>
        </p>
    </AuthLayout>
);

const ForgotPassword = () => (
     <AuthLayout title="Mot de passe oublié ?" subtitle="Entrez votre email pour réinitialiser.">
         <form className="space-y-6">
             <input type="email" placeholder="vous@exemple.com" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 px-4 focus:ring-primary/50 focus:border-primary" />
             <Link to="/auth/otp" className="w-full h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark flex items-center justify-center">Envoyer les instructions</Link>
         </form>
         <div className="mt-8 text-center">
            <Link to="/auth/login" className="text-primary font-medium hover:underline flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Retour
            </Link>
         </div>
     </AuthLayout>
);

const OTP = () => (
    <AuthLayout title="Vérification Requise" subtitle="Nous avons envoyé un code à votre email.">
        <div className="flex justify-center gap-2 my-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <input key={i} type="text" maxLength={1} className="w-10 h-12 text-center text-xl font-bold rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white focus:ring-primary/50 focus:border-primary" />
            ))}
        </div>
        <Link to="/auth/reset-password" className="w-full h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark flex items-center justify-center">Vérifier</Link>
        <p className="mt-6 text-center text-sm text-gray-500">Rien reçu ? <a href="#" className="text-primary font-semibold hover:underline">Renvoyer</a></p>
    </AuthLayout>
);

const ResetPassword = () => (
    <AuthLayout title="Nouveau mot de passe" subtitle="Créez un mot de passe sécurisé.">
         <div className="space-y-4">
            <input type="password" placeholder="Nouveau mot de passe" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 px-4 focus:ring-primary/50 focus:border-primary" />
            
            <div className="space-y-2">
                 <p className="text-sm font-medium dark:text-white">Force: Faible</p>
                 <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-red-500"></div>
                 </div>
            </div>

            <input type="password" placeholder="Confirmer le mot de passe" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-12 px-4 focus:ring-primary/50 focus:border-primary" />
            
            <Link to="/auth/success" className="w-full h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark flex items-center justify-center">Changer le mot de passe</Link>
         </div>
    </AuthLayout>
);

const Success = () => (
    <AuthLayout title="Succès !" subtitle="">
        <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-white">check</span>
            </div>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Votre mot de passe a été réinitialisé avec succès.</p>
        <Link to="/dashboard" className="w-full h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark flex items-center justify-center">Aller au tableau de bord</Link>
    </AuthLayout>
);

const AuthPage = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="otp" element={<OTP />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="success" element={<Success />} />
    </Routes>
  );
};

export default AuthPage;