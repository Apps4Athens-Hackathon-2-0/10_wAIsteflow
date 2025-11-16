// Save as: C:\Users\chris\Downloads\Project\waisteflow-data.js

const WASTE_DATA = (() => {
  // Parking / depot (change to your real depot)
  const PARKING = [37.9625, 23.7000];

  // Thresholds for coloring metrics
  const THRESHOLDS = {
    fullness: { green: 40, yellow: 70 },      // %
    temperature: { green: 40, yellow: 60 },   // °C
    humidity: { green: 40, yellow: 70 }       // %
  };

  // Fullness threshold to decide if a bin should be collected
  const FULLNESS_COLLECT_THRESHOLD = 60; // %

  // Fuel consumption (L/km) for savings estimate
  const FUEL_PER_KM = 0.35;

  // Fuel price & CO₂ factor (demo values)
  const FUEL_PRICE_EUR_PER_L = 1.8;      // €/L (example)
  const CO2_PER_L_DIESEL_KG = 2.64;      // kg CO₂ per liter (approx.)

  // Sample sensor patterns – more aggressive profile for most geitonies
  const SAMPLE_METRICS = [
    { fullness: 25, temperature: 24, humidity: 45 },
    { fullness: 33, temperature: 26, humidity: 50 },
    { fullness: 42, temperature: 30, humidity: 58 },
    { fullness: 55, temperature: 38, humidity: 63 },
    { fullness: 62, temperature: 42, humidity: 70 },
    { fullness: 70, temperature: 48, humidity: 76 },
    { fullness: 78, temperature: 52, humidity: 82 },
    { fullness: 85, temperature: 60, humidity: 88 },
    { fullness: 92, temperature: 65, humidity: 92 },
    { fullness: 97, temperature: 68, humidity: 95 }
  ];

  // Softer profile for Κέντρο Αθήνας → will look "normal"
  const SAMPLE_METRICS_CENTER = [
    { fullness: 35, temperature: 24, humidity: 45 },
    { fullness: 45, temperature: 26, humidity: 50 },
    { fullness: 55, temperature: 29, humidity: 55 },
    { fullness: 50, temperature: 28, humidity: 52 },
    { fullness: 40, temperature: 27, humidity: 48 },
    { fullness: 60, temperature: 30, humidity: 60 }, // just at threshold
    { fullness: 48, temperature: 29, humidity: 55 },
    { fullness: 52, temperature: 31, humidity: 58 },
    { fullness: 57, temperature: 32, humidity: 60 },
    { fullness: 43, temperature: 25, humidity: 50 }
  ];

  // Capacities in liters
  const CAPACITY_PATTERN_L = [2500, 3000, 3000, 4000, 2500, 3500, 4000, 3000, 2500, 4000];

  // Helper: bind metrics & capacity (in liters) to coordinates, with ID prefix
  function buildBinsWithPrefix(coords, prefix, metricsPattern = SAMPLE_METRICS) {
    return coords.map((c, index) => ({
      id: `${prefix}${String(index + 1).padStart(3, "0")}`,
      lat: c[0],
      lng: c[1],
      capacity_l: CAPACITY_PATTERN_L[index % CAPACITY_PATTERN_L.length],
      metrics: metricsPattern[index % metricsPattern.length]
    }));
  }

  const NEIGHBORHOODS = {
    center: {
      label: "Κέντρο Αθήνας",
      bins: buildBinsWithPrefix([
        [37.9815, 23.7259],
        [37.9822, 23.7298],
        [37.9841, 23.7270],
        [37.9853, 23.7315],
        [37.9809, 23.7320],
        [37.9798, 23.7280],
        [37.9830, 23.7235],
        [37.9862, 23.7250],
        [37.9810, 23.7205],
        [37.9845, 23.7330]
      ], "ATH", SAMPLE_METRICS_CENTER)
    },
    kolonaki: {
      label: "Κολωνάκι",
      bins: buildBinsWithPrefix([
        [37.9779, 23.7434],
        [37.9788, 23.7420],
        [37.9796, 23.7402],
        [37.9805, 23.7388],
        [37.9812, 23.7375],
        [37.9820, 23.7391],
        [37.9830, 23.7405],
        [37.9825, 23.7423],
        [37.9816, 23.7440],
        [37.9808, 23.7455]
      ], "KOL")
    },
    exarchia: {
      label: "Εξάρχεια",
      bins: buildBinsWithPrefix([
        [37.9877, 23.7321],
        [37.9884, 23.7350],
        [37.9892, 23.7375],
        [37.9900, 23.7340],
        [37.9910, 23.7360],
        [37.9920, 23.7335],
        [37.9930, 23.7355],
        [37.9898, 23.7315],
        [37.9888, 23.7295],
        [37.9875, 23.7285]
      ], "EXA")
    },
    kypseli: {
      label: "Κυψέλη",
      bins: buildBinsWithPrefix([
        [38.0005, 23.7345],
        [37.9992, 23.7370],
        [37.9980, 23.7390],
        [37.9970, 23.7415],
        [37.9962, 23.7440],
        [37.9950, 23.7380],
        [37.9940, 23.7360],
        [37.9930, 23.7395],
        [37.9920, 23.7410],
        [37.9910, 23.7430]
      ], "KYP")
    },
    pagrati: {
      label: "Παγκράτι",
      bins: buildBinsWithPrefix([
        [37.9685, 23.7440],
        [37.9695, 23.7465],
        [37.9705, 23.7480],
        [37.9715, 23.7500],
        [37.9720, 23.7520],
        [37.9730, 23.7490],
        [37.9740, 23.7470],
        [37.9750, 23.7450],
        [37.9735, 23.7435],
        [37.9725, 23.7415]
      ], "PAG")
    },
    petralona: {
      label: "Πετράλωνα",
      bins: buildBinsWithPrefix([
        [37.9680, 23.7080],
        [37.9690, 23.7105],
        [37.9700, 23.7130],
        [37.9710, 23.7155],
        [37.9720, 23.7180],
        [37.9730, 23.7205],
        [37.9740, 23.7185],
        [37.9750, 23.7160],
        [37.9735, 23.7135],
        [37.9725, 23.7110]
      ], "PET")
    },
    ampelokipoi: {
      label: "Αμπελόκηποι",
      bins: buildBinsWithPrefix([
        [37.9895, 23.7520],
        [37.9905, 23.7540],
        [37.9915, 23.7560],
        [37.9925, 23.7580],
        [37.9935, 23.7600],
        [37.9945, 23.7585],
        [37.9955, 23.7565],
        [37.9965, 23.7545],
        [37.9950, 23.7525],
        [37.9940, 23.7505]
      ], "AMP")
    },
    gazi: {
      label: "Γκάζι / Κεραμεικός",
      bins: buildBinsWithPrefix([
        [37.9780, 23.7100],
        [37.9790, 23.7120],
        [37.9800, 23.7140],
        [37.9810, 23.7160],
        [37.9820, 23.7180],
        [37.9830, 23.7200],
        [37.9825, 23.7220],
        [37.9815, 23.7240],
        [37.9805, 23.7220],
        [37.9795, 23.7200]
      ], "GAZ")
    },
    kallithea: {
      label: "Νεάπολη / Νέος Κόσμος (προσέγγιση)",
      bins: buildBinsWithPrefix([
        [37.9600, 23.7280],
        [37.9610, 23.7300],
        [37.9620, 23.7320],
        [37.9630, 23.7340],
        [37.9640, 23.7360],
        [37.9650, 23.7380],
        [37.9660, 23.7400],
        [37.9655, 23.7420],
        [37.9645, 23.7440],
        [37.9635, 23.7460]
      ], "KAL")
    },
    koukaki: {
      label: "Κουκάκι",
      bins: buildBinsWithPrefix([
        [37.9665, 23.7225],
        [37.9675, 23.7245],
        [37.9685, 23.7265],
        [37.9695, 23.7285],
        [37.9705, 23.7305],
        [37.9715, 23.7325],
        [37.9725, 23.7345],
        [37.9710, 23.7365],
        [37.9700, 23.7345],
        [37.9690, 23.7325]
      ], "KOU")
    }
  };

  return {
    PARKING,
    THRESHOLDS,
    FULLNESS_COLLECT_THRESHOLD,
    FUEL_PER_KM,
    FUEL_PRICE_EUR_PER_L,
    CO2_PER_L_DIESEL_KG,
    NEIGHBORHOODS
  };
})();
