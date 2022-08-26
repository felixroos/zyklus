AudioContext.prototype.createClock = function(p, e, s = 0.1, n = 0.1) {
  let o = 0, t = 0, l = 10 ** 4, r = 0.01;
  const k = (c) => e = c(e);
  n = n || s / 2;
  const i = () => {
    const c = this.currentTime, I = c + s + n;
    for (t === 0 ? t = c + r : t < c && (t = Math.ceil(c / e) * e); t < I; )
      t = Math.round(t * l) / l, p(t, e, o++), t += e;
  };
  let a;
  const f = () => {
    i(), a = setInterval(i, s * 1e3);
  }, h = () => clearInterval(a);
  return { setDuration: k, start: f, stop: () => {
    o = 0, t = 0, h();
  }, pause: () => h(), duration: e };
};
