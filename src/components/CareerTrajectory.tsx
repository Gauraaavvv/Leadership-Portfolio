import type { LeadershipPortfolioSection } from '../data/data-model';

interface Props {
  section: LeadershipPortfolioSection;
}

export const CareerTrajectory = ({ section }: Props) => {
  const { narrative, data } = section;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
        
        {/* Insight First: Promotion Readiness Assessment */}
        <div className="md:col-span-6 flex flex-col">
          <h3 className="text-lg font-semibold text-base-content/90 mb-6 border-b border-base-content/10 pb-3">
            Promotion Readiness
          </h3>
          
          <div className="grid grid-cols-2 gap-y-8 gap-x-8 mb-8">
            <div>
              <span className="block text-[15px] font-semibold text-base-content/60 uppercase tracking-wide mb-2">Current</span>
              <span className="text-3xl font-semibold text-base-content/90">Lvl {data.currentLevel.replace('V', '')}</span>
            </div>
            <div>
              <span className="block text-[15px] font-semibold text-base-content/60 uppercase tracking-wide mb-2">Target</span>
              <span className="text-3xl font-semibold text-base-content/90">Lvl {data.projectedNextLevel.replace('V', '')}</span>
            </div>
            <div>
              <span className="block text-[15px] font-semibold text-base-content/60 uppercase tracking-wide mb-2">Projected</span>
              <span className="text-xl font-medium text-base-content/90">
                {new Date(data.projectedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div>
              <span className="block text-[15px] font-semibold text-base-content/60 uppercase tracking-wide mb-2">Status</span>
              <span className="text-xl font-bold text-base-content/90 capitalize">
                {data.paceStatus.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="pt-6 border-t-2 border-base-content/10">
            <span className="block text-[15px] font-semibold text-base-content/80 uppercase tracking-wide mb-5">Remaining Gaps</span>
            <ul className="space-y-4">
              {data.gapDrivers.map((gap: string, i: number) => (
                <li key={i} className="flex gap-4 text-[16px] text-base-content/80 font-medium">
                  <span className="text-base-content/40 shrink-0 mt-0.5">&times;</span>
                  <span className="leading-relaxed">{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Evidence & Narrative Second: Trajectory & Context */}
        <div className="md:col-span-6 flex flex-col md:pl-10 md:border-l-2 border-base-content/10">
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-base-content/90 mb-6 border-b border-base-content/10 pb-3">
              Executive Context
            </h3>
            <p className="text-[18px] leading-relaxed text-base-content/90 font-light">
              {narrative}
            </p>
          </div>

          <div className="mt-auto">
            <h4 className="text-[15px] font-semibold text-base-content/80 uppercase tracking-wide mb-8">
              Timeline Progression
            </h4>
            <div className="relative flex flex-col gap-6">
              <div className="absolute left-[5px] top-2 bottom-4 border-l-2 border-dashed border-base-content/10 -z-10"></div>
              
              {data.milestones.map((milestone: { level: string; targetDate: string }) => {
                const isPast = new Date(milestone.targetDate) < new Date('2026-03-31');
                const isCurrent = milestone.level === data.currentLevel;
                const isNext = milestone.level === data.projectedNextLevel;
                
                return (
                  <div key={milestone.level} className="flex items-center gap-6">
                    <div className="w-3 flex justify-center bg-base-100 py-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        isCurrent ? 'bg-base-content/80 ring-4 ring-base-100' : 
                        isNext ? 'bg-base-content/40 ring-4 ring-base-100' : 
                        isPast ? 'bg-base-content/20' : 'bg-transparent border-2 border-base-content/30'
                      }`} />
                    </div>
                    
                    <div className="flex-1 flex justify-between items-baseline">
                      <span className={`text-[16px] ${
                        isCurrent || isNext ? 'text-base-content/90 font-bold' : 'text-base-content/50 font-medium'
                      }`}>
                        Level {milestone.level.replace('V', '')}
                      </span>
                      <span className={`text-[14px] font-mono ${
                        isCurrent || isNext ? 'text-base-content/60' : 'text-base-content/30'
                      }`}>
                        {new Date(milestone.targetDate).getFullYear()}
                      </span>
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
