// Watchlists feature: save-to-list dialog and management page

function SaveToListDialog({ open, onClose, selectedCount, watchlists, onSave }) {
  const [mode, setMode] = React.useState("new"); // "new" | "existing"
  const [newName, setNewName] = React.useState("");
  const userLists = watchlists.filter((w) => !w.system);
  const [existingId, setExistingId] = React.useState(userLists[0]?.id || "");

  React.useEffect(() => {
    if (open) {
      setMode(userLists.length === 0 ? "new" : "new");
      setNewName("");
      setExistingId(userLists[0]?.id || "");
    }
  }, [open]);

  const canSave =
  mode === "new" && newName.trim().length > 0 ||
  mode === "existing" && !!existingId;

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="dialog-header">
        <div className="dialog-title">Save to watchlist</div>
        <div className="dialog-sub">{selectedCount} {selectedCount === 1 ? "market" : "markets"} selected</div>
      </div>
      <div className="dialog-body">
        <div className="seg" role="tablist">
          <button className={mode === "new" ? "on" : ""} onClick={() => setMode("new")}>New list</button>
          <button className={mode === "existing" ? "on" : ""} onClick={() => setMode("existing")} disabled={userLists.length === 0}>Add to existing</button>
        </div>
        {mode === "new" ?
        <div>
            <div className="filter-label">List name</div>
            <input
            className="input"
            autoFocus
            placeholder="e.g. Tariff Tracker"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter" && canSave) onSave(newName.trim(), true);}} />
          
          </div> :

        <div>
            <div className="filter-label">Choose a list</div>
            <select className="select" value={existingId} onChange={(e) => setExistingId(e.target.value)}>
              {userLists.map((w) =>
            <option key={w.id} value={w.id}>{w.name} ({w.marketIds.length})</option>
            )}
            </select>
          </div>
        }
      </div>
      <div className="dialog-footer">
        <button className="btn" onClick={onClose}>Cancel</button>
        <button
          className="btn btn-primary"
          disabled={!canSave}
          onClick={() => mode === "new" ? onSave(newName.trim(), true) : onSave(existingId, false)}>
          
          {mode === "new" ? "Create list" : "Add to list"}
        </button>
      </div>
    </Dialog>);

}

function WatchlistsPage({ watchlists, setWatchlists, onOpenInBrowse, onSubscribeList, subscriptions }) {
  const [renameId, setRenameId] = React.useState(null);
  const [renameVal, setRenameVal] = React.useState("");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");

  const { MARKETS } = window.MARKETS_DATA;
  const marketMap = React.useMemo(() => {
    const m = {};
    MARKETS.forEach((x) => m[x.id] = x);
    return m;
  }, []);

  const del = (id) => {
    if (!confirm("Delete this watchlist?")) return;
    setWatchlists((prev) => prev.filter((w) => w.id !== id));
  };
  const removeMarket = (listId, marketId) => {
    setWatchlists((prev) => prev.map((w) => w.id === listId ? { ...w, marketIds: w.marketIds.filter((id) => id !== marketId) } : w));
  };
  const startRename = (w) => {setRenameId(w.id);setRenameVal(w.name);};
  const commitRename = () => {
    if (!renameVal.trim()) {setRenameId(null);return;}
    setWatchlists((prev) => prev.map((w) => w.id === renameId ? { ...w, name: renameVal.trim() } : w));
    setRenameId(null);
  };
  const isListSubscribed = (listId) => subscriptions.some((s) => s.listId === listId && s.active);

  return (
    <div className="content" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
      <div className="content-main">
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header row-between">
            <div>
              <div className="card-title">Custom Themes</div>
              <div className="card-sub">{watchlists.length} {watchlists.length === 1 ? "list" : "lists"} · curate contracts you care about</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => {setCreateOpen(true);setNewName("");}}>
              <Icon.Plus size={12} /> New watchlist
            </button>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
            {watchlists.length === 0 ?
            <div className="empty">
                No watchlists yet. Select markets on the Browse page and save them here.
                <div style={{ marginTop: 12 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => {setCreateOpen(true);setNewName("");}}>
                    <Icon.Plus size={12} /> New watchlist
                  </button>
                </div>
              </div> :

            <div className="wl-grid">
                {watchlists.map((w) => {
                const markets = (w.marketIds || []).map((id) => marketMap[id]).filter(Boolean);
                const preview = markets.slice(0, 4);
                const more = markets.length - preview.length;
                const subscribed = isListSubscribed(w.id);
                const isSystem = !!w.system;
                return (
                  <div key={w.id} className={`wl-card ${isSystem ? "wl-card-system" : ""}`}>
                      <div className="wl-card-header">
                        {renameId === w.id && !isSystem ?
                      <input
                        className="input"
                        autoFocus
                        value={renameVal}
                        onChange={(e) => setRenameVal(e.target.value)}
                        onBlur={commitRename}
                        onKeyDown={(e) => {if (e.key === "Enter") commitRename();if (e.key === "Escape") setRenameId(null);}}
                        style={{ fontSize: 14, fontWeight: 600 }} /> :


                      <div className="wl-card-title" onClick={() => !isSystem && startRename(w)} title={isSystem ? w.name : "Click to rename"} style={isSystem ? { cursor: 'default' } : {}}>
                            {w.name}
                            {isSystem && <span className="wl-system-badge">System</span>}
                          </div>
                      }
                        <div className="wl-card-meta">
                          {isSystem ?
                        w.createdWithinDays != null ?
                        `Preset: created in last ${w.createdWithinDays === 1 ? "24h" : `${w.createdWithinDays} days`}` :
                        `Preset: z≥${w.filters?.zMin ?? 0} · vol≥$${(w.filters?.volumeMin ?? 0).toLocaleString()} · Δ≥${w.filters?.probChgMin ?? 0}%` :
                        `${markets.length} ${markets.length === 1 ? "market" : "markets"} · created ${w.createdAt}`}
                        </div>
                      </div>
                      <div className="wl-card-body">
                        {isSystem ?
                      <div style={{ fontSize: 12.5, color: 'hsl(var(--muted-foreground))', padding: '8px 0', lineHeight: 1.5 }}>
                            {w.id === "all_markets" ?
                        "Shows every market in the system. Useful as a starting point before filtering." :
                        w.id === "new_contracts" ?
                        "Contracts newly listed in the last 24 hours. Catch fresh markets before they build volume." :
                        "Surfaces the highest-signal movers using z-score, volume, and probability change thresholds."}
                          </div> :
                      preview.length === 0 ?
                      <div style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))', padding: '8px 0' }}>
                            Empty list
                          </div> :

                      <ul className="wl-preview">
                            {preview.map((m) =>
                        <li key={m.id}>
                                <span className="truncate" title={m.contract}>{m.event}</span>
                                <span className="num mono tnum" style={{ flexShrink: 0, marginLeft: 8 }}>
                                  <Trend value={m.probChg} />
                                </span>
                                <button className="btn btn-ghost btn-sm btn-icon" onClick={() => removeMarket(w.id, m.id)} title="Remove">
                                  <Icon.X size={12} />
                                </button>
                              </li>
                        )}
                            {more > 0 && <li className="wl-preview-more">+ {more} more</li>}
                          </ul>
                      }
                      </div>
                      <div className="wl-card-footer">
                        <button className="btn btn-sm" onClick={() => onOpenInBrowse(w.id)}>
                          <Icon.LayoutGrid size={12} /> Open in browse
                        </button>
                        <div style={{ flex: 1 }} />
                        {!isSystem &&
                      <>
                            <button className="btn btn-ghost btn-sm btn-icon" onClick={() => startRename(w)} title="Rename">
                              <Icon.Edit size={13} />
                            </button>
                            <button className="btn btn-ghost btn-sm btn-icon" onClick={() => del(w.id)} title="Delete" style={{ color: 'hsl(var(--destructive))' }}>
                              <Icon.Trash size={13} />
                            </button>
                          </>
                      }
                      </div>
                    </div>);

              })}
              </div>
            }
          </div>
        </div>
      </div>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <div className="dialog-header">
          <div className="dialog-title">New watchlist</div>
          <div className="dialog-sub">Create an empty list and add markets later from the Browse page.</div>
        </div>
        <div className="dialog-body">
          <div>
            <div className="filter-label">List name</div>
            <input
              className="input"
              autoFocus
              placeholder="e.g. Tariff Tracker"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newName.trim()) {
                  setWatchlists((prev) => [{
                    id: "wl" + Math.random().toString(36).slice(2, 8),
                    name: newName.trim(),
                    marketIds: [],
                    createdAt: new Date().toLocaleDateString("en-US")
                  }, ...prev]);
                  setCreateOpen(false);
                }
              }} />
            
          </div>
        </div>
        <div className="dialog-footer">
          <button className="btn" onClick={() => setCreateOpen(false)}>Cancel</button>
          <button
            className="btn btn-primary"
            disabled={!newName.trim()}
            onClick={() => {
              setWatchlists((prev) => [{
                id: "wl" + Math.random().toString(36).slice(2, 8),
                name: newName.trim(),
                marketIds: [],
                createdAt: new Date().toLocaleDateString("en-US")
              }, ...prev]);
              setCreateOpen(false);
            }}>
            Create list</button>
        </div>
      </Dialog>
    </div>);

}

Object.assign(window, { SaveToListDialog, WatchlistsPage });