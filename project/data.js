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
];

// Price history for the chart (for market m11 "Who will leave Trump Administration")
const PRICE_HISTORY = [
  { date: "Jan 5", value: 22 },
  { date: "Jan 15", value: 23 },
  { date: "Jan 25", value: 35 },
  { date: "Feb 4", value: 44 },
  { date: "Feb 14", value: 28 },
  { date: "Feb 24", value: 50 },
  { date: "Mar 6", value: 36 },
  { date: "Mar 16", value: 33 },
  { date: "Mar 26", value: 14 },
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
    slackWebhook: "https://discord.com/api/webhooks/...",
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

window.MARKETS_DATA = { TAGS, CONDITIONAL_ATTRS, MARKETS, PRICE_HISTORY, ALERTS_FOR_MARKET, STOCK_LINKAGES, SUBSCRIPTIONS };
