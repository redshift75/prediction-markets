// Mock data for prediction markets prototype

const TAGS = ["All", "Politics", "Sports", "Crypto", "Weather", "Economy", "Entertainment", "Science"];

const CONDITIONAL_ATTRS = {
  Politics: ["USA", "Russia - USA", "Israel", "Election 2028"],
  Sports: ["NBA", "UFC", "NFL", "Soccer"],
  Crypto: ["Bitcoin", "Ethereum", "Solana", "Commodities"],
  Weather: ["Hurricane", "Earthquake", "Temperature"],
  Economy: ["Fed", "Inflation", "IPO", "Commodities"],
  Entertainment: ["Box Office", "Awards", "Music"],
  Science: ["Space", "AI", "Climate"],
  All: ["Commodities", "Israel", "Russia - USA", "USA"],
};

const MARKETS = [
  { id: "m1", event: "Israeli Night: Israel Adesanya vs. Joe Pyfer (M…)", contract: "UFC Fight Night: Israel Adesanya vs. Joe Pyfer (Middlewe…)", expiry: "3/24/2026", daysSince: 0, volume: 251047, priorProb: 65, currProb: 26, probChg: -13, zScore: 3.6, tag: "Sports", attr: "UFC" },
  { id: "m2", event: "Which states will Donald Trump visit in 2026?", contract: "Will Donald Trump visit Oregon in 2026?", expiry: "12/31/2026", daysSince: 0, volume: 21432, priorProb: 91, currProb: 18, probChg: -73, zScore: 5.1, tag: "Politics", attr: "USA" },
  { id: "m3", event: "When will the US government shutdown end…", contract: "Will the US government shutdown end between March-…", expiry: "3/31/2026", daysSince: 0, volume: 29357, priorProb: 19, currProb: 39, probChg: 20, zScore: 3.8, tag: "Politics", attr: "USA" },
  { id: "m4", event: "How many coins launched in 2026 and the y…", contract: "Over 5 coins launched in 2026 and the year in the top …", expiry: "1/1/2027", daysSince: 0, volume: 27049, priorProb: 11, currProb: 47, probChg: 36, zScore: 3.6, tag: "Crypto", attr: "Bitcoin" },
  { id: "m5", event: "How many 7.0 or more earthquakes by June …", contract: "Will there be 8 or more earthquakes of magnitude 7.0 …", expiry: "6/30/2026", daysSince: 0, volume: 488755, priorProb: 33, currProb: 50, probChg: 17, zScore: 4.0, tag: "Weather", attr: "Earthquake" },
  { id: "m6", event: "Solstice FDV above __ one day after launch?", contract: "Solstice FDV above $50M one day after launch?", expiry: "1/1/2027", daysSince: 0, volume: 183572, priorProb: 80, currProb: 63, probChg: -17, zScore: -3.3, tag: "Crypto", attr: "Solana" },
  { id: "m7", event: "Blue wave in 2026?", contract: "Blue wave in 2026?", expiry: "11/30/2026", daysSince: 0, volume: 123989, priorProb: 84, currProb: 70, probChg: -14, zScore: -4.3, tag: "Politics", attr: "USA" },
  { id: "m8", event: "IPOs before 2027?", contract: "Discord IPO before 2027?", expiry: "12/31/2026", daysSince: 0, volume: 311004, priorProb: 62, currProb: 77, probChg: 15, zScore: 3.0, tag: "Economy", attr: "IPO" },
  { id: "m9", event: "What will Gold (GC) hit __ by end of June?", contract: "Will Gold (GC) hit (LOW) $3,420 by end of June?", expiry: "6/30/2026", daysSince: 0, volume: 267719, priorProb: 27, currProb: 14, probChg: -13, zScore: -3.6, tag: "Economy", attr: "Commodities" },
  { id: "m10", event: "Which teams will make the NBA Playoffs?", contract: "Will the Orlando Magic make the NBA Playoffs?", expiry: "4/12/2026", daysSince: 0, volume: 56322, priorProb: 75, currProb: 60, probChg: -15, zScore: -3.6, tag: "Sports", attr: "NBA" },
  { id: "m11", event: "Who will leave Trump Administration before …", contract: "Will Robert F. Kennedy Jr. leave the Trump administrati…", expiry: "12/31/2026", daysSince: 0, volume: 51211, priorProb: 30, currProb: 14, probChg: -16, zScore: -3.2, tag: "Politics", attr: "USA" },
  { id: "m12", event: "NBA Worst Record", contract: "Will the Indiana Pacers have the worst record in the NB…", expiry: "4/12/2026", daysSince: 0, volume: 82397, priorProb: 73, currProb: 42, probChg: -31, zScore: -3.9, tag: "Sports", attr: "NBA" },
  { id: "m13", event: "How many 7.0 or above earthquakes in 2026?", contract: "Will there be between 8 and 10 earthquakes of magnit…", expiry: "12/31/2026", daysSince: 0, volume: 106524, priorProb: 28, currProb: 17, probChg: -11, zScore: -4.1, tag: "Weather", attr: "Earthquake" },
  { id: "m14", event: "Will Israel annex any territory by December 3…", contract: "Will Israel annex any territory by June 30?", expiry: "6/30/2026", daysSince: 0, volume: 125721, priorProb: 35, currProb: 12, probChg: -23, zScore: -4.2, tag: "Politics", attr: "Israel" },
  { id: "m15", event: "Russia-Ukraine ceasefire in 2026?", contract: "Will Russia and Ukraine announce a ceasefire by Q3 2026?", expiry: "9/30/2026", daysSince: 0, volume: 402118, priorProb: 22, currProb: 34, probChg: 12, zScore: 2.9, tag: "Politics", attr: "Russia - USA" },
  { id: "m16", event: "Fed rate decision in June", contract: "Will the Fed cut rates at the June FOMC meeting?", expiry: "6/18/2026", daysSince: 0, volume: 612340, priorProb: 42, currProb: 58, probChg: 16, zScore: 3.4, tag: "Economy", attr: "Fed" },
  { id: "m17", event: "Fed rate decision in June", contract: "Will the Fed hold rates at the June FOMC meeting?", expiry: "6/18/2026", daysSince: 0, volume: 489221, priorProb: 45, currProb: 39, probChg: -6, zScore: -1.8, tag: "Economy", attr: "Fed" },
  { id: "m18", event: "CPI release in May", contract: "Will May CPI print above 3.0% YoY?", expiry: "5/15/2026", daysSince: 0, volume: 198433, priorProb: 38, currProb: 41, probChg: 3, zScore: 0.9, tag: "Economy", attr: "Inflation" },
  { id: "m19", event: "Bitcoin price by end of Q2", contract: "Will Bitcoin close above $110k on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 877104, priorProb: 28, currProb: 35, probChg: 7, zScore: 1.4, tag: "Crypto", attr: "Bitcoin" },
  { id: "m20", event: "Bitcoin price by end of Q2", contract: "Will Bitcoin close below $80k on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 412998, priorProb: 22, currProb: 19, probChg: -3, zScore: -0.6, tag: "Crypto", attr: "Bitcoin" },
  { id: "m21", event: "Ethereum ETF net inflows", contract: "Will spot ETH ETFs see net inflows > $1B in May?", expiry: "5/31/2026", daysSince: 0, volume: 152870, priorProb: 55, currProb: 60, probChg: 5, zScore: 1.1, tag: "Crypto", attr: "Ethereum" },
  { id: "m22", event: "Solana price above $200?", contract: "Will Solana close above $200 by end of June?", expiry: "6/30/2026", daysSince: 0, volume: 98012, priorProb: 31, currProb: 29, probChg: -2, zScore: -0.4, tag: "Crypto", attr: "Solana" },
  { id: "m23", event: "NBA Finals champion", contract: "Will the Boston Celtics win the 2026 NBA Finals?", expiry: "6/22/2026", daysSince: 0, volume: 244567, priorProb: 26, currProb: 31, probChg: 5, zScore: 1.7, tag: "Sports", attr: "NBA" },
  { id: "m24", event: "NBA Finals champion", contract: "Will the Denver Nuggets win the 2026 NBA Finals?", expiry: "6/22/2026", daysSince: 0, volume: 188342, priorProb: 18, currProb: 15, probChg: -3, zScore: -0.9, tag: "Sports", attr: "NBA" },
  { id: "m25", event: "NFL Draft first pick", contract: "Will a QB be the #1 overall pick in the 2026 NFL Draft?", expiry: "4/23/2026", daysSince: 0, volume: 76554, priorProb: 72, currProb: 70, probChg: -2, zScore: -0.3, tag: "Sports", attr: "NFL" },
  { id: "m26", event: "Super Bowl LX MVP", contract: "Will a quarterback win Super Bowl LX MVP?", expiry: "2/8/2026", daysSince: 0, volume: 45123, priorProb: 68, currProb: 72, probChg: 4, zScore: 0.8, tag: "Sports", attr: "NFL" },
  { id: "m27", event: "Premier League champion", contract: "Will Manchester City win the 2025-26 Premier League?", expiry: "5/24/2026", daysSince: 0, volume: 88990, priorProb: 42, currProb: 48, probChg: 6, zScore: 1.2, tag: "Sports", attr: "Soccer" },
  { id: "m28", event: "Hurricane season activity", contract: "Will there be 15+ named Atlantic storms in 2026?", expiry: "11/30/2026", daysSince: 0, volume: 63422, priorProb: 54, currProb: 57, probChg: 3, zScore: 0.7, tag: "Weather", attr: "Hurricane" },
  { id: "m29", event: "NYC summer temperatures", contract: "Will NYC hit 100°F by September 1?", expiry: "9/1/2026", daysSince: 0, volume: 29800, priorProb: 21, currProb: 24, probChg: 3, zScore: 0.6, tag: "Weather", attr: "Temperature" },
  { id: "m30", event: "California wildfire season", contract: "Will California declare a wildfire emergency by August?", expiry: "8/31/2026", daysSince: 0, volume: 41109, priorProb: 66, currProb: 71, probChg: 5, zScore: 1.3, tag: "Weather", attr: "Temperature" },
  { id: "m31", event: "Box Office: summer blockbusters", contract: "Will the top summer film earn > $500M domestic?", expiry: "9/1/2026", daysSince: 0, volume: 52330, priorProb: 40, currProb: 36, probChg: -4, zScore: -1.0, tag: "Entertainment", attr: "Box Office" },
  { id: "m32", event: "Academy Awards 2027", contract: "Will a streaming film win Best Picture at the 2027 Oscars?", expiry: "3/15/2027", daysSince: 0, volume: 37881, priorProb: 33, currProb: 38, probChg: 5, zScore: 1.1, tag: "Entertainment", attr: "Awards" },
  { id: "m33", event: "Album sales 2026", contract: "Will any album sell > 2M copies in its first week in 2026?", expiry: "12/31/2026", daysSince: 0, volume: 19420, priorProb: 29, currProb: 32, probChg: 3, zScore: 0.5, tag: "Entertainment", attr: "Music" },
  { id: "m34", event: "SpaceX Starship missions", contract: "Will SpaceX complete an orbital Starship refuel in 2026?", expiry: "12/31/2026", daysSince: 0, volume: 144003, priorProb: 46, currProb: 51, probChg: 5, zScore: 1.5, tag: "Science", attr: "Space" },
  { id: "m35", event: "NASA Artemis mission", contract: "Will Artemis III crewed launch happen before 2027?", expiry: "12/31/2026", daysSince: 0, volume: 91208, priorProb: 38, currProb: 34, probChg: -4, zScore: -1.1, tag: "Science", attr: "Space" },
  { id: "m36", event: "AI model capability benchmarks", contract: "Will any public model score > 95% on GPQA in 2026?", expiry: "12/31/2026", daysSince: 0, volume: 178934, priorProb: 52, currProb: 58, probChg: 6, zScore: 1.6, tag: "Science", attr: "AI" },
  { id: "m37", event: "AI model capability benchmarks", contract: "Will any public model score > 90% on ARC-AGI in 2026?", expiry: "12/31/2026", daysSince: 0, volume: 102456, priorProb: 28, currProb: 31, probChg: 3, zScore: 0.7, tag: "Science", attr: "AI" },
  { id: "m38", event: "Global CO2 milestones", contract: "Will global CO2 average stay above 425ppm for 2026?", expiry: "12/31/2026", daysSince: 0, volume: 28112, priorProb: 78, currProb: 80, probChg: 2, zScore: 0.4, tag: "Science", attr: "Climate" },
  { id: "m39", event: "Election 2028 GOP nominee", contract: "Will JD Vance win the 2028 GOP nomination?", expiry: "7/31/2028", daysSince: 0, volume: 540990, priorProb: 34, currProb: 40, probChg: 6, zScore: 1.8, tag: "Politics", attr: "Election 2028" },
  { id: "m40", event: "Election 2028 Dem nominee", contract: "Will Gavin Newsom win the 2028 Dem nomination?", expiry: "7/31/2028", daysSince: 0, volume: 388772, priorProb: 27, currProb: 30, probChg: 3, zScore: 0.9, tag: "Politics", attr: "Election 2028" },
  { id: "m41", event: "UFC 308 main event", contract: "Will the main event end in the first round?", expiry: "5/18/2026", daysSince: 0, volume: 23445, priorProb: 22, currProb: 26, probChg: 4, zScore: 1.0, tag: "Sports", attr: "UFC" },
  { id: "m42", event: "Oil prices Q2", contract: "Will WTI crude close above $85 on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 167223, priorProb: 31, currProb: 38, probChg: 7, zScore: 2.0, tag: "Economy", attr: "Commodities" },
  { id: "m43", event: "US unemployment May print", contract: "Will May US unemployment rate be above 4.2%?", expiry: "6/6/2026", daysSince: 0, volume: 89012, priorProb: 44, currProb: 47, probChg: 3, zScore: 0.8, tag: "Economy", attr: "Inflation" },
  { id: "m44", event: "IPOs before 2027?", contract: "Will Stripe IPO before 2027?", expiry: "12/31/2026", daysSince: 0, volume: 421333, priorProb: 38, currProb: 35, probChg: -3, zScore: -0.8, tag: "Economy", attr: "IPO" },
  { id: "m45", event: "IPOs before 2027?", contract: "Will Databricks IPO before 2027?", expiry: "12/31/2026", daysSince: 0, volume: 352109, priorProb: 51, currProb: 54, probChg: 3, zScore: 0.7, tag: "Economy", attr: "IPO" },
  { id: "m46", event: "Israel-Hamas ceasefire duration", contract: "Will the Israel-Hamas ceasefire hold through June?", expiry: "6/30/2026", daysSince: 0, volume: 201008, priorProb: 48, currProb: 44, probChg: -4, zScore: -1.1, tag: "Politics", attr: "Israel" },
  { id: "m47", event: "G7 summit outcomes", contract: "Will the G7 issue a joint statement on Ukraine aid?", expiry: "6/15/2026", daysSince: 0, volume: 42901, priorProb: 62, currProb: 65, probChg: 3, zScore: 0.6, tag: "Politics", attr: "USA" },
  { id: "m48", event: "Bitcoin halving effects", contract: "Will Bitcoin hash rate exceed 800 EH/s by June?", expiry: "6/30/2026", daysSince: 0, volume: 58744, priorProb: 56, currProb: 59, probChg: 3, zScore: 0.8, tag: "Crypto", attr: "Bitcoin" },
  { id: "m49", event: "Copper prices Q2", contract: "Will copper close above $5.00/lb on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 71223, priorProb: 33, currProb: 37, probChg: 4, zScore: 1.2, tag: "Economy", attr: "Commodities" },
  { id: "m50", event: "Which teams will make the NBA Playoffs?", contract: "Will the Phoenix Suns make the NBA Playoffs?", expiry: "4/12/2026", daysSince: 0, volume: 68912, priorProb: 48, currProb: 44, probChg: -4, zScore: -1.0, tag: "Sports", attr: "NBA" },
];

// Price history for the chart (for market m11 "Who will leave Trump Administration")
const PRICE_HISTORY = [
  { date: "Jan 5",  value: 22, volume: 18200 },
  { date: "Jan 15", value: 23, volume: 24100 },
  { date: "Jan 25", value: 35, volume: 41800 },
  { date: "Feb 4",  value: 44, volume: 38900 },
  { date: "Feb 14", value: 28, volume: 52300 },
  { date: "Feb 24", value: 50, volume: 61500 },
  { date: "Mar 6",  value: 36, volume: 47200 },
  { date: "Mar 16", value: 33, volume: 33700 },
  { date: "Mar 26", value: 14, volume: 58900 },
];

const ALERTS_FOR_MARKET = [
  { date: "4/12/2026", priorProb: 29, currProb: 38, probChg: 18, zScore: 3.7 },
  { date: "2/1/2026", priorProb: 28, currProb: 43, probChg: 15, zScore: 3.0 },
  { date: "2/2/2026", priorProb: 43, currProb: 42, probChg: -1, zScore: -4.2 },
  { date: "3/24/2026", priorProb: 30, currProb: 14, probChg: -16, zScore: -3.2 },
];

const STOCK_LINKAGES = [
  { date: "3/24/2026", ticker: "ETN.US", adjZ: 2.2, stockRet: 4.0, indexRet: -0.4, adjStockRet: 4.4, pmZ: -3.2 },
  { date: "3/24/2026", ticker: "DUK.US", adjZ: 2.1, stockRet: 0.0, indexRet: -0.4, adjStockRet: 0.4, pmZ: -3.2 },
  { date: "3/24/2026", ticker: "GNRC.US", adjZ: 2.0, stockRet: 3.6, indexRet: -0.4, adjStockRet: 4.0, pmZ: -3.2 },
  { date: "3/24/2026", ticker: "ADI.US", adjZ: 2.0, stockRet: 3.1, indexRet: -0.4, adjStockRet: 3.5, pmZ: -3.2 },
  { date: "3/24/2026", ticker: "NEE.US", adjZ: 2.0, stockRet: 7.7, indexRet: -0.4, adjStockRet: 8.1, pmZ: -3.2 },
  { date: "3/24/2026", ticker: "AXON.US", adjZ: -2.1, stockRet: -10.0, indexRet: -0.4, adjStockRet: -9.6, pmZ: -3.2 },
  { date: "3/24/2026", ticker: "NOW.US", adjZ: -2.1, stockRet: -5.7, indexRet: -0.4, adjStockRet: -5.3, pmZ: -3.2 },
];

const SUBSCRIPTIONS = [
  {
    id: "s1",
    marketId: "m11",
    event: "Who will leave Trump Administration before 2027?",
    contract: "Will Robert F. Kennedy Jr. leave the Trump administration…",
    tag: "Politics",
    attrs: ["USA"],
    probChgThreshold: 10,
    zThreshold: 3.0,
    priceCrosses: 20,
    frequency: "daily",
    delivery: ["email"],
    slackWebhook: "",
    createdAt: "2/18/2026",
    lastAlert: "3/24/2026",
    active: true,
  },
  {
    id: "s2",
    marketId: "m5",
    event: "How many 7.0 or more earthquakes by June 2026?",
    contract: "Will there be 8 or more earthquakes of magnitude 7.0…",
    tag: "Weather",
    attrs: ["Earthquake"],
    probChgThreshold: 15,
    zThreshold: 2.5,
    priceCrosses: null,
    frequency: "instant",
    delivery: ["email", "slack"],
    slackWebhook: "https://hooks.slack.com/services/T0/B0/xxx",
    createdAt: "1/30/2026",
    lastAlert: "3/18/2026",
    active: true,
  },
  {
    id: "s3",
    marketId: null,
    event: "Tag: Crypto / Bitcoin",
    contract: "All markets matching tag \u201CCrypto\u201D \u00B7 attr \u201CBitcoin\u201D",
    tag: "Crypto",
    attrs: ["Bitcoin"],
    probChgThreshold: 20,
    zThreshold: 3.5,
    priceCrosses: null,
    frequency: "weekly",
    delivery: ["slack"],
    slackWebhook: "https://hooks.slack.com/services/T1/B1/yyy",
    createdAt: "3/2/2026",
    lastAlert: "4/10/2026",
    active: true,
  },
  {
    id: "s4",
    marketId: "m8",
    event: "IPOs before 2027?",
    contract: "Discord IPO before 2027?",
    tag: "Economy",
    attrs: ["IPO"],
    probChgThreshold: 12,
    zThreshold: 2.8,
    priceCrosses: 80,
    frequency: "daily",
    delivery: ["email"],
    slackWebhook: "",
    createdAt: "3/14/2026",
    lastAlert: "4/14/2026",
    active: false,
  },
];

// Slugify a contract string to a polymarket-style URL slug.
const _slugify = (s) => s
  .toLowerCase()
  .replace(/[''"""]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 80)
  .replace(/-+$/, "");

// Stamp derived per-market fields: URL, avg daily volume, trades/day, avg trade size.
// Deterministic — derived from index & volume so values are stable between loads.
MARKETS.forEach((m, i) => {
  m.url = `https://polymarket.com/market/${_slugify(m.contract)}`;
  // Market has been live for 20–120 days (deterministic)
  const liveDays = 20 + ((i * 13 + 7) % 101);
  m.avgDailyVolume = Math.round(m.volume / liveDays);
  // Avg trade size varies by volume bucket, $40–$420
  m.avgTradeSize = 40 + ((i * 37 + m.volume) % 380);
  m.tradesPerDay = Math.max(1, Math.round(m.avgDailyVolume / m.avgTradeSize));
});

// "Today" reference date for this prototype (matches latest PRICE_HISTORY point).
const TODAY = "3/26/2026";
const _parseMDY = (s) => {
  const [mo, da, yr] = s.split("/").map(Number);
  return new Date(yr, mo - 1, da);
};
const _fmtMDY = (d) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
const _todayDate = _parseMDY(TODAY);
// Stamp createdDate on every market — deterministic spread of 2–60 days before TODAY
// so the "New Contracts" system list has a stable baseline.
MARKETS.forEach((m, i) => {
  const daysAgo = 2 + ((i * 7 + 11) % 59);
  const d = new Date(_todayDate);
  d.setDate(d.getDate() - daysAgo);
  m.createdDate = _fmtMDY(d);
});
// Newly-listed contracts: override to today (0 days) or yesterday (1 day) so they
// fall inside the "last 24h" window.
const _NEW_OVERRIDES = [
  ["m15", 0], ["m23", 0], ["m36", 1], ["m42", 1], ["m49", 1],
];
_NEW_OVERRIDES.forEach(([id, daysAgo]) => {
  const m = MARKETS.find(x => x.id === id);
  if (!m) return;
  const d = new Date(_todayDate);
  d.setDate(d.getDate() - daysAgo);
  m.createdDate = _fmtMDY(d);
});

const WATCHLISTS = [
  { id: "all_markets", name: "All Contracts", system: true, marketIds: null, filters: { zMin: 0, volumeMin: 0, probChgMin: 0 }, createdAt: "—" },
  { id: "biggest_movers", name: "Biggest Movers", system: true, marketIds: null, filters: { zMin: 3, volumeMin: 10000, probChgMin: 10 }, createdAt: "—" },
  { id: "new_contracts", name: "New Contracts", system: true, marketIds: null, createdWithinDays: 1, filters: { zMin: 0, volumeMin: 0, probChgMin: 0 }, createdAt: "—" },
  { id: "wl_earn", name: "Earnings & Fed", marketIds: ["m1", "m2", "m11"], createdAt: "9/18/2024" },
  { id: "wl_elec", name: "Election Watch", marketIds: ["m5", "m6", "m9"], createdAt: "9/20/2024" },
];

window.MARKETS_DATA = { TODAY, TAGS, CONDITIONAL_ATTRS, MARKETS, PRICE_HISTORY, ALERTS_FOR_MARKET, STOCK_LINKAGES, SUBSCRIPTIONS, WATCHLISTS };
