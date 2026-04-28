// Subscription Management page

function SubscriptionsPage({ subscriptions, setSubscriptions, addSubscription }) {
  const [selectedId, setSelectedId] = React.useState(subscriptions[0]?.id);
  const [editBuffer, setEditBuffer] = React.useState(null);
  const [newSubOpen, setNewSubOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("all"); // all | market | tag

  React.useEffect(() => {
    if (!subscriptions.find(s => s.id === selectedId)) {
      setSelectedId(subscriptions[0]?.id);
    }
  }, [subscriptions, selectedId]);

  const current = subscriptions.find(s => s.id === selectedId);

  React.useEffect(() => {
    if (current) setEditBuffer({ ...current, attrs: [...current.attrs], delivery: [...current.delivery] });
  }, [current?.id]);

  const dirty = current && editBuffer && JSON.stringify(current) !== JSON.stringify(editBuffer);

  const save = () => {
    setSubscriptions(prev => prev.map(s => s.id === editBuffer.id ? editBuffer : s));
  };
  const del = (id) => {
    if (!confirm("Delete this subscription?")) return;
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  };
  const toggleActive = (id) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? {...s, active: !s.active} : s));
  };

  const filtered = subscriptions.filter(s => {
    if (filter === "market") return !!s.marketId;
    if (filter === "tag") return !s.marketId;
    return true;
  });

  return (
    <div className="content" style={{gridTemplateColumns: "380px 1fr"}}>
      <div className="content-main" style={{overflow:'hidden'}}>
        <div className="card" style={{height:'100%', display:'flex', flexDirection:'column'}}>
          <div className="card-header row-between">
            <div>
              <div className="card-title">Subscriptions</div>
              <div className="card-sub">{subscriptions.length} total · {subscriptions.filter(s=>s.active).length} active</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setNewSubOpen(true)} style={{whiteSpace:'nowrap'}}>
              <Icon.Plus size={12}/> New subscription
            </button>
          </div>
          <div style={{padding:'8px 16px', borderBottom:'1px solid hsl(var(--border))', display:'flex', gap:6}}>
            <div className="seg">
              <button className={filter==="all"?"on":""} onClick={() => setFilter("all")}>All</button>
              <button className={filter==="market"?"on":""} onClick={() => setFilter("market")}>Contracts</button>
              <button className={filter==="tag"?"on":""} onClick={() => setFilter("tag")}>Tags</button>
            </div>
          </div>
          <div style={{overflowY:'auto', flex:1}}>
            {filtered.map(s => (
              <div
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                style={{
                  padding:'12px 16px',
                  borderBottom:'1px solid hsl(var(--border))',
                  cursor:'pointer',
                  background: selectedId===s.id ? 'hsl(221 83% 97%)' : 'transparent',
                  borderLeft: selectedId===s.id ? '2px solid hsl(var(--primary))' : '2px solid transparent',
                }}
              >
                <div className="row-between" style={{gap:8, marginBottom:4}}>
                  <div style={{fontWeight:600, fontSize:13, flex:1, minWidth:0, display:'flex', alignItems:'center', gap:6}}>
                    {!s.marketId && <Icon.LayoutGrid size={12}/>}
                    {s.marketId && <Icon.Activity size={12}/>}
                    <span className="truncate" title={s.event}>{s.event}</span>
                  </div>
                  {s.active
                    ? <Badge variant="green">active</Badge>
                    : <Badge variant="gray">paused</Badge>}
                </div>
                <div className="truncate" style={{fontSize:12, color:'hsl(var(--muted-foreground))', marginBottom:6}} title={s.contract}>
                  {s.contract}
                </div>
                <div className="row" style={{gap:4, flexWrap:'wrap'}}>
                  <Badge variant={s.marketId ? "gray" : "blue"}>{s.marketId ? "Contract" : "Tag"}</Badge>
                  <Badge variant="blue">{s.tag}</Badge>
                  {s.attrs.map(a => <Badge key={a}>{a}</Badge>)}
                  <Badge variant="amber">{s.frequency}</Badge>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="empty">
                {subscriptions.length === 0
                  ? "No subscriptions yet. Create one below, or subscribe from the Browse page."
                  : `No ${filter === "market" ? "contract" : "tag"} subscriptions.`}
                <div style={{marginTop:12}}>
                  <button className="btn btn-primary btn-sm" onClick={() => setNewSubOpen(true)}>
                    <Icon.Plus size={12}/> New subscription
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="content-side" style={{overflow:'auto'}}>
        {current && editBuffer ? (
          <div className="card">
            <div className="card-header row-between">
              <div>
                <div className="card-title">Edit subscription</div>
                <div className="card-sub">Created {current.createdAt} · Last alert {current.lastAlert}</div>
              </div>
              <div className="row">
                <button className="btn btn-sm" onClick={() => toggleActive(current.id)}>
                  {current.active ? "Pause" : "Activate"}
                </button>
                <button className="btn btn-sm btn-destructive" onClick={() => del(current.id)}>
                  <Icon.Trash size={12}/> Delete
                </button>
              </div>
            </div>
            <div className="card-body stack">
              <div>
                <div className="filter-label">Event</div>
                <div style={{fontSize:13, fontWeight:500}}>{editBuffer.event}</div>
                <div style={{fontSize:12, color:'hsl(var(--muted-foreground))', marginTop:2}}>{editBuffer.contract}</div>
              </div>
              <hr className="sep"/>
              {editBuffer.marketId ? (
                <div>
                  <div className="filter-label">Alert frequency</div>
                  <div className="seg">
                    {["instant","daily"].map(f => {
                      const disabled = f === "instant";
                      return (
                        <button
                          key={f}
                          className={editBuffer.frequency===f?"on":""}
                          onClick={() => !disabled && setEditBuffer({...editBuffer, frequency:f})}
                          disabled={disabled}
                          title={disabled ? "Real-time alerts coming soon" : undefined}
                          style={disabled ? {opacity:0.45, cursor:'not-allowed'} : undefined}
                        >
                          {f}{disabled && " (soon)"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                    <div>
                      <div className="filter-label">Tag</div>
                      <select className="select" value={editBuffer.tag} onChange={e => setEditBuffer({...editBuffer, tag: e.target.value, attrs: []})}>
                        {window.MARKETS_DATA.TAGS.filter(t => t!=="All").map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <div className="filter-label">Alert frequency</div>
                      <div className="seg">
                        {["instant","daily"].map(f => {
                          const disabled = f === "instant";
                          return (
                            <button
                              key={f}
                              className={editBuffer.frequency===f?"on":""}
                              onClick={() => !disabled && setEditBuffer({...editBuffer, frequency:f})}
                              disabled={disabled}
                              title={disabled ? "Real-time alerts coming soon" : undefined}
                              style={disabled ? {opacity:0.45, cursor:'not-allowed'} : undefined}
                            >
                              {f}{disabled && " (soon)"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="filter-label">Conditional attributes</div>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px 12px'}}>
                      {(window.MARKETS_DATA.CONDITIONAL_ATTRS[editBuffer.tag]||[]).map(a => (
                        <label key={a} className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={editBuffer.attrs.includes(a)}
                            onChange={() => setEditBuffer({...editBuffer, attrs: editBuffer.attrs.includes(a) ? editBuffer.attrs.filter(x=>x!==a) : [...editBuffer.attrs, a]})}
                          />
                          {a}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <hr className="sep"/>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
                <div>
                  <div className="filter-label">Prob Chg %</div>
                  <input className="input mono" type="number" value={editBuffer.probChgThreshold} onChange={e => setEditBuffer({...editBuffer, probChgThreshold: Number(e.target.value)})}/>
                </div>
                <div>
                  <div className="filter-label">Z-score</div>
                  <input className="input mono" type="number" step="0.1" value={editBuffer.zThreshold} onChange={e => setEditBuffer({...editBuffer, zThreshold: Number(e.target.value)})}/>
                </div>
                <div>
                  <div className="filter-label">Price crosses</div>
                  <input className="input mono" type="number" placeholder="—" value={editBuffer.priceCrosses ?? ""} onChange={e => setEditBuffer({...editBuffer, priceCrosses: e.target.value === "" ? null : Number(e.target.value)})}/>
                </div>
              </div>
              <hr className="sep"/>
              <div>
                <div className="filter-label">Delivery</div>
                <div style={{display:'flex', gap:14}}>
                  <label className="checkbox-row">
                    <input type="checkbox" checked={editBuffer.delivery.includes("email")} onChange={() => setEditBuffer({...editBuffer, delivery: editBuffer.delivery.includes("email") ? editBuffer.delivery.filter(x=>x!=="email") : [...editBuffer.delivery, "email"]})}/>
                    <Icon.Mail size={14}/> Email
                  </label>
                  <label className="checkbox-row">
                    <input type="checkbox" checked={editBuffer.delivery.includes("slack")} onChange={() => setEditBuffer({...editBuffer, delivery: editBuffer.delivery.includes("slack") ? editBuffer.delivery.filter(x=>x!=="slack") : [...editBuffer.delivery, "slack"]})}/>
                    <Icon.Slack size={14}/> Slack
                  </label>
                </div>
                {editBuffer.delivery.includes("slack") && (
                  <input className="input" style={{marginTop:8}} placeholder="https://hooks.slack.com/services/..." value={editBuffer.slackWebhook} onChange={e => setEditBuffer({...editBuffer, slackWebhook: e.target.value})}/>
                )}
              </div>
            </div>
            <div className="dialog-footer" style={{borderTop:'1px solid hsl(var(--border))'}}>
              <button className="btn" disabled={!dirty} onClick={() => setEditBuffer({ ...current, attrs:[...current.attrs], delivery:[...current.delivery] })}>Reset</button>
              <button className="btn btn-primary" disabled={!dirty} onClick={save}>Save changes</button>
            </div>
          </div>
        ) : (
          <div className="card"><div className="empty">Select a subscription to edit.</div></div>
        )}
      </div>

      <SubscribeDialog
        open={newSubOpen}
        tagCtx={{ tag: "Politics", attrs: [] }}
        onClose={() => setNewSubOpen(false)}
        onSave={(s) => {
          if (addSubscription) addSubscription(s);
          else setSubscriptions(prev => [{
            ...s,
            id: "s" + Math.random().toString(36).slice(2,8),
            createdAt: new Date().toLocaleDateString("en-US"),
            lastAlert: "—",
          }, ...prev]);
        }}
      />
    </div>
  );
}

Object.assign(window, { SubscriptionsPage });
