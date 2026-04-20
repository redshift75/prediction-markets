// Browse page: table with inline expand, split view, compact density

function MarketRow({ m, expanded, onToggle, selected, onSelect, subscribed, onSubscribe, compact }) {
  return (
    <>
      <tr className={selected ? "selected" : ""} onClick={onSelect || onToggle}>
        <td style={{maxWidth:220}}><span className="truncate" title={m.event}>{m.event}</span></td>
        <td style={{maxWidth:260}}><span className="truncate" title={m.contract}>{m.contract}</span></td>
        <td className="num mono tnum">{m.expiry}</td>
        <td className="num mono tnum">{m.daysSince}</td>
        <td className="num mono tnum">{fmt$(m.volume)}</td>
        <td className="num mono tnum">{m.priorProb}%</td>
        <td className="num mono tnum">{m.currProb}%</td>
        <td className="num"><Trend value={m.probChg}/></td>
        <td className="num"><ZCell value={m.zScore}/></td>
        <td className="num" onClick={e => e.stopPropagation()}>
          <button className={`bell-btn ${subscribed?"active":""}`} onClick={() => onSubscribe(m)} title="Subscribe">
            <Icon.Bell size={15} fill={subscribed ? "currentColor" : "none"}/>
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="expand-row">
          <td colSpan={10}>
            <ExpandedDetail market={m} onSubscribe={() => onSubscribe(m)} subscribed={subscribed}/>
          </td>
        </tr>
      )}
    </>
  );
}

function ExpandedDetail({ market, onSubscribe, subscribed }) {
  return (
    <div className="expand-inner">
      <div className="card">
        <div className="card-header">
          <div className="card-title">Event Prices — History</div>
          <div className="card-sub">{market.event}</div>
        </div>
        <div className="chart-wrap">
          <LineChart data={window.MARKETS_DATA.PRICE_HISTORY} width={480} height={200}/>
        </div>
      </div>
      <div className="card">
        <div className="card-header row-between">
          <div>
            <div className="card-title row" style={{gap:6}}><Icon.AlertCircle size={14}/> Alerts</div>
            <div className="card-sub">Threshold breaches for this market</div>
          </div>
          <button className={`btn btn-sm ${subscribed?"":"btn-primary"}`} onClick={onSubscribe}>
            <Icon.Bell size={12}/> {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <div className="card-body p0">
          <table className="tbl compact">
            <thead>
              <tr>
                <th>Date</th><th className="num">Prior Prob</th><th className="num">Curr Prob</th><th className="num">Prob Chg</th><th className="num">Z Score</th>
              </tr>
            </thead>
            <tbody>
              {window.MARKETS_DATA.ALERTS_FOR_MARKET.map((a, i) => (
                <tr key={i}>
                  <td className="mono tnum">{a.date}</td>
                  <td className="num mono tnum">{a.priorProb}%</td>
                  <td className="num mono tnum">{a.currProb}%</td>
                  <td className="num"><Trend value={a.probChg}/></td>
                  <td className="num"><ZCell value={a.zScore}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card expand-bottom">
        <div className="card-header">
          <div className="card-title">Stock Linkages</div>
          <div className="card-sub">Correlated equities on the alert date</div>
        </div>
        <div className="card-body p0">
          <table className="tbl compact">
            <thead>
              <tr>
                <th>Date (Linkage)</th>
                <th>Ticker Exch</th>
                <th className="num">Adj Stock Zscore</th>
                <th className="num">Stock Return</th>
                <th className="num">Index Return</th>
                <th className="num">Adj Stock Return</th>
                <th className="num">PM Zscore</th>
              </tr>
            </thead>
            <tbody>
              {window.MARKETS_DATA.STOCK_LINKAGES.map((s, i) => (
                <tr key={i}>
                  <td className="mono tnum">{s.date}</td>
                  <td className="mono">{s.ticker}</td>
                  <td className="num mono tnum">{s.adjZ.toFixed(1)}</td>
                  <td className="num"><Trend value={s.stockRet}/></td>
                  <td className="num mono tnum" style={{color:'hsl(0 72% 48%)'}}>{s.indexRet}%</td>
                  <td className="num" style={{color: s.adjStockRet>=0 ? 'hsl(142 70% 33%)' : 'hsl(0 72% 48%)'}}>
                    <span className="mono tnum">{s.adjStockRet>=0?"+":""}{s.adjStockRet}%</span>
                  </td>
                  <td className="num"><ZCell value={s.pmZ}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BrowsePage({ layout, subscriptions, addSubscription }) {
  const { MARKETS } = window.MARKETS_DATA;
  const [tag, setTag] = React.useState("All");
  const [attrs, setAttrs] = React.useState([]);
  const [volumeMin, setVolumeMin] = React.useState(0);
  const [probChgMin, setProbChgMin] = React.useState(0);
  const [zMin, setZMin] = React.useState(0);
  const [expandedId, setExpandedId] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState("m11");
  const [subMarket, setSubMarket] = React.useState(null);
  const [subTag, setSubTag] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const filtered = MARKETS.filter(m => {
    if (tag !== "All" && m.tag !== tag) return false;
    if (attrs.length && !attrs.includes(m.attr)) return false;
    if (Number(volumeMin) > 0 && m.volume < Number(volumeMin)) return false;
    if (Number(probChgMin) > 0 && Math.abs(m.probChg) < Number(probChgMin)) return false;
    if (Number(zMin) > 0 && Math.abs(m.zScore) < Number(zMin)) return false;
    if (search && !(m.event + m.contract).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const isSubscribed = (id) => subscriptions.some(s => s.marketId === id && s.active);

  const handleSubscribe = (m) => setSubMarket(m);
  const handleSubscribeTag = () => setSubTag({ tag, attrs });

  const selectedMarket = MARKETS.find(m => m.id === selectedId) || filtered[0];

  const tableProps = { compact: layout === "compact" };

  const Table = (
    <div className="card" style={{height:'100%', display:'flex', flexDirection:'column', minHeight:0}}>
      <div className="card-header row-between" style={{gap:12}}>
        <div style={{flex:1, minWidth:0}}>
          <div className="card-title" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>Biggest 1 Day Movers — {tag}</div>
          <div className="card-sub">Showing {filtered.length} of {MARKETS.length} events</div>
        </div>
        <div className="row" style={{flexShrink:0}}>
          <div style={{position:'relative'}}>
            <input
              className="input"
              placeholder="Search markets…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{width:220, paddingLeft:28}}
            />
            <span style={{position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', color:'hsl(var(--muted-foreground))', pointerEvents:'none', display:'flex'}}>
              <Icon.Search size={14}/>
            </span>
          </div>
        </div>
      </div>
      <div style={{overflow:'auto', flex:1}}>
        <table className={`tbl ${tableProps.compact ? "compact" : ""}`}>
          <thead>
            <tr>
              <th>Event</th>
              <th>Contract</th>
              <th className="num">Expiry Date</th>
              <th className="num">Days Since Trade</th>
              <th className="num">Total Volume</th>
              <th className="num">Prior Prob</th>
              <th className="num">Curr Prob</th>
              <th className="num">Prob Chg</th>
              <th className="num">Z Score</th>
              <th className="num">Alert</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <MarketRow
                key={m.id}
                m={m}
                expanded={layout === "table" && expandedId === m.id}
                onToggle={() => {
                  if (layout === "split") { setSelectedId(m.id); }
                  else { setExpandedId(expandedId === m.id ? null : m.id); }
                }}
                selected={layout === "split" && selectedId === m.id}
                subscribed={isSubscribed(m.id)}
                onSubscribe={handleSubscribe}
                compact={tableProps.compact}
              />
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={10}><div className="empty">No markets match the current filters.</div></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {layout === "compact" || layout === "split" ? (
        <TagChips tag={tag} setTag={setTag} attrs={attrs} setAttrs={setAttrs}/>
      ) : null}
      <div className={`content ${layout === "split" ? "" : ""}`} style={layout === "split" ? {gridTemplateColumns: "1fr 300px"} : undefined}>
        <div className="content-main" style={{overflow:'hidden'}}>
          {layout === "split" ? (
            <div className="split">
              {Table}
              <div className="card" style={{overflow:'auto'}}>
                {selectedMarket ? (
                  <ExpandedDetail market={selectedMarket} subscribed={isSubscribed(selectedMarket.id)} onSubscribe={() => setSubMarket(selectedMarket)}/>
                ) : <div className="empty">Select a market to see details.</div>}
              </div>
            </div>
          ) : Table}
        </div>
        <div className="content-side">
          <FilterSidebar
            tag={tag} setTag={setTag}
            attrs={attrs} setAttrs={setAttrs}
            volumeMin={volumeMin} setVolumeMin={setVolumeMin}
            probChgMin={probChgMin} setProbChgMin={setProbChgMin}
            zMin={zMin} setZMin={setZMin}
            onSubscribeTag={handleSubscribeTag}
          />
        </div>
      </div>

      <SubscribeDialog
        open={!!subMarket}
        market={subMarket}
        onClose={() => setSubMarket(null)}
        onSave={addSubscription}
      />
      <SubscribeDialog
        open={!!subTag}
        tagCtx={subTag}
        onClose={() => setSubTag(null)}
        onSave={addSubscription}
      />
    </>
  );
}

Object.assign(window, { BrowsePage, ExpandedDetail });
