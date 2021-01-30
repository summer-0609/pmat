// import { log, isSupportPerformance, logIndicator } from './utils';
// import { getNavigationTime } from './observer/navigation';
// import getPaintTime from './observer/paint';
// import { EntryType } from './types';

// class Zelda {
//   constructor(otpions) {
//     if (!isSupportPerformance) {
//       log(`This browser doesn't support Performance API`);
//       return;
//     }
//     logIndicator('Navigation Time', getNavigationTime());

//     getPaintTime();
//     this.observers = [];
//   }

//   addObserver(type: EntryType, callback: Function): this {
//     this.observers.push({
//       type,
//       callback,
//     });
//     return this;
//   }

//   // start() {
//   //   if (!isSupportPerformance())
//   // }
// }

// export default Zelda;
