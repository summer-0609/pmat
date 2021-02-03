"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Performance {
    constructor() {
        this.performanceList = [];
    }
    async beforeStart(options) {
        const { page } = options;
        await page.evaluateOnNewDocument(getLCP);
        await page.evaluateOnNewDocument(getCLS);
        await page.evaluateOnNewDocument(getFID);
    }
    async start(options) {
        const { page } = options;
        const result = await page.evaluate(() => {
            const { LCP, CLS, FID } = window;
            return { LCP, CLS, FID };
        });
        // await page.waitForNavigation();
        const FP = await page.evaluate(() => performance.getEntriesByName('first-paint')[0].startTime);
        const FCP = await page.evaluate(() => performance.getEntriesByName('first-contentful-paint')[0].startTime);
        this.performanceList.push(Object.assign(Object.assign({}, result), { FP, FCP }));
        console.log(4, this.performanceList);
    }
}
function getLCP() {
    window.LCP = 0;
    const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        window.LCP = lastEntry.renderTime || lastEntry.loadTime;
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'], buffered: true });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            observer.takeRecords();
            observer.disconnect();
        }
    });
}
function getCLS() {
    window.CLS = 0;
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
                window.CLS += entry.value;
            }
        }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            observer.takeRecords();
            observer.disconnect();
        }
    });
}
function getFID() {
    window.FID = '';
    const observer = new PerformanceObserver((list) => {
        window.FID = JSON.stringify(list.getEntries());
        // for (const entry of list.getEntries() as any) {
        //   window.FID = JSON.stringify(entry);
        // }
    });
    observer.observe({ type: 'first-input', buffered: true });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            observer.takeRecords();
            observer.disconnect();
        }
    });
}
exports.default = new Performance();
