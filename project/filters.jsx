// Subscribe dialog + filters sidebar + top chips

function SubscribeDialog({ open, onClose, market, tagCtx, onSave }) {
  const isTagMode = !market;
  const initTags = () => {
    if (tagCtx?.tags && tagCtx.tags.length) return [...tagCtx.tags];
    if (tagCtx?.tag && tagCtx.tag !== "All") return [tagCtx.tag];
    if (market?.tag) return [market.tag];
    return ["Politics"];
  };
  const [tags, setTags] = React.useState(initTags);
  const [attrs, setAttrs] = React.useState(tagCtx?.attrs ? [...tagCtx.attrs] : market ? [market.attr] : []);
  const [probChg, setProbChg] = React.useState(10);
  const [zThresh, setZThresh] = React.useState(3.0);
  const [priceCross, setPriceCross] = React.useState("");
  const [frequency, setFrequency] = React.useState("daily");
  const [delivery, setDelivery] = React.useState(["email"]);
  const [slackUrl, setSlackUrl] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    setTags(initTags());
    setAttrs(tagCtx?.attrs ? [...tagCtx.attrs] : market ? [market.attr] : []);
  }, [open, market, tagCtx]);

  const toggleTag = (t) => setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const toggleAttr = (a) => setAttrs((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  const toggleDelivery = (d) => setDelivery((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  const attrOptions = Array.from(new Set(tags.flatMap((t) => window.MARKETS_DATA.CONDITIONAL_ATTRS[t] || [])));

  function handleSave() {
    const tagLabel = tags.length === 1 ? tags[0] : tags.length > 1 ? `${tags.length} tags` : "All";
    const tagDisplay = tags.join(", ") || "All";
    onSave({
      marketId: market?.id || null,
      event: market ? market.event : `Tag: ${tagLabel}${attrs.length ? " / " + attrs.join(", ") : ""}`,
      contract: market ? market.contract : `All markets matching tags "${tagDisplay}"${attrs.length ? ` · attrs: ${attrs.join(", ")}` : ""}`,
      tag: tags[0] || "All", tags, attrs,
      probChgThreshold: Number(probChg) || 0,
      zThreshold: Number(zThresh) || 0,
      priceCrosses: priceCross === "" ? null : Number(priceCross),
      frequency,
      delivery,
      slackWebhook: slackUrl,
      active: true
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
          {isTagMode ?
          "Receive alerts for all contracts matching this tag and attributes." :
          market?.contract}
        </div>
      </div>
      <div className="dialog-body">
        {isTagMode &&
        <div>
            <div className="filter-label">Tags <span className="filter-hint">select one or more</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxHeight: 180, overflowY: 'auto', border: '1px solid hsl(var(--border))', borderRadius: 6, padding: '2px 4px', background: 'hsl(var(--background))', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
              {window.MARKETS_DATA.TAGS.filter((t) => t !== "All").map((t) =>
            <label key={t} className="checkbox-row" style={{ padding: 0, fontSize: 12 }}>
                  <input type="checkbox" checked={tags.includes(t)} onChange={() => toggleTag(t)} />
                  {t}
                </label>
            )}
            </div>
          </div>
        }
        {isTagMode && attrOptions.length > 0 &&
        <div>
            <div className="filter-label">Subcategory Tag</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxHeight: 180, overflowY: 'auto', border: '1px solid hsl(var(--border))', borderRadius: 6, padding: '2px 4px', background: 'hsl(var(--background))', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
              {attrOptions.map((a) =>
            <label key={a} className="checkbox-row" style={{ padding: 0, fontSize: 12 }}>
                  <input type="checkbox" checked={attrs.includes(a)} onChange={() => toggleAttr(a)} />
                  {a}
                </label>
            )}
            </div>
          </div>
        }
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div className="filter-label">Prob change threshold <span className="filter-hint">%</span></div>
            <input className="input" type="number" value={probChg} onChange={(e) => setProbChg(e.target.value)} />
          </div>
          <div>
            <div className="filter-label">Z-score threshold <span className="filter-hint">abs</span></div>
            <input className="input" type="number" step="0.1" value={zThresh} onChange={(e) => setZThresh(e.target.value)} />
          </div>
        </div>
        <div>
          <div className="filter-label">Price crosses <span className="filter-hint">optional · probability %</span></div>
          <input className="input" type="number" placeholder="e.g. 50" value={priceCross} onChange={(e) => setPriceCross(e.target.value)} />
        </div>
        <div>
          <div className="filter-label">Alert frequency</div>
          <div className="seg" role="tablist">
            {["instant", "daily"].map((f) => {
              const disabled = f === "instant";
              return (
                <button
                  key={f}
                  className={frequency === f ? "on" : ""}
                  onClick={() => !disabled && setFrequency(f)}
                  disabled={disabled}
                  title={disabled ? "Real-time alerts coming soon" : undefined}
                  style={disabled ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}>
                  
                  {f}{disabled && " (soon)"}
                </button>);

            })}
          </div>
        </div>
        <div>
          <div className="filter-label">Delivery</div>
          <div style={{ display: 'flex', gap: 14 }}>
            <label className="checkbox-row"><input type="checkbox" checked={delivery.includes("email")} onChange={() => toggleDelivery("email")} /><Icon.Mail size={14} /> Email</label>
            <label className="checkbox-row"><input type="checkbox" checked={delivery.includes("slack")} onChange={() => toggleDelivery("slack")} /><Icon.Slack size={14} /> Slack</label>
          </div>
          {delivery.includes("slack") &&
          <input className="input" style={{ marginTop: 8 }} placeholder="https://hooks.slack.com/services/..." value={slackUrl} onChange={(e) => setSlackUrl(e.target.value)} />
          }
        </div>
      </div>
      <div className="dialog-footer">
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Create subscription</button>
      </div>
    </Dialog>);

}

function FilterSidebar({ tags, setTags, attrs, setAttrs, volumeMin, setVolumeMin, probChgMin, setProbChgMin, zMin, setZMin, daysChange, onSubscribeTag }) {
  const d = daysChange || 1;
  const allTags = window.MARKETS_DATA.TAGS.filter((t) => t !== "All").slice().sort((a, b) => a.localeCompare(b));
  const attrOptions = Array.from(new Set(tags.flatMap((t) => window.MARKETS_DATA.CONDITIONAL_ATTRS[t] || [])));
  const toggle = (a) => setAttrs((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  const toggleTag = (t) => setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  return (
    <div className="card">
      <div className="card-body">
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 14, marginLeft: -16, marginRight: -16, marginTop: -14, background: '#000', color: '#fff', margin: "-14px -16px 5px", padding: "3px 16px" }}>Filter Contracts by Attribute</div>
        <div className="filter-group" style={{ height: "344.5px" }}>
          <div className="filter-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span>Category Tags</span>
            <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('pm:subscribe-tag'))} style={{ whiteSpace: 'nowrap', fontSize: "10px", padding: '2px 6px', height: 'auto', minHeight: 0, gap: 3, lineHeight: 1.2 }}>
              <Icon.Plus size={10} /> Subscribe to a Tag
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxHeight: 300, overflowY: 'auto', border: '1px solid hsl(var(--border))', borderRadius: 6, padding: '2px 4px', background: 'hsl(var(--background))', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', height: "300px" }}>
            {allTags.map((t) =>
            <label key={t} className="checkbox-row" style={{ padding: 0, fontSize: 12 }}>
                <input type="checkbox" checked={tags.includes(t)} onChange={() => toggleTag(t)} />
                {t}
              </label>
            )}
          </div>
          {tags.length === 0 && <div style={{ fontSize: 11, color: 'hsl(var(--muted-foreground))', marginTop: 4 }}>None selected — showing all tags</div>}
        </div>
        {tags.length > 0 && attrOptions.length > 0 &&
        <div className="filter-group">
          <div className="filter-label">Subcategory Tag</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxHeight: 180, overflowY: 'auto', border: '1px solid hsl(var(--border))', borderRadius: 6, padding: '2px 4px', background: 'hsl(var(--background))', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
            {attrOptions.map((a) =>
            <label key={a} className="checkbox-row" style={{ padding: 0, fontSize: 12 }}>
                <input type="checkbox" checked={attrs.includes(a)} onChange={() => toggle(a)} />
                {a}
              </label>
            )}
          </div>
        </div>
        }
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em', paddingBottom: 12, marginBottom: 14, marginTop: 4, borderBottom: '1px solid hsl(var(--border))' }}>Filter Contracts by Market Activity</div>
        <div className="filter-group">
          <div className="filter-label">Minimum $ Contract Volume</div>
          <input
            className="input"
            type="text"
            inputMode="numeric"
            value={volumeMin === "" || volumeMin == null ? "" : Number(String(volumeMin).replace(/,/g, "")).toLocaleString("en-US")}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "").replace(/[^0-9.-]/g, "");
              setVolumeMin(raw);
            }} />
        </div>
        <div className="filter-group">
          <div className="filter-label">Minimum {d}d Change in Contract Probability</div>
          <input className="input" type="number" value={probChgMin} onChange={(e) => setProbChgMin(e.target.value)} />
        </div>
        <div className="filter-group" style={{ marginBottom: 0 }}>
          <div className="filter-label">Minimum Z Score of {d}d Probability Change</div>
          <input className="input" type="number" value={zMin} onChange={(e) => setZMin(e.target.value)} />
        </div>
      </div>
    </div>);

}

function TagChips({ tag, setTag, attrs, setAttrs }) {
  const tags = window.MARKETS_DATA.TAGS;
  const attrOptions = window.MARKETS_DATA.CONDITIONAL_ATTRS[tag] || [];
  const toggle = (a) => setAttrs((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  return (
    <div className="chips">
      {tags.map((t) =>
      <button key={t} className={`chip ${tag === t ? "active" : ""}`} onClick={() => {setTag(t);setAttrs([]);}}>{t}</button>
      )}
      {attrOptions.length > 0 && <span style={{ width: 1, height: 20, background: 'hsl(var(--border))', margin: '0 4px' }} />}
      {attrOptions.map((a) =>
      <button key={a} className={`chip ${attrs.includes(a) ? "active" : ""}`} onClick={() => toggle(a)}>
          {attrs.includes(a) && <Icon.X size={10} />}
          {a}
        </button>
      )}
    </div>);

}

Object.assign(window, { SubscribeDialog, FilterSidebar, TagChips });