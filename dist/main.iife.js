var Zelda = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  /* eslint-disable no-console */
  var log = function log(message) {
    console.log("%cPer", 'background: #606060; color: white; padding: 1px 10px; border-radius: 3px;', message);
  };
  var logIndicator = function logIndicator(type, data) {
    console.log("%cPer%c".concat(type), 'background: #606060; color: white; padding: 1px 10px; border-top-left-radius: 3px; border-bottom-left-radius: 3px;', 'background: #1475b2; color: white; padding: 1px 10px; border-top-right-radius: 3px;border-bottom-right-radius: 3px;', data);
  };

  var isSupportPerformance = function isSupportPerformance() {
    var _window = window,
        performance = _window.performance;
    return performance && !!performance.getEntriesByType && !!performance.now && !!performance.mark;
  };

  var scoreLevel = ['fast', 'moderate', 'slow'];
  var scores = {
    fcp: [2000, 4000],
    lcp: [2500, 4500],
    fid: [100, 300],
    tbt: [300, 600],
    cls: [0.1, 0.25]
  };
  var getScore = function getScore(type, data) {
    var score = scores[type];

    for (var i = 0; i < score.length; i += 1) {
      if (data <= score[i]) return scoreLevel[i];
    }

    return scoreLevel[2];
  };

  var initObserver = function initObserver(entryTypes, callback) {
    var observer = new PerformanceObserver(function (list) {
      // 当记录一个新的性能指标时执行
      if (typeof callback === 'function') {
        callback.call(null, list.getEntries());
      }
    }); // 注册长任务观察者

    if (typeof entryTypes === 'string') {
      observer.observe({
        type: entryTypes,
        buffered: true
      });
      return;
    }

    observer.observe({
      entryTypes: entryTypes
    });
  };

  var getNavigationTime = function getNavigationTime() {
    var navigation = performance.getEntriesByType('navigation');
    var time = navigation[0];

    if (time) {
      var domainLookupEnd = time.domainLookupEnd,
          domainLookupStart = time.domainLookupStart,
          connectEnd = time.connectEnd,
          connectStart = time.connectStart,
          workerStart = time.workerStart,
          redirectEnd = time.redirectEnd,
          redirectStart = time.redirectStart,
          redirectCount = time.redirectCount,
          responseEnd = time.responseEnd,
          responseStart = time.responseStart,
          fetchStart = time.fetchStart,
          domContentLoadedEventEnd = time.domContentLoadedEventEnd,
          domContentLoadedEventStart = time.domContentLoadedEventStart,
          requestStart = time.requestStart;
      return {
        redirectCount: redirectCount,
        redirectTime: redirectEnd - redirectStart,
        appCache: domainLookupStart - fetchStart,
        // dns lookup time
        DNS: domainLookupEnd - domainLookupStart,
        // handshake end - handshake start time
        TCP: connectEnd - connectStart,
        responseTime: responseEnd - responseStart,
        // Time to First Byte
        TTFB: responseStart - requestStart,
        // fetch resource time
        fetchTime: responseEnd - fetchStart,
        // Service work response time
        workerTime: workerStart > 0 ? responseEnd - workerStart : 0,
        domReady: domContentLoadedEventEnd - fetchStart,
        // DOMContentLoaded time
        DCL: domContentLoadedEventEnd - domContentLoadedEventStart
      };
    }

    return {};
  };

  var getPaintTime = function getPaintTime() {
    initObserver("paint", function (entries) {
      entries.forEach(function (entry) {
        var time = entry.startTime;
        var name = entry.name;

        if (name === 'first-contentful-paint') {
          logIndicator('FCP', {
            time: time,
            score: getScore('fcp', time)
          });
        } else {
          logIndicator('FP', {
            time: time
          });
        }
      });
    });
  };

  var Zelda = /*#__PURE__*/function () {
    function Zelda(otpions) {
      classCallCheck(this, Zelda);

      if (!isSupportPerformance) {
        log("This browser doesn't support Performance API");
        return;
      }

      console.log(44);
      logIndicator('Navigation Time', getNavigationTime());
      getPaintTime();
      this.observers = [];
    }

    createClass(Zelda, [{
      key: "addObserver",
      value: function addObserver(type, callback) {
        this.observers.push({
          type: type,
          callback: callback
        });
        return this;
      } // start() {
      //   if (!isSupportPerformance())
      // }

    }]);

    return Zelda;
  }();

  return Zelda;

}());
