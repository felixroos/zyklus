AudioContext.prototype.createClock = function(p, e, s = 0.1, n = 0.1) {
  let o = 0, t = 0, l = 10 ** 4, h = 0.01;
  const k = (c) => e = c(e);
  n = n || s / 2;
  const a = () => {
    const c = this.currentTime, I = c + s + n;
    for (t === 0 && (t = c + h); t < I; )
      t = Math.round(t * l) / l, t >= c && p(t, e, o), t += e, o++;
  };
  let i;
  const u = () => {
    a(), i = setInterval(a, s * 1e3);
  }, r = () => clearInterval(i);
  return { setDuration: k, start: u, stop: () => {
    o = 0, t = 0, r();
  }, pause: () => r(), duration: e };
};
