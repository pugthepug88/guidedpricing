import React from "react";

const INK = "#0a0a14";
const MUTED = "#5a6478";
const LINE = "#e3e6f3";
const SUBTLE = "#f4f5fb";
const BLUE = "#2563ff";

const cardShell: React.CSSProperties = {
  background: "white",
  borderRadius: 20,
  border: `1px solid ${LINE}`,
  boxShadow: "0 20px 40px -18px rgba(10,10,20,0.25), 0 4px 10px -4px rgba(10,10,20,0.08)",
  padding: 20,
  fontSize: 13,
  color: INK,
  width: 380,
};

const header = (title: string, badge?: string, badgeColor?: string): React.ReactNode => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.4, textTransform: "uppercase", color: MUTED }}>{title}</div>
    {badge ? (
      <div style={{
        fontSize: 10, fontWeight: 700, color: "white", background: badgeColor ?? BLUE,
        padding: "3px 8px", borderRadius: 999, letterSpacing: 0.3,
      }}>{badge}</div>
    ) : null}
  </div>
);

/* ----- Conversations ----- */
const Conversations: React.FC = () => {
  const rows = [
    { c: "#25D366", label: "W", name: "Sarah M.", msg: "Hey! Are you open Sunday?", chan: "WhatsApp", unread: true },
    { c: "#E1306C", label: "IG", name: "@marco_fit", msg: "Can I book the 6pm slot?", chan: "Instagram", unread: true },
    { c: "#0080FF", label: "S", name: "+61 4xx xxx", msg: "Confirming for tomorrow", chan: "SMS", unread: false },
    { c: "#EA4335", label: "@", name: "amy@work.com", msg: "New enquiry — corporate", chan: "Email", unread: false },
  ];
  return (
    <div style={cardShell}>
      {header("Conversations", "4 new", "#22c55e")}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8, background: r.c,
              color: "white", fontSize: 12, fontWeight: 800,
              display: "grid", placeItems: "center", flexShrink: 0,
            }}>{r.label}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{r.name}</div>
                <div style={{ fontSize: 10, color: MUTED }}>{r.chan}</div>
              </div>
              <div style={{ fontSize: 11, color: MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.msg}</div>
            </div>
            {r.unread ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: BLUE }} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ----- Reviews ----- */
const Reviews: React.FC = () => (
  <div style={cardShell}>
    {header("New Review", "Google", "#4285F4")}
    <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
      {[0,1,2,3,4].map((i) => (
        <div key={i} style={{ color: "#f59e0b", fontSize: 22, lineHeight: 1 }}>★</div>
      ))}
    </div>
    <div style={{ fontSize: 13, color: INK, lineHeight: 1.45, marginBottom: 12 }}>
      "Absolute game changer. Booked in under a minute, staff replied instantly. Coming back."
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
        color: "white", display: "grid", placeItems: "center",
        fontWeight: 800, fontSize: 13,
      }}>J</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700 }}>Jenna Cole</div>
        <div style={{ fontSize: 10, color: MUTED }}>2 minutes ago</div>
      </div>
    </div>
  </div>
);

/* ----- Bookings ----- */
const Bookings: React.FC = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const booked = [1, 3, 5];
  return (
    <div style={cardShell}>
      {header("Bookings", "This week")}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 14 }}>
        {days.map((d, i) => (
          <div key={i} style={{
            padding: "8px 0", borderRadius: 8,
            background: booked.includes(i) ? BLUE : SUBTLE,
            color: booked.includes(i) ? "white" : MUTED,
            textAlign: "center", fontSize: 10, fontWeight: 700,
          }}>
            <div>{d}</div>
            <div style={{ fontSize: 13, marginTop: 2 }}>{10 + i}</div>
          </div>
        ))}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: 10, background: SUBTLE, borderRadius: 10,
      }}>
        <div style={{ width: 4, height: 32, borderRadius: 2, background: BLUE }} />
        <div>
          <div style={{ fontSize: 10, color: MUTED, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase" }}>Next up</div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Tue 2:30pm, Consult</div>
        </div>
      </div>
    </div>
  );
};

/* ----- Invoicing ----- */
const Invoicing: React.FC = () => {
  const rows = [
    { n: "#2041", client: "Northside Co.", amt: "$1,240", paid: true },
    { n: "#2042", client: "Marlow & Sons", amt: "$860",   paid: true },
    { n: "#2043", client: "Kite Studio",   amt: "$2,300", paid: false },
  ];
  const bars = [40, 60, 55, 80, 72, 90, 68];
  return (
    <div style={cardShell}>
      {header("Invoicing", "$4,400 paid", "#22c55e")}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
            <div style={{ color: MUTED, width: 44, fontWeight: 700 }}>{r.n}</div>
            <div style={{ flex: 1, fontWeight: 600 }}>{r.client}</div>
            <div style={{ fontWeight: 700, marginRight: 10 }}>{r.amt}</div>
            <div style={{
              fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999,
              background: r.paid ? "#dcfce7" : "#fef3c7",
              color: r.paid ? "#166534" : "#92400e",
            }}>{r.paid ? "Paid" : "Due"}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 44 }}>
        {bars.map((b, i) => (
          <div key={i} style={{
            flex: 1, height: `${b}%`, background: `linear-gradient(180deg, ${BLUE}, #1d4ed8)`,
            borderRadius: 3, opacity: 0.85,
          }} />
        ))}
      </div>
    </div>
  );
};

/* ----- Documents & Contacts ----- */
const Documents: React.FC = () => {
  const files = [
    { name: "Proposal_v3.pdf", size: "1.2 MB", c: "#EF4444" },
    { name: "Contract.docx",   size: "84 KB",  c: "#2563EB" },
    { name: "Photos.zip",      size: "12 MB",  c: "#8B5CF6" },
  ];
  return (
    <div style={cardShell}>
      {header("Documents & Contacts")}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {files.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: SUBTLE, borderRadius: 10 }}>
            <div style={{ width: 26, height: 30, borderRadius: 4, background: f.c, color: "white", fontSize: 9, fontWeight: 800, display: "grid", placeItems: "center" }}>
              {f.name.split(".").pop()?.toUpperCase().slice(0, 3)}
            </div>
            <div style={{ flex: 1, fontSize: 12, fontWeight: 600 }}>{f.name}</div>
            <div style={{ fontSize: 10, color: MUTED }}>{f.size}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: `1px solid ${LINE}` }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #10b981, #059669)",
          display: "grid", placeItems: "center", color: "white", fontWeight: 800, fontSize: 13,
        }}>M</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Maya Ortiz</div>
          <div style={{ fontSize: 10, color: MUTED }}>+61 412 908 220</div>
        </div>
      </div>
    </div>
  );
};

/* ----- NFC Payments ----- */
const NFC: React.FC = () => (
  <div style={cardShell}>
    {header("NFC Payment", "Tap to pay", "#0F766E")}
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 18,
      padding: "14px 0 10px", position: "relative",
    }}>
      {/* Card */}
      <div style={{
        width: 100, height: 62, borderRadius: 10,
        background: "linear-gradient(135deg, #0f172a, #334155)",
        position: "relative", boxShadow: "0 6px 14px -6px rgba(0,0,0,0.4)",
      }}>
        <div style={{ position: "absolute", top: 10, left: 10, width: 18, height: 14, borderRadius: 3, background: "#facc15" }} />
        <div style={{ position: "absolute", bottom: 8, right: 10, color: "white", fontSize: 8, letterSpacing: 1, fontWeight: 700 }}>•••• 4821</div>
      </div>
      {/* Ripples */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[0,1,2].map((i) => (
          <div key={i} style={{
            width: 6 + i*4, height: 22 + i*6, border: `2px solid ${BLUE}`,
            borderLeft: "none", borderRadius: "0 40px 40px 0", opacity: 1 - i*0.28,
          }} />
        ))}
      </div>
      {/* Phone */}
      <div style={{
        width: 46, height: 84, borderRadius: 10,
        background: "white", border: `2px solid ${INK}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
      }}>
        <div style={{ width: 20, height: 3, borderRadius: 2, background: INK }} />
        <div style={{ fontSize: 8, fontWeight: 800, color: BLUE }}>ZAPLA</div>
      </div>
    </div>
    <div style={{
      marginTop: 6, padding: "10px 12px", background: "#dcfce7", borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#166534" }}>$240.00 received</div>
      <div style={{ fontSize: 10, color: "#166534", fontWeight: 700 }}>2s ago</div>
    </div>
  </div>
);

/* ----- Workflow Automations ----- */
const Automations: React.FC = () => {
  const nodes = [
    { label: "New enquiry", sub: "Trigger", c: "#22c55e" },
    { label: "AI reply",    sub: "Action",  c: BLUE },
    { label: "Book slot",   sub: "Action",  c: "#8b5cf6" },
  ];
  return (
    <div style={cardShell}>
      {header("Automation", "Live", "#22c55e")}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <div style={{
              flex: 1, padding: "10px 8px", borderRadius: 10,
              background: SUBTLE, textAlign: "center",
              border: `1px solid ${LINE}`,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: n.c, margin: "0 auto 6px",
              }} />
              <div style={{ fontSize: 11, fontWeight: 700 }}>{n.label}</div>
              <div style={{ fontSize: 9, color: MUTED, marginTop: 2, letterSpacing: 0.3, textTransform: "uppercase", fontWeight: 700 }}>{n.sub}</div>
            </div>
            {i < nodes.length - 1 ? (
              <div style={{ width: 16, height: 2, background: LINE, position: "relative" }}>
                <div style={{
                  position: "absolute", right: -3, top: -3,
                  width: 0, height: 0,
                  borderTop: "4px solid transparent",
                  borderBottom: "4px solid transparent",
                  borderLeft: `6px solid ${LINE}`,
                }} />
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <div style={{
        marginTop: 12, padding: "8px 10px", background: SUBTLE, borderRadius: 8,
        fontSize: 11, color: MUTED, display: "flex", justifyContent: "space-between",
      }}>
        <span>Runs today</span>
        <span style={{ color: INK, fontWeight: 700 }}>142</span>
      </div>
    </div>
  );
};

/* ---------- Registry ---------- */
export type CardDef = { key: string; render: React.FC };

export const CARD_DEFS = {
  conversations: { key: "conversations", render: Conversations },
  reviews:       { key: "reviews",       render: Reviews },
  bookings:      { key: "bookings",      render: Bookings },
  invoicing:     { key: "invoicing",     render: Invoicing },
  documents:     { key: "documents",     render: Documents },
  nfc:           { key: "nfc",           render: NFC },
  automations:   { key: "automations",   render: Automations },
} satisfies Record<string, CardDef>;

export const Cards: React.FC<{ def: CardDef }> = ({ def }) => {
  const C = def.render;
  return <C />;
};
