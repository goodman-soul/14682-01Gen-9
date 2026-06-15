import { X, Palette, Layout, Mountain, Landmark, Theater, Ship, Check } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useResponsive } from "@/hooks/useResponsive";
import { getSubStationList } from "@/data/subStations";
import { skins } from "@/data/skins";
import type { SubStationType, SkinType } from "@/types";
import { useNavigate } from "react-router-dom";

const ICON_MAP: Record<string, typeof Mountain> = {
  Mountain,
  Landmark,
  Theater,
  Ship,
};

export const PreviewPanel = () => {
  const {
    isPreviewMode,
    setPreviewMode,
    currentStation,
    currentSkin,
    setCurrentStation,
    setCurrentSkin,
  } = useAppStore();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const stations = getSubStationList();

  if (!isPreviewMode) return null;

  const handleStationChange = (type: SubStationType, route: string) => {
    setCurrentStation(type);
    navigate(route, { replace: false });
  };

  const containerClass = isMobile
    ? "fixed inset-x-0 bottom-0 top-auto z-[90] animate-fade-in-up"
    : "fixed right-0 top-0 bottom-0 z-[90] w-full max-w-sm animate-[fadeIn_0.3s_ease-out]";

  return (
    <div className="pointer-events-none">
      <div className={`pointer-events-auto ${containerClass}`}>
        <div className="h-full bg-white md:bg-white/95 md:backdrop-blur-2xl md:border-l md:border-gray-200 md:shadow-2xl rounded-t-3xl md:rounded-none flex flex-col max-h-[85vh] md:max-h-none overflow-hidden">
          <div
            className="relative p-5 md:p-6 text-white"
            style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }}
          >
            <button
              onClick={() => setPreviewMode(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-2">
              <Palette size={12} />
              运营预览模式
            </div>
            <h3 className="font-serif font-bold text-xl md:text-2xl">配置实时预览</h3>
            <p className="mt-1 text-white/80 text-sm">
              切换子站类型与节假日皮肤，实时预览展示效果
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layout size={16} className="text-[var(--color-primary)]" />
                <h4 className="font-bold text-gray-800">子站类型</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stations.map((s) => {
                  const IconComp = ICON_MAP[s.iconName] || Mountain;
                  const active = s.type === currentStation;
                  return (
                    <button
                      key={s.type}
                      onClick={() => handleStationChange(s.type, s.route)}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        active
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-card"
                          : "border-gray-100 bg-gray-50 hover:border-gray-200"
                      }`}
                    >
                      {active && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center">
                          <Check size={12} />
                        </div>
                      )}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: s.accentColor }}
                      >
                        <IconComp size={22} />
                      </div>
                      <div className="text-center">
                        <div className={`text-sm font-semibold ${active ? "text-[var(--color-primary)]" : "text-gray-800"}`}>
                          {s.shortName}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{s.type}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette size={16} className="text-[var(--color-primary)]" />
                <h4 className="font-bold text-gray-800">节假日皮肤</h4>
              </div>
              <div className="space-y-2.5">
                {skins.map((sk) => {
                  const active = sk.name === currentSkin;
                  return (
                    <button
                      key={sk.name}
                      onClick={() => setCurrentSkin(sk.name as SkinType)}
                      className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border-2 transition-all text-left ${
                        active
                          ? "border-[var(--color-accent)] shadow-card"
                          : "border-gray-100 bg-gray-50 hover:border-gray-200"
                      }`}
                      style={
                        active
                          ? { background: `linear-gradient(90deg, ${sk.cssVars["--color-primary"]}0d, ${sk.cssVars["--color-accent"]}12)` }
                          : undefined
                      }
                    >
                      <div
                        className="relative w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${sk.cssVars["--color-primary"]}, ${sk.cssVars["--color-accent"]})`,
                        }}
                      >
                        <span className="drop-shadow-sm">{sk.previewEmoji}</span>
                        {active && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] flex items-center justify-center">
                            <Check size={11} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-bold ${active ? "text-gray-900" : "text-gray-800"}`}>
                          {sk.displayName}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                          {sk.description}
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: sk.cssVars["--color-primary"] }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: sk.cssVars["--color-accent"] }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/60">
              <div className="text-sm font-bold text-amber-900 mb-1">💡 预览提示</div>
              <div className="text-xs text-amber-700 leading-relaxed">
                您正在运营预览模式中，所有修改仅在本地生效。完成配置后可通知开发人员同步到线上环境。
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-gray-100">
            <button
              onClick={() => setPreviewMode(false)}
              className="w-full py-3.5 rounded-xl2 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-colors"
            >
              完成预览
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
