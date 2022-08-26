import '../src/zyklus';

const beep = (ctx) => (t, duration, tick) => {
  const latency = ((t - ctx.currentTime) * 1000).toFixed(2);
  console.log(tick, t.toFixed(2), duration, latency);
  t += 0.01;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  //o.frequency.value = tick % 4 === 0 ? 440 : 220;
  o.frequency.value = 330;
  o.type = 'triangle';
  o.start(t);
  o.stop(t + duration / 2);
  const end = t + duration / 2;
  o.connect(g);
  const attack = 0.01;
  const release = 0.01;
  const max = 0.8;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(max, t + attack);
  g.gain.setValueAtTime(max, end - release);
  g.gain.linearRampToValueAtTime(0, end);
  g.connect(ctx.destination);
};

let cycle;
const on = (event, id, callback) => document.getElementById(id).addEventListener(event, callback);
const ctx = new AudioContext();
on('click', 'start-cycle', () => {
  ctx.resume();
  if (!cycle) {
    cycle = ctx.createClock(beep(ctx), 0.2, 1 / 100, 1 / 100);
  }
  cycle.start();
});
on('click', 'pause-cycle', () => cycle?.pause());
on('click', 'stop-cycle', () => cycle?.stop());
on('click', 'slower-cycle', () => cycle?.setDuration((d) => d * 1.1));
on('click', 'faster-cycle', () => cycle?.setDuration((d) => d * 0.9));
