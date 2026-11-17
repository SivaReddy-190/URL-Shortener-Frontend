export interface TimeSeriesPoint {
  timestamp: string;
  clicks: number;
}

export interface BreakdownEntry {
  name: string;
  clicks: number;
}

export interface ClicksSummaryResponse {
  shortLink: string;
  totalClicks: number;
  clicksLast24h: number;
  clicksLast7d: number;
  clicksLast30d: number;
}

export interface DashboardResponse extends ClicksSummaryResponse {
  originalUrl: string;
  clicksByDate: TimeSeriesPoint[];
  deviceBreakdown: BreakdownEntry[];
  browserBreakdown: BreakdownEntry[];
  osBreakdown: BreakdownEntry[];
  countryBreakdown: BreakdownEntry[];
  topReferrers: BreakdownEntry[];
}
