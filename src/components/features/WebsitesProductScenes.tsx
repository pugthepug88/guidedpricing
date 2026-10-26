import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Columns2,
  GripVertical,
  Image as ImageIcon,
  LayoutTemplate,
  Monitor,
  MousePointer2,
  Play,
  Plus,
  RotateCcw,
  Smartphone,
  SquareMousePointer,
  TextCursorInput,
  Type,
  X,
} from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

// Prepared, browser-local product scenes. No AI request, site import, analytics,
// form collection, save or publication is performed by these controls.
const PHOTO = "/concept/features/websites-garden-design-20261026.webp";
const INITIAL = {
  heading: "A garden that feels like home.",
  text: "Thoughtful gardens for everyday living. Designed around you and your space.",
  button: "Plan my garden",
};
const BLOCKS = [
  { id: "heading", label: "Heading", icon: Type },
  { id: "text", label: "Text", icon: TextCursorInput },
  { id: "image", label: "Image", icon: ImageIcon },
  { id: "button", label: "Button", icon: SquareMousePointer },
  { id: "form", label: "Form", icon: LayoutTemplate },
] as const;
type Block = (typeof BLOCKS)[number]["id"];

export function WebsiteBuilder() {
  const [content, setContent] = useState(INITIAL);
  const [selected, setSelected] = useState<Block>("heading");
  const [columns, setColumns] = useState(48);
  const [imageFirst, setImageFirst] = useState(false);
  const [form, setForm] = useState(false);
  const [phone, setPhone] = useState(false);
  const [dragging, setDragging] = useState(false);
  const row = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const addOrSelect = (block: Block) => {
    setSelected(block);
    if (block === "form") setForm(true);
  };
  const reset = () => {
    setContent(INITIAL);
    setSelected("heading");
    setColumns(48);
    setImageFirst(false);
    setForm(false);
    setPhone(false);
  };
  const resize = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = row.current?.getBoundingClientRect();
    if (!rect) return;
    setColumns(
      Math.round(Math.max(36, Math.min(64, ((event.clientX - rect.left) / rect.width) * 100))),
    );
  };
  const field =
    selected === "heading" || selected === "text" || selected === "button" ? selected : null;
  return (
    <div className="wff-builder" id="website-builder" aria-label="Interactive website builder">
      <div className="wff-builder-toolbar">
        <div className="wff-builder-name">
          <ZaplaPetal size={25} />
          <span>
            Courtyard website<small>Home page</small>
          </span>
        </div>
        <div className="wff-devices" role="group" aria-label="Page preview size">
          <button
            type="button"
            aria-label="Desktop page preview"
            aria-pressed={!phone}
            onClick={() => setPhone(false)}
          >
            <Monitor size={18} />
          </button>
          <button
            type="button"
            aria-label="Mobile page preview"
            aria-pressed={phone}
            onClick={() => setPhone(true)}
          >
            <Smartphone size={17} />
          </button>
        </div>
        <button className="wff-editor-reset" type="button" onClick={reset}>
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      </div>
      <div className="wff-builder-workspace">
        <aside className="wff-block-library" aria-label="Page elements">
          <span className="wff-tool-heading">Elements</span>
          <p>Choose an element</p>
          <div className="wff-block-options">
            {BLOCKS.map(({ id, label, icon: Icon }) => (
              <button
                type="button"
                key={id}
                aria-label={
                  id === "form" ? "Add an enquiry form" : `Edit page ${label.toLowerCase()}`
                }
                aria-pressed={selected === id}
                onPointerDown={(event) => {
                  dragged.current = false;
                  if (id !== "form" || event.pointerType === "touch") return;
                  dragOrigin.current = { x: event.clientX, y: event.clientY };
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerMove={(event) => {
                  if (id !== "form" || !dragOrigin.current) return;
                  if (
                    Math.hypot(
                      event.clientX - dragOrigin.current.x,
                      event.clientY - dragOrigin.current.y,
                    ) > 6
                  ) {
                    dragged.current = true;
                    setDragging(true);
                  }
                }}
                onPointerUp={(event) => {
                  if (id !== "form" || !dragOrigin.current) return;
                  const rect = stage.current?.getBoundingClientRect();
                  if (
                    dragged.current &&
                    rect &&
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom
                  )
                    addOrSelect("form");
                  dragOrigin.current = null;
                  setDragging(false);
                  if (event.currentTarget.hasPointerCapture(event.pointerId))
                    event.currentTarget.releasePointerCapture(event.pointerId);
                }}
                onPointerCancel={() => {
                  dragOrigin.current = null;
                  setDragging(false);
                }}
                onKeyDown={() => {
                  dragged.current = false;
                }}
                onClick={() => {
                  if (!dragged.current) addOrSelect(id);
                }}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
                {id === "form" && <GripVertical size={13} aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div className="wff-library-layout">
            <Columns2 size={17} />
            <span>Flexible columns</span>
          </div>
        </aside>
        <div
          ref={stage}
          className={
            "wff-editor-stage" +
            (phone ? " wff-editor-stage--phone" : "") +
            (dragging ? " wff-editor-stage--drop" : "")
          }
        >
          <div className="wff-editor-page">
            <div className="wff-page-nav">
              <strong>courtyard</strong>
              <span>Gardens, thoughtfully designed.</span>
            </div>
            <div
              ref={row}
              className={"wff-editable-row" + (imageFirst ? " wff-editable-row--reversed" : "")}
              style={{ "--column-width": `${columns}%` } as CSSProperties}
            >
              <span className="wff-row-label">2 columns</span>
              <div className="wff-canvas-copy">
                <span className="wff-garden-location">GARDEN DESIGN · SYDNEY</span>
                <button
                  type="button"
                  className={
                    "wff-canvas-heading" + (selected === "heading" ? " wff-element-selected" : "")
                  }
                  onClick={() => setSelected("heading")}
                  aria-label="Select page heading"
                >
                  {content.heading || INITIAL.heading}
                </button>
                <button
                  type="button"
                  className={
                    "wff-canvas-text" + (selected === "text" ? " wff-element-selected" : "")
                  }
                  onClick={() => setSelected("text")}
                  aria-label="Select page paragraph"
                >
                  {content.text || INITIAL.text}
                </button>
                <button
                  type="button"
                  className={
                    "wff-canvas-cta" + (selected === "button" ? " wff-element-selected" : "")
                  }
                  onClick={() => setSelected("button")}
                  aria-label="Select page button"
                >
                  {content.button || INITIAL.button}
                  <ArrowRight size={15} />
                </button>
              </div>
              <button
                type="button"
                className={
                  "wff-canvas-image" + (selected === "image" ? " wff-element-selected" : "")
                }
                onClick={() => setSelected("image")}
                aria-label="Select page image"
              >
                <img
                  src={PHOTO}
                  width="1536"
                  height="1024"
                  fetchPriority="high"
                  alt="A garden designer and homeowner planning a courtyard together"
                />
              </button>
              <button
                className="wff-column-handle"
                type="button"
                aria-label="Resize page columns"
                aria-describedby="wff-resize-help"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  resize(event);
                }}
                onPointerMove={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId)) resize(event);
                }}
                onPointerUp={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId))
                    event.currentTarget.releasePointerCapture(event.pointerId);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault();
                    setColumns((value) =>
                      Math.max(36, Math.min(64, value + (event.key === "ArrowRight" ? 2 : -2))),
                    );
                  }
                }}
              >
                <GripVertical size={16} aria-hidden="true" />
              </button>
            </div>
            {form ? (
              <div className="wff-canvas-form" aria-label="Enquiry form added to page">
                <div>
                  <strong>Tell us about your space.</strong>
                  <button
                    type="button"
                    aria-label="Remove enquiry form"
                    onClick={() => {
                      setForm(false);
                      setSelected("heading");
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>
                <div className="wff-canvas-form-fields">
                  <span>Your name</span>
                  <span>Email</span>
                  <span>What do you have in mind?</span>
                </div>
                <span className="wff-form-submit-text">
                  Send my enquiry <ArrowRight size={13} />
                </span>
              </div>
            ) : (
              <button
                className="wff-canvas-insert"
                type="button"
                onClick={() => addOrSelect("form")}
              >
                <Plus size={16} /> Add an enquiry form
              </button>
            )}
          </div>
        </div>
        <aside className="wff-properties" aria-label="Selected element settings">
          <span className="wff-tool-heading">
            {selected === "image"
              ? "Image & layout"
              : selected === "form"
                ? "Enquiry form"
                : "Content & layout"}
          </span>
          {field && (
            <label className="wff-property-field" htmlFor="wff-element-content">
              {field === "heading" ? "Heading" : field === "text" ? "Paragraph" : "Button text"}
              <textarea
                id="wff-element-content"
                rows={field === "button" ? 2 : 3}
                maxLength={field === "text" ? 150 : 80}
                value={content[field]}
                onChange={(event) =>
                  setContent((value) => ({ ...value, [field]: event.target.value }))
                }
              />
            </label>
          )}
          {selected === "image" && (
            <div className="wff-image-setting">
              <img src={PHOTO} alt="Selected garden photograph" width="1536" height="1024" />
              <span>Garden consultation</span>
            </div>
          )}
          {selected === "form" && (
            <div className="wff-form-setting">
              <strong>Project enquiry</strong>
              <p>Name, email and project details.</p>
              <a href="#connected-enquiry">
                See the CRM connection <ArrowDown size={13} />
              </a>
            </div>
          )}
          <label className="wff-property-field wff-column-setting" htmlFor="wff-column-ratio">
            Column width{" "}
            <output>
              {columns} / {100 - columns}
            </output>
            <input
              id="wff-column-ratio"
              type="range"
              min="36"
              max="64"
              value={columns}
              onChange={(event) => setColumns(Number(event.target.value))}
            />
          </label>
          <button
            className="wff-swap-columns"
            type="button"
            onClick={() => setImageFirst((value) => !value)}
          >
            <Columns2 size={16} /> Swap columns
          </button>
          <p id="wff-resize-help">
            Drag the divider to change the layout. Or use the width slider.
          </p>
        </aside>
      </div>
      <div className="wff-builder-status" role="status">
        {form ? "Enquiry form added to your page" : "Select an element. Make it yours."}
        <span>Visual website builder</span>
      </div>
    </div>
  );
}

export function AICreation() {
  const [mode, setMode] = useState<"create" | "clone">("create");
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    let visible = true;
    const update = () => setPaused(!visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <section className="wff-ai wff-shell wff-section" aria-labelledby="wff-ai-title">
      <div className="wff-ai-copy">
        <p className="wff-eyebrow">Zapla AI</p>
        <h2 id="wff-ai-title">
          Your idea.
          <br />A running start.
        </h2>
        <p>
          Describe the website you want and let Zapla AI build a starting point. Or bring in an
          existing page by URL, with its styles and images.
        </p>
        <p>
          Then take over in the visual editor. Refine the copy, move sections and shape the page
          around your business.
        </p>
        <p className="wff-ai-terms">AI usage is separate and confirmed with your setup.</p>
      </div>
      <div
        className="wff-ai-scene"
        ref={scene}
        style={{ "--wff-play-state": paused ? "paused" : "running" } as CSSProperties}
      >
        <div className="wff-ai-toolbar">
          <ZaplaPetal size={24} />
          <strong>Build with Zapla AI</strong>
        </div>
        <div className="wff-ai-modes" role="group" aria-label="AI website starting point">
          <button
            type="button"
            aria-pressed={mode === "create"}
            onClick={() => {
              setMode("create");
              setRun(0);
            }}
          >
            Create something new
          </button>
          <button
            type="button"
            aria-pressed={mode === "clone"}
            onClick={() => {
              setMode("clone");
              setRun(0);
            }}
          >
            Clone an existing site
          </button>
        </div>
        <div className="wff-ai-request">
          <span>
            {mode === "create" ? "Describe your page" : "Start with your existing page URL"}
          </span>
          <p>
            {mode === "create"
              ? "Build a garden design website with a warm, natural feel. Include our services and a project enquiry form."
              : "Bring across our garden design page, including its styles and images. Then we’ll edit it in Zapla."}
          </p>
          <button
            className="wff-ai-watch"
            type="button"
            onClick={() => setRun((value) => value + 1)}
          >
            <Play size={13} fill="currentColor" />
            {run ? "Watch again" : "Watch Zapla AI build"}
          </button>
        </div>
        <div
          className={"wff-ai-result" + (run ? " wff-ai-result--playing" : "")}
          key={`${mode}-${run}`}
        >
          <div className="wff-ai-result-nav">
            <strong>courtyard</strong>
            <span>Home &nbsp; Services &nbsp; Enquire</span>
          </div>
          <div className="wff-ai-result-hero">
            <span>GARDENS FOR EVERYDAY LIVING</span>
            <h3>
              A little closer
              <br />
              to nature.
            </h3>
            <span className="wff-mini-button">
              Let’s plan your garden <ArrowRight size={12} />
            </span>
          </div>
          <div className="wff-ai-result-services">
            <strong>Designed for the way you live.</strong>
            <span>Courtyard design</span>
            <span>Planting plans</span>
          </div>
          <div className="wff-ai-result-form">
            <strong>Tell us about your space.</strong>
            <span>Your name</span>
            <span>Project details</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FunnelPage({ variant }: { variant: "A" | "B" }) {
  return (
    <div className={`wff-funnel-page wff-funnel-page--${variant.toLowerCase()}`}>
      <div className="wff-funnel-page-label">
        <strong>Page {variant}</strong>
        <span>{variant === "A" ? "Lead with the space" : "Lead with the service"}</span>
      </div>
      <div className="wff-funnel-page-preview">
        <span>courtyard</span>
        <strong>
          {variant === "A" ? (
            <>
              Room to breathe.
              <br />
              Space to gather.
            </>
          ) : (
            <>
              Your courtyard.
              <br />
              Thoughtfully designed.
            </>
          )}
        </strong>
        <span className="wff-funnel-page-button">Plan my garden</span>
      </div>
    </div>
  );
}
export function FunnelBuilder() {
  return (
    <section className="wff-funnels wff-shell" aria-labelledby="wff-funnel-title">
      <header className="wff-section-heading">
        <div>
          <p className="wff-eyebrow">Funnels and A/B testing</p>
          <h2 id="wff-funnel-title">
            One offer.
            <br />
            More than one way to test it.
          </h2>
        </div>
        <p>
          Connect the pages around your offer. Add a split test to compare different versions, then
          guide visitors towards your enquiry form and next step.
        </p>
      </header>
      <div
        className="wff-funnel-board"
        aria-label="A garden design funnel with an A/B split leading to an enquiry form and thank-you page"
      >
        <div className="wff-funnel-board-heading">
          <strong>Courtyard design enquiry</strong>
          <span>Funnel builder</span>
        </div>
        <div className="wff-funnel-flow">
          <div className="wff-funnel-start">
            Visitor arrives
            <ArrowRight size={16} />
          </div>
          <div className="wff-split-node">
            <span>A/B</span>
            <strong>Split test</strong>
            <small>Two page versions</small>
          </div>
          <div className="wff-funnel-variants">
            <FunnelPage variant="A" />
            <FunnelPage variant="B" />
          </div>
          <div className="wff-funnel-destinations">
            <div className="wff-funnel-enquire">
              <span>Enquiry form</span>
              <strong>Tell us about your space.</strong>
              <div>Your name</div>
              <div>Project details</div>
            </div>
            <ArrowDown size={19} />
            <div className="wff-funnel-thanks">
              <span>Thank-you page</span>
              <strong>Let’s talk gardens.</strong>
              <p>Choose a consultation</p>
            </div>
          </div>
        </div>
      </div>
      <div className="wff-funnel-notes">
        <p>
          <strong>A website gives people room to explore.</strong> Bring your services, projects and
          contact pages together.
        </p>
        <p>
          <strong>A funnel gives an offer a clear path.</strong> Connect each page to the action you
          want someone to take.
        </p>
      </div>
    </section>
  );
}

export function SiteTracking() {
  return (
    <section className="wff-tracking wff-shell wff-section" aria-labelledby="wff-tracking-title">
      <div className="wff-tracking-copy">
        <p className="wff-eyebrow">Publish and understand</p>
        <h2 id="wff-tracking-title">
          Your domain.
          <br />
          Your page.
          <br />A clearer picture.
        </h2>
        <p>
          Save your work, check the page and publish when you’re ready. Connect your own domain so
          it feels like your business from the first visit.
        </p>
        <p>
          Then choose a page and date range to see views, unique visitors, clicks and scroll depth.
          Click and scroll heatmaps show how people use that page.
        </p>
        <a className="wff-text-link" href="/customer-marketing">
          Explore Customer Marketing <ArrowRight size={16} />
        </a>
      </div>
      <div
        className="wff-tracking-panel"
        aria-label="Site Tracking for the Courtyard homepage before visitors arrive"
      >
        <header>
          <strong>Site Tracking</strong>
          <span>Courtyard · Home page</span>
        </header>
        <div className="wff-tracking-scope">
          <span>Home /</span>
          <span>Last 30 days</span>
        </div>
        <dl className="wff-tracking-stats">
          <div>
            <dt>Page views</dt>
            <dd>0</dd>
          </div>
          <div>
            <dt>Unique visitors</dt>
            <dd>0</dd>
          </div>
          <div>
            <dt>Total clicks</dt>
            <dd>0</dd>
          </div>
          <div>
            <dt>Avg. scroll</dt>
            <dd>0%</dd>
          </div>
        </dl>
        <div className="wff-heatmap">
          <span>Click & scroll heatmaps</span>
          <div className="wff-heatmap-page">
            <span>courtyard</span>
            <strong>
              A garden that
              <br />
              feels like home.
            </strong>
            <i />
            <i />
          </div>
          <div className="wff-heatmap-empty">
            <MousePointer2 size={22} />
            <strong>See where visitors click and scroll.</strong>
            <p>Page activity appears as visitors arrive.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
