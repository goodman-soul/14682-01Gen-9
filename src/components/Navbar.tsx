import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  User,
  Mountain,
  Landmark,
  Theater,
  Ship,
  Palette,
} from "lucide-react";
import { getSubStationList } from "@/data/subStations";
import { useSubStation } from "@/hooks/useSubStation";
import { useAppStore } from "@/store/useAppStore";
import type { SubStationType } from "@/types";

const ICON_MAP: Record<string, typeof Mountain> = {
  Mountain,
  Landmark,
  Theater,
  Ship,
};

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stationMenu, setStationMenu] = useState(false);
  const { config } = useSubStation();
  const { currentStation, setCurrentStation, togglePreviewMode, isPreviewMode } = useAppStore();
  const navigate = useNavigate();
  const stations = getSubStationList();

  const handleStationChange = (type: SubStationType, route: string) => {
    setCurrentStation(type);
    if (!isPreviewMode) navigate(route);
    setStationMenu(false);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/40 shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStationMenu(!stationMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl2 hover:bg-[var(--color-primary)]/8 transition-all"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: config.accentColor }}
            >
              {(() => {
                const IconComp = ICON_MAP[config.iconName] || Mountain;
                return <IconComp size={20} strokeWidth={2.2} />;
              })()}
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-serif font-bold text-[var(--color-primary)] leading-tight">
                城市文旅
              </div>
              <div className="text-[11px] text-gray-500 leading-tight">
                {config.shortName}
              </div>
            </div>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-1">
          {config.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[var(--color-primary)] transition-colors rounded-lg hover:bg-[var(--color-primary)]/5"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-gray-100/80 rounded-xl2 px-3 py-2 gap-2 w-64 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30 transition-all">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="搜索景点、活动..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={togglePreviewMode}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl2 text-sm font-medium transition-all ${
              isPreviewMode
                ? "bg-[var(--color-accent)] text-white shadow-glow"
                : "border border-[var(--color-primary)]/20 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
            }`}
            title="运营预览模式"
          >
            <Palette size={16} />
            <span className="hidden lg:inline">{isPreviewMode ? "预览中" : "运营预览"}</span>
          </button>

          <button className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <User size={18} className="text-gray-600" />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl2 flex items-center justify-center hover:bg-gray-100"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {stationMenu && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[92%] max-w-md glass border border-white/50 rounded-2xl shadow-card-hover p-3 animate-fade-in">
          <div className="text-xs font-medium text-gray-500 px-2 py-1.5">快速切换子站</div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {stations.map((s) => {
              const IconComp = ICON_MAP[s.iconName] || Mountain;
              const active = s.type === currentStation;
              return (
                <button
                  key={s.type}
                  onClick={() => handleStationChange(s.type, s.route)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    active
                      ? "bg-[var(--color-primary)] text-white shadow-card"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      active ? "bg-white/15 text-white" : "text-white"
                    }`}
                    style={active ? undefined : { backgroundColor: s.accentColor }}
                  >
                    <IconComp size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-sm truncate ${active ? "" : "text-gray-800"}`}>
                      {s.shortName}
                    </div>
                    <div className={`text-[11px] truncate ${active ? "text-white/70" : "text-gray-500"}`}>
                      {s.slogan}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="lg:hidden glass border-t border-white/50 animate-fade-in">
          <div className="container py-4 space-y-1">
            {config.navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl2 text-gray-700 hover:bg-[var(--color-primary)]/5 font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-200/50 space-y-1">
              <div className="text-xs font-semibold text-gray-500 px-4 pb-1">切换子站</div>
              {stations.map((s) => {
                const IconComp = ICON_MAP[s.iconName] || Mountain;
                const active = s.type === currentStation;
                return (
                  <button
                    key={s.type}
                    onClick={() => handleStationChange(s.type, s.route)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl2 transition-all text-left ${
                      active ? "bg-[var(--color-primary)] text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        active ? "bg-white/15" : "text-white"
                      }`}
                      style={active ? undefined : { backgroundColor: s.accentColor }}
                    >
                      <IconComp size={16} />
                    </div>
                    <span className="font-medium text-sm">{s.shortName}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => {
                togglePreviewMode();
                setMenuOpen(false);
              }}
              className={`w-full mt-3 px-4 py-3 rounded-xl2 text-sm font-medium flex items-center justify-center gap-2 ${
                isPreviewMode
                  ? "bg-[var(--color-accent)] text-white shadow-glow"
                  : "border border-[var(--color-primary)]/20 text-[var(--color-primary)]"
              }`}
            >
              <Palette size={16} />
              {isPreviewMode ? "退出运营预览模式" : "进入运营预览模式"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
