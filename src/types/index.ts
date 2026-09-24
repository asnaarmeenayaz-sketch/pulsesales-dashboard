export type Category = 'all' | 'beds' | 'living' | 'wardrobes' | 'kitchens' | 'tables';

export type FinishType = 'charcoal' | 'natural' | 'walnut' | 'bronze';

export interface FinishOption {
  id: FinishType;
  name: string;
  hex: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  pricePKR: number;
  originalPricePKR?: number;
  image: string;
  alloyGrade: string;
  dimensions: string;
  weightKg: number;
  termiteProofGuarantee: string;
  washable: boolean;
  warrantyYears: number;
  description: string;
  features: string[];
  specs: { [key: string]: string };
}

export interface CartItem {
  product: Product;
  selectedFinish: FinishType;
  quantity: number;
}

export interface SlideData {
  number: number;
  title: string;
  subtitle?: string;
  content: string[];
  metrics?: { value: string; label: string; note?: string }[];
  highlight?: string;
  category: 'introduction' | 'market' | 'advantage' | 'strategy' | 'conclusion';
}

export interface FigmaToken {
  name: string;
  value: string;
  type: 'color' | 'spacing' | 'borderRadius' | 'fontFamily' | 'fontSize' | 'boxShadow';
}
