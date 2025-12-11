<script setup lang="ts">
import { ref, computed } from 'vue';

const balance = ref(2000);

const chartData = [
  { name: 'Lun', value: 12 },
  { name: 'Mar', value: 19 },
  { name: 'Mer', value: 3 },
  { name: 'Jeu', value: 5 },
  { name: 'Ven', value: 2 },
  { name: 'Sam', value: 3 },
  { name: 'Dim', value: 9 },
];

const stats = computed(() => [
    { label: 'Commandes traitées', value: '1,204', icon: 'shopping_cart' },
    { label: 'Solde de frais', value: `${new Intl.NumberFormat('fr-FR').format(balance.value)} XOF`, icon: 'account_balance_wallet' },
    { label: 'Produits actifs', value: '57', icon: 'label' }
]);

const quickActions = [
    { label: 'Ajouter un produit', icon: 'add_circle', path: '/products/add' },
    { label: 'Recharger solde', icon: 'payments', path: '/finance' },
    { label: 'Connecter WhatsApp', icon: 'smartphone', path: '/connect-whatsapp' },
];

// Simple SVG Chart Logic
const maxVal = Math.max(...chartData.map(d => d.value));
const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = 100 - (d.value / maxVal) * 80; // 80% height usage
    return `${x},${y}`;
}).join(' ');
const fillPath = `0,100 ${points} 100,100`;
</script>

<template>
  <div class="p-6 lg:p-10 max-w-7xl mx-auto">
    <header class="flex items-center justify-between mb-8">
      <h2 class="text-[#111827] dark:text-white text-2xl font-bold leading-tight">Dashboard Overview</h2>
      <div class="flex items-center gap-4">
          <button class="flex items-center justify-center rounded-full w-10 h-10 hover:bg-gray-100 dark:hover:bg-white/10">
              <span class="material-symbols-outlined">notifications</span>
          </button>
          <router-link to="/profile">
              <div class="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWIkTo4dowN2xnfimwoWwE_SwjmLgN8A_p5NcZsdEnajAL8AOJDcFhugAjfqsOjWkf00EF1WeFNgxHgIUe1dkCMOUoaUvWXLndAxMm0v2J2GnTcD750UjupCF9CvJz2LYLtYPSC3TDa71xVHRPtfldYGDTaMTM8-JXovB3vJKjcyNnIzZpZiI7C5pTVm5w806wbCPWRr7nWDWzCAO6B7RJp04LdWAuG2yVtWCZfAHyKSMi-NvfDv6zEPPHKr7RQkPrUms94KbYsp45')"></div>
          </router-link>
      </div>
    </header>

    <!-- Critical Alerts -->
    <div v-if="balance < 5000" class="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
            <div class="size-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                <span class="material-symbols-outlined">warning</span>
            </div>
            <div>
                <h3 class="font-bold text-red-800 dark:text-red-300">Solde de frais critique</h3>
                <p class="text-sm text-red-600 dark:text-red-400">
                    {{ balance <= 0 
                      ? "Votre solde est épuisé. L'IA a été stoppée. Veuillez recharger pour reprendre les ventes." 
                      : `Il ne vous reste que ${new Intl.NumberFormat('fr-FR').format(balance)} XOF. Rechargez pour éviter une interruption.` }}
                </p>
            </div>
        </div>
        <router-link to="/finance" class="whitespace-nowrap px-4 py-2 bg-red-600 text-white font-bold rounded-lg text-sm hover:bg-red-700 transition-colors">
            Recharger
        </router-link>
    </div>

    <!-- Status Cards -->
    <div class="grid grid-cols-1 mb-8">
      <div class="bg-white dark:bg-[#181e29] p-6 rounded-xl border border-gray-200 dark:border-white/10 flex justify-between items-center">
          <div>
              <p class="text-[#111827] dark:text-white font-bold mb-2">Statut WhatsApp & IA</p>
              <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full" :class="balance > 0 ? 'bg-green-500' : 'bg-red-500'"></span>
                  <span class="text-gray-500 dark:text-gray-400 text-sm">
                      {{ balance > 0 ? 'Connecté & Actif' : 'Stoppé (Solde insuffisant)' }}
                  </span>
              </div>
          </div>
          <router-link to="/connect-whatsapp" class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
              <span class="material-symbols-outlined text-lg">qr_code_scanner</span>
              Réglages
          </router-link>
      </div>
    </div>

    <h3 class="text-xl font-bold mb-6 text-[#111827] dark:text-white">Statistiques</h3>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
         <div v-for="(stat, idx) in stats" :key="idx" class="bg-white dark:bg-[#181e29] p-6 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-4">
            <div class="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-3xl">{{ stat.icon }}</span>
            </div>
            <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">{{ stat.label }}</p>
                <p class="text-2xl font-bold text-[#111827] dark:text-white">{{ stat.value }}</p>
            </div>
         </div>
    </div>

    <!-- Chart Section (Simple SVG Replacement) -->
    <div class="bg-white dark:bg-[#181e29] p-6 rounded-xl border border-gray-200 dark:border-white/10">
      <div class="flex justify-between items-center mb-6">
          <h4 class="font-bold text-[#111827] dark:text-white">Évolution des Ventes (Directes)</h4>
          <div class="flex bg-gray-100 dark:bg-white/10 rounded-lg p-1">
              <button v-for="(filter, i) in ['Jour', 'Mois', 'Année']" :key="filter" class="px-3 py-1 text-sm rounded-md transition-colors" :class="i === 0 ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'">
                  {{ filter }}
              </button>
          </div>
      </div>
      <div class="h-[300px] w-full relative">
          <!-- Custom SVG Chart -->
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full overflow-visible">
             <!-- Grid Lines -->
             <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" stroke-width="0.2" stroke-dasharray="2" opacity="0.3" />
             <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" stroke-width="0.2" stroke-dasharray="2" opacity="0.3" />
             <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" stroke-width="0.2" stroke-dasharray="2" opacity="0.3" />
             
             <!-- Area -->
             <polygon :points="fillPath" fill="#2563eb" fill-opacity="0.1" />
             <!-- Line -->
             <polyline :points="points.replace(/ /g, ', ')" fill="none" stroke="#2563eb" stroke-width="0.5" />
          </svg>
          <!-- X Axis Labels -->
          <div class="flex justify-between mt-2 text-xs text-gray-400">
             <span v-for="d in chartData" :key="d.name">{{ d.name }}</span>
          </div>
      </div>
    </div>

    <!-- Quick Actions -->
     <div class="mt-8">
      <h3 class="text-xl font-bold mb-6 text-[#111827] dark:text-white">Actions rapides</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link v-for="(action, idx) in quickActions" :key="idx" :to="action.path" class="bg-white dark:bg-[#181e29] p-6 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-4 hover:border-primary/50 transition-colors group">
              <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span class="material-symbols-outlined">{{ action.icon }}</span>
              </div>
              <p class="font-semibold text-[#111827] dark:text-white">{{ action.label }}</p>
          </router-link>
      </div>
     </div>
  </div>
</template>