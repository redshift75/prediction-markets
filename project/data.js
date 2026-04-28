// Mock data for prediction markets prototype

// Full hierarchical category list. Used as the tag identifier on each market.
const TAGS = [
  "All",
  "Political Leaders: Appointed Officials",
  "Political Leaders: Political Leadership Changes",
  "Political Leaders: Approval Ratings",
  "Political Leaders: Scandals & Legal Issues",
  "Political Leaders: Election Outcomes",
  "Political Leaders: Communications",
  "Political Leaders: Foreign Policy & Geopolitical Conflict",
  "Public Policy: Congressional Legislation",
  "Public Policy: Government Finances",
  "Public Policy: Regulations",
  "Public Policy: Healthcare Policy",
  "Public Policy: Trade Policy & Tariffs",
  "Public Policy: Immigration",
  "Public Policy: Supreme Court",
  "Public Policy: Coronavirus & Pandemics",
  "Capital Markets: Financial Asset Prices",
  "Capital Markets: Equity Market IPOs",
  "Capital Markets: Corporate M&A",
  "Capital Markets: Equity Index Changes",
  "Capital Markets: Collectible Prices",
  "Capital Markets: Crypto & Digital Assets",
  "Economy: Central Bank Policy",
  "Economy: Economic Data Releases",
  "Economy: Economic Growth",
  "Economy: Inflation",
  "Economy: Labor Market",
  "Economy: Housing",
  "Corporate Trends: Earnings Releases",
  "Corporate Trends: Corporate Fundamentals",
  "Weather: Weather & Climate",
];

// Subcategory attributes per top-level tag. Used by the filter sidebar &
// subscribe dialog to narrow within a tag.
const CONDITIONAL_ATTRS = {
  "Political Leaders: Appointed Officials": ["Cabinet", "Fed Chair", "Ambassadors", "Agency Heads"],
  "Political Leaders: Political Leadership Changes": ["Resignations", "Firings", "Successions"],
  "Political Leaders: Approval Ratings": ["Trump", "Congress", "Governors", "World Leaders"],
  "Political Leaders: Scandals & Legal Issues": ["Indictments", "Investigations", "Ethics", "Lawsuits"],
  "Political Leaders: Election Outcomes": ["Midterms 2026", "Election 2028", "Primaries", "Special Elections"],
  "Political Leaders: Communications": ["Speeches", "Truth Social", "Press Conferences", "Interviews"],
  "Political Leaders: Foreign Policy & Geopolitical Conflict": ["Russia - USA", "Israel", "China", "Ukraine", "Iran", "NATO"],
  "Public Policy: Congressional Legislation": ["House", "Senate", "Spending Bills", "Defense"],
  "Public Policy: Government Finances": ["Debt Ceiling", "Shutdown", "Budget", "Deficit"],
  "Public Policy: Regulations": ["FTC", "SEC", "FCC", "EPA"],
  "Public Policy: Healthcare Policy": ["Medicare", "Medicaid", "FDA", "Drug Pricing"],
  "Public Policy: Trade Policy & Tariffs": ["China Tariffs", "EU Tariffs", "Mexico", "Canada"],
  "Public Policy: Immigration": ["Border", "Deportations", "Visas", "Asylum"],
  "Public Policy: Supreme Court": ["Decisions", "Nominations", "Cases"],
  "Public Policy: Coronavirus & Pandemics": ["COVID", "Avian Flu", "Mpox"],
  "Capital Markets: Financial Asset Prices": ["Gold", "Oil", "Copper", "Treasuries", "USD"],
  "Capital Markets: Equity Market IPOs": ["Tech", "Fintech", "Healthcare"],
  "Capital Markets: Corporate M&A": ["Tech", "Energy", "Media", "Banking"],
  "Capital Markets: Equity Index Changes": ["S&P 500", "Nasdaq", "Russell 2000", "Dow"],
  "Capital Markets: Collectible Prices": ["Art", "Sports Cards", "Watches", "Wine"],
  "Capital Markets: Crypto & Digital Assets": ["Bitcoin", "Ethereum", "Solana", "Stablecoins", "ETFs"],
  "Economy: Central Bank Policy": ["Fed", "ECB", "BOJ", "BOE"],
  "Economy: Economic Data Releases": ["CPI", "PPI", "GDP", "PCE", "Retail Sales"],
  "Economy: Economic Growth": ["GDP", "Recession", "Productivity"],
  "Economy: Inflation": ["CPI", "PCE", "Wages", "Expectations"],
  "Economy: Labor Market": ["Unemployment", "Payrolls", "JOLTS", "Wages"],
  "Economy: Housing": ["Mortgage Rates", "Home Prices", "Starts", "Existing Sales"],
  "Corporate Trends: Earnings Releases": ["Mega-cap Tech", "Banks", "Retail", "Energy"],
  "Corporate Trends: Corporate Fundamentals": ["Layoffs", "Guidance", "Buybacks", "Dividends"],
  "Weather: Weather & Climate": ["Hurricane", "Earthquake", "Temperature", "Wildfire", "CO2"],
  All: ["USA", "Russia - USA", "Israel", "Bitcoin", "Fed", "CPI"],
};

const MARKETS = [
  // === existing (remapped to new categories) ===
  { id: "m1", event: "Israeli Night: Israel Adesanya vs. Joe Pyfer (M…)", contract: "Will the Israel Adesanya vs Pyfer fight end before Round 3?", expiry: "3/24/2026", daysSince: 0, volume: 251047, priorProb: 65, currProb: 26, probChg: -13, zScore: 3.6, tag: "Political Leaders: Foreign Policy & Geopolitical Conflict", attr: "Israel" },
  { id: "m2", event: "Which states will Donald Trump visit in 2026?", contract: "Will Donald Trump visit all 50 states by end of 2026?", expiry: "12/31/2026", daysSince: 0, volume: 21432, priorProb: 91, currProb: 18, probChg: -73, zScore: 5.1, tag: "Political Leaders: Communications", attr: "Speeches" },
  { id: "m3", event: "When will the US government shutdown end…", contract: "Will the US government shutdown end before May 1?", expiry: "3/31/2026", daysSince: 0, volume: 29357, priorProb: 19, currProb: 39, probChg: 20, zScore: 3.8, tag: "Public Policy: Government Finances", attr: "Shutdown" },
  { id: "m4", event: "How many coins launched in 2026 and the y…", contract: "Over 5 coins launched in 2026 and the year in the top 100?", expiry: "1/1/2027", daysSince: 0, volume: 27049, priorProb: 11, currProb: 47, probChg: 36, zScore: 3.6, tag: "Capital Markets: Crypto & Digital Assets", attr: "Bitcoin" },
  { id: "m5", event: "How many 7.0 or more earthquakes by June…", contract: "Will there be 8 or more earthquakes of magnitude 7.0 by June 30?", expiry: "6/30/2026", daysSince: 0, volume: 488755, priorProb: 33, currProb: 50, probChg: 17, zScore: 4.0, tag: "Weather: Weather & Climate", attr: "Earthquake" },
  { id: "m6", event: "Solstice FDV above __ one day after launch?", contract: "Solstice FDV above $50M one day after launch?", expiry: "1/1/2027", daysSince: 0, volume: 183572, priorProb: 80, currProb: 63, probChg: -17, zScore: -3.3, tag: "Capital Markets: Crypto & Digital Assets", attr: "Solana" },
  { id: "m7", event: "Blue wave in 2026?", contract: "Will Democrats flip both chambers in the 2026 midterms?", expiry: "11/30/2026", daysSince: 0, volume: 123989, priorProb: 84, currProb: 70, probChg: -14, zScore: -4.3, tag: "Political Leaders: Election Outcomes", attr: "Midterms 2026" },
  { id: "m8", event: "IPOs before 2027?", contract: "Will Discord IPO before 2027?", expiry: "12/31/2026", daysSince: 0, volume: 311004, priorProb: 62, currProb: 77, probChg: 15, zScore: 3.0, tag: "Capital Markets: Equity Market IPOs", attr: "Tech" },
  { id: "m9", event: "Where will Gold (GC) close at end of June?", contract: "Will Gold (GC) close above $3,420 by end of June?", expiry: "6/30/2026", daysSince: 0, volume: 267719, priorProb: 27, currProb: 14, probChg: -13, zScore: -3.6, tag: "Capital Markets: Financial Asset Prices", attr: "Gold" },
  { id: "m10", event: "NBA Playoffs entrants", contract: "Will Sec. Bessent visit Beijing before Q3?", expiry: "9/30/2026", daysSince: 0, volume: 56322, priorProb: 75, currProb: 60, probChg: -15, zScore: -3.6, tag: "Political Leaders: Foreign Policy & Geopolitical Conflict", attr: "China" },
  { id: "m11", event: "Who will leave Trump Administration before 2027?", contract: "Will Robert F. Kennedy Jr. leave the Trump administration before 2027?", expiry: "12/31/2026", daysSince: 0, volume: 51211, priorProb: 30, currProb: 14, probChg: -16, zScore: -3.2, tag: "Political Leaders: Political Leadership Changes", attr: "Resignations" },
  { id: "m12", event: "Approval rating swing", contract: "Will Trump's Gallup approval drop below 40% in May?", expiry: "5/31/2026", daysSince: 0, volume: 82397, priorProb: 73, currProb: 42, probChg: -31, zScore: -3.9, tag: "Political Leaders: Approval Ratings", attr: "Trump" },
  { id: "m13", event: "How many 7.0 or above earthquakes in 2026?", contract: "Will there be between 8 and 10 earthquakes of magnitude 7.0+ in 2026?", expiry: "12/31/2026", daysSince: 0, volume: 106524, priorProb: 28, currProb: 17, probChg: -11, zScore: -4.1, tag: "Weather: Weather & Climate", attr: "Earthquake" },
  { id: "m14", event: "Will Israel annex any territory by December 31?", contract: "Will Israel annex any territory by June 30?", expiry: "6/30/2026", daysSince: 0, volume: 125721, priorProb: 35, currProb: 12, probChg: -23, zScore: -4.2, tag: "Political Leaders: Foreign Policy & Geopolitical Conflict", attr: "Israel" },
  { id: "m15", event: "Russia-Ukraine ceasefire in 2026?", contract: "Will Russia and Ukraine announce a ceasefire by Q3 2026?", expiry: "9/30/2026", daysSince: 0, volume: 402118, priorProb: 22, currProb: 34, probChg: 12, zScore: 2.9, tag: "Political Leaders: Foreign Policy & Geopolitical Conflict", attr: "Russia - USA" },
  { id: "m16", event: "Fed rate decision in June", contract: "Will the Fed cut rates at the June FOMC meeting?", expiry: "6/18/2026", daysSince: 0, volume: 612340, priorProb: 42, currProb: 58, probChg: 16, zScore: 3.4, tag: "Economy: Central Bank Policy", attr: "Fed" },
  { id: "m17", event: "Fed rate decision in June", contract: "Will the Fed hold rates at the June FOMC meeting?", expiry: "6/18/2026", daysSince: 0, volume: 489221, priorProb: 45, currProb: 39, probChg: -6, zScore: -1.8, tag: "Economy: Central Bank Policy", attr: "Fed" },
  { id: "m18", event: "CPI release in May", contract: "Will May CPI print above 3.0% YoY?", expiry: "5/15/2026", daysSince: 0, volume: 198433, priorProb: 38, currProb: 41, probChg: 3, zScore: 0.9, tag: "Economy: Inflation", attr: "CPI" },
  { id: "m19", event: "Bitcoin price by end of Q2", contract: "Will Bitcoin close above $110k on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 877104, priorProb: 28, currProb: 35, probChg: 7, zScore: 1.4, tag: "Capital Markets: Crypto & Digital Assets", attr: "Bitcoin" },
  { id: "m20", event: "Bitcoin price by end of Q2", contract: "Will Bitcoin close below $80k on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 412998, priorProb: 22, currProb: 19, probChg: -3, zScore: -0.6, tag: "Capital Markets: Crypto & Digital Assets", attr: "Bitcoin" },
  { id: "m21", event: "Ethereum ETF net inflows", contract: "Will spot ETH ETFs see net inflows > $1B in May?", expiry: "5/31/2026", daysSince: 0, volume: 152870, priorProb: 55, currProb: 60, probChg: 5, zScore: 1.1, tag: "Capital Markets: Crypto & Digital Assets", attr: "Ethereum" },
  { id: "m22", event: "Solana price above $200?", contract: "Will Solana close above $200 by end of June?", expiry: "6/30/2026", daysSince: 0, volume: 98012, priorProb: 31, currProb: 29, probChg: -2, zScore: -0.4, tag: "Capital Markets: Crypto & Digital Assets", attr: "Solana" },
  { id: "m23", event: "S&P 500 reconstitution", contract: "Will Robinhood (HOOD) be added to the S&P 500 by Q3?", expiry: "9/30/2026", daysSince: 0, volume: 244567, priorProb: 26, currProb: 31, probChg: 5, zScore: 1.7, tag: "Capital Markets: Equity Index Changes", attr: "S&P 500" },
  { id: "m24", event: "Nasdaq 100 reconstitution", contract: "Will Palantir (PLTR) remain in the Nasdaq 100 after July rebalance?", expiry: "7/31/2026", daysSince: 0, volume: 188342, priorProb: 18, currProb: 15, probChg: -3, zScore: -0.9, tag: "Capital Markets: Equity Index Changes", attr: "Nasdaq" },
  { id: "m25", event: "Trump Truth Social posting cadence", contract: "Will Trump post >50 times on Truth Social in any single day in May?", expiry: "5/31/2026", daysSince: 0, volume: 76554, priorProb: 72, currProb: 70, probChg: -2, zScore: -0.3, tag: "Political Leaders: Communications", attr: "Truth Social" },
  { id: "m26", event: "President's State of the Union", contract: "Will the SOTU run longer than 90 minutes?", expiry: "2/8/2026", daysSince: 0, volume: 45123, priorProb: 68, currProb: 72, probChg: 4, zScore: 0.8, tag: "Political Leaders: Communications", attr: "Speeches" },
  { id: "m27", event: "FTC Big Tech enforcement", contract: "Will the FTC file a major antitrust action by end of Q2?", expiry: "5/24/2026", daysSince: 0, volume: 88990, priorProb: 42, currProb: 48, probChg: 6, zScore: 1.2, tag: "Public Policy: Regulations", attr: "FTC" },
  { id: "m28", event: "Hurricane season activity", contract: "Will there be 15+ named Atlantic storms in 2026?", expiry: "11/30/2026", daysSince: 0, volume: 63422, priorProb: 54, currProb: 57, probChg: 3, zScore: 0.7, tag: "Weather: Weather & Climate", attr: "Hurricane" },
  { id: "m29", event: "NYC summer temperatures", contract: "Will NYC hit 100°F by September 1?", expiry: "9/1/2026", daysSince: 0, volume: 29800, priorProb: 21, currProb: 24, probChg: 3, zScore: 0.6, tag: "Weather: Weather & Climate", attr: "Temperature" },
  { id: "m30", event: "California wildfire season", contract: "Will California declare a wildfire emergency by August?", expiry: "8/31/2026", daysSince: 0, volume: 41109, priorProb: 66, currProb: 71, probChg: 5, zScore: 1.3, tag: "Weather: Weather & Climate", attr: "Wildfire" },
  { id: "m31", event: "GDP Q2 advance estimate", contract: "Will Q2 advance GDP print above 2.5% annualized?", expiry: "9/1/2026", daysSince: 0, volume: 52330, priorProb: 40, currProb: 36, probChg: -4, zScore: -1.0, tag: "Economy: Economic Growth", attr: "GDP" },
  { id: "m32", event: "Recession odds 2026", contract: "Will NBER call a US recession by end of 2026?", expiry: "12/31/2026", daysSince: 0, volume: 37881, priorProb: 33, currProb: 38, probChg: 5, zScore: 1.1, tag: "Economy: Economic Growth", attr: "Recession" },
  { id: "m33", event: "Wholesale prices May", contract: "Will May PPI print above 2.5% YoY?", expiry: "6/12/2026", daysSince: 0, volume: 19420, priorProb: 29, currProb: 32, probChg: 3, zScore: 0.5, tag: "Economy: Economic Data Releases", attr: "PPI" },
  { id: "m34", event: "Defense authorization bill", contract: "Will the FY27 NDAA pass the House before recess?", expiry: "8/15/2026", daysSince: 0, volume: 144003, priorProb: 46, currProb: 51, probChg: 5, zScore: 1.5, tag: "Public Policy: Congressional Legislation", attr: "Defense" },
  { id: "m35", event: "Senate Banking Committee", contract: "Will the Senate confirm a new Fed Vice Chair before July?", expiry: "6/30/2026", daysSince: 0, volume: 91208, priorProb: 38, currProb: 34, probChg: -4, zScore: -1.1, tag: "Political Leaders: Appointed Officials", attr: "Fed Chair" },
  { id: "m36", event: "Border encounters May", contract: "Will May southwest border encounters be below 50,000?", expiry: "6/15/2026", daysSince: 0, volume: 178934, priorProb: 52, currProb: 58, probChg: 6, zScore: 1.6, tag: "Public Policy: Immigration", attr: "Border" },
  { id: "m37", event: "Supreme Court term", contract: "Will SCOTUS rule on the Section 230 case before recess?", expiry: "7/1/2026", daysSince: 0, volume: 102456, priorProb: 28, currProb: 31, probChg: 3, zScore: 0.7, tag: "Public Policy: Supreme Court", attr: "Decisions" },
  { id: "m38", event: "Global CO2 milestones", contract: "Will global CO2 average stay above 425ppm for 2026?", expiry: "12/31/2026", daysSince: 0, volume: 28112, priorProb: 78, currProb: 80, probChg: 2, zScore: 0.4, tag: "Weather: Weather & Climate", attr: "CO2" },
  { id: "m39", event: "Election 2028 GOP nominee", contract: "Will JD Vance win the 2028 GOP nomination?", expiry: "7/31/2028", daysSince: 0, volume: 540990, priorProb: 34, currProb: 40, probChg: 6, zScore: 1.8, tag: "Political Leaders: Election Outcomes", attr: "Election 2028" },
  { id: "m40", event: "Election 2028 Dem nominee", contract: "Will Gavin Newsom win the 2028 Dem nomination?", expiry: "7/31/2028", daysSince: 0, volume: 388772, priorProb: 27, currProb: 30, probChg: 3, zScore: 0.9, tag: "Political Leaders: Election Outcomes", attr: "Election 2028" },
  { id: "m41", event: "Trump indictment status", contract: "Will any new federal charges be filed against Trump in Q2?", expiry: "6/30/2026", daysSince: 0, volume: 23445, priorProb: 22, currProb: 26, probChg: 4, zScore: 1.0, tag: "Political Leaders: Scandals & Legal Issues", attr: "Indictments" },
  { id: "m42", event: "Oil prices Q2", contract: "Will WTI crude close above $85 on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 167223, priorProb: 31, currProb: 38, probChg: 7, zScore: 2.0, tag: "Capital Markets: Financial Asset Prices", attr: "Oil" },
  { id: "m43", event: "US unemployment May print", contract: "Will May US unemployment rate be above 4.2%?", expiry: "6/6/2026", daysSince: 0, volume: 89012, priorProb: 44, currProb: 47, probChg: 3, zScore: 0.8, tag: "Economy: Labor Market", attr: "Unemployment" },
  { id: "m44", event: "IPOs before 2027?", contract: "Will Stripe IPO before 2027?", expiry: "12/31/2026", daysSince: 0, volume: 421333, priorProb: 38, currProb: 35, probChg: -3, zScore: -0.8, tag: "Capital Markets: Equity Market IPOs", attr: "Fintech" },
  { id: "m45", event: "IPOs before 2027?", contract: "Will Databricks IPO before 2027?", expiry: "12/31/2026", daysSince: 0, volume: 352109, priorProb: 51, currProb: 54, probChg: 3, zScore: 0.7, tag: "Capital Markets: Equity Market IPOs", attr: "Tech" },
  { id: "m46", event: "Israel-Hamas ceasefire duration", contract: "Will the Israel-Hamas ceasefire hold through June?", expiry: "6/30/2026", daysSince: 0, volume: 201008, priorProb: 48, currProb: 44, probChg: -4, zScore: -1.1, tag: "Political Leaders: Foreign Policy & Geopolitical Conflict", attr: "Israel" },
  { id: "m47", event: "G7 summit outcomes", contract: "Will the G7 issue a joint statement on Ukraine aid?", expiry: "6/15/2026", daysSince: 0, volume: 42901, priorProb: 62, currProb: 65, probChg: 3, zScore: 0.6, tag: "Political Leaders: Foreign Policy & Geopolitical Conflict", attr: "Ukraine" },
  { id: "m48", event: "Bitcoin halving effects", contract: "Will Bitcoin hash rate exceed 800 EH/s by June?", expiry: "6/30/2026", daysSince: 0, volume: 58744, priorProb: 56, currProb: 59, probChg: 3, zScore: 0.8, tag: "Capital Markets: Crypto & Digital Assets", attr: "Bitcoin" },
  { id: "m49", event: "Copper prices Q2", contract: "Will copper close above $5.00/lb on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 71223, priorProb: 33, currProb: 37, probChg: 4, zScore: 1.2, tag: "Capital Markets: Financial Asset Prices", attr: "Copper" },
  { id: "m50", event: "Cabinet stability watch", contract: "Will Sec. of Defense remain in post through end of Q2?", expiry: "6/30/2026", daysSince: 0, volume: 68912, priorProb: 48, currProb: 44, probChg: -4, zScore: -1.0, tag: "Political Leaders: Appointed Officials", attr: "Cabinet" },

  // === new markets to round out coverage of every category ===
  // Political Leaders: Appointed Officials
  { id: "m51", event: "Treasury appointments", contract: "Will the Senate confirm a new Asst. Treasury Secretary by July 1?", expiry: "7/1/2026", daysSince: 0, volume: 34201, priorProb: 41, currProb: 53, probChg: 12, zScore: 2.7, tag: "Political Leaders: Appointed Officials", attr: "Cabinet" },
  { id: "m52", event: "Ambassador to China", contract: "Will the Senate confirm a new Ambassador to China by Q3?", expiry: "9/30/2026", daysSince: 0, volume: 51820, priorProb: 47, currProb: 39, probChg: -8, zScore: -2.1, tag: "Political Leaders: Appointed Officials", attr: "Ambassadors" },
  { id: "m53", event: "FAA Administrator pick", contract: "Will Trump nominate a new FAA Administrator before May 15?", expiry: "5/15/2026", daysSince: 0, volume: 22910, priorProb: 35, currProb: 49, probChg: 14, zScore: 3.1, tag: "Political Leaders: Appointed Officials", attr: "Agency Heads" },

  // Political Leaders: Approval Ratings
  { id: "m54", event: "Congressional approval", contract: "Will Congressional approval drop below 15% in any May poll?", expiry: "5/31/2026", daysSince: 0, volume: 29411, priorProb: 58, currProb: 67, probChg: 9, zScore: 2.4, tag: "Political Leaders: Approval Ratings", attr: "Congress" },
  { id: "m55", event: "Governor approval ratings", contract: "Will Gov. Newsom approval cross above 50% by July?", expiry: "7/31/2026", daysSince: 0, volume: 18220, priorProb: 31, currProb: 28, probChg: -3, zScore: -0.8, tag: "Political Leaders: Approval Ratings", attr: "Governors" },

  // Political Leaders: Scandals & Legal Issues
  { id: "m56", event: "Cabinet ethics investigations", contract: "Will any cabinet member face an ethics referral by Q3?", expiry: "9/30/2026", daysSince: 0, volume: 41200, priorProb: 33, currProb: 48, probChg: 15, zScore: 3.4, tag: "Political Leaders: Scandals & Legal Issues", attr: "Ethics" },
  { id: "m57", event: "Congressional lawsuits", contract: "Will any sitting member of Congress be indicted in 2026?", expiry: "12/31/2026", daysSince: 0, volume: 64320, priorProb: 22, currProb: 30, probChg: 8, zScore: 2.2, tag: "Political Leaders: Scandals & Legal Issues", attr: "Indictments" },

  // Political Leaders: Election Outcomes (special elections / primaries)
  { id: "m58", event: "FL-26 special election", contract: "Will the GOP hold FL-26 in the May special election?", expiry: "5/19/2026", daysSince: 0, volume: 87440, priorProb: 71, currProb: 64, probChg: -7, zScore: -2.0, tag: "Political Leaders: Election Outcomes", attr: "Special Elections" },
  { id: "m59", event: "Texas Senate primary", contract: "Will Ken Paxton win the GOP TX Senate primary?", expiry: "5/26/2026", daysSince: 0, volume: 152110, priorProb: 55, currProb: 62, probChg: 7, zScore: 1.9, tag: "Political Leaders: Election Outcomes", attr: "Primaries" },

  // Political Leaders: Communications
  { id: "m60", event: "Trump press conference frequency", contract: "Will Trump hold 4+ formal press conferences in May?", expiry: "5/31/2026", daysSince: 0, volume: 14209, priorProb: 38, currProb: 30, probChg: -8, zScore: -2.3, tag: "Political Leaders: Communications", attr: "Press Conferences" },
  { id: "m61", event: "Major network interview", contract: "Will Trump sit for a 60 Minutes interview in Q2?", expiry: "6/30/2026", daysSince: 0, volume: 31500, priorProb: 18, currProb: 22, probChg: 4, zScore: 1.0, tag: "Political Leaders: Communications", attr: "Interviews" },

  // Political Leaders: Foreign Policy (extras)
  { id: "m62", event: "China-Taiwan flashpoint", contract: "Will the PLA conduct a major drill around Taiwan in Q2?", expiry: "6/30/2026", daysSince: 0, volume: 198330, priorProb: 41, currProb: 49, probChg: 8, zScore: 2.3, tag: "Political Leaders: Foreign Policy & Geopolitical Conflict", attr: "China" },
  { id: "m63", event: "Iran nuclear program", contract: "Will Iran enrich uranium above 90% before July?", expiry: "6/30/2026", daysSince: 0, volume: 244019, priorProb: 18, currProb: 27, probChg: 9, zScore: 2.6, tag: "Political Leaders: Foreign Policy & Geopolitical Conflict", attr: "Iran" },
  { id: "m64", event: "NATO summit outcomes", contract: "Will NATO commit to 3% defense GDP target at June summit?", expiry: "6/25/2026", daysSince: 0, volume: 76502, priorProb: 27, currProb: 33, probChg: 6, zScore: 1.5, tag: "Political Leaders: Foreign Policy & Geopolitical Conflict", attr: "NATO" },

  // Public Policy: Congressional Legislation (extras)
  { id: "m65", event: "Tax extender bill", contract: "Will Congress pass a tax extender package before July 4?", expiry: "7/4/2026", daysSince: 0, volume: 89220, priorProb: 36, currProb: 44, probChg: 8, zScore: 2.1, tag: "Public Policy: Congressional Legislation", attr: "Spending Bills" },
  { id: "m66", event: "AI regulation framework", contract: "Will the Senate pass a federal AI framework bill by Q4?", expiry: "12/31/2026", daysSince: 0, volume: 61840, priorProb: 19, currProb: 24, probChg: 5, zScore: 1.4, tag: "Public Policy: Congressional Legislation", attr: "Senate" },

  // Public Policy: Government Finances (extras)
  { id: "m67", event: "Debt ceiling brinksmanship", contract: "Will Treasury invoke extraordinary measures in Q3?", expiry: "9/30/2026", daysSince: 0, volume: 412005, priorProb: 47, currProb: 58, probChg: 11, zScore: 2.8, tag: "Public Policy: Government Finances", attr: "Debt Ceiling" },
  { id: "m68", event: "FY27 budget reconciliation", contract: "Will Congress pass a budget reconciliation bill by Sept 30?", expiry: "9/30/2026", daysSince: 0, volume: 132401, priorProb: 33, currProb: 30, probChg: -3, zScore: -0.7, tag: "Public Policy: Government Finances", attr: "Budget" },

  // Public Policy: Regulations (extras)
  { id: "m69", event: "SEC crypto rulemaking", contract: "Will the SEC finalize crypto custody rules before Q3?", expiry: "9/30/2026", daysSince: 0, volume: 88110, priorProb: 39, currProb: 50, probChg: 11, zScore: 2.7, tag: "Public Policy: Regulations", attr: "SEC" },
  { id: "m70", event: "EPA emissions rules", contract: "Will the EPA finalize its tailpipe emissions rule by August?", expiry: "8/31/2026", daysSince: 0, volume: 30220, priorProb: 28, currProb: 22, probChg: -6, zScore: -1.5, tag: "Public Policy: Regulations", attr: "EPA" },

  // Public Policy: Healthcare Policy
  { id: "m71", event: "Medicare drug negotiation", contract: "Will Medicare announce next-round drug list by July?", expiry: "7/31/2026", daysSince: 0, volume: 47092, priorProb: 62, currProb: 71, probChg: 9, zScore: 2.5, tag: "Public Policy: Healthcare Policy", attr: "Medicare" },
  { id: "m72", event: "FDA approval watch", contract: "Will the FDA approve a new GLP-1 oral therapy in Q2?", expiry: "6/30/2026", daysSince: 0, volume: 122870, priorProb: 43, currProb: 51, probChg: 8, zScore: 2.2, tag: "Public Policy: Healthcare Policy", attr: "FDA" },

  // Public Policy: Trade Policy & Tariffs
  { id: "m73", event: "China tariff escalation", contract: "Will Section 301 tariffs on China rise above 60% by July?", expiry: "7/15/2026", daysSince: 0, volume: 304220, priorProb: 22, currProb: 34, probChg: 12, zScore: 3.0, tag: "Public Policy: Trade Policy & Tariffs", attr: "China Tariffs" },
  { id: "m74", event: "EU retaliation", contract: "Will the EU announce countervailing tariffs on US goods?", expiry: "6/30/2026", daysSince: 0, volume: 119302, priorProb: 38, currProb: 47, probChg: 9, zScore: 2.4, tag: "Public Policy: Trade Policy & Tariffs", attr: "EU Tariffs" },
  { id: "m75", event: "USMCA review", contract: "Will the US, Mexico and Canada formally renegotiate USMCA in 2026?", expiry: "12/31/2026", daysSince: 0, volume: 61102, priorProb: 30, currProb: 26, probChg: -4, zScore: -1.0, tag: "Public Policy: Trade Policy & Tariffs", attr: "Mexico" },

  // Public Policy: Immigration
  { id: "m76", event: "Deportation flight pace", contract: "Will monthly ICE removal flights exceed 400 in May?", expiry: "6/10/2026", daysSince: 0, volume: 41250, priorProb: 51, currProb: 60, probChg: 9, zScore: 2.5, tag: "Public Policy: Immigration", attr: "Deportations" },
  { id: "m77", event: "H-1B reform", contract: "Will USCIS publish a new H-1B selection rule by Q3?", expiry: "9/30/2026", daysSince: 0, volume: 27800, priorProb: 33, currProb: 41, probChg: 8, zScore: 2.0, tag: "Public Policy: Immigration", attr: "Visas" },

  // Public Policy: Supreme Court
  { id: "m78", event: "Major SCOTUS ruling", contract: "Will SCOTUS rule on the Voting Rights Act case before July?", expiry: "7/1/2026", daysSince: 0, volume: 158340, priorProb: 70, currProb: 62, probChg: -8, zScore: -2.1, tag: "Public Policy: Supreme Court", attr: "Decisions" },
  { id: "m79", event: "SCOTUS vacancy", contract: "Will any Justice announce retirement before October?", expiry: "10/1/2026", daysSince: 0, volume: 88102, priorProb: 14, currProb: 11, probChg: -3, zScore: -0.9, tag: "Public Policy: Supreme Court", attr: "Nominations" },

  // Public Policy: Coronavirus & Pandemics
  { id: "m80", event: "Avian flu human spread", contract: "Will the CDC confirm 50+ human H5N1 cases in 2026?", expiry: "12/31/2026", daysSince: 0, volume: 39102, priorProb: 24, currProb: 31, probChg: 7, zScore: 1.9, tag: "Public Policy: Coronavirus & Pandemics", attr: "Avian Flu" },

  // Capital Markets: Financial Asset Prices
  { id: "m81", event: "10Y Treasury yield Q2 close", contract: "Will the 10Y Treasury yield close above 4.5% on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 211940, priorProb: 41, currProb: 49, probChg: 8, zScore: 2.2, tag: "Capital Markets: Financial Asset Prices", attr: "Treasuries" },
  { id: "m82", event: "DXY at quarter end", contract: "Will the US Dollar Index close below 100 on June 30?", expiry: "6/30/2026", daysSince: 0, volume: 88012, priorProb: 31, currProb: 38, probChg: 7, zScore: 1.9, tag: "Capital Markets: Financial Asset Prices", attr: "USD" },

  // Capital Markets: Corporate M&A
  { id: "m83", event: "Tech mega-deal", contract: "Will Adobe announce an acquisition >$10B by August?", expiry: "8/31/2026", daysSince: 0, volume: 44210, priorProb: 18, currProb: 25, probChg: 7, zScore: 1.8, tag: "Capital Markets: Corporate M&A", attr: "Tech" },
  { id: "m84", event: "Bank consolidation", contract: "Will any top-25 US bank announce a merger by Q3?", expiry: "9/30/2026", daysSince: 0, volume: 71820, priorProb: 28, currProb: 35, probChg: 7, zScore: 1.9, tag: "Capital Markets: Corporate M&A", attr: "Banking" },
  { id: "m85", event: "Energy mega-merger", contract: "Will an oil major announce a >$30B acquisition in Q2?", expiry: "6/30/2026", daysSince: 0, volume: 53910, priorProb: 22, currProb: 19, probChg: -3, zScore: -0.8, tag: "Capital Markets: Corporate M&A", attr: "Energy" },

  // Capital Markets: Equity Index Changes
  { id: "m86", event: "Russell 2000 rebalance", contract: "Will the Russell 2000 add >40 net constituents at June reconstitution?", expiry: "6/27/2026", daysSince: 0, volume: 19400, priorProb: 50, currProb: 56, probChg: 6, zScore: 1.5, tag: "Capital Markets: Equity Index Changes", attr: "Russell 2000" },

  // Capital Markets: Collectible Prices
  { id: "m87", event: "Sotheby's spring auction", contract: "Will the lead-lot at Sotheby's May sale clear above $80M?", expiry: "5/15/2026", daysSince: 0, volume: 12880, priorProb: 36, currProb: 30, probChg: -6, zScore: -1.6, tag: "Capital Markets: Collectible Prices", attr: "Art" },
  { id: "m88", event: "Sports card index", contract: "Will the PWCC 100 index close higher YoY at end of June?", expiry: "6/30/2026", daysSince: 0, volume: 8420, priorProb: 44, currProb: 51, probChg: 7, zScore: 1.7, tag: "Capital Markets: Collectible Prices", attr: "Sports Cards" },

  // Capital Markets: Crypto & Digital Assets (extras)
  { id: "m89", event: "Stablecoin supply", contract: "Will USDT circulating supply exceed $200B by July?", expiry: "7/31/2026", daysSince: 0, volume: 67900, priorProb: 30, currProb: 41, probChg: 11, zScore: 2.6, tag: "Capital Markets: Crypto & Digital Assets", attr: "Stablecoins" },
  { id: "m90", event: "Spot Solana ETF", contract: "Will the SEC approve a spot SOL ETF before September?", expiry: "8/31/2026", daysSince: 0, volume: 142020, priorProb: 28, currProb: 36, probChg: 8, zScore: 2.1, tag: "Capital Markets: Crypto & Digital Assets", attr: "ETFs" },

  // Economy: Central Bank Policy (extras)
  { id: "m91", event: "ECB rate decision", contract: "Will the ECB cut rates at the June meeting?", expiry: "6/4/2026", daysSince: 0, volume: 122044, priorProb: 53, currProb: 61, probChg: 8, zScore: 2.2, tag: "Economy: Central Bank Policy", attr: "ECB" },
  { id: "m92", event: "BOJ policy normalization", contract: "Will the BOJ raise the policy rate to 0.75%+ by July?", expiry: "7/31/2026", daysSince: 0, volume: 39220, priorProb: 22, currProb: 29, probChg: 7, zScore: 1.8, tag: "Economy: Central Bank Policy", attr: "BOJ" },

  // Economy: Economic Data Releases (extras)
  { id: "m93", event: "PCE inflation print", contract: "Will core PCE for May print at or below 2.5% YoY?", expiry: "6/27/2026", daysSince: 0, volume: 88990, priorProb: 41, currProb: 50, probChg: 9, zScore: 2.5, tag: "Economy: Economic Data Releases", attr: "PCE" },
  { id: "m94", event: "Retail sales", contract: "Will May retail sales print above +0.4% MoM?", expiry: "6/17/2026", daysSince: 0, volume: 24400, priorProb: 36, currProb: 33, probChg: -3, zScore: -0.8, tag: "Economy: Economic Data Releases", attr: "Retail Sales" },

  // Economy: Economic Growth (extras)
  { id: "m95", event: "Productivity growth", contract: "Will Q1 nonfarm productivity print above 2.0% annualized?", expiry: "6/5/2026", daysSince: 0, volume: 14080, priorProb: 47, currProb: 41, probChg: -6, zScore: -1.5, tag: "Economy: Economic Growth", attr: "Productivity" },

  // Economy: Inflation (extras)
  { id: "m96", event: "Inflation expectations", contract: "Will UMich 5y inflation expectation drop below 3.0% in May?", expiry: "5/31/2026", daysSince: 0, volume: 8810, priorProb: 38, currProb: 34, probChg: -4, zScore: -1.0, tag: "Economy: Inflation", attr: "Expectations" },
  { id: "m97", event: "Wage growth", contract: "Will May average hourly earnings come in above +4.0% YoY?", expiry: "6/6/2026", daysSince: 0, volume: 23010, priorProb: 50, currProb: 56, probChg: 6, zScore: 1.5, tag: "Economy: Inflation", attr: "Wages" },

  // Economy: Labor Market (extras)
  { id: "m98", event: "May payrolls", contract: "Will May nonfarm payrolls beat consensus by 50k+?", expiry: "6/6/2026", daysSince: 0, volume: 78220, priorProb: 33, currProb: 41, probChg: 8, zScore: 2.0, tag: "Economy: Labor Market", attr: "Payrolls" },
  { id: "m99", event: "JOLTS openings", contract: "Will April JOLTS openings drop below 7.5M?", expiry: "6/3/2026", daysSince: 0, volume: 14910, priorProb: 49, currProb: 55, probChg: 6, zScore: 1.5, tag: "Economy: Labor Market", attr: "JOLTS" },

  // Economy: Housing
  { id: "m100", event: "30Y mortgage rate", contract: "Will the average 30Y fixed mortgage drop below 6.5% in May?", expiry: "5/31/2026", daysSince: 0, volume: 41200, priorProb: 24, currProb: 33, probChg: 9, zScore: 2.4, tag: "Economy: Housing", attr: "Mortgage Rates" },
  { id: "m101", event: "Case-Shiller home prices", contract: "Will the Case-Shiller 20-city index print above +5.0% YoY in March?", expiry: "5/27/2026", daysSince: 0, volume: 17820, priorProb: 41, currProb: 47, probChg: 6, zScore: 1.5, tag: "Economy: Housing", attr: "Home Prices" },
  { id: "m102", event: "Housing starts", contract: "Will April housing starts come in above 1.4M annualized?", expiry: "5/16/2026", daysSince: 0, volume: 9820, priorProb: 38, currProb: 35, probChg: -3, zScore: -0.7, tag: "Economy: Housing", attr: "Starts" },

  // Corporate Trends: Earnings Releases
  { id: "m103", event: "Nvidia earnings", contract: "Will Nvidia beat Q1 revenue estimates by >$1B?", expiry: "5/22/2026", daysSince: 0, volume: 422010, priorProb: 49, currProb: 58, probChg: 9, zScore: 2.5, tag: "Corporate Trends: Earnings Releases", attr: "Mega-cap Tech" },
  { id: "m104", event: "JPMorgan earnings", contract: "Will JPMorgan post >$50B in Q1 revenue?", expiry: "4/14/2026", daysSince: 0, volume: 88210, priorProb: 41, currProb: 47, probChg: 6, zScore: 1.5, tag: "Corporate Trends: Earnings Releases", attr: "Banks" },
  { id: "m105", event: "Walmart earnings", contract: "Will Walmart raise FY guidance after Q1 earnings?", expiry: "5/15/2026", daysSince: 0, volume: 31400, priorProb: 36, currProb: 44, probChg: 8, zScore: 2.0, tag: "Corporate Trends: Earnings Releases", attr: "Retail" },
  { id: "m106", event: "Exxon earnings", contract: "Will Exxon post Q1 EPS above $2.00?", expiry: "5/2/2026", daysSince: 0, volume: 19920, priorProb: 52, currProb: 47, probChg: -5, zScore: -1.3, tag: "Corporate Trends: Earnings Releases", attr: "Energy" },

  // Corporate Trends: Corporate Fundamentals
  { id: "m107", event: "Big Tech layoffs", contract: "Will any FAANG company announce 5k+ layoffs in Q2?", expiry: "6/30/2026", daysSince: 0, volume: 64020, priorProb: 27, currProb: 36, probChg: 9, zScore: 2.4, tag: "Corporate Trends: Corporate Fundamentals", attr: "Layoffs" },
  { id: "m108", event: "Buyback authorizations", contract: "Will S&P 500 Q1 buyback authorizations exceed $300B?", expiry: "5/30/2026", daysSince: 0, volume: 22810, priorProb: 44, currProb: 52, probChg: 8, zScore: 2.0, tag: "Corporate Trends: Corporate Fundamentals", attr: "Buybacks" },
  { id: "m109", event: "Dividend hike watch", contract: "Will Apple raise its dividend by 5%+ at next announcement?", expiry: "5/2/2026", daysSince: 0, volume: 14010, priorProb: 58, currProb: 64, probChg: 6, zScore: 1.6, tag: "Corporate Trends: Corporate Fundamentals", attr: "Dividends" },

  // Weather: Weather & Climate (extra)
  { id: "m110", event: "Pacific typhoon season", contract: "Will the West Pacific record 4+ super typhoons by Aug 31?", expiry: "8/31/2026", daysSince: 0, volume: 18200, priorProb: 40, currProb: 47, probChg: 7, zScore: 1.8, tag: "Weather: Weather & Climate", attr: "Hurricane" },
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
    contract: "Will Robert F. Kennedy Jr. leave the Trump administration before 2027?",
    tag: "Political Leaders: Political Leadership Changes",
    attrs: ["Resignations"],
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
    contract: "Will there be 8 or more earthquakes of magnitude 7.0 by June 30?",
    tag: "Weather: Weather & Climate",
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
    event: "Tag: Crypto & Digital Assets / Bitcoin",
    contract: "All markets matching tag \u201CCapital Markets: Crypto & Digital Assets\u201D \u00B7 attr \u201CBitcoin\u201D",
    tag: "Capital Markets: Crypto & Digital Assets",
    attrs: ["Bitcoin"],
    probChgThreshold: 20,
    zThreshold: 3.5,
    priceCrosses: null,
    frequency: "daily",
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
    contract: "Will Discord IPO before 2027?",
    tag: "Capital Markets: Equity Market IPOs",
    attrs: ["Tech"],
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
  m.liveDays = liveDays;
  m.avgDailyVolume = Math.round(m.volume / liveDays);
  // Avg trade size varies by volume bucket, $40–$420
  m.avgTradeSize = 40 + ((i * 37 + m.volume) % 380);
  m.tradesPerDay = Math.max(1, Math.round(m.avgDailyVolume / m.avgTradeSize));
  // Total transactions in the contract — frequency of repricings
  m.numTrades = m.tradesPerDay * liveDays;
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
  ["m73", 0], ["m90", 0], ["m103", 1], ["m100", 1],
];
_NEW_OVERRIDES.forEach(([id, daysAgo]) => {
  const m = MARKETS.find(x => x.id === id);
  if (!m) return;
  const d = new Date(_todayDate);
  d.setDate(d.getDate() - daysAgo);
  m.createdDate = _fmtMDY(d);
});

const WATCHLISTS = [
  { id: "all_markets", name: "All Active Contracts", system: true, marketIds: null, filters: { zMin: 0, volumeMin: 0, probChgMin: 0 }, createdAt: "—" },
  { id: "biggest_movers", name: "Biggest Movers", system: true, marketIds: null, filters: { zMin: 3, volumeMin: 10000, probChgMin: 10 }, createdAt: "—" },
  { id: "new_contracts", name: "New Contracts", system: true, marketIds: null, createdWithinDays: 1, filters: { zMin: 0, volumeMin: 0, probChgMin: 0 }, createdAt: "—" },
  { id: "expired_contracts", name: "Historical Contracts", system: true, marketIds: null, expiredOnly: true, filters: { zMin: 0, volumeMin: 0, probChgMin: 0 }, createdAt: "—" },
  { id: "bam_macro", name: "BAM Macro Watch", system: true, bam: true, marketIds: ["m3", "m16", "m17", "m18", "m81", "m91", "m93"], createdAt: "—" },
  { id: "bam_crypto", name: "BAM Crypto Signals", system: true, bam: true, marketIds: ["m4", "m6", "m19", "m20", "m21", "m89", "m90"], createdAt: "—" },
  { id: "bam_geopolitics", name: "BAM Geopolitics", system: true, bam: true, marketIds: ["m7", "m11", "m14", "m15", "m62", "m63", "m64"], createdAt: "—" },
  { id: "wl_earn", name: "Earnings & Fed", marketIds: ["m16", "m103", "m104"], createdAt: "9/18/2024" },
  { id: "wl_elec", name: "Election Watch", marketIds: ["m7", "m39", "m40", "m58", "m59"], createdAt: "9/20/2024" },
];

window.MARKETS_DATA = { TODAY, TAGS, CONDITIONAL_ATTRS, MARKETS, PRICE_HISTORY, ALERTS_FOR_MARKET, STOCK_LINKAGES, SUBSCRIPTIONS, WATCHLISTS };
