import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

// Lazy load components to mimic standard structure
const LandingPage = () => import('./pages/LandingPage.vue');
const DashboardOverview = () => import('./pages/DashboardOverview.vue');
const ProductsPage = () => import('./pages/ProductsPage.vue');
const AddProductPage = () => import('./pages/AddProductPage.vue');
const DeliveriesPage = () => import('./pages/DeliveriesPage.vue');
const DriversPage = () => import('./pages/DriversPage.vue');
const AIConfigurationPage = () => import('./pages/AIConfigurationPage.vue');
const ProfilePage = () => import('./pages/ProfilePage.vue');
const AuthPage = () => import('./pages/AuthPage.vue');
const ConnectWhatsAppPage = () => import('./pages/ConnectWhatsAppPage.vue');
const PrivacyPolicyPage = () => import('./pages/PrivacyPolicyPage.vue');
const TermsPage = () => import('./pages/TermsPage.vue');
const FinancePage = () => import('./pages/FinancePage.vue');
const CustomersPage = () => import('./pages/CustomersPage.vue');
const MarketingPage = () => import('./pages/MarketingPage.vue');
const SupportPage = () => import('./pages/SupportPage.vue');
const AdminSystemPage = () => import('./pages/AdminSystemPage.vue');

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: LandingPage },
  { path: '/auth/:mode', component: AuthPage }, // login, register, etc
  { path: '/privacy-policy', component: PrivacyPolicyPage },
  { path: '/terms-of-service', component: TermsPage },
  { path: '/dashboard', component: DashboardOverview },
  { path: '/customers', component: CustomersPage },
  { path: '/products', component: ProductsPage },
  { path: '/products/add', component: AddProductPage },
  { path: '/products/edit/:id', component: AddProductPage },
  { path: '/deliveries', component: DeliveriesPage },
  { path: '/drivers', component: DriversPage },
  { path: '/finance', component: FinancePage },
  { path: '/marketing', component: MarketingPage },
  { path: '/ai-config', component: AIConfigurationPage },
  { path: '/profile', component: ProfilePage },
  { path: '/connect-whatsapp', component: ConnectWhatsAppPage },
  { path: '/support', component: SupportPage },
  { path: '/admin-system', component: AdminSystemPage },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;