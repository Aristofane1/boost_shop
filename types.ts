
export interface PaymentConfig {
  acceptCashOnDelivery: boolean;
  acceptFullOnlinePayment: boolean;
  acceptDeposit: boolean;
  depositAmount?: number; // Montant de l'acompte en XOF si acceptDeposit est true
}

export type StockStatus = 'unlimited' | 'finite';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  promoPrice?: number;
  minPrice?: number;
  image: string;
  category: string;
  paymentConfig?: PaymentConfig; // Configuration spécifique ou undefined (utilise par défaut)
  stockStatus: StockStatus;
  stockQuantity?: number;
  lowStockThreshold?: number; // Seuil pour alerte stock bas
}

export type DeliveryMode = 'delivery' | 'pickup' | 'digital';
export type PaymentMethod = 'cash' | 'online' | 'deposit';
export type PaymentStatus = 'pending' | 'paid' | 'partial';

export interface Order {
  id: string;
  customerName: string;
  address: string; // Pour le numérique, peut être l'email
  driver?: string;
  driverPhone?: string;
  status: 'En attente' | 'En cours' | 'Livrée' | 'Terminée' | 'Annulée';
  deliveryMode: DeliveryMode;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paidAmount: number; // Montant déjà payé
  remainingAmount: number; // Reste à payer (ex: à la livraison)
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  totalSpent: number; // Valeur Vie (LTV)
  orderCount: number;
  lastOrderDate: string;
  tags: ('VIP' | 'Nouveau' | 'Risque' | 'Fidèle')[];
  notes?: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'Draft' | 'Scheduled' | 'Sent';
  audience: string; // 'All', 'VIP', 'New'
  sentCount: number;
  openRate: number; // Percentage
  date: string;
  message: string;
  image?: string;
}

export interface GlobalSystemConfig {
    commissionPercentage: number;
    minBalanceThreshold: number;
    defaultAIModel: string;
    evolutionApiUrl: string;
    systemStatus: 'healthy' | 'degraded' | 'down';
    totalActiveInstances: number;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'qrcode_ready';

export type AIModel = 'mistral-large' | 'qwen-2.5' | 'gpt-4o-mini';

export interface AIConfig {
    model: AIModel;
    contextWindowSize: number; // 5 to 50
    adminAlertPhone: string; // Number to receive audio alerts
    personality: string;
    instructions: string;
}

export interface Ticket {
  id: string;
  subject: string;
  category: 'bug_ai' | 'billing' | 'feature' | 'other';
  status: 'open' | 'closed' | 'pending';
  date: string;
  lastUpdate: string;
}

export interface NavItem {
  label: string;
  icon: string;
  path: string;
  activeIconStyle?: boolean;
}
