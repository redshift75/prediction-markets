// Browse page: table with inline expand, split view, compact density

function MarketRow({ m, expanded, onToggle, selected, onSelect, subscribed, onSubscribe, checked, onToggleSelect }) {
  return (
    <>
      <tr className={selected ? "selected" : ""} onClick={onSelect || onToggle}>
        {onToggleSelect && (
          <td onClick={e => { e.stopPropagation(); onToggleSelect(m.id); }} style={{width:36}}>
            <input type="checkbox" checked={checked} readOnly style={{accentColor:'hsl(var(--primary))', cursor:'pointer'}}/>
          </td>
        )}
        <td className="col-event"><span className="truncate" title={m.event}>{m.event}</span></td>
        <td className="col-contract"><span className="truncate" title={m.contract}>{m.contract}</span></td>
        <td className="num mono tnum">{m.expiry}</td>
        <td className="num"><Trend value={m.probChg}/></td>
        <td className="num mono tnum">{m.priorProb}%</td>
        <td className="num mono tnum">{m.currProb}%</td>
        <td className="num mono tnum">{fmt$(m.volume)}</td>
        <td className="num"><ZCell value={m.zScore}/></td>
        <td className="num" onClick={e => e.stopPropagation()}>
          <button className={`bell-btn ${subscribed?"active":""}`} onClick={() => onSubscribe(m)} title="Subscribe">
            <Icon.Bell size={15} fill={subscribed ? "currentColor" : "none"}/>
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="expand-row">
          <td colSpan={9}>
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
          <div className="card-title">Price History</div>
          <div className="card-sub">{market.event}</div>
        </div>
        <div className="chart-wrap">
          <LineChart data={window.MARKETS_DATA.PRICE_HISTORY} width={720} height={220}/>
        </div>
      </div>
      <div className="card">
        <div className="card-header row-between">
          <div>
            <div className="card-title row" style={{gap:6}}><Icon.Search size={14}/> Contract details</div>
            <div className="card-sub">Contract metadata and trading activity</div>
          </div>
          <button className={`btn btn-sm ${subscribed?"":"btn-primary"}`} onClick={onSubscribe}>
            <Icon.Bell size={12}/> {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <div className="card-body p0">
          <table className="tbl compact tbl-detail">
            <tbody>
              <tr>
                <th>Question</th>
                <td>
                  <a href={market.url} target="_blank" rel="noopener noreferrer" className="detail-link" title={market.url}>
                    <span className="truncate">{market.contract}</span>
                    <Icon.ChevronRight size={12}/>
                  </a>
                </td>
              </tr>
              <tr>
                <th>Tags</th>
                <td><span className="badge blue">{market.tag}</span></td>
              </tr>
              <tr>
                <th>Secondary tag</th>
                <td><span className="badge gray">{market.attr}</span></td>
              </tr>
              <tr>
                <th>Created</th>
                <td className="mono tnum">{market.createdDate}</td>
              </tr>
              <tr>
                <th>End date</th>
                <td className="mono tnum">{market.expiry}</td>
              </tr>
              <tr>
                <th>Avg. daily volume</th>
                <td className="mono tnum">{fmt$(market.avgDailyVolume)}</td>
              </tr>
              <tr>
                <th>Trades / day</th>
                <td className="mono tnum">{market.tradesPerDay.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Avg. trade size</th>
                <td className="mono tnum">{fmt$(market.avgTradeSize)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BrowsePage({ subscriptions, addSubscription, watchlists, setWatchlists, focusListId, clearFocusList }) {
  const { MARKETS } = window.MARKETS_DATA;
  const [tag, setTag] = React.useState("All");
  const [attrs, setAttrs] = React.useState([]);
  const [volumeMin, setVolumeMin] = React.useState(0);
  const [probChgMin, setProbChgMin] = React.useState(0);
  const [zMin, setZMin] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState("m11");
  const [subMarket, setSubMarket] = React.useState(null);
  const [subTag, setSubTag] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [activeList, setActiveList] = React.useState(focusListId || "all_markets"); // list id
  React.useEffect(() => {
    if (focusListId) { setActiveList(focusListId); clearFocusList && clearFocusList(); }
  }, [focusListId]);
  const [selected, setSelected] = React.useState(new Set());
  const [saveListOpen, setSaveListOpen] = React.useState(false);

  const activeListObj = watchlists.find(w => w.id === activeList);
  const listMarketIds = (activeListObj && Array.isArray(activeListObj.marketIds)) ? new Set(activeListObj.marketIds) : null;

  // Apply system-list filter presets when list changes
  const prevListRef = React.useRef(activeList);
  React.useEffect(() => {
    if (prevListRef.current === activeList) return;
    prevListRef.current = activeList;
    if (activeListObj && activeListObj.system && activeListObj.filters) {
      const f = activeListObj.filters;
      setTag("All");
      setAttrs([]);
      setZMin(f.zMin ?? 0);
      setVolumeMin(f.volumeMin ?? 0);
      setProbChgMin(f.probChgMin ?? 0);
    }
  }, [activeList, activeListObj]);

  const listCreatedWithinDays = activeListObj && activeListObj.createdWithinDays;
  const todayMs = React.useMemo(() => {
    const [mo, da, yr] = (window.MARKETS_DATA.TODAY || "").split("/").map(Number);
    return new Date(yr, mo - 1, da).getTime();
  }, []);
  const filtered = MARKETS.filter(m => {
    if (listMarketIds && !listMarketIds.has(m.id)) return false;
    if (listCreatedWithinDays != null) {
      if (!m.createdDate) return false;
      const [mo, da, yr] = m.createdDate.split("/").map(Number);
      const ageDays = (todayMs - new Date(yr, mo - 1, da).getTime()) / 86400000;
      if (!(ageDays <= listCreatedWithinDays)) return false;
    }
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

  const toggleSelect = (id) => setSelected(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const allVisibleSelected = filtered.length > 0 && filtered.every(m => selected.has(m.id));
  const toggleSelectAll = () => setSelected(prev => {
    if (allVisibleSelected) {
      const next = new Set(prev);
      filtered.forEach(m => next.delete(m.id));
      return next;
    }
    const next = new Set(prev);
    filtered.forEach(m => next.add(m.id));
    return next;
  });
  const clearSelection = () => setSelected(new Set());

  React.useEffect(() => {
    const h = () => setSubTag({ tag, attrs });
    window.addEventListener('pm:subscribe-tag', h);
    return () => window.removeEventListener('pm:subscribe-tag', h);
  }, [tag, attrs]);

  const selectedMarket = MARKETS.find(m => m.id === selectedId) || filtered[0];

  return (
    <>
      <div className="content">
        <div className="content-main">
          <div className="split-stacked">
            <div className="split-top">
              <div className="card" style={{height:'100%', display:'flex', flexDirection:'column', minHeight:0}}>
                <div className="card-header row-between" style={{gap:12, flexWrap:'wrap'}}>
                  <div style={{flex:1, minWidth:0}}>
                    <div className="card-title" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                      Contract List{activeListObj ? ` — ${activeListObj.name}` : ""}
                    </div>
                    <div className="card-sub">Showing {filtered.length} of {MARKETS.length} events</div>
                  </div>
                  <div className="row" style={{flexShrink:0, gap:8}}>
                    <select className="select" value={activeList} onChange={e => { setActiveList(e.target.value); clearSelection(); }} style={{width:200}}>
                      {watchlists.filter(w => w.system).map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                      {watchlists.some(w => !w.system) && <option disabled>──────────</option>}
                      {watchlists.filter(w => !w.system).map(w => (
                        <option key={w.id} value={w.id}>{w.name} ({(w.marketIds || []).length})</option>
                      ))}
                    </select>
                    <div style={{position:'relative'}}>
                      <input
                        className="input"
                        placeholder="Search markets…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{width:200, paddingLeft:28}}
                      />
                      <span style={{position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', color:'hsl(var(--muted-foreground))', pointerEvents:'none', display:'flex'}}>
                        <Icon.Search size={14}/>
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{overflow:'auto', flex:1}}>
                  <table className="tbl tbl-markets">
                    <thead>
                      <tr>
                        <th style={{width:36}}>
                          <input type="checkbox" checked={allVisibleSelected} onChange={toggleSelectAll} style={{accentColor:'hsl(var(--primary))', cursor:'pointer'}}/>
                        </th>
                        <th>Event</th>
                        <th>Contract</th>
                        <th className="num">Expiry Date</th>
                        <th className="num">Prob Chg</th>
                        <th className="num">Prior Prob</th>
                        <th className="num">Curr Prob</th>
                        <th className="num">Total Volume</th>
                        <th className="num">Z Score</th>
                        <th className="num">Alert</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(m => (
                        <MarketRow
                          key={m.id}
                          m={m}
                          expanded={false}
                          onToggle={() => setSelectedId(m.id)}
                          selected={selectedId === m.id}
                          subscribed={isSubscribed(m.id)}
                          onSubscribe={handleSubscribe}
                          checked={selected.has(m.id)}
                          onToggleSelect={toggleSelect}
                        />
                      ))}
                      {filtered.length === 0 && (
                        <tr><td colSpan={10}><div className="empty">No markets match the current filters.</div></td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="split-bottom">
              <div className="card" style={{height:'100%', overflow:'auto'}}>
                {selectedMarket ? (
                  <ExpandedDetail market={selectedMarket} subscribed={isSubscribed(selectedMarket.id)} onSubscribe={() => setSubMarket(selectedMarket)}/>
                ) : <div className="empty">Select a market to see details.</div>}
              </div>
            </div>
          </div>
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

      {selected.size > 0 && (
        <div className="bulk-bar">
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <span style={{fontSize:13, fontWeight:600}}>{selected.size} selected</span>
            <button className="btn btn-ghost btn-sm" onClick={clearSelection}>Clear</button>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-sm" onClick={() => setSaveListOpen(true)}>
              <Icon.Plus size={12}/> Save to list…
            </button>
          </div>
        </div>
      )}

      <SaveToListDialog
        open={saveListOpen}
        onClose={() => setSaveListOpen(false)}
        selectedCount={selected.size}
        watchlists={watchlists}
        onSave={(listIdOrName, isNew) => {
          if (isNew) {
            const newList = {
              id: "wl" + Math.random().toString(36).slice(2,8),
              name: listIdOrName,
              marketIds: Array.from(selected),
              createdAt: new Date().toLocaleDateString("en-US"),
            };
            setWatchlists(prev => [newList, ...prev]);
          } else {
            setWatchlists(prev => prev.map(w =>
              w.id === listIdOrName
                ? { ...w, marketIds: Array.from(new Set([...w.marketIds, ...selected])) }
                : w
            ));
          }
          clearSelection();
          setSaveListOpen(false);
        }}
      />
    </>
  );
}

Object.assign(window, { BrowsePage, ExpandedDetail });
