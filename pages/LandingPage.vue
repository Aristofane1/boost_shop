<script setup lang="ts">
// Simple static landing page
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#111621] text-[#111827] dark:text-white font-sans overflow-x-hidden">
    <!-- Header -->
    <header class="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-[#111621]/80 backdrop-blur-md z-50 transition-all">
      <div class="flex items-center gap-2">
          <div class="size-8">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                  <rect width="40" height="40" rx="12" fill="#16a34a" />
                  <path d="M20 8C22.2091 8 24 9.79086 24 12V14H16V12C16 9.79086 17.7909 8 20 8Z" stroke="white" strokeWidth="2.5"/>
                  <path d="M10 15C10 13.8954 10.8954 13 12 13H28C29.1046 13 30 13.8954 30 15V30C30 31.1046 29.1046 32 28 32H12C10.8954 32 10 31.1046 10 30V15Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                  <path d="M21 18L17 24H22L19 30L24 23H18L21 18Z" fill="white"/>
              </svg>
          </div>
          <span class="text-xl font-bold tracking-tight">BoostShop</span>
      </div>
      <nav class="hidden md:flex gap-8">
          <a href="#benefits" class="text-sm font-medium hover:text-primary transition-colors">Avantages</a>
          <a href="#features" class="text-sm font-medium hover:text-primary transition-colors">Fonctionnalités</a>
          <a href="#testimonials" class="text-sm font-medium hover:text-primary transition-colors">Avis</a>
      </nav>
      <div class="flex items-center gap-3">
          <router-link to="/auth/login" class="hidden sm:block px-4 py-2 text-sm font-bold text-[#111827] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Se connecter</router-link>
          <router-link to="/auth/register" class="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 transform hover:scale-105 duration-200">Créer un compte</router-link>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative pt-20 pb-32 lg:pt-32 lg:pb-40 px-4 text-center overflow-hidden">
      <!-- Background blobs -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div class="absolute top-20 left-10 w-72 h-72 bg-green-200/20 dark:bg-green-900/20 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-5xl mx-auto space-y-8 relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 text-green-700 dark:text-green-300 text-xs font-semibold uppercase tracking-wide">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Nouveau : Gestion des livreurs incluse
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Votre WhatsApp devient une <br/>
              <span class="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400">Machine à Vendre.</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Automatisez vos ventes, gérez vos livraisons et boostez votre chiffre d'affaires sans effort technique.
          </p>
          <div class="pt-6 flex flex-col sm:flex-row justify-center gap-4">
               <router-link to="/auth/register" class="h-14 px-8 flex items-center justify-center bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-dark hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  Commencer maintenant
                  <span class="material-symbols-outlined ml-2">arrow_forward</span>
               </router-link>
               <a href="#demo" class="h-14 px-8 flex items-center justify-center bg-white dark:bg-[#1f2937] text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 font-bold text-lg rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                  Voir la démo
               </a>
          </div>
          
          <div class="pt-16 relative">
              <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-[#111621] via-transparent to-transparent h-20 bottom-0 z-20"></div>
              <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" 
                  alt="Tableau de bord de croissance business avec graphiques sur écran" 
                  class="rounded-2xl shadow-2xl border-4 border-gray-100 dark:border-gray-800 max-w-full w-[1000px] mx-auto transform hover:scale-[1.01] transition-transform duration-500"
              />
          </div>
      </div>
    </section>
  </div>
</template>