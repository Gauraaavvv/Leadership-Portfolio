import type { LeadershipPortfolio, LeadershipPortfolioSection } from '../data/data-model';

interface Props {
  section: LeadershipPortfolioSection;
  portfolio: LeadershipPortfolio;
}

export const HeroSignal = ({ section, portfolio }: Props) => {
  const { narrative } = section;
  
  // Extract snapshot data from portfolio sections
  const execSummary = portfolio.sections.find(s => s.type === 'executive_summary')?.data;
  const highlights = portfolio.sections.find(s => s.type === 'contribution_highlights')?.data;
  const career = portfolio.sections.find(s => s.type === 'career_trajectory')?.data;

  const scoreDelta = execSummary.compositeScore - execSummary.previousMonthScore;
  const deltaSign = scoreDelta > 0 ? '+' : '';

  return (
    <section>
      {/* Executive Snapshot */}
      <div className="mb-12">
        <h3 className="sr-only">Executive Snapshot</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-10">
          
          <div>
            <p className="text-[14px] font-semibold text-base-content/50 uppercase tracking-wider mb-2">
              Composite Score
            </p>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-semibold tracking-tight text-base-content/90">
                {execSummary.compositeScore}
              </span>
              <span className={`text-[18px] font-bold ${scoreDelta > 0 ? 'text-success/90' : 'text-base-content/60'}`}>
                {deltaSign}{scoreDelta}
              </span>
            </div>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-base-content/50 uppercase tracking-wider mb-2">
              Output Velocity
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-base-content/90">
                {highlights.completed}<span className="text-xl text-base-content/30 mx-1">/</span>{highlights.totalDeliverables}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-[14px] font-medium text-base-content/70">
                {highlights.ipCommitCount} Original Contributions
              </span>
            </div>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-base-content/50 uppercase tracking-wider mb-2">
              Promotion Readiness
            </p>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-semibold text-base-content/90 capitalize">
                {career.paceStatus.replace('_', ' ')}
              </span>
              <span className="text-[14px] font-medium text-base-content/70">
                Level {career.projectedNextLevel.replace('V', '')} Track
              </span>
            </div>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-base-content/50 uppercase tracking-wider mb-2">
              Primary Risks
            </p>
            <div className="flex flex-col gap-1.5 mt-1">
              {career.gapDrivers.length > 0 ? (
                career.gapDrivers.map((gap: string, i: number) => {
                  const gapName = gap.split('score')[0].trim();
                  return (
                    <span key={i} className="text-[14px] font-medium text-warning/90 truncate flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning/50"></span>
                      {gapName}
                    </span>
                  )
                })
              ) : (
                <span className="text-[14px] font-medium text-base-content/50">None identified</span>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Concise Executive Summary Block */}
      <div className="max-w-[800px] bg-base-content/[0.02] p-8 rounded-lg border border-base-content/[0.04]">
        <h3 className="text-[12px] font-bold text-base-content/50 uppercase tracking-widest mb-4">
          Executive Summary
        </h3>
        <p className="text-[20px] leading-relaxed text-base-content/90 font-medium line-clamp-4">
          {narrative}
        </p>
      </div>
      
    </section>
  );
};
