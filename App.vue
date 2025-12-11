<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';

const route = useRoute();
const sidebarOpen = ref(false);

const isPublic = computed(() => {
  const path = route.path;
  return path === '/' || path.startsWith('/auth') || path === '/privacy-policy' || path === '/terms-of-service';
});
</script>

<template>
  <div v-if="isPublic">
    <router-view />
  </div>

  <div v-else class="flex min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white relative">
    
    <!-- Mobile Overlay -->
    <div 
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    
    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Mobile Header -->
      <header class="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-[#111621] border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div class="flex items-center gap-3">
              <button 
                  @click="sidebarOpen = true"
                  class="p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                  <span class="material-symbols-outlined">menu</span>
              </button>
              <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div class="size-8">
                      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                          <rect width="40" height="40" rx="12" fill="#16a34a" />
                          <path d="M20 8C22.2091 8 24 9.79086 24 12V14H16V12C16 9.79086 17.7909 8 20 8Z" stroke="white" strokeWidth="2.5"/>
                          <path d="M10 15C10 13.8954 10.8954 13 12 13H28C29.1046 13 30 13.8954 30 15V30C30 31.1046 29.1046 32 28 32H12C10.8954 32 10 31.1046 10 30V15Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                          <path d="M21 18L17 24H22L19 30L24 23H18L21 18Z" fill="white"/>
                      </svg>
                  </div>
                  <span class="font-bold text-lg">BoostShop</span>
              </router-link>
          </div>
          <div class="size-8 bg-center bg-no-repeat bg-cover rounded-full" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMN1DRw4KLSu3wy2Xeg-0tHuOO8XUSeelJv1yqujp4J3Pr0w9Dom7j2SJzznDwq3UZXe90u2yqtyZjDPLEbgRiq1WDrrPTtBFNu8wEGO7gKPEXFkH-sBEW-jthiSG7KrRaIslhq3LFL-5Shy0AQiJUfJzz4jmGbcrf5crR8Cfnr4HjxTRiZUxrMp9Cd-hiDTDg8Ah8SJ5jSreIZ4M5j-7dvXdxRWpWQlkE1guAJzYA4shOb7sWNGXCpjUHPYPdFZq5jNFcKc129cQZ')"></div>
      </header>

      <main class="flex-1 overflow-y-auto">
          <router-view />
      </main>
    </div>
  </div>
</template>