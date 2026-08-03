import {
  ShoppingCart,
  Users,
  Globe,
  Package,
  UtensilsCrossed,
  Stethoscope,
  Store,
  Building,
  Home,
  BarChart3,
  Database,
  LineChart,
  Landmark,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Sistemas de Ventas",
    description:
      "Plataformas de punto de venta y gestión comercial diseñadas para optimizar tus operaciones diarias.",
    icon: ShoppingCart,
  },
  {
    title: "CRM",
    description:
      "Gestión integral de relaciones con clientes para impulsar ventas y fidelización en tu negocio.",
    icon: Users,
  },
  {
    title: "Tienda en Línea",
    description:
      "E-commerce completo con catálogo, pagos, envíos y panel administrativo a la medida.",
    icon: Globe,
  },
  {
    title: "Inventarios",
    description:
      "Control de stock en tiempo real, alertas automáticas y trazabilidad de productos.",
    icon: Package,
  },
  {
    title: "Restaurantes",
    description:
      "Sistemas para comandas, mesas, cocina y delivery integrados en una sola plataforma.",
    icon: UtensilsCrossed,
  },
  {
    title: "Consultorios Médicos",
    description:
      "Expedientes clínicos, agenda de citas, facturación y gestión de pacientes segura.",
    icon: Stethoscope,
  },
  {
    title: "Tiendas de Conveniencia",
    description:
      "Soluciones tipo OXXO con POS, surtido, promociones y reportes por sucursal.",
    icon: Store,
  },
  {
    title: "Bienes Raíces",
    description:
      "Portales inmobiliarios, CRM de propiedades y herramientas de gestión comercial.",
    icon: Building,
  },
  {
    title: "Administración de Condominios",
    description:
      "Control de cuotas, residentes, mantenimiento y comunicación centralizada.",
    icon: Home,
  },
  {
    title: "Análisis de Datos",
    description:
      "Procesamiento, visualización y explotación de datos para convertir información en decisiones estratégicas.",
    icon: BarChart3,
  },
  {
    title: "Business Intelligence",
    description:
      "Dashboards ejecutivos, KPIs en tiempo real y reportes automatizados para el control de tu operación.",
    icon: LineChart,
  },
  {
    title: "Minería de Datos",
    description:
      "Extracción de patrones, predicciones y modelos de machine learning para anticipar tendencias.",
    icon: Database,
  },
  {
    title: "Gobierno e Instituciones",
    description:
      "Sistemas a la medida para dependencias públicas: trámites, gestión documental, transparencia y reportes.",
    icon: Landmark,
  },
];

export const serviceOptions = [
  "Software a la medida",
  ...services.map((s) => s.title),
];
