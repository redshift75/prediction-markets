// Browse page: table with inline expand, split view, compact density

// Helper: make an ag-grid cell renderer from a React component
function makeReactRenderer(Component) {
  return class {
    init(params) {
      this.eGui = document.createElement("div");
      this.eGui.style.display = "contents";
      this.root = ReactDOM.createRoot(this.eGui);
      this.root.render(<Component {...params}/>);
    }
    getGui() { return this.eGui; }
    refresh(params) {
      this.root.render(<Component {...params}/>);
      return true;
    }
    destroy() {
      // Defer unmount to next tick to avoid "unmount during render" warnings
      const r = this.root;
      setTimeout(() => r.unmount(), 0);
    }
  };
}

const EventRenderer = makeReactRenderer((p) => (
  <span className="truncate" title={p.value}>{p.value}</span>
));
const VenueRenderer = makeReactRenderer((p) => {
  const id = p.data && p.data.id ? String(p.data.id) : "";
  const idNum = parseInt(id.replace(/\D/g, ""), 10) || 0;
  const venue = p.data && p.data.venue ? p.data.venue : (idNum % 2 === 0 ? "Kalshi" : "Polymarket");
  const r = (typeof window !== "undefined" && window.__resources) || {};
  const src = venue === "Polymarket" ? (r.polymarketLogo || "assets/polymarket.png") : (r.kalshiLogo || "assets/kalshi.png");
  return (
    <img src={src} alt={venue} title={venue} style={{width:22, height:22, borderRadius:5, display:'block', objectFit:'cover'}}/>
  );
});
const ContractRenderer = makeReactRenderer((p) => (
  <span className="truncate" title={p.value}>{p.value}</span>
));
const TrendRenderer = makeReactRenderer((p) => <Trend value={p.value}/>);
const TrendNoIconRenderer = makeReactRenderer((p) => {
  const n = Number(p.value);
  if (!Number.isFinite(n) || n === 0) return <span className="trend neutral tnum">0%</span>;
  const cls = n > 0 ? "up" : "down";
  return <span className={`trend ${cls} tnum`}>{n > 0 ? "+" : ""}{n}%</span>;
});
const IntRenderer = makeReactRenderer((p) => (
  <span className="tnum">{Number(p.value || 0).toLocaleString("en-US")}</span>
));
const TagsRenderer = makeReactRenderer((p) => {
  const d = p.data || {};
  const parts = [];
  if (d.tag) parts.push(d.tag);
  if (Array.isArray(d.attrs)) parts.push(...d.attrs);
  const text = parts.join(", ");
  return <span className="truncate tag-list" title={text}>{text}</span>;
});
const PercentRenderer = makeReactRenderer((p) => <span className="mono tnum">{p.value}%</span>);
const MoneyRenderer = makeReactRenderer((p) => <span className="mono tnum">{fmt$(p.value)}</span>);
const MonoRenderer = makeReactRenderer((p) => <span className="mono tnum">{p.value}</span>);
const ZRenderer = makeReactRenderer((p) => <ZCell value={p.value}/>);
const AlertRenderer = makeReactRenderer((p) => (
  <button
    className={`bell-btn ${p.data.__subscribed ? "active" : ""}`}
    onClick={(e) => { e.stopPropagation(); p.context.onSubscribe(p.data); }}
    title="Subscribe"
  >
    <Icon.Bell size={15} fill={p.data.__subscribed ? "currentColor" : "none"}/>
  </button>
));

function MarketsGrid({ rows, selectedId, onSelectRow, selected, setSelected, onSubscribe, isSubscribed, daysChange }) {
  const containerRef = React.useRef(null);
  const apiRef = React.useRef(null);
  const ctxRef = React.useRef({ onSubscribe, onSelectRow, selectedId });

  // Keep latest callbacks available to grid callbacks without re-creating grid
  React.useEffect(() => {
    ctxRef.current.onSubscribe = onSubscribe;
    ctxRef.current.onSelectRow = onSelectRow;
    ctxRef.current.selectedId = selectedId;
    if (apiRef.current) {
      apiRef.current.setGridOption("context", { onSubscribe });
      apiRef.current.redrawRows();
    }
  }, [onSubscribe, onSelectRow, selectedId]);

  // Build row data with subscription flag
  const rowData = React.useMemo(
    () => rows.map(r => ({ ...r, __subscribed: isSubscribed(r.id) })),
    [rows, isSubscribed]
  );

  // Create grid once on mount
  React.useEffect(() => {
    const columnDefs = [
      {
        headerName: "",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        width: 40, minWidth: 40, maxWidth: 44,
        pinned: "left",
        sortable: false, resizable: false, suppressMovable: true,
        cellStyle: { paddingLeft: 10, paddingRight: 4 },
      },
      { headerName: "Venue", field: "venue", width: 56, minWidth: 52, maxWidth: 72,
        headerClass: "ag-center-header ag-compact-header",
        cellClass: "ag-compact-cell",
        cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" },
        cellRenderer: VenueRenderer, sortable: true, resizable: false },
      { headerName: "Event Contract", field: "event", flex: 1.4, minWidth: 200,
        cellRenderer: EventRenderer, tooltipField: "event" },
      { headerName: "Outcome", field: "contract", flex: 1.6, minWidth: 220,
        cellRenderer: ContractRenderer, tooltipField: "contract" },
      { headerName: "Category Tag", colId: "categoryTag",
        valueGetter: (p) => {
          const d = p.data || {};
          const parts = [];
          if (d.tag) parts.push(d.tag);
          if (Array.isArray(d.attrs)) parts.push(...d.attrs);
          return parts.join(", ");
        },
        width: 160, minWidth: 120,
        cellRenderer: TagsRenderer,
        tooltipValueGetter: (p) => p.value },
      { headerName: "Curr Prob", field: "currProb", width: 84,
        headerClass: "ag-center-header ag-compact-header",
        cellClass: "ag-compact-cell",
        cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" },
        cellRenderer: PercentRenderer },
      { headerName: `${daysChange || 1}d Prob Chg`, field: "probChg", colId: "probChg", width: 96,
        headerClass: "ag-center-header ag-compact-header",
        cellClass: "ag-compact-cell",
        cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" },
        cellRenderer: TrendNoIconRenderer,
        comparator: (a, b) => Number(a) - Number(b) },
      { headerName: `${daysChange || 1}d Z-Score`, field: "zScore", colId: "zScore", width: 84,
        headerClass: "ag-center-header ag-compact-header",
        cellClass: "ag-compact-cell",
        cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" },
        cellRenderer: ZRenderer,
        comparator: (a, b) => Number(a) - Number(b) },
      { headerName: `${daysChange || 1}d Prior Prob`, field: "priorProb", colId: "priorProb", width: 92,
        headerClass: "ag-center-header ag-compact-header",
        cellClass: "ag-compact-cell",
        cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" },
        cellRenderer: PercentRenderer },
      { headerName: "Total Volume", field: "volume", width: 104,
        headerClass: "ag-center-header ag-compact-header",
        cellClass: "ag-compact-cell",
        cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" },
        cellRenderer: MoneyRenderer,
        comparator: (a, b) => Number(a) - Number(b) },
      { headerName: "# Trades", field: "numTrades", width: 86,
        headerClass: "ag-center-header ag-compact-header",
        cellClass: "ag-compact-cell",
        cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" },
        cellRenderer: IntRenderer,
        comparator: (a, b) => Number(a) - Number(b),
        headerTooltip: "Total transactions in the contract — frequency of repricings" },
      { headerName: "Expiry Date", field: "expiry", width: 92,
        headerClass: "ag-center-header ag-compact-header",
        cellClass: "ag-compact-cell",
        cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" },
        cellRenderer: MonoRenderer },
      { headerName: "Subscribe", field: "__subscribed", width: 80,
        sortable: false, resizable: false,
        headerClass: "ag-center-header ag-compact-header",
        cellClass: "ag-compact-cell",
        cellRenderer: AlertRenderer,
        cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" } },
    ];

    const gridOptions = {
      columnDefs,
      rowData: [],
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true,
      },
      rowSelection: "multiple",
      suppressRowClickSelection: true,
      rowHeight: 32,
      headerHeight: 30,
      animateRows: false,
      suppressCellFocus: true,
      getRowId: (p) => p.data.id,
      context: { onSubscribe: ctxRef.current.onSubscribe },
      rowClassRules: {
        "ag-row-focused-selected": (p) => p.data && p.data.id === ctxRef.current.selectedId,
      },
      onRowClicked: (e) => {
        const tgt = e.event && e.event.target;
        if (tgt && tgt.closest && (tgt.closest(".ag-selection-checkbox") || tgt.closest(".bell-btn"))) return;
        if (e.data) ctxRef.current.onSelectRow(e.data.id);
      },
      onSelectionChanged: (e) => {
        const ids = new Set();
        e.api.forEachNode(n => { if (n.isSelected()) ids.add(n.data.id); });
        setSelected(ids);
      },
    };

    const api = agGrid.createGrid(containerRef.current, gridOptions);
    apiRef.current = api;
    return () => api.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push row data on change
  React.useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    api.setGridOption("rowData", rowData);
  }, [rowData]);

  // Update dynamic column headers when daysChange changes
  React.useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const d = daysChange || 1;
    const probCol = api.getColumnDef ? api.getColumnDef("probChg") : null;
    const zCol = api.getColumnDef ? api.getColumnDef("zScore") : null;
    // Prefer setColumnDefs if available
    const allDefs = api.getColumnDefs ? api.getColumnDefs() : null;
    if (allDefs) {
      const updated = allDefs.map(c => {
        if (c.colId === "probChg" || c.field === "probChg") return { ...c, headerName: `${d}d Prob Chg` };
        if (c.colId === "zScore" || c.field === "zScore") return { ...c, headerName: `${d}d Z-Score` };
        if (c.colId === "priorProb" || c.field === "priorProb") return { ...c, headerName: `${d}d Prior Prob` };
        return c;
      });
      api.setGridOption("columnDefs", updated);
    }
  }, [daysChange]);

  // Sync external selection Set -> grid
  React.useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    api.forEachNode(n => {
      const shouldSelect = selected.has(n.data.id);
      if (n.isSelected() !== shouldSelect) n.setSelected(shouldSelect, false, true);
    });
  }, [selected, rowData]);

  return (
    <div ref={containerRef} className="ag-theme-quartz ag-pm" style={{ width: "100%", height: "100%" }}/>
  );
}

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
  const [tags, setTags] = React.useState([]);
  const [attrs, setAttrs] = React.useState([]);
  const [volumeMin, setVolumeMin] = React.useState(0);
  const [probChgMin, setProbChgMin] = React.useState(0);
  const [zMin, setZMin] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState("m11");
  const [subMarket, setSubMarket] = React.useState(null);
  const [subTag, setSubTag] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [daysChange, setDaysChange] = React.useState(1);
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
      setTags([]);
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
  const listExpiredOnly = activeListObj && activeListObj.expiredOnly;
  const filtered = MARKETS.filter(m => {
    if (listMarketIds && !listMarketIds.has(m.id)) return false;
    if (listCreatedWithinDays != null) {
      if (!m.createdDate) return false;
      const [mo, da, yr] = m.createdDate.split("/").map(Number);
      const ageDays = (todayMs - new Date(yr, mo - 1, da).getTime()) / 86400000;
      if (!(ageDays <= listCreatedWithinDays)) return false;
    }
    if (listExpiredOnly) {
      if (!m.expiry) return false;
      const [mo, da, yr] = m.expiry.split("/").map(Number);
      const expMs = new Date(yr, mo - 1, da).getTime();
      if (!(expMs < todayMs)) return false;
    }
    if (tags.length && !tags.includes(m.tag)) return false;
    if (attrs.length && !attrs.includes(m.attr)) return false;
    if (Number(volumeMin) > 0 && m.volume < Number(volumeMin)) return false;
    if (Number(probChgMin) > 0 && Math.abs(m.probChg) < Number(probChgMin)) return false;
    if (Number(zMin) > 0 && Math.abs(m.zScore) < Number(zMin)) return false;
    if (search && !(m.event + m.contract).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const isSubscribed = (id) => subscriptions.some(s => s.marketId === id && s.active);

  const handleSubscribe = (m) => setSubMarket(m);
  const handleSubscribeTag = () => setSubTag({ tag: tags[0] || "All", tags, attrs });

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
    const h = () => setSubTag({ tag: tags[0] || "All", tags, attrs });
    window.addEventListener('pm:subscribe-tag', h);
    return () => window.removeEventListener('pm:subscribe-tag', h);
  }, [tags, attrs]);

  const selectedMarket = MARKETS.find(m => m.id === selectedId) || filtered[0];

  return (
    <>
      <div className="content">
        <div className="content-main">
          <div className="split-stacked">
            <div className="split-top">
              <div className="card" style={{height:'100%', display:'flex', flexDirection:'column', minHeight:0}}>
                <div className="card-header" style={{gap:8, flexWrap:'nowrap', display:'flex', alignItems:'center', overflow:'hidden'}}>
                  {(() => {
                    const pillOrder = [
                      { id: "biggest_movers", name: "Biggest Movers" },
                      { id: "new_contracts", name: "New Contracts" },
                      { id: "__bam__", name: "BAM Themes" },
                      { id: "__custom__", name: "My Custom Themes" },
                      { id: "all_markets", name: "All Contracts" },
                      { id: "expired_contracts", name: "Expired Contracts" },
                    ];
                    const customLists = watchlists.filter(w => !w.system);
                    const bamLists = watchlists.filter(w => w.system && w.bam);
                    const activeIsCustom = activeListObj && !activeListObj.system;
                    const activeIsBam = activeListObj && activeListObj.system && activeListObj.bam;
                    return (
                      <>
                        <div className="chips" style={{gap:6, flexShrink:0}}>
                          {pillOrder.map(p => {
                            const isCustom = p.id === "__custom__";
                            const isBam = p.id === "__bam__";
                            const isActive = isCustom ? activeIsCustom : isBam ? activeIsBam : activeList === p.id;
                            return (
                              <button
                                key={p.id}
                                className={`chip ${isActive ? "active" : ""}`}
                                onClick={() => {
                                  if (isCustom) {
                                    const target = activeIsCustom ? activeList : (customLists[0] && customLists[0].id);
                                    if (target) { setActiveList(target); clearSelection(); }
                                  } else if (isBam) {
                                    const target = activeIsBam ? activeList : (bamLists[0] && bamLists[0].id);
                                    if (target) { setActiveList(target); clearSelection(); }
                                  } else {
                                    setActiveList(p.id);
                                    clearSelection();
                                  }
                                }}
                                disabled={(isCustom && customLists.length === 0) || (isBam && bamLists.length === 0)}
                                title={(isCustom && customLists.length === 0) ? "No custom themes yet" : (isBam && bamLists.length === 0) ? "No BAM themes available" : undefined}
                              >
                                {p.name}
                              </button>
                            );
                          })}
                        </div>
                        {activeIsCustom && (
                          <select
                            className="select"
                            value={activeList}
                            onChange={e => { setActiveList(e.target.value); clearSelection(); }}
                            style={{width:170, flexShrink:0}}
                          >
                            {customLists.map(w => (
                              <option key={w.id} value={w.id}>{w.name} ({(w.marketIds || []).length})</option>
                            ))}
                          </select>
                        )}
                        {activeIsBam && (
                          <select
                            className="select"
                            value={activeList}
                            onChange={e => { setActiveList(e.target.value); clearSelection(); }}
                            style={{width:170, flexShrink:0}}
                          >
                            {bamLists.map(w => (
                              <option key={w.id} value={w.id}>{w.name} ({(w.marketIds || []).length})</option>
                            ))}
                          </select>
                        )}
                      </>
                    );
                  })()}
                  <div style={{marginLeft:'auto', flexShrink:0, display:'flex', alignItems:'center', gap:8}}>
                    <label style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'hsl(var(--muted-foreground))', whiteSpace:'nowrap'}}>
                      <span># Days Change</span>
                      <input
                        className="input mono"
                        type="number"
                        min={1}
                        step={1}
                        value={daysChange}
                        onChange={e => {
                          const raw = e.target.value;
                          if (raw === "") { setDaysChange(""); return; }
                          const n = parseInt(raw, 10);
                          if (Number.isFinite(n) && n >= 1) setDaysChange(n);
                        }}
                        onBlur={() => { if (daysChange === "" || daysChange < 1) setDaysChange(1); }}
                        style={{width:60, textAlign:'center'}}
                        title="Number of days used to compute the z-score window"
                      />
                    </label>
                    <div style={{position:'relative'}}>
                      <input
                        className="input"
                        placeholder="Search markets…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{width:200, paddingLeft:30, background:'hsl(var(--primary) / 0.08)', borderColor:'hsl(var(--primary) / 0.35)', fontWeight:500}}
                      />
                      <span style={{position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', color:'hsl(var(--primary))', pointerEvents:'none', display:'flex'}}>
                        <Icon.Search size={14}/>
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{flex:1, minHeight:0}}>
                  <MarketsGrid
                    rows={filtered}
                    selectedId={selectedId}
                    onSelectRow={setSelectedId}
                    selected={selected}
                    setSelected={setSelected}
                    onSubscribe={handleSubscribe}
                    isSubscribed={isSubscribed}
                    daysChange={daysChange || 1}
                  />
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
            tags={tags} setTags={setTags}
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
