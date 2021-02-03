export type EntryType = PerformanceEntry['entryType'];

export type ObserverCallback = (v: PerformanceEntryList) => void;

export interface NavigationTime {
  redirectCount?: number;
  redirectTime?: number;
  appCache?: number;
  DNS?: number;
  TCP?: number;
  responseTime?: number;
  TTFB?: number;
  fetchTime?: number;
  workerTime?: number;
  domReady?: number;
  DCL?: number;
}

declare global {
  interface Window {
    LCP: number;
    CLS: number;
    FID: string;
  }
}
