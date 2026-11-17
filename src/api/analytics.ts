import client from './client';
import type {
  DashboardResponse,
  ClicksSummaryResponse,
  TimeSeriesPoint,
  BreakdownEntry,
} from '../types/analytics';

export async function getDashboard(
  shortLink: string,
  days: number = 30,
): Promise<DashboardResponse> {
  const response = await client.get<DashboardResponse>(
    `/api/v1/analytics/dashboard/${shortLink}`,
    { params: { days } },
  );
  return response.data;
}

export async function getSummary(shortLink: string): Promise<ClicksSummaryResponse> {
  const response = await client.get<ClicksSummaryResponse>(
    `/api/v1/analytics/summary/${shortLink}`,
  );
  return response.data;
}

export async function getClicksByDate(
  shortLink: string,
  days: number = 30,
): Promise<TimeSeriesPoint[]> {
  const response = await client.get<TimeSeriesPoint[]>(
    `/api/v1/analytics/clicks-by-date/${shortLink}`,
    { params: { days } },
  );
  return response.data;
}

export async function getClicksByHour(
  shortLink: string,
  hours: number = 24,
): Promise<TimeSeriesPoint[]> {
  const response = await client.get<TimeSeriesPoint[]>(
    `/api/v1/analytics/clicks-by-hour/${shortLink}`,
    { params: { hours } },
  );
  return response.data;
}

export async function getDeviceBreakdown(
  shortLink: string,
  days: number = 30,
): Promise<BreakdownEntry[]> {
  const response = await client.get<BreakdownEntry[]>(
    `/api/v1/analytics/devices/${shortLink}`,
    { params: { days } },
  );
  return response.data;
}

export async function getBrowserBreakdown(
  shortLink: string,
  days: number = 30,
): Promise<BreakdownEntry[]> {
  const response = await client.get<BreakdownEntry[]>(
    `/api/v1/analytics/browsers/${shortLink}`,
    { params: { days } },
  );
  return response.data;
}

export async function getOsBreakdown(
  shortLink: string,
  days: number = 30,
): Promise<BreakdownEntry[]> {
  const response = await client.get<BreakdownEntry[]>(
    `/api/v1/analytics/os/${shortLink}`,
    { params: { days } },
  );
  return response.data;
}

export async function getCountryBreakdown(
  shortLink: string,
  days: number = 30,
): Promise<BreakdownEntry[]> {
  const response = await client.get<BreakdownEntry[]>(
    `/api/v1/analytics/countries/${shortLink}`,
    { params: { days } },
  );
  return response.data;
}

export async function getTopReferrers(
  shortLink: string,
  days: number = 30,
  limit: number = 10,
): Promise<BreakdownEntry[]> {
  const response = await client.get<BreakdownEntry[]>(
    `/api/v1/analytics/referrers/${shortLink}`,
    { params: { days, limit } },
  );
  return response.data;
}
