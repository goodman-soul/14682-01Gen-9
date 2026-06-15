import { Calendar, Tag, ChevronRight } from "lucide-react";
import type { Activity } from "@/types";
import { useNavigate } from "react-router-dom";

interface Props {
  activity: Activity;
  index?: number;
}

export const ActivityCard = ({ activity, index = 0 }: Props) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/activity/${activity.id}`)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1.5 border border-gray-100 animate-fade-in-up opacity-0"
      style={{ animationDelay: `${Math.min(index * 0.08, 0.4)}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={activity.coverImage}
          alt={activity.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-70 group-hover:opacity-90 transition-opacity" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {activity.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-medium text-[var(--color-primary)] shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl2 bg-[var(--color-accent)] text-white text-sm font-bold shadow-glow">
          {activity.price === 0 ? "免费" : `￥${activity.price}`}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-serif font-bold text-lg text-gray-900 leading-snug group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
          {activity.title}
        </h3>

        <div className="mt-3 flex items-center gap-1.5 text-gray-500 text-sm">
          <Calendar size={14} strokeWidth={2} />
          <span className="truncate">{activity.dateRange}</span>
        </div>

        <p className="mt-2.5 text-gray-600 text-sm leading-relaxed line-clamp-2 min-h-[2.8rem]">
          {activity.description}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Tag size={13} />
            <span>{activity.tags.length} 项权益</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
            查看详情
            <ChevronRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
};
