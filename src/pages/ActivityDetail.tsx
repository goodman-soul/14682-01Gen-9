import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Ticket, Clock, Star, Check, ChevronRight } from "lucide-react";
import { getActivityById } from "@/data/activities";
import { subStations } from "@/data/subStations";
import { useAppStore } from "@/store/useAppStore";
import { Navbar } from "@/components/Navbar";
import { PreviewPanel } from "@/components/PreviewPanel";

export const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openBooking } = useAppStore();
  const activity = getActivityById(id || "");

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <div className="text-6xl mb-4">🎭</div>
        <h2 className="font-serif font-bold text-2xl text-gray-900 mb-2">活动未找到</h2>
        <p className="text-gray-500 mb-6">您访问的活动可能已下架或不存在</p>
        <Link to="/scenic" className="btn-primary">
          <ArrowLeft size={18} /> 返回首页
        </Link>
      </div>
    );
  }

  const station = subStations[activity.stationType];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <div className="pt-20 md:pt-24">
        <div className="container py-5">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </button>
        </div>
      </div>

      <div className="container pb-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-card">
              <div className="aspect-[16/9] lg:aspect-[16/8]">
                <img
                  src={activity.coverImage}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {activity.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full glass-dark text-white/95 text-xs font-semibold backdrop-blur-md border border-white/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={station?.route || "/scenic"}
                className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl glass-dark text-white/90 text-xs font-medium backdrop-blur-md border border-white/15 inline-flex items-center gap-1.5 hover:bg-white/25 transition-colors"
              >
                {station?.shortName}
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-100">
              <h1 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 leading-tight">
                {activity.title}
              </h1>

              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
                <InfoBadge icon={Calendar} label="活动时间" value={activity.dateRange} />
                <InfoBadge icon={MapPin} label="活动地点" value={station?.shortName || "城市文旅"} />
                <InfoBadge
                  icon={Clock}
                  label="开放场次"
                  value="每日多场可选"
                />
              </div>

              <div className="mt-8">
                <h2 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <span
                    className="w-1 h-5 rounded-full"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                  活动介绍
                </h2>
                <p className="text-gray-600 leading-[1.85]">
                  {activity.description}
                </p>
              </div>

              {activity.highlights && activity.highlights.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <span
                      className="w-1 h-5 rounded-full"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    />
                    活动亮点
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {activity.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10"
                      >
                        <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center mt-0.5">
                          <Check size={13} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium text-gray-800 leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/50">
                <div className="flex items-center gap-2 font-bold text-amber-900 mb-2">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  温馨提示
                </div>
                <ul className="text-sm text-amber-800/90 space-y-1.5 leading-relaxed list-disc pl-5">
                  <li>请在活动开始前 30 分钟到达现场进行检票</li>
                  <li>儿童需由成人陪同入场，1.2 米以下儿童部分项目可享优惠</li>
                  <li>如需退改，请至少提前 24 小时联系客服</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="bg-white rounded-3xl p-6 md:p-7 shadow-card border border-gray-100 overflow-hidden relative">
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))` }}
                />
                <div className="flex items-baseline justify-between mb-1">
                  <div className="text-sm text-gray-400">活动价格</div>
                  {activity.price > 0 && <div className="text-xs text-gray-400">/ 每人</div>}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[var(--color-accent)]">
                    {activity.price === 0 ? "免费" : `￥${activity.price}`}
                  </span>
                  {activity.price > 200 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold">
                      含多项权益
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={openBooking}
                    className="btn-primary w-full py-4 text-base shadow-glow"
                  >
                    <Ticket size={18} />
                    立即预约 / 购票
                  </button>
                  <button className="w-full py-3.5 rounded-xl2 border-2 border-[var(--color-primary)]/15 text-[var(--color-primary)] text-sm font-semibold hover:bg-[var(--color-primary)]/5 transition-colors">
                    加入收藏
                  </button>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100">
                  <div className="text-xs text-gray-400 mb-3">所属子站</div>
                  <Link
                    to={station?.route || "/scenic"}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: station?.accentColor || "#1A5F7A" }}
                    >
                      <Ticket size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm truncate">
                        {station?.name}
                      </div>
                      <div className="text-xs text-gray-400 truncate">{station?.slogan}</div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100">
                <div className="flex items-center gap-2 font-bold text-gray-800 mb-3">
                  <MapPin size={16} className="text-[var(--color-primary)]" />
                  活动地址
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{station?.address}</p>
                <div className="mt-4 text-xs text-gray-400">
                  {station?.traffic}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PreviewPanel />
    </div>
  );
};

const InfoBadge = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) => (
  <div className="flex gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
    <div className="shrink-0 w-9 h-9 rounded-xl bg-[var(--color-primary)]/8 flex items-center justify-center text-[var(--color-primary)]">
      <Icon size={17} />
    </div>
    <div className="min-w-0">
      <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-semibold text-gray-800 leading-snug truncate">
        {value}
      </div>
    </div>
  </div>
);
