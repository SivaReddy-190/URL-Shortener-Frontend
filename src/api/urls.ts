import client from './client';
import type { UrlDto, UrlResponseDto } from '../types/url';

export async function generateShortLink(data: UrlDto): Promise<UrlResponseDto> {
  const response = await client.post<UrlResponseDto>('/api/v1/urls/generate', data);
  return response.data;
}

export async function getMyLinks(): Promise<UrlResponseDto[]> {
  const response = await client.get<UrlResponseDto[]>('/api/v1/urls/my-links');
  return response.data;
}

export async function getStats(shortLink: string): Promise<{ clickCount: number }> {
  const response = await client.get<{ clickCount: number }>(`/api/v1/urls/stats/${shortLink}`);
  return response.data;
}

export async function deleteLink(shortLink: string): Promise<{ message: string }> {
  const response = await client.delete<{ message: string }>(`/api/v1/urls/${shortLink}`);
  return response.data;
}

export async function extendExpiry(
  shortLink: string,
  days: number = 30,
): Promise<UrlResponseDto> {
  const response = await client.patch<UrlResponseDto>(
    `/api/v1/urls/${shortLink}/extend-expiry`,
    { days },
  );
  return response.data;
}
