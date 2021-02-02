"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("../utils");
const { log } = console;
class Navigation {
    constructor() {
        this.name = 'navigation';
    }
    async start(options) {
        const { page } = options;
        if (!(await this.support(page))) {
            log(chalk_1.default.bold.red(`This browser doesn't support Performance API`));
            return;
        }
        this.navigationTime = await page.evaluate(this.getNavigationTime);
    }
    async support(page) {
        const isSupport = await page.evaluate(utils_1.isSupportPerformance);
        return isSupport;
    }
    calculate() {
        if (utils_1.isEmpty(this.navigationTime)) {
            return {};
        }
        const { domainLookupEnd, domainLookupStart, connectEnd, connectStart, responseEnd, responseStart, domInteractive, fetchStart, domContentLoadedEventEnd, domContentLoadedEventStart, requestStart, } = JSON.parse(this.navigationTime);
        return utils_1.mapValues({
            DNS: this.getDNSTime(domainLookupStart, domainLookupEnd),
            TCP: this.getTCPTime(connectStart, connectEnd),
            TTFB: this.getTTFB(requestStart, responseStart),
            AppCache: this.getAppCacheTime(fetchStart, domainLookupStart),
            Response: this.getDownloadTime(responseStart, responseEnd),
            FetchResource: this.getFetchResourceTime(fetchStart, responseEnd),
            WhiteScreen: this.getWhiteScreenTime(fetchStart, domInteractive),
            DOMReady: this.getDOMReadyTime(fetchStart, domContentLoadedEventEnd),
            DOMContentLoad: this.getLoadTime(domContentLoadedEventStart, domContentLoadedEventEnd),
        }, utils_1.format);
    }
    getNavigationTime() {
        const navigation = performance.getEntriesByType('navigation');
        return JSON.stringify(navigation[0] || {});
    }
    /**
     * @param {Number} domainLookupStart 返回用户代理对当前文档所属域进行DNS查询开始的时间。
     * 如果此请求没有DNS查询过程，如长连接，资源cache,甚至是本地资源等。 那么就返回 fetchStart的值
     * @param {Number} domainLookupEnd 返回用户代理对结束对当前文档所属域进行DNS查询的时间。
     * 如果此请求没有DNS查询过程，如长连接，资源cache，甚至是本地资源等。那么就返回 fetchStart的值
     * @returns {Number} DNS查询耗时
     */
    getDNSTime(domainLookupStart, domainLookupEnd) {
        return domainLookupEnd - domainLookupStart;
    }
    /**
     * @param {Number} connectStart 返回用户代理向服务器服务器请求文档，开始建立连接的那个时间，
     * 如果此连接是一个长连接，又或者直接从缓存中获取资源（即没有与服务器建立连接）。
     * 则返回domainLookupEnd的值
     * @param {Number} connectEnd 返回用户代理向服务器服务器请求文档，
     * 建立连接成功后的那个时间，如果此连接是一个长连接，又或者直接从缓存中获取资源（即没有与服务器建立连接）。
     * 则返回domainLookupEnd的值
     * @returns {Number} TCP链接耗时
     */
    getTCPTime(connectStart, connectEnd) {
        return connectEnd - connectStart;
    }
    /**
     * @param {Number} responseStart 返回用户代理从服务器、缓存、本地资源中，接收到第一个字节数据的时间
     * @param {Number} responseEnd 返回用户代理接收到最后一个字符的时间，和当前连接被关闭的时间中，更早的那个。
     * 同样，文档可能来自服务器、缓存、或本地资源
     * @returns {Number} 网页本身的下载耗时
     */
    getDownloadTime(responseStart, responseEnd) {
        return responseEnd - responseStart;
    }
    /**
     * @param fetchStart 开始获取资源的时间，如果资源重定向了，那么时间为最后一个重定向资源的开始获取时间
     * @param domainLookupStart 资源开始进行DNS查询的时间（如果没有进行DNS查询，例如使用了缓存或本地资源则时间等于fetchStart）
     * @returns {Number} 缓存耗时
     */
    getAppCacheTime(fetchStart, domainLookupStart) {
        return domainLookupStart - fetchStart;
    }
    /**
     *
     * @param fetchStart
     * @param responseEnd
     * @returns {Number} 请求资源耗时
     */
    getFetchResourceTime(fetchStart, responseEnd) {
        return responseEnd - fetchStart;
    }
    /**
     *
     * @param {Number} domInteractive 准备加载新页面的起始时间
     * @param {Number} domComplete readyState = complete的时候
     * @returns {Number} 解析DOM Tree耗时
     * 这个说法有点儿不严谨，这个只能当做dom加载完毕以后，子资源的下载耗时，名字起的容易让人误解
     */
    getAfterDOMReadyTheDownloadTimeOfTheRes(domInteractive, domComplete) {
        return domComplete - domInteractive;
    }
    /**
     *
     * @param {Number} domInteractive 准备加载新页面的起始时间
     * @param {Number} responseStart 返回用户代理从服务器、缓存、本地资源中，接收到第一个字节数据的时间
     * @returns {Number} 白屏时间
     */
    getWhiteScreenTime(fetchStart, domInteractive) {
        return domInteractive - fetchStart;
    }
    /**
     * @param {*} fetchStart 开始获取资源的时间，如果资源重定向了，那么时间为最后一个重定向资源的开始获取时间
     * @param {*} domContentLoadedEventEnd DOMContentLoaded事件触发后的时间
     */
    getDOMReadyTime(fetchStart, domContentLoadedEventEnd) {
        return domContentLoadedEventEnd - fetchStart;
    }
    /**
     *
     * @param {Number} fetchStart 准备加载新页面的起始时间
     * @param {Number} loadEventEnd 文档触发load事件结束后的时间。如果load事件没有触发，那么该接口就返回0
     * @returns {Number} DOM Ready耗时
     */
    getLoadTime(domContentLoadedEventStart, domContentLoadedEventEnd) {
        return domContentLoadedEventEnd - domContentLoadedEventStart;
    }
    /**
     *
     * @param {Number} requestStart
     * @param {Number} responseStart
     * @return {Number} TTFB
     * TTFB (Time To First Byte)，是最初的网络请求被发起到从服务器接收到第一个字节这段时间，
     * 它包含了 TCP连接时间，发送HTTP请求时间和获得响应消息第一个字节的时间。 - 上面是百度百科的解释
     * 但是在chrome上，只包含刚开始发送request到接收到第一个byte的时间，
     * 发送request前面的预操作则不算在内
     */
    getTTFB(requestStart, responseStart) {
        return responseStart - requestStart;
    }
}
exports.default = new Navigation();
