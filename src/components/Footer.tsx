import { Heart } from "lucide-react";
import { useSubStation } from "@/hooks/useSubStation";

export const Footer = () => {
  const { config } = useSubStation();

  return (
    <footer className="relative border-t border-gray-200/60 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-lg font-serif font-bold shadow-card"
                style={{ backgroundColor: config.accentColor }}
              >
                文
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-gray-900">
                  城市文旅
                </div>
                <div className="text-xs text-gray-500">{config.shortName}</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              城市文旅子站系统，一站式聚合景区、博物馆、演出、夜游四大文旅资源。
              用心服务每一位游客，让城市文化更有温度。
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
              <Heart size={13} className="text-[var(--color-accent)] fill-current" />
              <span>欢迎来到{config.name}</span>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 text-sm mb-4">快速导航</h5>
            <ul className="space-y-2.5">
              {config.navItems.map((i) => (
                <li key={i.label}>
                  <a
                    href={i.href}
                    className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 text-sm mb-4">联系我们</h5>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="shrink-0 text-gray-400">📍</span>
                <span>{config.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="shrink-0 text-gray-400">📞</span>
                <a href={`tel:${config.phone}`} className="hover:text-[var(--color-primary)]">
                  {config.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 text-gray-400">🕒</span>
                <span className="leading-snug">{config.openTime}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © 2026 城市文旅平台 · {config.shortName} 保留所有权利
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-gray-600 transition-colors">服务条款</a>
            <a href="#" className="hover:text-gray-600 transition-colors">意见反馈</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
