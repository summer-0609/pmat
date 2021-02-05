export type EntryType = PerformanceEntry['entryType'];

declare global {
  interface Window {
    LCP: number;
    CLS: number;
    FID: number;
    TBT: number;
    FP: number;
    FCP: number;
    __tti: { e: any };
    ttiPolyfill: any;
  }
}
