// http://www.alloyteam.com/2012/11/javascript-throttle/

export function throttle (fn, delay, mustRunDelay = 0) {
  if (delay == null) return fn;
  /* istanbul ignore next */
  const timestampProvider =
    typeof performance === 'object' ? performance : Date;
  let timer = null;
  let tStart;
  return function () {
    const tCurr = timestampProvider.now();
    if (timer != null) clearTimeout(timer);
    if (!tStart) {
      tStart = tCurr;
    }
    if (mustRunDelay !== 0 && tCurr - tStart >= mustRunDelay) {
      fn.apply(this, arguments);
      tStart = tCurr;
    } else {
      const args = [...arguments];
      timer = setTimeout(() => {
        timer = null;
        return fn.apply(this, args);
      }, delay);
    }
  };
}

export const PASSIVE_OPTS = (function () {
  let value = false;
  function noop() {
    return;
  }
  try {
    window.addEventListener('test', noop, {
      get passive() {
        value = true;
        return true;
      }
    });
    window.removeEventListener('test', noop);
  } catch (e) {
    value = false;
  }
  return value && { passive: true };
})();

export function create(prototype, properties) {
  const obj = Object.create(prototype);
  Object.assign(obj, properties);
  return obj;
}
