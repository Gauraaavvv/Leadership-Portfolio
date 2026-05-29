import type { LeadershipPortfolio } from '../data/data-model';

interface Props {
  portfolio: LeadershipPortfolio;
}

export const IdentityHeader = ({ portfolio }: Props) => {
  const { employee, monthId, orgId } = portfolio;
  
  const [year, month] = monthId.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const formattedMonth = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-base-content/10 mb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold tracking-tight text-base-content/90">
          {employee.name}
        </h1>
        <div className="flex items-center gap-3 mt-2 text-lg text-base-content/70">
          <span className="font-medium">{employee.role}</span>
          <span className="text-base-content/30">&middot;</span>
          <span>{employee.program}</span>
        </div>
      </div>
      
      <div className="text-left md:text-right mt-6 md:mt-0 flex flex-col gap-1">
        <p className="text-[14px] font-mono uppercase tracking-widest text-base-content/50">
          {formattedMonth}
        </p>
        <p className="text-[12px] font-mono uppercase tracking-widest text-base-content/30">
          {orgId}
        </p>
      </div>
    </header>
  );
};
