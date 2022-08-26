AudioContext.prototype.createClock = function(i, e, s = e, o = s / 2) {
  let n = 0, t = 0, l = 10 ** 4, r = 0.01;
  const k = (c) => e = c(e);
  o = o || s / 2;
  const p = () => {
    const c = this.currentTime, I = c + s + o;
    for (t < c && (t = c + r); t < I; )
      t = Math.round(t * l) / l, i(t, e, n++), t += e;
  };
  let a;
  const u = () => {
    p(), a = setInterval(p, s * 1e3);
  }, h = () => clearInterval(a);
  return { setDuration: k, start: u, stop: () => {
    n = 0, t = 0, h();
  }, pause: () => h(), duration: e };
};
