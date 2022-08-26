AudioContext.prototype['createClock'] = function (
  callback, // called slightly before each cycle
  duration, // duration of each cycle
  interval = 0.1, // interval between callbacks
  overlap = 0.1, // overlap between callbacks
) {
  let tick = 0; // counts callbacks
  let phase = 0; // next callback time
  let precision = 10 ** 4; // used to round phase
  let minLatency = 0.01;
  const setDuration = (setter) => (duration = setter(duration));
  overlap = overlap || interval / 2;
  const onTick = () => {
    const t = this.currentTime;
    const lookahead = t + interval + overlap; // the time window for this tick
    if (phase < t) {
      // skip past callbacks?
      // phase = Math.ceil(t / duration) * duration;
      phase = t + minLatency;
    }
    // callback as long as we're inside the lookahead
    while (phase < lookahead) {
      phase = Math.round(phase * precision) / precision;
      callback(phase, duration, tick++);
      phase += duration; // increment phase by duration
    }
  };
  let intervalID;
  const start = () => {
    onTick();
    intervalID = setInterval(onTick, interval * 1000);
  };
  const clear = () => clearInterval(intervalID);
  const pause = () => clear();
  const stop = () => {
    tick = 0;
    phase = 0;
    clear();
  };
  // setCallback
  return { setDuration, start, stop, pause, duration };
};
