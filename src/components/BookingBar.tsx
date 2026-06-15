import { useEffect, useState } from "react";
import { Ticket, Calendar, Users, X, ChevronRight, Sparkles } from "lucide-react";
import { useSubStation } from "@/hooks/useSubStation";
import { useAppStore } from "@/store/useAppStore";

export const BookingBar = () => {
  const { config } = useSubStation();
  const { showBookingModal, openBooking, closeBooking } = useAppStore();
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState("");
  const [count, setCount] = useState(2);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    setDate(t.toISOString().slice(0, 10));
  }, []);

  const handleSubmit = () => {
    alert(`已跳转至购票系统：\n子站：${config.name}\n日期：${date}\n人数：${count} 人\n\n（演示环境）`);
    window.open(config.ticketUrl, "_blank");
  };

  return (
    <>
      <div
        className={`fixed bottom-0 inset-x-0 z-40 transition-all duration-500 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <div className="glass border-t border-white/60 shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
          <div className="container py-3 md:py-4 flex items-center gap-3 md:gap-5">
            <div className="flex-1 min-w-0">
              <div className="hidden md:block text-sm text-gray-500">{config.shortName}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-[var(--color-accent)] font-bold text-2xl md:text-3xl leading-none">
                  {config.basePrice === 0 ? "免费" : `￥${config.basePrice}`}
                </span>
                {config.basePrice > 0 && <span className="text-xs text-gray-400">起 / 人</span>}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
                <Calendar size={15} className="text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent outline-none text-sm w-[120px] text-gray-700"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
                <Users size={15} className="text-gray-400" />
                <button
                  onClick={() => setCount(Math.max(1, count - 1))}
                  className="w-6 h-6 rounded-md bg-white text-gray-500 hover:text-[var(--color-primary)] hover:bg-gray-100 transition-colors font-bold"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-medium text-gray-700">{count}</span>
                <button
                  onClick={() => setCount(Math.min(10, count + 1))}
                  className="w-6 h-6 rounded-md bg-white text-gray-500 hover:text-[var(--color-primary)] hover:bg-gray-100 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={openBooking}
              className="btn-primary shrink-0 px-5 md:px-8 py-3 md:py-3.5"
            >
              <Ticket size={18} />
              <span className="hidden sm:inline">
                {config.basePrice === 0 ? "立即预约" : "立即购票"}
              </span>
              <span className="sm:hidden">
                {config.basePrice === 0 ? "预约" : "购票"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={closeBooking}
          />
          <div className="relative z-10 w-full max-w-lg bg-white md:rounded-3xl rounded-t-3xl shadow-2xl animate-fade-in-up overflow-hidden">
            <div
              className="relative p-6 md:p-8 text-white"
              style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` }}
            >
              <button
                onClick={closeBooking}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-xs font-medium mb-3">
                <Sparkles size={12} />
                快速预约通道
              </div>
              <h3 className="font-serif font-bold text-2xl md:text-3xl">{config.shortName}</h3>
              <p className="mt-1.5 text-white/80 text-sm">{config.slogan}</p>
            </div>

            <div className="p-6 md:p-8 space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">选择日期</label>
                <div className="flex items-center gap-2 p-3.5 rounded-xl2 bg-gray-50 border border-gray-100 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/25 focus-within:border-[var(--color-primary)]/40 transition-all">
                  <Calendar size={18} className="text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-base"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  出行人数（{count} 人）
                </label>
                <div className="flex items-center justify-between p-3.5 rounded-xl2 bg-gray-50 border border-gray-100">
                  <button
                    onClick={() => setCount(Math.max(1, count - 1))}
                    className="w-10 h-10 rounded-xl bg-white text-gray-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] border border-gray-200 transition-all text-xl font-bold"
                  >
                    −
                  </button>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-xs text-gray-400">成人</div>
                  </div>
                  <button
                    onClick={() => setCount(Math.min(10, count + 1))}
                    className="w-10 h-10 rounded-xl bg-white text-gray-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] border border-gray-200 transition-all text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {config.basePrice > 0 && (
                <div className="flex items-center justify-between p-4 rounded-xl2 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
                  <span className="text-gray-600 font-medium">预估总价</span>
                  <span className="text-3xl font-bold text-[var(--color-accent)]">
                    ￥{config.basePrice * count}
                    <span className="text-sm font-normal text-gray-400 ml-1">起</span>
                  </span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="btn-primary w-full py-4 text-base shadow-glow"
              >
                <Ticket size={18} />
                确认{config.basePrice === 0 ? "预约" : "购票"}
                <ChevronRight size={18} />
              </button>

              <p className="text-center text-xs text-gray-400">
                点击按钮将跳转至官方购票系统完成支付
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="h-16 md:h-20" />
    </>
  );
};
