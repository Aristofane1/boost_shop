<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const mode = computed(() => route.params.mode as string);

const titles: Record<string, string> = {
  login: "Bienvenue !",
  register: "Créez votre compte",
  'forgot-password': "Mot de passe oublié ?",
  otp: "Vérification Requise",
  'reset-password': "Nouveau mot de passe",
  success: "Succès !"
};

const subtitles: Record<string, string> = {
  login: "Connectez-vous à votre compte pour continuer.",
  register: "Commencez à automatiser vos ventes aujourd'hui.",
  'forgot-password': "Entrez votre email pour réinitialiser.",
  otp: "Nous avons envoyé un code à votre email.",
  'reset-password': "Créez un mot de passe sécurisé.",
  success: ""
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  router.push('/dashboard');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
    <div class="w-full max-w-md bg-white dark:bg-[#1f2937] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="text-center mb-8">
        <router-link to="/" class="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-6">
            <span class="material-symbols-outlined text-3xl">webhook</span>
        </router-link>
        <h1 class="text-2xl font-bold text-[#111827] dark:text-white mb-2">{{ titles[mode] || 'Auth' }}</h1>
        <p v-if="subtitles[mode]" class="text-gray-500 dark:text-gray-400 text-sm">{{ subtitles[mode] }}</p>
      </div>

      <!-- LOGIN -->
      <form v-if="mode === 'login'" class="space-y-4" @submit="handleSubmit">
          <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-200">Email</label>
              <input type="email" placeholder="vous@exemple.com" class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
          </div>
          <div>
              <div class="flex justify-between mb-1">
                  <label class="block text-sm font-medium dark:text-gray-200">Mot de passe</label>
                  <router-link to="/auth/forgot-password" class="text-xs text-primary font-medium hover:underline">Oublié ?</router-link>
              </div>
              <input type="password" placeholder="••••••••" class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
          </div>
          <button type="submit" class="w-full h-11 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark">Se connecter</button>
          <p class="mt-6 text-center text-sm text-gray-500">
              Pas encore de compte ? <router-link to="/auth/register" class="text-primary font-semibold hover:underline">Créer un compte</router-link>
          </p>
      </form>

      <!-- REGISTER -->
      <div v-else-if="mode === 'register'">
        <form class="space-y-4" @submit="handleSubmit">
             <input type="text" placeholder="Nom complet" class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
             <input type="email" placeholder="Email" class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
             <input type="password" placeholder="Mot de passe" class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-11 px-4 focus:ring-primary/50 focus:border-primary" />
             <button type="submit" class="w-full h-11 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark flex items-center justify-center">S'inscrire</button>
        </form>
         <p class="mt-6 text-center text-sm text-gray-500">
            Déjà un compte ? <router-link to="/auth/login" class="text-primary font-semibold hover:underline">Se connecter</router-link>
        </p>
      </div>

       <!-- SUCCESS -->
      <div v-else-if="mode === 'success'">
         <div class="flex justify-center mb-6">
            <div class="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                <span class="material-symbols-outlined text-4xl text-white">check</span>
            </div>
        </div>
        <p class="text-center text-gray-600 dark:text-gray-300 mb-8">Votre mot de passe a été réinitialisé avec succès.</p>
        <router-link to="/dashboard" class="w-full h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark flex items-center justify-center">Aller au tableau de bord</router-link>
      </div>

      <!-- DEFAULT FALLBACK -->
      <div v-else class="text-center">
         <router-link to="/auth/login" class="text-primary hover:underline">Retour à la connexion</router-link>
      </div>

    </div>
  </div>
</template>