import type { LeadershipPortfolioSection } from '../data/data-model';

interface Props {
  section: LeadershipPortfolioSection;
}

export const KPIImpact = ({ section }: Props) => {
  const { narrative, data } = section;

  return (
    <section>
      <div className="grid grid-cols-1 gap-y-10">
        
        {/* Insight First: KPI Executive Summary */}
        <div>
          <h3 className="text-lg font-semibold text-base-content/90 mb-6 border-b border-base-content/10 pb-3">
            KPI Performance
          </h3>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 pb-2">
            <div>
              <span className="block text-[14px] font-semibold text-base-content/60 uppercase tracking-wide mb-2">Total KPIs</span>
              <span className="text-4xl font-light text-base-content/90">{data.totalKpiCommits}</span>
            </div>
            <div>
              <span className="block text-[14px] font-semibold text-base-content/60 uppercase tracking-wide mb-2">Verified Outcomes</span>
              <span className="text-4xl font-light text-base-content/90">{data.verifiedCount}</span>
            </div>
            <div className="md:max-w-[600px] mt-2 md:mt-0">
              <p className="text-[18px] leading-relaxed text-base-content/90 font-light">
                {narrative}
              </p>
            </div>
          </div>
        </div>

        {/* Evidence Second: Executive Metric Table */}
        <div className="pt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-4 border-b-2 border-base-content/10 text-[14px] font-semibold text-base-content/60 uppercase tracking-wider">Metric Focus</th>
                <th className="pb-4 border-b-2 border-base-content/10 text-[14px] font-semibold text-base-content/60 uppercase tracking-wider text-right">Target</th>
                <th className="pb-4 border-b-2 border-base-content/10 text-[14px] font-semibold text-base-content/60 uppercase tracking-wider text-right">Actual</th>
                <th className="pb-4 border-b-2 border-base-content/10 text-[14px] font-semibold text-base-content/60 uppercase tracking-wider text-right">Delta</th>
                <th className="pb-4 border-b-2 border-base-content/10 text-[14px] font-semibold text-base-content/60 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-content/[0.05]">
              {data.details.map((kpi: { kpiId: string; label: string; target: number; actual: number; unit: string; status: string }) => {
                const delta = (kpi.actual - kpi.target).toFixed(kpi.actual % 1 !== 0 ? 1 : 0);
                const deltaPrefix = Number(delta) > 0 ? '+' : '';
                
                return (
                  <tr key={kpi.kpiId} className="group hover:bg-base-content/[0.02] transition-colors">
                    <td className="py-6">
                      <span className="text-[16px] text-base-content/90 font-medium">{kpi.label}</span>
                    </td>
                    <td className="py-6 text-right">
                      <span className="text-[16px] font-medium text-base-content/60">
                        {kpi.target} <span className="text-[13px]">{kpi.unit}</span>
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <span className="text-[16px] font-semibold text-base-content/90">
                        {kpi.actual} <span className="text-[13px] text-base-content/60">{kpi.unit}</span>
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <span className={`text-[16px] font-bold ${
                        kpi.status === 'hit' ? 'text-success/90' : 'text-warning/90'
                      }`}>
                        {deltaPrefix}{delta}
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <span className={`text-[14px] font-bold uppercase tracking-widest ${
                        kpi.status === 'hit' ? 'text-base-content/50' : 'text-base-content/90'
                      }`}>
                        {kpi.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
