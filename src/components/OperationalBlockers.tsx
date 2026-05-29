import type { LeadershipPortfolioSection } from '../data/data-model';

interface Props {
  section: LeadershipPortfolioSection;
}

export const OperationalBlockers = ({ section }: Props) => {
  const { narrative, data } = section;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
        
        {/* Insight First: Key Constraint Metrics */}
        <div className="md:col-span-5 flex flex-col">
          <h3 className="text-lg font-semibold text-base-content/90 mb-6 border-b border-base-content/10 pb-3">
            Constraint & Resolution
          </h3>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-baseline border-b border-base-content/[0.04] pb-3">
              <span className="text-[16px] font-medium text-base-content/80">Total Constraints Raised</span>
              <span className="text-[18px] font-semibold text-base-content/90">{data.totalConstraints}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-base-content/[0.04] pb-3">
              <span className="text-[16px] font-medium text-base-content/80">Resolution Volume</span>
              <span className="text-[18px] font-semibold text-base-content/90">{data.resolved} <span className="text-[14px] font-medium text-base-content/50">Cleared</span></span>
            </div>
            <div className="flex justify-between items-baseline border-b border-base-content/[0.04] pb-3">
              <span className="text-[16px] font-medium text-base-content/80">Primary Bottleneck</span>
              <span className="text-[14px] font-semibold uppercase tracking-wide text-base-content/70">Internal Support</span>
            </div>
          </div>
          
          <div className="mt-auto pt-8">
            <h4 className="text-[15px] font-semibold text-base-content/80 uppercase tracking-wide mb-5 border-b border-base-content/10 pb-3">
              Executive Context
            </h4>
            <p className="text-[18px] leading-relaxed text-base-content/90 font-light">
              {narrative}
            </p>
          </div>
        </div>

        {/* Evidence Second: Intervention Log */}
        <div className="md:col-span-7">
          <h3 className="text-lg font-semibold text-base-content/90 mb-6">
            Intervention Log
          </h3>
          <div className="border-t-2 border-base-content/10 pt-2">
            {data.topConstraints.map((blocker: { ticketId: string; type: string; label: string; status: string }) => {
              const parts = blocker.label.split('—');
              const constraint = parts[0].trim();
              const result = parts.length > 1 ? parts.slice(1).join('—').trim() : "Ongoing intervention";

              return (
                <div 
                  key={blocker.ticketId} 
                  className="py-6 border-b border-base-content/[0.05] flex flex-col gap-4"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[13px] font-semibold uppercase tracking-widest text-base-content/50">
                      Type: {blocker.type.replace('_', ' ')}
                    </span>
                    <span className={`text-[13px] font-bold uppercase tracking-widest ${
                      blocker.status === 'resolved' ? 'text-success/80' : 'text-warning/80'
                    }`}>
                      {blocker.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                    <span className="text-[14px] font-semibold text-base-content/60 uppercase tracking-wide">Constraint</span>
                    <span className="text-[16px] font-medium leading-relaxed text-base-content/90">{constraint}</span>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline mt-2">
                    <span className="text-[14px] font-semibold text-base-content/60 uppercase tracking-wide">Intervention</span>
                    <span className={`text-[15px] leading-relaxed ${blocker.status === 'resolved' ? 'text-base-content/80' : 'text-base-content/60'}`}>
                      {result}
                    </span>
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
