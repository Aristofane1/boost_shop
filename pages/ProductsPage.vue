<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Product } from '../types';

const router = useRouter();

const products = ref<Product[]>([
  {
    id: '1',
    name: 'Casque Audio Pro',
    description: 'Casque sans fil haute fidélité avec réduction de bruit active.',
    price: 65000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8_ozS856_1dexpoobVQGvpLCS8Q-xSZzlSzKj_I-3Sx9ZribiEKM7qjED7fuYvJamNjk8-0KagNpeky0Pkepp_m_CpZAyv5cMOsFWiY1e21G6CFbkRyB1AtmpRHpoD2ltb6_JRkRDhgWEFlhom0NjLlecVuImtJaRm_GpEV4tXgkGMCfQiE2giclvk76WdE1Bq72gvkhm9kIdpJWKeD2pm-gIpRSvcRBuB5dAwjPcspKnfi_cXmjkZV1qEAhq_FINYJ6Y7FiMV19F',
    category: 'Électronique',
    stockStatus: 'finite',
    stockQuantity: 12,
    lowStockThreshold: 5
  },
  {
    id: '2',
    name: 'Clavier Mécanique',
    description: 'Clavier mécanique conçu pour le confort et la productivité.',
    price: 80000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9PopQe0c1rvLtoA7UwlKxt5i1CwDJ-q8iZJkeTtgKJxUAm3cmr-pD3HfLh8b6LQGLcMThT_mNWABqvVM450doOTBVmAyUcpMeTCI1VLOLhBqVc3S5nDxGauThojweTrvckZ-5bYl6f3X7HLNu0nG2oIV4zywQqRy9w9Wd7VQlHkI1hI50vuZ8IjORhHgoehO8e0FdQboa0e22fWXiTcV6NpJ5J2NGMrceSJX9wCpWzTVYoUB7I1EUzk_zzRI1fXGD17iQa5OrrP25',
    category: 'Électronique',
    stockStatus: 'unlimited'
  },
  {
    id: '3',
    name: 'Webcam 4K Pro',
    description: 'Webcam 4K professionnelle avec mise au point automatique et correction de lumière.',
    price: 50000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXt52a34pe3J5WsXNoZvyDBxh70Rvl3w4P9j_XMowb4EnYJKirAs2V-ScA7Z1fMx-z85HUF5M-1AqNXontJZ21IfqO740dacwmjQFAOfuG7SHKfVUOX7h7W9o5v7NGpJIUWPQTCSxvodgz1QcxewHSXMngxCZLXmCYVN5DHdVAgnhZIFBp_xkFPre_hlcSFy7W9zVjnMPxM2wRjID3ihFrvFQrAbNoclR66u4Xes1g5M8sn1FdA6AM3J-XGmIb7FWEyw-nJ6I-G8CX',
    category: 'Électronique',
    stockStatus: 'finite',
    stockQuantity: 2,
    lowStockThreshold: 5
  }
]);

const handleDelete = (id: string) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.")) {
    products.value = products.value.filter(product => product.id !== id);
  }
};

const handleEdit = (product: Product) => {
    // In Vue Router we pass object via state or params, but params are deprecated for objects.
    // We will simulate state passing by using query or just by ID and fetching (mocked here by assuming AddProductPage handles ID).
    // For this demo, we can just navigate to the edit URL.
    router.push({ path: `/products/edit/${product.id}` });
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
};
</script>

<template>
  <div class="p-6 lg:p-10 max-w-7xl mx-auto">
    <header class="flex flex-wrap justify-between items-center gap-4 mb-8">
      <h1 class="text-[#111827] dark:text-white text-3xl font-black leading-tight">Catalogue Produits</h1>
      <router-link to="/products/add" class="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors">
        <span class="material-symbols-outlined">add</span>
        Ajouter un produit
      </router-link>
    </header>

    <!-- Search -->
    <div class="mb-8">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span class="material-symbols-outlined text-gray-400">search</span>
        </div>
        <input 
          type="text" 
          class="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm"
          placeholder="Rechercher un produit..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-[#181e29] rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Produit</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prix</th>
              <th scope="col" class="relative px-6 py-4"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-4">
                  <div 
                    class="h-12 w-12 rounded-lg bg-cover bg-center bg-no-repeat bg-gray-100 dark:bg-gray-800"
                    :style="{ backgroundImage: `url('${product.image}')` }"
                  ></div>
                  <div class="flex flex-col">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ product.name }}</div>
                    <div class="text-xs text-gray-500 max-w-[200px] truncate">{{ product.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="product.stockStatus === 'unlimited'" class="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-0.5 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-700">
                    <span class="material-symbols-outlined text-[14px]">all_inclusive</span> Illimité
                </span>
                <span v-else-if="(product.stockQuantity || 0) <= 0" class="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-red-200 dark:border-red-800">
                    <span class="material-symbols-outlined text-[14px]">block</span> Rupture
                </span>
                <span v-else-if="(product.stockQuantity || 0) <= (product.lowStockThreshold || 5)" class="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-orange-200 dark:border-orange-800">
                    <span class="material-symbols-outlined text-[14px]">warning</span> Faible ({{ product.stockQuantity }})
                </span>
                <span v-else class="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span> En stock ({{ product.stockQuantity }})
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ formatPrice(product.price) }} XOF
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="handleEdit(product)"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Modifier"
                  >
                    <span class="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button 
                    @click="handleDelete(product.id)"
                    class="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    title="Supprimer le produit"
                  >
                    <span class="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="products.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                Aucun produit trouvé.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
     <!-- Pagination (Mock) -->
     <div v-if="products.length > 0" class="flex items-center justify-center mt-8 gap-2">
          <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm">2</button>
          <span class="text-gray-400">...</span>
          <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><span class="material-symbols-outlined">chevron_right</span></button>
     </div>
  </div>
</template>