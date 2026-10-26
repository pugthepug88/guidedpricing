import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  Columns2,
  Copy,
  FileText,
  Globe,
  GripVertical,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  LayoutTemplate,
  Monitor,
  Palette,
  Play,
  Plus,
  RotateCcw,
  Smartphone,
  SquareMousePointer,
  TextCursorInput,
  Type,
  X,
} from "lucide-react";

// Prepared marketing scenes. All controls affect local React state only.
// No site import, AI request, save, publish, submission or external tracking runs.
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

export function ProductBrand({ name, dark = false }: { name: string; dark?: boolean }) {
  return (
    <div className="wff-product-brand">
      <img
        src={dark ? "/concept/zapla-logo-white.png" : "/concept/zapla-logo-dark.svg"}
        alt="Zapla"
        width="93"
        height="27"
      />
      <span>{name}</span>
    </div>
  );
}
function AIMark() {
  return (
    <img className="wff-ai-mark" src="/concept/zapla-petals-96.png" alt="" width="30" height="30" />
  );
}

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
    if (rect)
      setColumns(
        Math.round(Math.max(36, Math.min(64, ((event.clientX - rect.left) / rect.width) * 100))),
      );
  };
  const field =
    selected === "heading" || selected === "text" || selected === "button" ? selected : null;
  return (
    <div
      className="wff-builder wff-product-window"
      id="website-builder"
      aria-label="Interactive website builder"
    >
      <div className="wff-product-toolbar">
        <ProductBrand name="Website Builder" />
        <span className="wff-document-name">Courtyard / Home</span>
        <div className="wff-devices" role="group" aria-label="Page preview size">
          <button
            type="button"
            aria-label="Desktop page preview"
            aria-pressed={!phone}
            onClick={() => setPhone(false)}
          >
            <Monitor size={17} />
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
        <button className="wff-reset" type="button" onClick={reset}>
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
      <div className="wff-builder-workspace">
        <aside className="wff-tool-rail" aria-label="Website builder tools">
          {[
            { label: "Blocks", icon: LayoutGrid },
            { label: "Components", icon: Copy },
            { label: "Pages", icon: FileText },
            { label: "Layers", icon: Layers },
            { label: "Templates", icon: LayoutTemplate },
            { label: "Styles", icon: Palette },
            { label: "Media", icon: ImageIcon },
          ].map(({ label, icon: Icon }) => (
            <div className={label === "Blocks" ? "wff-tool-active" : ""} key={label}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
          <a href="#website-ai" className="wff-rail-ai">
            <AIMark />
            <span>Zapla AI</span>
          </a>
        </aside>
        <aside className="wff-block-library" aria-label="Page elements">
          <div className="wff-panel-label">Build your page</div>
          <p className="wff-ui-caption">Structure</p>
          <div className="wff-layout-choices" aria-label="Column layouts">
            <div>
              <i />
              <span>Section</span>
            </div>
            <div>
              <i className="wff-layout-two" />
              <span>2 columns</span>
            </div>
            <div>
              <i className="wff-layout-three" />
              <span>3 columns</span>
            </div>
          </div>
          <p className="wff-ui-caption">Content</p>
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
                <Icon size={19} aria-hidden="true" />
                <span>{label}</span>
                {id === "form" && (
                  <GripVertical size={12} className="wff-drag-grip" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
          <div className="wff-page-tree">
            <p className="wff-ui-caption">On this page</p>
            <span>
              <Layers size={14} /> Header
            </span>
            <span>
              <Columns2 size={14} /> Hero section
            </span>
            <span>
              <Plus size={14} /> Enquiry form
            </span>
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
              <strong>
                courtyard<span>GARDEN DESIGN</span>
              </strong>
              <span>Our work &nbsp; About &nbsp; Enquire</span>
            </div>
            <div
              ref={row}
              className={"wff-editable-row" + (imageFirst ? " wff-editable-row--reversed" : "")}
              style={{ "--column-width": `${columns}%` } as CSSProperties}
            >
              <span className="wff-row-label">2 columns</span>
              <div className="wff-canvas-copy">
                <span className="wff-garden-location">A LITTLE CLOSER TO NATURE</span>
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
                  <ArrowRight size={14} />
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
                  <span>Project details</span>
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
                <Plus size={17} /> Drop your form here
              </button>
            )}
          </div>
        </div>
        <aside className="wff-properties" aria-label="Selected element settings">
          <div className="wff-panel-label">
            {selected === "image" ? "Image" : selected === "form" ? "Form" : "Edit content"}
            <ChevronDown size={14} />
          </div>
          {field && (
            <label className="wff-property-field" htmlFor="wff-element-content">
              {field === "heading" ? "Heading" : field === "text" ? "Paragraph" : "Button text"}
              <textarea
                id="wff-element-content"
                rows={3}
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
                See the connection <ArrowDown size={13} />
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
            <Columns2 size={15} /> Swap columns
          </button>
          <p id="wff-resize-help">Drag the column divider to reshape your page.</p>
          <div className="wff-property-summary">
            <span>Page</span>
            <strong>Home</strong>
            <span>Section</span>
            <strong>Hero</strong>
          </div>
        </aside>
      </div>
      <div className="wff-builder-status" role="status">
        <span>{form ? "Enquiry form added" : "Select an element to edit"}</span>
        <span>Drag. Drop. Make it yours.</span>
      </div>
    </div>
  );
}

function SitePreview({ clone = false }: { clone?: boolean }) {
  return (
    <div className={"wff-site-preview" + (clone ? " wff-site-preview--clone" : "")}>
      <div className="wff-site-preview-nav">
        <strong>
          courtyard<span>GARDEN DESIGN</span>
        </strong>
        <span>Our work &nbsp; Services &nbsp; Enquire</span>
      </div>
      <div className="wff-site-preview-hero wff-ai-piece">
        <div>
          <span>DESIGNED AROUND YOUR LIFE</span>
          <h3>
            {clone ? (
              <>
                A garden that
                <br />
                feels like home.
              </>
            ) : (
              <>
                Made for life
                <br />
                outdoors.
              </>
            )}
          </h3>
          <p>Thoughtful gardens. Beautiful everyday spaces.</p>
          <span className="wff-mini-cta">
            Plan your garden <ArrowRight size={12} />
          </span>
        </div>
        <img
          src={PHOTO}
          alt="Garden consultation on the newly built website"
          width="1536"
          height="1024"
          loading="lazy"
        />
      </div>
      <div className="wff-site-preview-services wff-ai-piece">
        <strong>Good design starts with you.</strong>
        <div>
          <span>Courtyard design</span>
          <span>Planting plans</span>
          <span>Outdoor living</span>
        </div>
      </div>
      <div className="wff-site-preview-enquiry wff-ai-piece">
        <strong>Let’s talk about your space.</strong>
        <span>
          Project enquiry <ArrowRight size={14} />
        </span>
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
    <section
      className="wff-ai wff-shell wff-section"
      id="website-ai"
      aria-labelledby="wff-ai-title"
    >
      <header className="wff-section-heading">
        <div>
          <p className="wff-eyebrow">Build with Zapla AI</p>
          <h2 id="wff-ai-title">
            Describe it.
            <br />
            Build from there.
          </h2>
        </div>
        <p>
          Start with an idea or an existing website. Let Zapla AI put the page together, then refine
          the design in your visual editor.
        </p>
      </header>
      <div
        className="wff-ai-workspace wff-product-window"
        ref={scene}
        style={{ "--wff-play-state": paused ? "paused" : "running" } as CSSProperties}
      >
        <div className="wff-product-toolbar">
          <ProductBrand name="Website Builder" />
          <span className="wff-document-name">Create with AI</span>
        </div>
        <div className="wff-ai-layout">
          <div className="wff-ai-composer">
            <div className="wff-ai-identity">
              <AIMark />
              <strong>Zapla AI</strong>
            </div>
            <h3>Where shall we start?</h3>
            <div className="wff-ai-modes" role="group" aria-label="AI website starting point">
              <button
                type="button"
                aria-pressed={mode === "create"}
                onClick={() => {
                  setMode("create");
                  setRun(0);
                }}
              >
                <Plus size={17} />
                <span>
                  <strong>Create a new website</strong>
                  <small>Describe what you have in mind.</small>
                </span>
              </button>
              <button
                type="button"
                aria-pressed={mode === "clone"}
                onClick={() => {
                  setMode("clone");
                  setRun(0);
                }}
              >
                <Copy size={17} />
                <span>
                  <strong>Clone an existing site</strong>
                  <small>Start from a page URL.</small>
                </span>
              </button>
            </div>
            <div className="wff-ai-request">
              <span>{mode === "create" ? "Your brief" : "From your existing page"}</span>
              <p>
                {mode === "create"
                  ? "Create a garden design website. Show our services, use a natural feel and add a project enquiry."
                  : "Bring across our garden design page with its styles and images, ready to edit in Zapla."}
              </p>
              <button
                className="wff-ai-watch"
                type="button"
                onClick={() => setRun((value) => value + 1)}
              >
                <Play size={14} fill="currentColor" />
                {run
                  ? "Watch again"
                  : mode === "clone"
                    ? "Watch the page take shape"
                    : "Watch AI build the page"}
              </button>
            </div>
            <p className="wff-ai-review">Review the content. Make it yours. Publish when ready.</p>
          </div>
          <div className="wff-ai-output">
            <div className="wff-output-label">
              <span>{mode === "clone" ? "Your page, ready to edit" : "Your starting design"}</span>
              <Monitor size={15} />
            </div>
            <div key={`${mode}-${run}`} className={run ? "wff-ai-result--playing" : ""}>
              <SitePreview clone={mode === "clone"} />
            </div>
          </div>
        </div>
      </div>
      <p className="wff-usage-note">AI usage is separate and confirmed with your setup.</p>
    </section>
  );
}

function FunnelPage({ variant }: { variant: "A" | "B" }) {
  return (
    <div className={"wff-funnel-page wff-funnel-page--" + variant.toLowerCase()}>
      <div className="wff-funnel-page-label">
        <strong>Page {variant}</strong>
        <span>{variant === "A" ? "Lead with the space" : "Lead with the service"}</span>
      </div>
      <div className="wff-funnel-thumbnail">
        <div>
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
          <span className="wff-funnel-mini-cta">Plan my garden</span>
        </div>
        <img src={PHOTO} alt="" width="1536" height="1024" loading="lazy" />
      </div>
    </div>
  );
}
export function FunnelBuilder() {
  return (
    <section className="wff-funnels wff-shell" aria-labelledby="wff-funnel-title">
      <header className="wff-section-heading">
        <div>
          <p className="wff-eyebrow">Funnels &amp; A/B testing</p>
          <h2 id="wff-funnel-title">
            Give your offer a path.
            <br />
            Test what works.
          </h2>
        </div>
        <p>
          Connect each page to the next step. Compare two versions of your offer with a split test,
          then guide visitors to an enquiry and a clear response.
        </p>
      </header>
      <div className="wff-funnel-board wff-product-window">
        <div className="wff-product-toolbar">
          <ProductBrand name="Funnel Builder" />
          <span className="wff-document-name">Courtyard design enquiry</span>
        </div>
        <div
          className="wff-funnel-flow"
          aria-label="Visitors split between page A and page B, both leading to an enquiry form and thank-you page"
        >
          <div className="wff-funnel-entry">
            <Globe size={20} />
            <strong>Visitor arrives</strong>
            <span>Your offer</span>
          </div>
          <div className="wff-split-node">
            <span>A/B</span>
            <strong>Split test</strong>
            <small>Compare two pages</small>
          </div>
          <div className="wff-funnel-variants">
            <FunnelPage variant="A" />
            <FunnelPage variant="B" />
          </div>
          <div className="wff-funnel-destinations">
            <div className="wff-funnel-enquire">
              <FileText size={18} />
              <span>Enquiry form</span>
              <strong>Tell us about your space.</strong>
              <div>Your name</div>
              <div>Project details</div>
            </div>
            <ArrowDown size={18} />
            <div className="wff-funnel-thanks">
              <span>Thank-you page</span>
              <strong>Thanks for getting in touch.</strong>
              <p>Choose a consultation</p>
            </div>
          </div>
        </div>
      </div>
      <div className="wff-funnel-notes">
        <p>
          <strong>A website introduces your business.</strong> Services, projects and contact pages,
          ready to explore.
        </p>
        <p>
          <strong>A funnel focuses on one action.</strong> A connected path for a particular offer
          or campaign.
        </p>
      </div>
    </section>
  );
}

export function FormConnection() {
  return (
    <section
      className="wff-connected wff-shell wff-section"
      id="connected-enquiry"
      aria-labelledby="wff-enquiry-title"
    >
      <header className="wff-section-heading">
        <div>
          <p className="wff-eyebrow">Forms connected to your CRM</p>
          <h2 id="wff-enquiry-title">
            The right questions.
            <br />A useful enquiry.
          </h2>
        </div>
        <p>
          Build the form around what your team needs to know. Map the answers to contact fields, so
          the details arrive with the customer.
        </p>
      </header>
      <div className="wff-form-connection">
        <div className="wff-form-builder wff-product-window">
          <div className="wff-product-toolbar">
            <ProductBrand name="Forms" />
            <span className="wff-document-name">Project enquiry</span>
          </div>
          <div className="wff-form-workspace">
            <aside className="wff-form-fields">
              <div className="wff-panel-label">Your fields</div>
              {[
                { label: "Your name", type: "Text" },
                { label: "Email", type: "Email" },
                { label: "Project type", type: "Dropdown" },
                { label: "Project details", type: "Long text" },
              ].map(({ label, type }) => (
                <div key={label}>
                  <GripVertical size={13} />
                  <span>
                    <strong>{label}</strong>
                    <small>{type}</small>
                  </span>
                </div>
              ))}
              <div className="wff-field-mapping">
                <span>Map to contact</span>
                <strong>
                  Project type <ArrowRight size={12} /> Project type
                </strong>
              </div>
            </aside>
            <div className="wff-enquiry-paper">
              <p className="wff-form-brand">
                courtyard<span>GARDEN DESIGN</span>
              </p>
              <h3>Tell us about your space.</h3>
              <dl className="wff-form-answers">
                <div>
                  <dt>Project type</dt>
                  <dd>
                    Courtyard design <ChevronDown size={13} />
                  </dd>
                </div>
                <div>
                  <dt>What do you have in mind?</dt>
                  <dd>We’d love a leafy courtyard with space to eat outside.</dd>
                </div>
                <div>
                  <dt>Your name</dt>
                  <dd>Mia Thompson</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>Email address provided</dd>
                </div>
              </dl>
              <span className="wff-form-submit-text">
                Send my enquiry <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
        <div className="wff-customer-outcome">
          <div className="wff-product-toolbar">
            <ProductBrand name="CRM" />
          </div>
          <div className="wff-crm-record">
            <p className="wff-ui-caption">After submission</p>
            <div className="wff-contact">
              <span className="wff-portrait" aria-hidden="true" />
              <div>
                <h3>Mia Thompson</h3>
                <p>Name and email captured</p>
              </div>
            </div>
            <dl className="wff-record-details">
              <div>
                <dt>Project type</dt>
                <dd>Courtyard design</dd>
              </div>
              <div>
                <dt>Project details</dt>
                <dd>We’d love a leafy courtyard with space to eat outside.</dd>
              </div>
            </dl>
          </div>
          <div className="wff-acknowledgement">
            <span className="wff-ui-caption">Configured acknowledgement</span>
            <h3>Thanks for getting in touch, Mia.</h3>
            <p>
              We’ve received your courtyard enquiry. Our team will be in touch to discuss your
              space.
            </p>
          </div>
        </div>
      </div>
      <div className="wff-enquiry-notes">
        <p>
          Use required fields, dropdowns and multiple pages. Embed your form on an existing website
          or share its own link.
        </p>
        <a className="wff-text-link" href="/features/automation-builder">
          Connect your follow-up <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

type ClickPoint = { x: number; y: number };
export function SiteTracking() {
  const [points, setPoints] = useState<ClickPoint[]>([]);
  const [clicks, setClicks] = useState(0);
  const [viewed, setViewed] = useState(false);
  const report = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = report.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setViewed(true);
        observer.disconnect();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const recordClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const target =
      event.target instanceof Element
        ? event.target.closest("button")?.getBoundingClientRect()
        : null;
    const x = event.detail === 0 && target ? target.left + target.width / 2 : event.clientX;
    const y = event.detail === 0 && target ? target.top + target.height / 2 : event.clientY;
    setPoints((value) => [
      ...value.slice(-39),
      { x: ((x - rect.left) / rect.width) * 100, y: ((y - rect.top) / rect.height) * 100 },
    ]);
    setClicks((value) => value + 1);
  };
  return (
    <section className="wff-tracking wff-shell" aria-labelledby="wff-tracking-title">
      <div className="wff-tracking-copy">
        <p className="wff-eyebrow">Site tracking</p>
        <h2 id="wff-tracking-title">
          See what gets
          <br />
          their attention.
        </h2>
        <p>
          Choose a page and date range. See views, unique visitors, clicks and average scroll depth,
          with click and scroll heatmaps to understand how people use the page.
        </p>
        <div className="wff-publishing-note">
          <h3>Your website. Your domain.</h3>
          <p>
            Save your changes as a draft. Review, then publish. Connect your own domain with DNS
            setup and verification.
          </p>
        </div>
        <a className="wff-text-link" href="/customer-marketing">
          Explore Customer Marketing <ArrowRight size={16} />
        </a>
      </div>
      <div className="wff-tracking-panel wff-product-window" ref={report}>
        <div className="wff-product-toolbar">
          <ProductBrand name="Site Tracking" />
        </div>
        <div className="wff-tracking-content">
          <div className="wff-tracking-scope">
            <strong>Courtyard / Home</strong>
            <span>Your preview activity</span>
          </div>
          <dl className="wff-tracking-stats">
            <div>
              <dt>Page views</dt>
              <dd>{viewed ? 1 : 0}</dd>
            </div>
            <div>
              <dt>Unique visitors</dt>
              <dd>{viewed ? 1 : 0}</dd>
            </div>
            <div>
              <dt>Total clicks</dt>
              <dd aria-live="polite">{clicks}</dd>
            </div>
          </dl>
          <div className="wff-click-map-heading">
            <strong>Click map</strong>
            <button
              type="button"
              onClick={() => {
                setClicks(0);
                setPoints([]);
              }}
            >
              Clear clicks <RotateCcw size={12} />
            </button>
          </div>
          <div className="wff-tracked-page" onClick={recordClick}>
            <div className="wff-tracked-nav">
              <strong>courtyard</strong>
              <button type="button">Our services</button>
            </div>
            <div className="wff-tracked-hero">
              <div>
                <span>GARDEN DESIGN</span>
                <h3>
                  A garden that
                  <br />
                  feels like home.
                </h3>
                <button type="button">
                  Plan my garden <ArrowRight size={13} />
                </button>
              </div>
              <img
                src={PHOTO}
                alt="Courtyard homepage in the click map"
                width="1536"
                height="1024"
                loading="lazy"
              />
            </div>
            <div className="wff-tracked-services">
              <strong>Designed around your everyday.</strong>
              <span>Courtyards &nbsp; · &nbsp; Planting &nbsp; · &nbsp; Outdoor living</span>
            </div>
            <div className="wff-heat-points" aria-hidden="true">
              {points.map((point, index) => (
                <i key={index} style={{ left: `${point.x}%`, top: `${point.y}%` }} />
              ))}
            </div>
          </div>
          <p className="wff-tracking-hint">Click the page to see its click map.</p>
        </div>
      </div>
    </section>
  );
}
