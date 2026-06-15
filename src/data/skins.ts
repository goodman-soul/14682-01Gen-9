import type { SkinTheme } from "@/types";

export const skins: SkinTheme[] = [
  {
    name: "default",
    displayName: "青绿山水（默认）",
    description: "以传统青绿色彩为基调，温润雅致，日常使用",
    previewEmoji: "🏔️",
    cssVars: {
      "--color-primary": "#1A5F7A",
      "--color-secondary": "#0E3B4D",
      "--color-accent": "#C84B31",
      "--color-bg-pattern": "rgba(26, 95, 122, 0.04)",
      "--hero-overlay": "linear-gradient(135deg, rgba(14, 59, 77, 0.78) 0%, rgba(26, 95, 122, 0.58) 50%, rgba(200, 75, 49, 0.22) 100%)",
    },
  },
  {
    name: "spring",
    displayName: "瑞贺新春",
    description: "中国红配金色纹样，灯笼福字装饰，喜庆节日氛围",
    previewEmoji: "🧧",
    cssVars: {
      "--color-primary": "#B91C1C",
      "--color-secondary": "#7F1D1D",
      "--color-accent": "#F59E0B",
      "--color-bg-pattern": "rgba(185, 28, 28, 0.06)",
      "--hero-overlay": "linear-gradient(135deg, rgba(127, 29, 29, 0.82) 0%, rgba(185, 28, 28, 0.62) 50%, rgba(245, 158, 11, 0.3) 100%)",
    },
  },
  {
    name: "national",
    displayName: "国庆献礼",
    description: "红金绸带配色，五星点缀，庄重热烈的庆典氛围",
    previewEmoji: "🇨🇳",
    cssVars: {
      "--color-primary": "#DC2626",
      "--color-secondary": "#991B1B",
      "--color-accent": "#FBBF24",
      "--color-bg-pattern": "rgba(220, 38, 38, 0.05)",
      "--hero-overlay": "linear-gradient(135deg, rgba(153, 27, 27, 0.8) 0%, rgba(220, 38, 38, 0.6) 50%, rgba(251, 191, 36, 0.28) 100%)",
    },
  },
  {
    name: "midautumn",
    displayName: "皓月中秋",
    description: "月白银配桂花暖，玉兔云纹装饰，雅致团圆意境",
    previewEmoji: "🌕",
    cssVars: {
      "--color-primary": "#8874B8",
      "--color-secondary": "#5B4B8A",
      "--color-accent": "#E8A87C",
      "--color-bg-pattern": "rgba(136, 116, 184, 0.05)",
      "--hero-overlay": "linear-gradient(135deg, rgba(91, 75, 138, 0.78) 0%, rgba(136, 116, 184, 0.58) 50%, rgba(232, 168, 124, 0.25) 100%)",
    },
  },
  {
    name: "dragonboat",
    displayName: "端午安康",
    description: "艾草绿配雄黄橙，龙舟水波纹，清新传统节日感",
    previewEmoji: "🛶",
    cssVars: {
      "--color-primary": "#2F6B4F",
      "--color-secondary": "#1E4A38",
      "--color-accent": "#E07C3F",
      "--color-bg-pattern": "rgba(47, 107, 79, 0.05)",
      "--hero-overlay": "linear-gradient(135deg, rgba(30, 74, 56, 0.78) 0%, rgba(47, 107, 79, 0.58) 50%, rgba(224, 124, 63, 0.25) 100%)",
    },
  },
];

export const getSkin = (name: string): SkinTheme | undefined =>
  skins.find((s) => s.name === name);
