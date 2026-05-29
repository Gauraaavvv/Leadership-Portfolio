import type { LeadershipPortfolioSection } from '../data/data-model';

interface Props {
  section: LeadershipPortfolioSection;
}

export const CapabilityGrowth = ({ section }: Props) => {
  const { narrative, data } = section;

  const dimensions = [
    { label: "Delivery Focus", score: data.deliveryRate },
    { label: "Original Work (IP)", score: data.ipScore },
    { label: "Team Engagement", score: data.ritualScore },
    { label: "Goal Attainment", score: data.kpiScore },
    { label: "Process Adoption", score: data.processScore },
    { label: "Applied Thinking Models", score: data.frameworkScore },
  ];

  // Rank capabilities highest to lowest
  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const topStrengths = sorted.slice(0, 3);
  const developmentFocus = sorted.slice(-2);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
        
        {/* Insight First: Ranked Capabilities */}
        <div className="md:col-span-5 flex flex-col gap-10">
          <div>
            <h3 className="text-lg font-semibold text-base-content/90 mb-5 border-b border-base-content/10 pb-3">
              Top Strengths
            </h3>
            <div className="space-y-4">
              {topStrengths.map(dim => (
                <div key={dim.label} className="flex items-baseline justify-between border-b border-base-content/[0.04] pb-3">
                  <span className="text-[16px] font-medium text-base-content/90">{dim.label}</span>
                  <span className="text-[16px] font-semibold text-base-content/90">{dim.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-base-content/90 mb-5 border-b border-base-content/10 pb-3">
              Development Focus
            </h3>
            <div className="space-y-4">
              {developmentFocus.map(dim => (
                <div key={dim.label} className="flex items-baseline justify-between border-b border-base-content/[0.04] pb-3">
                  <span className="text-[16px] font-medium text-base-content/90">{dim.label}</span>
                  <span className="text-[16px] font-semibold text-base-content/90">{dim.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evidence & Narrative Second */}
        <div className="md:col-span-7 flex flex-col">
          <h3 className="text-lg font-semibold text-base-content/90 mb-5">
            Capability Profile Evidence
          </h3>
          
          <div className="max-w-[540px] mb-8">
            <p className="text-[18px] leading-relaxed text-base-content/90 font-light">
              {narrative}
            </p>
          </div>

          <div className="mt-auto">
            <h4 className="text-[15px] font-semibold text-base-content/80 uppercase tracking-wide mb-6">
              Systemic Overview
            </h4>
            <div className="space-y-5 relative pt-2">
              <div className="absolute top-0 bottom-0 left-[65%] border-l-2 border-base-content/[0.05] z-0 -mx-[1px]"></div>
              
              {sorted.map((dim) => {
                return (
                  <div key={dim.label} className="group relative z-10 grid grid-cols-[1fr_auto] gap-5 items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-baseline justify-between w-[150px] shrink-0">
                        <span className="text-[14px] font-medium text-base-content/70 truncate mr-2">
                          {dim.label}
                        </span>
                        <span className="text-[13px] font-semibold text-base-content/90">
                          {dim.score}
                        </span>
                      </div>
                      
                      <div className="flex-1 h-[2px] bg-base-content/[0.04] flex items-center">
                        <div 
                          className="h-[2px] bg-base-content/40 transition-all duration-1000 ease-out"
                          style={{ width: `${dim.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
