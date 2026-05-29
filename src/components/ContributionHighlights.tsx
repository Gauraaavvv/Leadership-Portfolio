import type { LeadershipPortfolioSection } from '../data/data-model';

interface Props {
  section: LeadershipPortfolioSection;
}

export const ContributionHighlights = ({ section }: Props) => {
  const { narrative, data } = section;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
        
        {/* Insight First: Key Outcomes & Narrative */}
        <div className="md:col-span-5 flex flex-col">
          <h3 className="text-lg font-semibold text-base-content/90 mb-5">
            Impact Story
          </h3>
          
          <div className="mb-8">
            <p className="text-[18px] leading-relaxed text-base-content/90 font-light">
              {narrative}
            </p>
          </div>

          <div>
            <h4 className="text-[15px] font-semibold text-base-content/80 uppercase tracking-wide mb-5 border-b border-base-content/10 pb-3">
              Key Outcomes
            </h4>
            <ul className="space-y-4 pt-1">
              <li className="flex items-center gap-4 text-[16px] text-base-content/90">
                <span className="w-2 h-2 rounded-full bg-base-content/30 shrink-0" />
                Shipped {data.completed} of {data.totalDeliverables} deliverables
              </li>
              <li className="flex items-center gap-4 text-[16px] text-base-content/90">
                <span className="w-2 h-2 rounded-full bg-base-content/30 shrink-0" />
                Delivered {data.ipCommitCount} original work frameworks
              </li>
              <li className="flex items-center gap-4 text-[16px] text-base-content/90">
                <span className="w-2 h-2 rounded-full bg-base-content/30 shrink-0" />
                Accelerated V3 Promotion Readiness
              </li>
            </ul>
          </div>
        </div>

        {/* Evidence Second: Evidence Timeline */}
        <div className="md:col-span-7">
          <h3 className="text-lg font-semibold text-base-content/90 mb-6">
            Evidence Timeline
          </h3>
          
          <div className="relative border-l-2 border-base-content/10 ml-3 pl-8 space-y-10 pt-2 pb-4">
            {data.recentCommits.map((commit: { id: string; createdAt: string; description: string }) => {
              // Split the description into "Work Item" and "Result/Context" based on the em-dash
              const parts = commit.description.split('—');
              const workItem = parts[0].trim();
              const result = parts.length > 1 ? parts.slice(1).join('—').trim() : null;

              return (
                <div key={commit.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[38px] top-1.5 w-2.5 h-2.5 rounded-full bg-base-100 border-2 border-base-content/40 group-hover:border-base-content/80 group-hover:bg-base-content/20 transition-colors" />
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-[13px] font-medium text-base-content/60 uppercase tracking-widest">
                      {new Date(commit.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    
                    <span className="text-[16px] font-semibold text-base-content/90 leading-snug">
                      {workItem}
                    </span>
                    
                    {result && (
                      <span className="text-[15px] leading-relaxed text-base-content/70 mt-1">
                        {result}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
