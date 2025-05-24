// types/subscription.ts
export interface Plan {
    id: string;
    name: string;
    price: number;
    period: string;
    credits: number;
    features: string[];
    recommended: boolean;
  }
  
  export interface BillingItem {
    id: number;
    date: string;
    description: string;
    amount: string;
    status: string;
    invoice: string;
  }
  
  export interface CreditPackage {
    id: string;
    credits: number;
    price: number;
    originalPrice: number;
    savings: number;
    perCredit: number;
    icon: any;
    color: string;
    bgColor: string;
    popular?: boolean;
  }