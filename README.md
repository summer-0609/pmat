**English**

<p align="center">🚀 A analysis tool for performance measurement</p>

<p align="center">
    <img src="https://img.shields.io/circleci/project/vuejs/vue/dev.svg" alt="">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="">
</p>

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22823548692f42d39e325b7d574c0583~tplv-k3u1fbpfcp-watermark.image" alt="">

## Install

```bash
npm install d -g pmat

# or use yarn(recommend):
# yarn global add pmat
```

## The output

Notice: `It loaded ...`. the `period` means **This test takes time**. So -n go up and the period go up. **but after you measure TTI, try to keep count below 5**, because it will take a lot of time.

## PerformanceNavigationTiming

| Key                       | Value                                                 |
| :------------------------ | :---------------------------------------------------- |
| Duration time             | duration                                              |
| Redirect time             | redirectEnd - redirectStart                           |
| App cache time            | domainLookupStart - fetchStart                        |
| DNS lookup time           | domainLookupEnd - domainLookupStart                   |
| TCP connect time          | connectEnd - connectStart                             |
| Time To First Byte time   | responseStart - requestStart                          |
| Download time of the page | responseEnd - responseStart                           |
| Fetch resource time       | responseEnd - fetchStart                              |
| White screen time         | domInteractive - fetchStart                           |
| DOM Ready time            | domContentLoadedEventEnd - fetchStart                 |
| DOM Content Load time     | domContentLoadedEventEnd - domContentLoadedEventStart |

https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming

## Metric

| Key | Value                    |
| :-- | :----------------------- |
| FP  | First Paint              |
| FCP | First Content Paint      |
| LCP | Largest Contentful Paint |
| CLS | Cumulative Layout Shift  |
| FID | First Input Delay        |
| TBT | Total Blocking Time      |
| TTI | Time to Interactive      |

## Usage

```bash
pmat --help

Usage: pmat [options] [url]

🚀 A analysis tool for performance measurement

Options:

   -v, --version                output the version number
   -n, --count <n>              specified loading times (default: 20)
   -u, --useragent <ua>         to set the useragent
   --no-cache                   disable cache (default: false)
   --no-javascript              disable javascript (default: false)
   --no-online                  disable network (defalut: false)
   -h, --help                   output usage information
```

For instance

```bash
 # The simplest usage
 pmat https://taobao.com

 # if the url has any parameter, surround the url with double quotes
 pmat "https://taobao.com?a=1&b=2"

 #  Load the specified page 100 times
 pmat -n 5 "https://taobao.com?a=1&b=2"

 #  Load the specified page 100 times without `cache`
 pmat -n 5 "https://taobao.com?a=1&b=2" --no-cache

 #  Load the specified page 100 times without `javascript`
 pmat -n 5 "https://taobao.com?a=1&b=2" --no-javascript

 #  Load the specified page 100 times with `headless = false`
 pmat -n 5 "https://taobao.com?a=1&b=2" -H false

 #  Load the specified page 100 times with set `useragent`
 pmat -n 5 "https://baidu.com?a=1&b=2" -u "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
```

## Pain point

After we have developed a project or optimized the performance of a project,

how do we measure the performance of this project?

A common approach is to look at the data in the `performance` and `network` in the `Dev Tool`, record a few key performance metrics, and refresh them a few times before looking at those performance metrics,

Sometimes we find that due to the small sample size, the current **Network/CPU/Memory** load is heavily impacted, and sometimes the optimized project is slower than before the optimization.

If there is a tool, request web page many times, and then taking out the various performance indicators averaging, we can **very accurately** know the optimization is positive or negative.

In addition, you can also make a comparison and get **accurate data** about **how much you have optimized**. This tool is designed to solve the pain point.

> At the same time, this tool is also a good tool for us to learn about the "browser's process of load and rendering" and "performance optimization", so that we don't get wrong conclusions when there are too few samples

## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## License

[MIT](http://opensource.org/licenses/MIT)

Welcome Star and PR

Copyright (c) 2021 xtmike008@gmail.com
