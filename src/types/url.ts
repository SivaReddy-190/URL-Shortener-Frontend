export interface UrlDto {
  url: string;
  expirationDays?: number;
  shortLink?: string;
}

export interface UrlResponseDto {
  originalUrl: string;
  shortLink: string;
  expirationTime: string;
}
