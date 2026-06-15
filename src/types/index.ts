export type SubStationType = "scenic" | "museum" | "performance" | "nighttour";

export type SkinType = "default" | "spring" | "national" | "midautumn" | "dragonboat";

export interface NavItem {
  label: string;
  href: string;
}

export interface SubStationConfig {
  type: SubStationType;
  route: string;
  name: string;
  shortName: string;
  slogan: string;
  heroImage: string;
  mobileHeroImage?: string;
  openTime: string;
  address: string;
  phone: string;
  traffic: string;
  ticketUrl: string;
  basePrice: number;
  accentColor: string;
  iconName: string;
  navItems: NavItem[];
}

export interface Activity {
  id: string;
  title: string;
  coverImage: string;
  dateRange: string;
  price: number;
  tags: string[];
  description: string;
  stationType: SubStationType;
  highlights?: string[];
}

export interface SkinTheme {
  name: SkinType;
  displayName: string;
  description: string;
  previewEmoji: string;
  cssVars: {
    "--color-primary": string;
    "--color-secondary": string;
    "--color-accent": string;
    "--color-bg-pattern": string;
    "--hero-overlay": string;
  };
}
