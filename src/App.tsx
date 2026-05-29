import mockData from './data/mock-portfolio-data.json';
import type { LeadershipPortfolio } from './data/data-model';

import { IdentityHeader } from './components/IdentityHeader';
import { HeroSignal } from './components/HeroSignal';
import { ContributionHighlights } from './components/ContributionHighlights';
import { CapabilityGrowth } from './components/CapabilityGrowth';
import { KPIImpact } from './components/KPIImpact';
import { OperationalBlockers } from './components/OperationalBlockers';
import { CareerTrajectory } from './components/CareerTrajectory';

// Cast the imported JSON to our TypeScript interface
const portfolio = mockData as unknown as LeadershipPortfolio;

function App() {
  const getSection = (type: string) => portfolio.sections.find(s => s.type === type);

  const executiveSummary = getSection('executive_summary');
  const contributionHighlights = getSection('contribution_highlights');
  const capabilityGrowth = getSection('capability_growth');
  const kpiImpact = getSection('kpi_impact');
  const constraintPatterns = getSection('constraint_patterns');
  const careerTrajectory = getSection('career_trajectory');

  return (
    <div className="min-h-screen bg-base-100 font-sans selection:bg-base-content/10 text-base-content antialiased">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        
        <IdentityHeader portfolio={portfolio} />

        <main className="mt-12">
          {/* Section 1 & 2: Hero & Executive Snapshot */}
          <div className="mb-32">
            {executiveSummary && (
              <HeroSignal 
                portfolio={portfolio} 
                section={executiveSummary} 
              />
            )}
          </div>

          <div className="space-y-32">
            {/* Section 3 & 4: Impact Story & Evidence Timeline */}
            {contributionHighlights && <ContributionHighlights section={contributionHighlights} />}
            
            {/* Section 5: Capability Profile */}
            {capabilityGrowth && <CapabilityGrowth section={capabilityGrowth} />}
            
            {/* Section 6: KPI Performance */}
            {kpiImpact && <KPIImpact section={kpiImpact} />}
            
            {/* Section 7: Constraints & Resolution */}
            {constraintPatterns && <OperationalBlockers section={constraintPatterns} />}
            
            {/* Section 8: Promotion Readiness (Career Trajectory) */}
            {careerTrajectory && <CareerTrajectory section={careerTrajectory} />}
          </div>
        </main>
        
        <footer className="mt-48 pb-12 border-t border-base-content/[0.04] pt-8">
          <div className="flex justify-between items-center text-[9px] font-mono text-base-content/30 uppercase tracking-widest">
            <span>Executive Performance Intelligence System</span>
            <span>
              Generated {new Date(portfolio.generatedAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
