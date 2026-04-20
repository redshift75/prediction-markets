// Subscription Management page

function SubscriptionsPage({ subscriptions, setSubscriptions }) {
  const [selectedId, setSelectedId] = React.useState(subscriptions[0]?.id);
  const [editBuffer, setEditBuffer] = React.useState(null);

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

  return (
    <div className="content" style={{gridTemplateColumns: "380px 1fr"}}>
      <div className="content-main" style={{overflow:'hidden'}}>
        <div className="card" style={{height:'100%', display:'flex', flexDirection:'column'}}>
          <div className="card-header row-between">
            <div>
              <div className="card-title">Subscriptions</div>
              <div className="card-sub">{subscriptions.length} total · {subscriptions.filter(s=>s.active).length} active</div>
            </div>
          </div>
          <div style={{overflowY:'auto', flex:1}}>
            {subscriptions.map(s => (
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
                  <div style={{fontWeight:600, fontSize:13, flex:1, minWidth:0}}>
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
                  <Badge variant="blue">{s.tag}</Badge>
                  {s.attrs.map(a => <Badge key={a}>{a}</Badge>)}
                  <Badge variant="amber">{s.frequency}</Badge>
                </div>
              </div>
            ))}
            {subscriptions.length === 0 && <div className="empty">No subscriptions yet. Subscribe to a market from the Browse page.</div>}
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
                    {["instant","daily","weekly"].map(f => (
                      <button key={f} className={editBuffer.frequency===f?"on":""} onClick={() => setEditBuffer({...editBuffer, frequency:f})}>{f}</button>
                    ))}
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
                    <Icon.Slack size={14}/> Slack / Discord
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
    </div>
  );
}

Object.assign(window, { SubscriptionsPage });
