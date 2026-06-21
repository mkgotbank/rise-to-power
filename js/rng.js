/* ============================================================
   Rise to Power — RNG
   A small, fast, *seedable* pseudo-random generator so lives are
   reproducible (great for debugging & shareable "seeds").
   Exposes everything under the global namespace RTP.rng.
   ============================================================ */
(function () {
  const RTP = (window.RTP = window.RTP || {});

  // mulberry32 — tiny, decent-quality 32-bit PRNG.
  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Hash a string seed into a 32-bit int.
  function hashSeed(str) {
    str = String(str);
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return (h ^= h >>> 16) >>> 0;
  }

  class RNG {
    constructor(seed) {
      this.seed = seed == null ? String(Math.floor(performance.now() * 1000) % 1e9) : String(seed);
      this._next = mulberry32(hashSeed(this.seed));
    }
    // float in [0,1)
    f() { return this._next(); }
    // int in [min, max] inclusive
    int(min, max) { return Math.floor(this.f() * (max - min + 1)) + min; }
    // true with probability p (0..1)
    chance(p) { return this.f() < p; }
    // random element of an array
    pick(arr) { return arr[Math.floor(this.f() * arr.length)]; }
    // weighted pick: items can be {w:Number,...} or [item, weight] handled by accessor
    weighted(items, weightFn) {
      weightFn = weightFn || ((it) => (it && it.w != null ? it.w : (it && it.weight != null ? it.weight : 1)));
      let total = 0;
      for (const it of items) total += Math.max(0, weightFn(it));
      if (total <= 0) return this.pick(items);
      let r = this.f() * total;
      for (const it of items) {
        r -= Math.max(0, weightFn(it));
        if (r < 0) return it;
      }
      return items[items.length - 1];
    }
    // shuffle (Fisher–Yates), returns a new array
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(this.f() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    // pick n distinct elements
    sample(arr, n) { return this.shuffle(arr).slice(0, Math.min(n, arr.length)); }
    // gaussian-ish via central limit (mean, std), clamped optional
    normal(mean, std) {
      let s = 0;
      for (let i = 0; i < 6; i++) s += this.f();
      return mean + (s - 3) * (std / 1.46);
    }
  }

  RTP.RNG = RNG;
  RTP.rng = new RNG(); // default global instance; engine replaces it with a seeded one
})();
