import {
  Plane,
  Sprout,
  Cpu,
  Car,
  Landmark,
  ShoppingBag,
  Trophy,
  Pill,
  Building2,
  Factory,
  Film,
  Fuel,
  UtensilsCrossed,
  Store,
  HeartPulse,
  Shield,
  Radio,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Industry {
  name: string;
  icon: LucideIcon;
}

export const industries: Industry[] = [
  { name: "Aerolíneas y Aeropuertos", icon: Plane },
  { name: "Agronegocios", icon: Sprout },
  { name: "Alta Tecnología", icon: Cpu },
  { name: "Automotriz", icon: Car },
  { name: "Banca y Servicios Financieros", icon: Landmark },
  { name: "Bienes de Consumo", icon: ShoppingBag },
  { name: "Deportes Profesionales", icon: Trophy },
  { name: "Farmacéutica y Belleza", icon: Pill },
  { name: "Gobierno y Servicios Públicos", icon: Building2 },
  { name: "Industrial", icon: Factory },
  { name: "Medios y Entretenimiento", icon: Film },
  { name: "Oil & Gas", icon: Fuel },
  { name: "Restaurantes y Hospitalidad", icon: UtensilsCrossed },
  { name: "Retail", icon: Store },
  { name: "Salud", icon: HeartPulse },
  { name: "Seguros", icon: Shield },
  { name: "Telecomunicaciones", icon: Radio },
  { name: "Transporte y Logística", icon: Truck },
  { name: "Utilities y Energía", icon: Zap },
];
