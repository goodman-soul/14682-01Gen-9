import { Clock, MapPin, Ticket, ChevronDown, Sparkles } from "lucide-react";
import { useSubStation } from "@/hooks/useSubStation";
import { useResponsive } from "@/hooks/useResponsive";
import { useAppStore } from "@/store/useAppStore";

export const HeroSection = () => {
  const { config } = useSubStation();
  const { isMobile } = useResponsive();
  const { openBooking } = useAppStore();

  const heroImage = isMobile && config.mobileHeroImage ? config.mobileHeroImage : config.heroImage;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] md:min-h-[720px] overflow-hidden flex items-end"
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-[fadeIn_1.5s_ease-out]"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      <SkinDecorations />

      <div className="relative z-10 container pb-24 md:pb-28 pt-28 md:pt-36">
        <div className="max-w-3xl">
          <div className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dark text-white/90 text-xs font-medium backdrop-blur-md border border-white/15">
            <Sparkles size={14} />
            <span>{config.slogan}</span>
          </div>

          <h1
            className="opacity-0 animate-fade-in-up delay-100 mt-5 font-serif font-black text-balance leading-[1.08] tracking-tight text-white"
            style={{
              fontSize: isMobile ? "clamp(2.25rem, 9vw, 3.5rem)" : "clamp(3.5rem, 7vw, 5.5rem)",
              textShadow: "0 4px 30px rgba(0,0,0,0.35)",
            }}
          >
            {config.name}
          </h1>

          <p
            className="opacity-0 animate-fade-in-up delay-200 mt-4 md:mt-5 text-white/85 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            {isMobile
              ? config.openTime
              : `探索 ${config.shortName} 的独特魅力。${config.openTime}`}
          </p>

          <div className="opacity-0 animate-fade-in-up delay-300 mt-7 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl2 glass-dark text-white/90 text-sm backdrop-blur-md border border-white/15">
              <Clock size={16} />
              <span className="hidden sm:inline">开放时间：</span>
              <span className="font-medium">
                {isMobile ? "每日 06:30 - 18:30" : config.openTime.slice(0, 22) + "..."}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl2 glass-dark text-white/90 text-sm backdrop-blur-md border border-white/15">
              <MapPin size={16} />
              <span className="truncate max-w-[220px]">{config.address}</span>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up delay-400 mt-8 flex flex-wrap gap-3">
            <button
              onClick={openBooking}
              className="btn-primary px-7 py-3.5 text-base shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
            >
              <Ticket size={18} />
              {config.basePrice === 0 ? "立即预约" : `立即购票 ￥${config.basePrice}起`}
            </button>
            <a
              href="#info"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl2 text-base font-medium backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/10 transition-all"
            >
              了解详情
            </a>
          </div>

          {isMobile && (
            <div className="opacity-0 animate-fade-in-up delay-500 mt-10 grid grid-cols-3 gap-3 max-w-sm">
              <QuickAction label="购票" icon="🎫" onClick={openBooking} />
              <QuickAction label="导航" icon="📍" href="#" />
              <QuickAction label="客服" icon="📞" href={`tel:${config.phone}`} />
            </div>
          )}
        </div>
      </div>

      <a
        href="#info"
        className="opacity-0 animate-fade-in delay-500 absolute z-10 bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white animate-float"
      >
        <ChevronDown size={30} strokeWidth={2} />
      </a>
    </section>
  );
};

const QuickAction = ({
  label,
  icon,
  onClick,
  href,
}: {
  label: string;
  icon: string;
  onClick?: () => void;
  href?: string;
}) => {
  const baseClass =
    "flex flex-col items-center justify-center gap-1 p-3 rounded-xl2 glass-dark backdrop-blur-md border border-white/15 text-white text-xs font-medium active:scale-95 transition-all";
  const content = (
    <>
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </>
  );
  return onClick ? (
    <button onClick={onClick} className={baseClass}>{content}</button>
  ) : (
    <a href={href} className={baseClass}>{content}</a>
  );
};

const SkinDecorations = () => {
  const { currentSkin } = useAppStore();

  return (
    <>
      {currentSkin === "spring" && (
        <>
          <div className="absolute top-20 right-6 md:right-16 text-5xl md:text-7xl animate-float opacity-90">
            🏮
          </div>
          <div
            className="absolute top-32 md:top-44 right-24 md:right-40 text-3xl md:text-5xl animate-float opacity-80"
            style={{ animationDelay: "1s" }}
          >
            🏮
          </div>
          <div className="absolute top-28 left-8 md:left-24 text-4xl md:text-6xl animate-float opacity-85" style={{ animationDelay: "0.5s" }}>
            🧧
          </div>
        </>
      )}
      {currentSkin === "national" && (
        <>
          <div className="absolute top-20 right-10 md:right-20 text-5xl md:text-7xl animate-float opacity-90">
            🇨🇳
          </div>
          <div className="absolute top-40 right-32 md:right-52 text-3xl md:text-4xl animate-float opacity-75" style={{ animationDelay: "1.2s" }}>
            ⭐
          </div>
          <div className="absolute top-32 left-10 md:left-24 text-4xl md:text-5xl animate-float opacity-80" style={{ animationDelay: "0.7s" }}>
            🎊
          </div>
        </>
      )}
      {currentSkin === "midautumn" && (
        <>
          <div className="absolute top-16 right-10 md:right-24 text-6xl md:text-8xl animate-float opacity-95 drop-shadow-[0_0_30px_rgba(255,230,180,0.5)]">
            🌕
          </div>
          <div className="absolute top-40 right-28 md:right-44 text-3xl md:text-4xl animate-float opacity-80" style={{ animationDelay: "0.8s" }}>
            🐇
          </div>
          <div className="absolute top-28 left-12 md:left-28 text-4xl md:text-5xl animate-float opacity-85" style={{ animationDelay: "0.4s" }}>
            🏮
          </div>
        </>
      )}
      {currentSkin === "dragonboat" && (
        <>
          <div className="absolute top-24 right-8 md:right-20 text-5xl md:text-7xl animate-float opacity-90">
            🛶
          </div>
          <div className="absolute top-40 right-36 md:right-52 text-3xl md:text-4xl animate-float opacity-80" style={{ animationDelay: "0.9s" }}>
            🌿
          </div>
          <div className="absolute top-32 left-12 md:left-28 text-4xl md:text-5xl animate-float opacity-85" style={{ animationDelay: "0.5s" }}>
            🍙
          </div>
        </>
      )}
    </>
  );
};
