// Subscribe dialog + filters sidebar + top chips

function SubscribeDialog({ open, onClose, market, tagCtx, onSave }) {
  const isTagMode = !market;
  const [tag, setTag] = React.useState(tagCtx?.tag || market?.tag || "Politics");
  const [attrs, setAttrs] = React.useState(tagCtx?.attrs ? [...tagCtx.attrs] : (market ? [market.attr] : []));
  const [probChg, setProbChg] = React.useState(10);
  const [zThresh, setZThresh] = React.useState(3.0);
  const [priceCross, setPriceCross] = React.useState("");
  const [frequency, setFrequency] = React.useState("daily");
  const [delivery, setDelivery] = React.useState(["email"]);
  const [slackUrl, setSlackUrl] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    setTag(tagCtx?.tag || market?.tag || "Politics");
    setAttrs(tagCtx?.attrs ? [...tagCtx.attrs] : (market ? [market.attr] : []));
  }, [open, market, tagCtx]);

  const toggleAttr = (a) => setAttrs(prev => prev.includes(a) ? prev.filter(x=>x!==a) : [...prev, a]);
  const toggleDelivery = (d) => setDelivery(prev => prev.includes(d) ? prev.filter(x=>x!==d) : [...prev, d]);

  const attrOptions = window.MARKETS_DATA.CONDITIONAL_ATTRS[tag] || [];

  function handleSave() {
    onSave({
      marketId: market?.id || null,
      event: market ? market.event : `Tag: ${tag}${attrs.length ? " / " + attrs.join(", ") : ""}`,
      contract: market ? market.contract : `All markets matching tag "${tag}"${attrs.length ? ` · attrs: ${attrs.join(", ")}` : ""}`,
      tag, attrs,
      probChgThreshold: Number(probChg) || 0,
      zThreshold: Number(zThresh) || 0,
      priceCrosses: priceCross === "" ? null : Number(priceCross),
      frequency,
      delivery,
      slackWebhook: slackUrl,
      active: true,
    });
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="dialog-header">
        <div className="dialog-title">
          {isTagMode ? "Subscribe to tag" : "Subscribe to contract"}
        </div>
        <div className="dialog-sub">
          {isTagMode
            ? "Receive alerts for all contracts matching this tag and attributes."
            : market?.contract}
        </div>
      </div>
      <div className="dialog-body">
        {isTagMode && (
          <div>
            <div className="filter-label">Tag</div>
            <select className="select" value={tag} onChange={e => { setTag(e.target.value); setAttrs([]); }}>
              {window.MARKETS_DATA.TAGS.filter(t => t !== "All").map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        )}
        {isTagMode && attrOptions.length > 0 && (
          <div>
            <div className="filter-label">Conditional attributes</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px 12px'}}>
              {attrOptions.map(a => (
                <label key={a} className="checkbox-row">
                  <input type="checkbox" checked={attrs.includes(a)} onChange={() => toggleAttr(a)}/>
                  {a}
                </label>
              ))}
            </div>
          </div>
        )}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div>
            <div className="filter-label">Prob change threshold <span className="filter-hint">%</span></div>
            <input className="input mono" type="number" value={probChg} onChange={e => setProbChg(e.target.value)}/>
          </div>
          <div>
            <div className="filter-label">Z-score threshold <span className="filter-hint">abs</span></div>
            <input className="input mono" type="number" step="0.1" value={zThresh} onChange={e => setZThresh(e.target.value)}/>
          </div>
        </div>
        <div>
          <div className="filter-label">Price crosses <span className="filter-hint">optional · probability %</span></div>
          <input className="input mono" type="number" placeholder="e.g. 50" value={priceCross} onChange={e => setPriceCross(e.target.value)}/>
        </div>
        <div>
          <div className="filter-label">Alert frequency</div>
          <div className="seg" role="tablist">
            {["instant","daily","weekly"].map(f => {
              const disabled = f === "instant";
              return (
                <button
                  key={f}
                  className={frequency===f?"on":""}
                  onClick={() => !disabled && setFrequency(f)}
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
        <div>
          <div className="filter-label">Delivery</div>
          <div style={{display:'flex', gap:14}}>
            <label className="checkbox-row"><input type="checkbox" checked={delivery.includes("email")} onChange={() => toggleDelivery("email")}/><Icon.Mail size={14}/> Email</label>
            <label className="checkbox-row"><input type="checkbox" checked={delivery.includes("slack")} onChange={() => toggleDelivery("slack")}/><Icon.Slack size={14}/> Slack</label>
          </div>
          {delivery.includes("slack") && (
            <input className="input" style={{marginTop:8}} placeholder="https://hooks.slack.com/services/..." value={slackUrl} onChange={e => setSlackUrl(e.target.value)}/>
          )}
        </div>
      </div>
      <div className="dialog-footer">
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Create subscription</button>
      </div>
    </Dialog>
  );
}

function FilterSidebar({ tag, setTag, attrs, setAttrs, volumeMin, setVolumeMin, probChgMin, setProbChgMin, zMin, setZMin, onSubscribeTag }) {
  const attrOptions = window.MARKETS_DATA.CONDITIONAL_ATTRS[tag] || window.MARKETS_DATA.CONDITIONAL_ATTRS.All;
  const toggle = (a) => setAttrs(prev => prev.includes(a) ? prev.filter(x=>x!==a) : [...prev, a]);
  return (
    <div className="card">
      <div className="card-body">
        <div className="filter-group">
          <div className="filter-label">
            <span>Selected Tag</span>
          </div>
          <select className="select" value={tag} onChange={e => { setTag(e.target.value); setAttrs([]); }}>
            {window.MARKETS_DATA.TAGS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <div className="filter-label">Conditional Attribute</div>
          <div style={{display:'flex', flexDirection:'column', gap:2}}>
            {attrOptions.map(a => (
              <label key={a} className="checkbox-row">
                <input type="checkbox" checked={attrs.includes(a)} onChange={() => toggle(a)}/>
                {a}
              </label>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <div className="filter-label">Volume Threshold</div>
          <input className="input mono" type="number" value={volumeMin} onChange={e => setVolumeMin(e.target.value)}/>
        </div>
        <div className="filter-group">
          <div className="filter-label">Prob Change Threshold</div>
          <input className="input mono" type="number" value={probChgMin} onChange={e => setProbChgMin(e.target.value)}/>
        </div>
        <div className="filter-group" style={{marginBottom:0}}>
          <div className="filter-label">Z Threshold</div>
          <input className="input mono" type="number" value={zMin} onChange={e => setZMin(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}

function TagChips({ tag, setTag, attrs, setAttrs }) {
  const tags = window.MARKETS_DATA.TAGS;
  const attrOptions = window.MARKETS_DATA.CONDITIONAL_ATTRS[tag] || [];
  const toggle = (a) => setAttrs(prev => prev.includes(a) ? prev.filter(x=>x!==a) : [...prev, a]);
  return (
    <div className="chips">
      {tags.map(t => (
        <button key={t} className={`chip ${tag===t?"active":""}`} onClick={() => { setTag(t); setAttrs([]); }}>{t}</button>
      ))}
      {attrOptions.length > 0 && <span style={{width:1, height:20, background:'hsl(var(--border))', margin:'0 4px'}}/>}
      {attrOptions.map(a => (
        <button key={a} className={`chip ${attrs.includes(a)?"active":""}`} onClick={() => toggle(a)}>
          {attrs.includes(a) && <Icon.X size={10}/>}
          {a}
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { SubscribeDialog, FilterSidebar, TagChips });
