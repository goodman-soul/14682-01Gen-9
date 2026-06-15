import { Sparkles, ArrowRight } from "lucide-react";
import { useSubStation } from "@/hooks/useSubStation";
import { ActivityCard } from "./ActivityCard";
import { useResponsive } from "@/hooks/useResponsive";

export const ActivityList = () => {
  const { activities, config } = useSubStation();
  const { isMobile } = useResponsive();

  return (
    <section id="activities" className="relative py-16 md:py-24 bg-pattern">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary)]/8 text-[var(--color-primary)] text-xs font-semibold mb-3">
              <Sparkles size={13} />
              <span>精选活动</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
              {isMobile ? `${config.shortName}活动推荐` : `${config.name} · 精选活动体验`}
            </h2>
            <p className="mt-2 text-gray-500 max-w-xl">
              精心策划的主题活动，为您的{config.shortName}之旅增添难忘回忆
            </p>
          </div>
          <button className="self-start md:self-end inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl2 border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all text-sm font-medium">
            查看全部活动
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {activities.map((a, i) => (
            <ActivityCard key={a.id} activity={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
