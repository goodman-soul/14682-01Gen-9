import { Clock, MapPin, Phone, Bus, Ticket, Info } from "lucide-react";
import { useSubStation } from "@/hooks/useSubStation";
import { useAppStore } from "@/store/useAppStore";

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) => (
  <div className="flex gap-4 p-5 rounded-2xl bg-white hover:bg-gray-50 transition-colors border border-gray-100">
    <div className="shrink-0 w-11 h-11 rounded-xl bg-[var(--color-primary)]/8 flex items-center justify-center text-[var(--color-primary)]">
      <Icon size={20} />
    </div>
    <div className="min-w-0">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </div>
      <div className="mt-1 text-sm md:text-base text-gray-800 font-medium leading-relaxed">
        {value}
      </div>
    </div>
  </div>
);

export const InfoSection = () => {
  const { config } = useSubStation();
  const { openBooking } = useAppStore();

  return (
    <section id="info" className="relative py-16 md:py-20 bg-white">
      <div className="container">
        <div className="flex items-center gap-2 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-widest mb-4">
          <Info size={14} />
          <span>参观信息</span>
        </div>
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-gray-900 tracking-tight mb-10 md:mb-12">
          实用信息 · 轻松启程
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:grid-cols-3">
          <InfoItem icon={Clock} label="开放时间" value={config.openTime} />
          <InfoItem icon={MapPin} label="具体地址" value={config.address} />
          <InfoItem icon={Phone} label="咨询电话" value={config.phone} />
          <InfoItem icon={Bus} label="交通指南" value={config.traffic} />
          <InfoItem
            icon={Ticket}
            label="门票价格"
            value={config.basePrice === 0 ? "免费参观，需提前预约" : `门票 ￥${config.basePrice} 起 / 人`}
          />
          <div className="flex gap-4 p-5 rounded-2xl text-white border border-transparent overflow-hidden relative group"
               style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }}>
            <div className="shrink-0 w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Ticket size={20} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                  在线购票
                </div>
                <div className="mt-1 text-sm md:text-base font-medium leading-relaxed">
                  {config.basePrice === 0
                    ? "点击预约，免排队快速入园"
                    : `￥${config.basePrice} 起，在线购票享专属优惠`}
                </div>
              </div>
              <button
                onClick={openBooking}
                className="mt-3 self-start inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-[var(--color-primary)] text-sm font-semibold hover:scale-105 transition-transform"
              >
                立即{config.basePrice === 0 ? "预约" : "购票"} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
