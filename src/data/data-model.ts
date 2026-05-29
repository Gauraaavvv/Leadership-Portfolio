/**data_model.ts
 * PDGMS Leadership Portfolio — Data Model
 * ========================================
 *
 * These are the actual TypeScript types from the PDGMS codebase.
 * Every field here exists in the backend. Your design must work
 * with this data — don't invent fields that aren't here.
 *
 * The mock data file (mock-portfolio-data.json) is populated
 * using these exact types.
 *
 * You do NOT need to write code against these types.
 * They are here so you know exactly what data is available
 * to render on the Leadership Portfolio page.
 */


// =============================================
// ENUMS — Fixed categories used across the system
// =============================================

/** 5 constraint dimensions — every blocker is one of these */
export type ConstraintType =
  | "budget"
  | "talent"
  | "internal_support"
  | "assumptions"
  | "permissions";

/** 6 time categories — how an employee's hours are classified */
export type TimesheetCategoryType =
  | "operational"
  | "research"
  | "deep_work"
  | "coordination"
  | "meetings"
  | "planning_strategy";

/** The 6 measurement axes — the backbone of all scoring */
export type AxisType =
  | "deliverables"
  | "ip"
  | "kpis"
  | "frameworks"
  | "processes"
  | "rituals";

/** Deliverable ticket lifecycle */
export type DeliverableStatus =
  | "open"
  | "in_progress"
  | "pending_qa"
  | "qa_failed"
  | "delivered"
  | "confirmed";

/** IP zones — program-level or personal */
export type IPZone = "program" | "myzone";

/** KPI monthly outcome */
export type KPIStatus = "hit" | "miss" | "partial" | "pending";

/** Career pace */
export type PaceStatus = "ahead" | "on_track" | "behind";


// =============================================
// SHARED BUILDING BLOCKS
// =============================================

/** Number + Label claim — used for frameworks and processes */
export interface LabelClaim {
  labelId: string;
  labelName: string;
  quantity: number;
  totalQuantity?: number;
}

/** Timesheet entry */
export interface TimesheetCategory {
  category: TimesheetCategoryType;
  hours: number;
  description?: string;
}

/** A single deliverable ticket */
export interface AutoDeliverable {
  ticketId: string;
  label: string;
  status: DeliverableStatus;
  programId: string;
  programName?: string;
  completedAt?: string | null;
}

/** Constraint entry */
export interface ConstraintEntry {
  type: ConstraintType;
  description: string;
  ticketRef?: string;
}


// =============================================
// TICKET — The accountability unit
// =============================================

export interface Ticket {
  ticketId: string;
  programId: string;
  sprintId: string;
  ticketType: "deliverable" | "constraint";
  constraintType?: ConstraintType;
  label: string;
  quantity: number;
  description: string;
  assignedTo: string;
  assignedBy: string;
  targetDate: string;
  estimatedMinutes?: number;
  actualMinutes?: number;
  dependencies: string[];
  qaCriteria?: string;
  status: string;
  stateTransitions: Array<{
    from: string;
    to: string;
    at: string;
    by: string;
    note?: string;
  }>;
  completedAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}


// =============================================
// 6-AXIS SCORES — How performance is measured
// =============================================

export interface AxisScores {
  deliverables: number;
  ip: number;
  kpis: number;
  frameworks: number;
  processes: number;
  rituals: number;
}


// =============================================
// CAREER SYSTEM
// =============================================

export interface CareerMilestone {
  level: string;
  targetDate: string;
}

export interface CareerPlan {
  id: number;
  orgId: string;
  eid: number;
  ladderId: string | null;
  milestones: CareerMilestone[] | null;
  setBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareerRunrateSnapshot {
  date: string;
  axisScores: AxisScores;
  compositeScore: number;
  level: string | null;
  ladder: string | null;
}

export interface CareerRunrateSnapshotEnriched extends CareerRunrateSnapshot {
  delta: number | null;
  deltaDirection: "up" | "down" | "flat" | "first";
  isLevelChange: boolean;
  monthLabel: string;
}

export interface PlannedTrajectory {
  points: Array<{ date: string; level: string; score: number }>;
}

export interface ProjectedTrajectory {
  points: Array<{ date: string; projectedScore: number }>;
  nextLevelEligibility: {
    level: string;
    estimatedDate: string;
    gapAreas: string[];
  } | null;
}

export interface LevelCriteria {
  axis: AxisType;
  minScore: number;
  weight: number;
  description: string;
}

export interface LadderLevel {
  id: string;
  name: string;
  order: number;
  criteria: LevelCriteria[];
  minCompositeScore: number;
}

export interface CareerLadder {
  id: string;
  name: string;
  orgId: string;
  levels: LadderLevel[];
}

export interface CareerRunrateData {
  planned: PlannedTrajectory;
  actual: CareerRunrateSnapshot[];
  projected: ProjectedTrajectory;
  currentLevel: LadderLevel;
  nextLevel: LadderLevel | null;
  ladder: CareerLadder;
}

export interface AxisGapItem {
  axis: string;
  label: string;
  current: number;
  required: number;
  gap: number;
  cleared: boolean;
  hasCriteria: boolean;
  fillPct: number;
}

export interface TrajectoryDelta {
  monthsDelta: number;
  direction: "ahead" | "behind" | "on-track";
  concreteMilestone: {
    level: string;
    plannedDate: string;
    achievedDate: string;
  } | null;
}

export interface RunwayNode {
  id: string;
  label: string;
  date: string;
  type: "achieved" | "current" | "projected" | "future";
  compositeScore?: number;
  positionPct: number;
  confidenceBand?: {
    leftPct: number;
    widthPct: number;
    earliest: string;
    latest: string;
  };
}


// =============================================
// MONTHLY REPORT — The source for portfolio data
// =============================================

export interface DeliverableSummary {
  total: number;
  completed: number;
  inProgress: number;
  items: Array<{
    ticketId: string;
    label: string;
    status: DeliverableStatus;
    programId: string;
  }>;
}

export interface IPSummary {
  totalCommits: number;
  targetCommits: number;
  items: Array<{ ipItemId: string; title: string; commits: number }>;
}

export interface ClaimSummary {
  claims: LabelClaim[];
  totalQuantity: number;
}

export interface RitualSummary {
  participated: number;
  total: number;
  events: Array<{ ritualId: string; ritualName: string; date: string }>;
}

export interface MonthlyKPICommit {
  kpiId: string;
  kpiName: string;
  programId: string;
  targetValue: string;
  actualValue: string;
  unit: string;
  status: KPIStatus;
}

export interface MonthlyAxisSummary {
  deliverables: DeliverableSummary;
  ip: IPSummary;
  kpis: MonthlyKPICommit[];
  frameworks: ClaimSummary;
  processes: ClaimSummary;
  rituals: RitualSummary;
}

export interface WeeklyBreakdownEntry {
  weekStart: string;
  weekEnd: string;
  delivered: number;
  total: number;
  ipCommits: number;
  happiness: number | null;
  submitted: boolean;
}

export interface MonthlyConstraintPattern {
  type: string;
  occurrences: number;
  weeksAppeared: number;
  topMicro: string | null;
  topMicroCount: number;
}

export interface MonthlyConstraintSummary {
  raised: number;
  resolved: number;
  open: number;
  resolutionRate: number;
  avgResolutionDays: number;
  longestOpen: { description: string; ageDays: number } | null;
  recurringPatterns: MonthlyConstraintPattern[];
}

export interface MonthlyReport {
  month: string;
  status: "draft" | "submitted" | "locked";
  axisSummaries: MonthlyAxisSummary;
  weeklySummaries: Array<{
    weekStart: string;
    weekEnd: string;
    happiness: number | null;
    deliverableCount: number;
    ipCommits: number;
    submitted: boolean;
  }>;
  narrative: string | null;
  portfolioId?: string;
  submittedAt?: string;
  gapFlags?: string[];
  happiness?: number | null;
  weeklyBreakdown?: WeeklyBreakdownEntry[];
  missingWeeks?: string[];
  missingDays?: string[];
  analyticsSnapshot?: {
    totalHours: number;
    categories: TimesheetCategory[];
  } | null;
}


// =============================================
// LEADERSHIP PORTFOLIO — The page you are designing
// =============================================

export type PortfolioSectionType =
  | "executive_summary"
  | "contribution_highlights"
  | "capability_growth"
  | "kpi_impact"
  | "constraint_patterns"
  | "career_trajectory";

export interface LeadershipPortfolioSection {
  type: PortfolioSectionType;
  data: any;
  narrative: string | null;
}

export interface LeadershipPortfolio {
  portfolioId: string;
  uid: string;
  monthId: string;
  orgId: string;
  period: {
    from: string;
    to: string;
  };
  employee: {
    name: string;
    role: string;
    program: string;
    organization: string;
    joinedAt: string;
    tenureMonths: number;
    avatarUrl: string | null;
  }
  sections: LeadershipPortfolioSection[];
  generatedAt: string | null;
  monthlyReportEnrichment?: any;
}


// =============================================
// UBS (USAGE-BASED SCORE) — Engagement tracking
// =============================================

export interface UBSEvent {
  eventType: string;
  eventLabel: string;
  weight: number;
  participated: boolean;
  timestamp?: string;
}

export interface UBSScore {
  weekStart: string;
  score: number;
  maxPossible: number;
  breakdown: UBSEvent[];
}

export interface UBSTrend {
  weeks: Array<{ weekStart: string; score: number | null }>;
}


// =============================================
// KPI — Shared program metrics
// =============================================

export interface KPI {
  id: string;
  programId: string;
  name: string;
  label: string | null;
  unit: string | null;
  currentTarget: unknown | null;
  monthlyCommits: Array<{
    monthId: string;
    commits: Array<{
      eid: number;
      contribution: string | null;
      quantity: number;
      status: string | null;
    }>;
    tpmVerification: {
      verifiedBy: string;
      officialBefore: number;
      officialAfter: number;
      met: boolean;
      verifiedAt: string;
    } | null;
  }>;
}
