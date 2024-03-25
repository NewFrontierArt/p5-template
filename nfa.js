//NFA PRNG FUNCTION - DO NOT EDIT

var nfa_finished = false
var nfa_traits = []

function MersenneTwister(seed) {
  if (seed == null) {
    const p = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    seed = `nfa${Array.from({ length: 36}, () => p[Math.random() * p.length | 0]).join("")}`;
  }

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  let seedAsInt = hash >>> 0;

  // Constants
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df;
  this.UPPER_MASK = 0x80000000;
  this.LOWER_MASK = 0x7fffffff;

  this.mt = new Array(this.N);
  this.mti = this.N + 1;

  this.init_genrand(seedAsInt);
}

MersenneTwister.prototype.init_genrand = function (s) {
  this.mt[0] = s >>> 0;
  for (this.mti = 1; this.mti < this.N; this.mti++) {
    var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
    this.mt[this.mti] =
      (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
        (s & 0x0000ffff) * 1812433253 +
        this.mti) >>>
      0;
  }
};

MersenneTwister.prototype.genrand_int32 = function () {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);

  if (this.mti >= this.N) {
    // generate N words at one time
    var kk;

    if (this.mti === this.N + 1) {
      this.init_genrand(5489); // a default initial seed is used
    }

    for (kk = 0; kk < this.N - this.M; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }

    for (; kk < this.N - 1; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] =
        this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }

    y =
      (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
    this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  // Tempering
  y ^= y >>> 11;
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= y >>> 18;

  return y >>> 0;
};

var urlParams = new URLSearchParams(window.location.search);
var mint = urlParams.get("nfa");
var generator = new MersenneTwister(mint);

function nfaRandom(min, max) {
  const randomValue = generator.genrand_int32();
  return (randomValue % (max + 1 - min)) + min;
}

function nfaRandomFloat() {
  const randomInt = generator.genrand_int32();
  return randomInt / 0xFFFFFFFF;
}

function nfaFinish(traitArray) {
  console.log("finishing", traitArray)

  if (Array.isArray(traitArray)) {
      for (const trait of traitArray) {
        if (typeof trait == "object") {
          if (
            typeof trait["trait_type"] != "string" ||
            typeof trait["value"] != "string"
          ) {
            console.log("not string")
            return;
          }
        } else {
          console.log('not object array')
          return;
        }
      };

      console.log("traits set");
      nfa_traits = traitArray;
  } else {
    console.log("not array")
  }
  
 nfa_finished = true
}
