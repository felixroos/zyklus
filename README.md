# Zyklus

Zyklus a small (380 Byte) library to get an accurate Web Audio Clock without hassle.

## Installation

```sh
npm i zyklus --save
```

## Usage

```js
import 'zyklus';

const clock = ctx
  .createClock((time, duration, tick) => {
    console.log(time, duration, tick);
  }, 0.2)
  .start();
```

## API

### createClock(callback, duration, interval?, overlap?) -> Clock

- `callback((time, duration, tick) => void)`: called for each tick with
  - `time` precise AudioContext time when the tick should happen
  - `duration` seconds between each tick
  - `interval` (optional) seconds used for the interval. Change this to tune the latency
  - `overlap` (optional) seconds of overlap between intervals. Change this to tune the latency and resilience

### Clock.start() -> Clock
