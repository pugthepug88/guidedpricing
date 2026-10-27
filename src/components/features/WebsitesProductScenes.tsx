import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  Columns2,
  Copy,
  FileText,
  GripVertical,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  LayoutTemplate,
  Monitor,
  Mail,
  Palette,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Smartphone,
  SquareMousePointer,
  TextCursorInput,
  Type,
  X,
} from "lucide-react";

import { ScenePlaybackControl, SceneCursor } from "./WebsitesScenePlayback";
import { useScenePlayback, sceneProgress } from "./useWebsitesScenePlayback";

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
    <img
      className="wff-ai-mark"
      src="/concept/features/websites-zapla-ai-mark.webp"
      alt=""
      width="30"
      height="30"
    />
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
        Math.round(
          Math.max(
            36,
            Math.min(
              64,
              (imageFirst
                ? 1 - (event.clientX - rect.left) / rect.width
                : (event.clientX - rect.left) / rect.width) * 100,
            ),
          ),
        ),
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
            <div
              className={label === "Blocks" ? "wff-tool-active" : ""}
              key={label}
              role="img"
              aria-label={label}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
          <a
            href="#website-ai"
            className="wff-rail-ai"
            aria-label="Explore Zapla AI website creation"
          >
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
                      Math.max(
                        36,
                        Math.min(
                          64,
                          value + (event.key === "ArrowRight" ? 2 : -2) * (imageFirst ? -1 : 1),
                        ),
                      ),
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

const FINISHED_GARDEN = "/concept/features/websites-finished-courtyard-20261027.webp";
const AI_DURATION = 4800;

function SitePreview({
  elapsed,
  heading,
  onHeadingChange,
}: {
  elapsed: number;
  heading: string;
  onHeadingChange: (value: string) => void;
}) {
  const piece = (start: number) => ({ opacity: sceneProgress(elapsed, start) });
  const editable = elapsed >= 3500;
  return (
    <div className="wff-site-preview">
      <div className="wff-site-preview-nav" style={piece(1050)}>
        <strong>
          courtyard<span>GARDEN DESIGN</span>
        </strong>
        <span>Our work &nbsp; Services &nbsp; Enquire</span>
      </div>
      <div className="wff-site-preview-hero" style={piece(1500)}>
        <div>
          <span>DESIGNED AROUND YOUR LIFE</span>
          <div className={"wff-preview-heading" + (editable ? " is-editable" : "")}>
            <label htmlFor="wff-generated-heading">Heading</label>
            <textarea
              id="wff-generated-heading"
              aria-label="Edit the AI website heading"
              value={heading}
              rows={3}
              maxLength={65}
              tabIndex={editable ? 0 : -1}
              readOnly={!editable}
              onChange={(event) => onHeadingChange(event.target.value)}
            />
          </div>
          <p>Thoughtful gardens. Beautiful everyday spaces.</p>
          <a className="wff-mini-cta" href="#connected-enquiry" tabIndex={editable ? 0 : -1}>
            Plan my garden <ArrowRight size={12} aria-hidden="true" />
          </a>
        </div>
        <img
          src={FINISHED_GARDEN}
          alt="A finished leafy courtyard with stone paving and an outdoor dining area"
          width="1280"
          height="853"
          loading="lazy"
        />
      </div>
      <div className="wff-site-preview-services" style={piece(2400)}>
        <strong>Good design starts with you.</strong>
        <div>
          <span>Courtyard design</span>
          <span>Planting plans</span>
          <span>Outdoor living</span>
        </div>
      </div>
      <div className="wff-site-preview-enquiry" style={piece(3000)}>
        <strong>Let’s talk about your space.</strong>
        <span>
          Project enquiry <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export function AICreation() {
  const [mode, setMode] = useState<"create" | "clone">("create");
  const [heading, setHeading] = useState("Made for life outdoors.");
  const player = useScenePlayback(AI_DURATION);
  const t = player.elapsed;
  const busy = t >= 900 && t < 3500;
  const status =
    t < 900
      ? "Your starting point"
      : t < 2000
        ? "Building the layout"
        : t < 3500
          ? "Adding your content"
          : "Ready to edit";
  const choose = (next: "create" | "clone") => {
    setMode(next);
    setHeading(next === "create" ? "Made for life outdoors." : "Room to breathe. Space to gather.");
    player.restart();
  };
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
            Your idea.
            <br />A website you can shape.
          </h2>
        </div>
        <p>Start with a brief or clone an existing page. Refine the result in the visual editor.</p>
      </header>
      <div className="wff-ai-workspace wff-product-window">
        <div className="wff-product-toolbar">
          <ProductBrand name="Website Builder" />
          <span className="wff-document-name">Create with AI</span>
          <ScenePlaybackControl player={player} name="AI website creation" />
        </div>
        <div
          className="wff-ai-layout"
          ref={player.ref}
          data-playback={player.finished ? "complete" : player.paused ? "paused" : "playing"}
        >
          <div className="wff-ai-composer">
            <div className="wff-ai-identity">
              <AIMark />
              <strong>Zapla AI</strong>
            </div>
            <div className="wff-ai-modes" role="group" aria-label="AI website starting point">
              <button
                type="button"
                aria-pressed={mode === "create"}
                onClick={() => choose("create")}
              >
                <Plus size={16} aria-hidden="true" /> Create a website
              </button>
              <button type="button" aria-pressed={mode === "clone"} onClick={() => choose("clone")}>
                <Copy size={16} aria-hidden="true" /> Clone a page
              </button>
            </div>
            <div className="wff-ai-request">
              <span>{mode === "create" ? "Your brief" : "Source page"}</span>
              {mode === "create" ? (
                <p>Build a garden design website with our services and a project enquiry form.</p>
              ) : (
                <div className="wff-clone-source" aria-label="Existing Courtyard website to clone">
                  <div>
                    <span>courtyard / Home</span>
                  </div>
                  <img
                    src={FINISHED_GARDEN}
                    alt="The courtyard image on the existing website"
                    width="1280"
                    height="853"
                    loading="lazy"
                  />
                  <strong>
                    Room to breathe.
                    <br />
                    Space to gather.
                  </strong>
                </div>
              )}
              <div className="wff-ai-request-action">
                <span>
                  {mode === "create" ? "Create from your brief" : "Keep the design and images"}
                </span>
                <button
                  type="button"
                  className="wff-ai-send"
                  data-scene-target="ai-send"
                  aria-label={
                    mode === "create"
                      ? "Replay building a website from the brief"
                      : "Replay cloning the source page"
                  }
                  onClick={player.restart}
                  style={{ transform: t >= 800 && t < 1050 ? "scale(.92)" : undefined }}
                >
                  <ArrowUp size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="wff-ai-construction" aria-live="polite">
              <span
                className="wff-working-petal"
                style={{ transform: busy ? `rotate(${(t - 900) * 0.3}deg)` : undefined }}
              >
                <AIMark />
              </span>
              <span>{status}</span>
            </div>
            <p className="wff-ai-review">Your page. Your final edits.</p>
          </div>
          <div className="wff-ai-output">
            <div className="wff-output-label">
              <span>{mode === "clone" ? "Your page in Zapla" : "Built from your brief"}</span>
              <Monitor size={14} aria-hidden="true" />
            </div>
            <div className="wff-ai-canvas">
              <div
                className="wff-ai-skeleton"
                aria-hidden="true"
                style={{ opacity: 1 - sceneProgress(t, 3000, 450) }}
              >
                <span />
                <div>
                  <i />
                  <i />
                </div>
                <span />
                <span />
              </div>
              <SitePreview
                elapsed={t}
                heading={heading}
                onHeadingChange={(value) => {
                  player.finish();
                  setHeading(value);
                }}
              />
            </div>
          </div>
          <SceneCursor
            key={mode}
            host={player.ref}
            target="[data-scene-target='ai-send']"
            elapsed={t}
            clickAt={900}
          />
        </div>
      </div>
    </section>
  );
}

function FunnelPage({ variant }: { variant: "A" | "B" }) {
  return (
    <div
      className={"wff-funnel-page wff-funnel-page--" + variant.toLowerCase()}
      data-funnel-node={variant.toLowerCase()}
    >
      <div className="wff-funnel-page-label">
        <strong>Offer page {variant}</strong>
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

type FunnelLine = { key: string; d: string; arrow?: boolean };
function FunnelFlow() {
  const flow = useRef<HTMLDivElement>(null);
  const [drawing, setDrawing] = useState({ width: 1, height: 1, lines: [] as FunnelLine[] });
  useEffect(() => {
    const element = flow.current;
    if (!element) return;
    let disposed = false;
    const update = () => {
      if (disposed) return;
      const frame = element.getBoundingClientRect();
      if (!frame.width || !frame.height) return;
      // Iframe/device previews may scale the canvas. Convert rendered bounds
      // back to the SVG's local coordinate space before attaching each edge.
      const sx = element.clientWidth / frame.width;
      const sy = element.clientHeight / frame.height;
      const bounds = (name: string) => {
        const rect = element.querySelector(`[data-funnel-node="${name}"]`)?.getBoundingClientRect();
        if (!rect) return null;
        const left = (rect.left - frame.left) * sx;
        const top = (rect.top - frame.top) * sy;
        const right = (rect.right - frame.left) * sx;
        const bottom = (rect.bottom - frame.top) * sy;
        return { left, right, top, bottom, x: (left + right) / 2, y: (top + bottom) / 2 };
      };
      const split = bounds("split"),
        a = bounds("a"),
        b = bounds("b"),
        enquiry = bounds("enquiry"),
        thanks = bounds("thanks");
      if (!split || !a || !b || !enquiry || !thanks) return;
      const lines: FunnelLine[] = [];
      if (getComputedStyle(element).getPropertyValue("--wff-flow-direction").trim() === "row") {
        const fork = (split.right + Math.min(a.left, b.left)) / 2;
        const join = (Math.max(a.right, b.right) + enquiry.left) / 2;
        const last = (enquiry.right + thanks.left) / 2;
        lines.push(
          { key: "split-stem", d: `M ${split.right} ${split.y} H ${fork}` },
          {
            key: "split-trunk",
            d: `M ${fork} ${Math.min(a.y, b.y, split.y)} V ${Math.max(a.y, b.y, split.y)}`,
          },
          { key: "page-a-in", d: `M ${fork} ${a.y} H ${a.left}`, arrow: true },
          { key: "page-b-in", d: `M ${fork} ${b.y} H ${b.left}`, arrow: true },
          { key: "page-a-out", d: `M ${a.right} ${a.y} H ${join}` },
          { key: "page-b-out", d: `M ${b.right} ${b.y} H ${join}` },
          {
            key: "enquiry-trunk",
            d: `M ${join} ${Math.min(a.y, b.y, enquiry.y)} V ${Math.max(a.y, b.y, enquiry.y)}`,
          },
          { key: "enquiry-in", d: `M ${join} ${enquiry.y} H ${enquiry.left}`, arrow: true },
          {
            key: "submitted",
            d: `M ${enquiry.right} ${enquiry.y} H ${last} V ${thanks.y} H ${thanks.left}`,
            arrow: true,
          },
        );
      } else {
        const fork = (split.bottom + Math.min(a.top, b.top)) / 2;
        const join = (Math.max(a.bottom, b.bottom) + enquiry.top) / 2;
        const last = (enquiry.bottom + thanks.top) / 2;
        lines.push(
          { key: "split-stem", d: `M ${split.x} ${split.bottom} V ${fork}` },
          {
            key: "split-trunk",
            d: `M ${Math.min(a.x, b.x, split.x)} ${fork} H ${Math.max(a.x, b.x, split.x)}`,
          },
          { key: "page-a-in", d: `M ${a.x} ${fork} V ${a.top}`, arrow: true },
          { key: "page-b-in", d: `M ${b.x} ${fork} V ${b.top}`, arrow: true },
          { key: "page-a-out", d: `M ${a.x} ${a.bottom} V ${join}` },
          { key: "page-b-out", d: `M ${b.x} ${b.bottom} V ${join}` },
          {
            key: "enquiry-trunk",
            d: `M ${Math.min(a.x, b.x, enquiry.x)} ${join} H ${Math.max(a.x, b.x, enquiry.x)}`,
          },
          { key: "enquiry-in", d: `M ${enquiry.x} ${join} V ${enquiry.top}`, arrow: true },
          {
            key: "submitted",
            d: `M ${enquiry.x} ${enquiry.bottom} V ${last} H ${thanks.x} V ${thanks.top}`,
            arrow: true,
          },
        );
      }
      setDrawing({ width: element.clientWidth, height: element.clientHeight, lines });
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.querySelectorAll("[data-funnel-node]").forEach((node) => observer.observe(node));
    window.addEventListener("resize", update);
    document.fonts.ready.then(update);
    update();
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      className="wff-funnel-flow"
      ref={flow}
      role="group"
      aria-label="Each visitor sees offer page A or B. Its button opens the enquiry page. Submitting the form redirects to the thank-you page."
    >
      <svg
        className="wff-funnel-connections"
        viewBox={`0 0 ${drawing.width} ${drawing.height}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <marker
            id="wff-funnel-arrow"
            viewBox="0 0 6 6"
            refX="6"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 1 1 L 5 3 L 1 5" />
          </marker>
        </defs>
        {drawing.lines.map((line) => (
          <path
            key={line.key}
            data-connection={line.key}
            d={line.d}
            markerEnd={line.arrow ? "url(#wff-funnel-arrow)" : undefined}
          />
        ))}
      </svg>
      <div className="wff-split-node" data-funnel-node="split">
        <small>Visitors to your offer</small>
        <span>A/B</span>
        <strong>Split test</strong>
        <p>One visitor. One version.</p>
      </div>
      <div className="wff-funnel-variants">
        <FunnelPage variant="A" />
        <FunnelPage variant="B" />
      </div>
      <div className="wff-funnel-enquire" data-funnel-node="enquiry">
        <div className="wff-funnel-page-label">
          <strong>Enquiry page</strong>
        </div>
        <div className="wff-funnel-form-content">
          <h3>Tell us about your space.</h3>
          <dl>
            <div>
              <dt>Your name</dt>
              <dd>Mia Thompson</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>Email address provided</dd>
            </div>
            <div>
              <dt>Project type</dt>
              <dd>Courtyard design</dd>
            </div>
          </dl>
          <span className="wff-funnel-submit">
            Send my enquiry <ArrowRight size={12} aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="wff-funnel-thanks" data-funnel-node="thanks">
        <div className="wff-funnel-page-label">
          <strong>Thank-you page</strong>
        </div>
        <div className="wff-funnel-thanks-content">
          <span>After submission</span>
          <h3>
            Thanks, Mia.
            <br />
            Enquiry received.
          </h3>
          <p>We’ll be in touch to discuss your garden.</p>
        </div>
      </div>
    </div>
  );
}

export function FunnelBuilder() {
  return (
    <section
      className="wff-funnels wff-shell"
      id="funnel-builder"
      aria-labelledby="wff-funnel-title"
    >
      <header className="wff-section-heading">
        <div>
          <p className="wff-eyebrow">Funnels &amp; A/B testing</p>
          <h2 id="wff-funnel-title">
            Connect your pages.
            <br />
            Test what works.
          </h2>
        </div>
        <p>Build connected pages. Compare two versions of your offer with an A/B test.</p>
      </header>
      <div className="wff-funnel-board wff-product-window">
        <div className="wff-product-toolbar">
          <ProductBrand name="Funnel Builder" />
          <span className="wff-document-name">Courtyard design enquiry</span>
        </div>
        <FunnelFlow />
      </div>
    </section>
  );
}

export function FormConnection() {
  const player = useScenePlayback(4400);
  const t = player.elapsed;
  const sent = t >= 1050;
  const record = sceneProgress(t, 1500, 500);
  const details = sceneProgress(t, 2150, 500);
  const acknowledgement = sceneProgress(t, 3000, 650);
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
            From enquiry form
            <br />
            to customer record.
          </h2>
        </div>
        <p>Keep the answers with the customer and acknowledge their enquiry.</p>
      </header>
      <div className="wff-enquiry-window wff-product-window">
        <div className="wff-product-toolbar">
          <ProductBrand name="Forms & CRM" />
          <span className="wff-document-name">Project enquiry</span>
          <ScenePlaybackControl player={player} name="form submission" />
        </div>
        <div
          className="wff-enquiry-flow"
          ref={player.ref}
          data-playback={player.finished ? "complete" : player.paused ? "paused" : "playing"}
        >
          <div className="wff-submission-form">
            <div className="wff-submission-brand">
              courtyard<span>GARDEN DESIGN</span>
            </div>
            <h3>Tell us about your space.</h3>
            <dl className="wff-submission-fields">
              <div>
                <dt>Your name</dt>
                <dd>Mia Thompson</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>Email address provided</dd>
              </div>
              <div>
                <dt>Project type</dt>
                <dd>
                  Courtyard design <ChevronDown size={13} aria-hidden="true" />
                </dd>
              </div>
              <div>
                <dt>What do you have in mind?</dt>
                <dd>We’d love a leafy courtyard with space to eat outside.</dd>
              </div>
            </dl>
            <span
              className="wff-enquiry-send"
              data-scene-target="enquiry-send"
              style={{ transform: t >= 800 && t < 1100 ? "scale(.98)" : undefined }}
            >
              {sent ? "Enquiry sent" : "Send my enquiry"}
              <ArrowRight size={15} aria-hidden="true" />
            </span>
            <p className="wff-submission-mapping">Project answers mapped to contact fields</p>
          </div>
          <div className="wff-enquiry-handoff" aria-hidden="true">
            <ArrowRight size={21} />
          </div>
          <div className="wff-customer-flow">
            <div className="wff-customer-file">
              <div className="wff-customer-file-title">
                <span>CRM contact</span>
                <span style={{ opacity: record }}>From website enquiry</span>
              </div>
              <div className="wff-record-person" style={{ opacity: record }}>
                <span className="wff-portrait" aria-hidden="true" />
                <div>
                  <h3>Mia Thompson</h3>
                  <p>Name and email captured</p>
                </div>
              </div>
              <dl style={{ opacity: details }}>
                <div>
                  <dt>Project type</dt>
                  <dd>Courtyard design</dd>
                </div>
                <div>
                  <dt>Project details</dt>
                  <dd>We’d love a leafy courtyard with space to eat outside.</dd>
                </div>
              </dl>
              <div
                className="wff-record-pending"
                aria-hidden="true"
                style={{ opacity: 1 - record }}
              >
                <i />
                <i />
                <i />
              </div>
            </div>
            <div
              className="wff-email-receipt"
              style={{
                opacity: acknowledgement,
                transform: `translateY(${(1 - acknowledgement) * 6}px)`,
              }}
            >
              <div>
                <Mail size={15} aria-hidden="true" />
                <span>Configured acknowledgement</span>
              </div>
              <p>To Mia Thompson</p>
              <h3>Thanks for getting in touch, Mia.</h3>
              <p>
                We’ve received your courtyard enquiry. Our team will be in touch to discuss your
                space.
              </p>
            </div>
          </div>
          <SceneCursor
            host={player.ref}
            target="[data-scene-target='enquiry-send']"
            elapsed={t}
            clickAt={950}
          />
        </div>
      </div>
      <a className="wff-text-link wff-enquiry-followup" href="/features/automation-builder">
        Connect your follow-up <ArrowRight size={16} aria-hidden="true" />
      </a>
    </section>
  );
}

type ClickPoint = { x: number; y: number };
const TRACKING_DURATION = 4200;
const FIRST_CLICK = 1300;
const SECOND_CLICK = 3400;
const DEFAULT_TARGETS = {
  services: { x: 85, y: 8 },
  enquiry: { x: 24, y: 61 },
};
const travel = (from: ClickPoint, to: ClickPoint, progress: number): ClickPoint => {
  const t = Math.max(0, Math.min(1, progress));
  const eased = t * t * (3 - 2 * t);
  return { x: from.x + (to.x - from.x) * eased, y: from.y + (to.y - from.y) * eased };
};
export function SiteTracking() {
  const trackedPage = useRef<HTMLDivElement>(null);
  // A prepared single visitor session. Counts come only from the two depicted
  // clicks; this scene does not collect visitor data or imply customer traffic.
  // Render the complete result until hydration, including with JavaScript off.
  const clock = useRef(TRACKING_DURATION);
  const [elapsed, setElapsed] = useState(TRACKING_DURATION);
  const [targets, setTargets] = useState(DEFAULT_TARGETS);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      setReducedMotion(preference.matches);
      clock.current = preference.matches ? TRACKING_DURATION : 0;
      setElapsed(clock.current);
      setStarted(false);
    };
    const visibility = () => setHidden(document.hidden);
    applyPreference();
    visibility();
    preference.addEventListener("change", applyPreference);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      preference.removeEventListener("change", applyPreference);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    const element = trackedPage.current;
    if (!element) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const center = (name: string, fallback: ClickPoint) => {
        const target = element.querySelector(`[data-click-target="${name}"]`);
        if (!target) return fallback;
        const box = target.getBoundingClientRect();
        return {
          x: ((box.left + box.width / 2 - rect.left) / rect.width) * 100,
          y: ((box.top + box.height / 2 - rect.top) / rect.height) * 100,
        };
      };
      setTargets({
        services: center("services", DEFAULT_TARGETS.services),
        enquiry: center("enquiry", DEFAULT_TARGETS.enquiry),
      });
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    element.querySelectorAll("[data-click-target]").forEach((node) => resize.observe(node));
    const visibility = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.65),
      { threshold: 0.65 },
    );
    visibility.observe(element);
    document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      resize.disconnect();
      visibility.disconnect();
    };
  }, []);
  useEffect(() => {
    if (inView && !started && !reducedMotion) setStarted(true);
  }, [inView, started, reducedMotion]);
  useEffect(() => {
    if (!started || !inView || paused || reducedMotion || hidden) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      clock.current = Math.min(TRACKING_DURATION, clock.current + now - previous);
      previous = now;
      setElapsed(clock.current);
      if (clock.current < TRACKING_DURATION) frame = requestAnimationFrame(tick);
    };
    if (clock.current < TRACKING_DURATION) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, inView, paused, reducedMotion, hidden, replay]);
  const finished = elapsed >= TRACKING_DURATION;
  const clicks = Number(elapsed >= FIRST_CLICK) + Number(elapsed >= SECOND_CLICK);
  const points = [targets.services, targets.enquiry].slice(0, clicks);
  const cursor =
    elapsed < 2100
      ? travel({ x: 92, y: 38 }, targets.services, elapsed / 1100)
      : travel(targets.services, targets.enquiry, (elapsed - 2100) / 1100);
  const pulseTime = elapsed < 2100 ? elapsed - 1150 : elapsed - 3250;
  const pulse = pulseTime >= 0 && pulseTime <= 450 ? pulseTime / 450 : -1;
  return (
    <section
      className="wff-tracking wff-shell"
      id="site-tracking"
      aria-labelledby="wff-tracking-title"
    >
      <div className="wff-tracking-copy">
        <p className="wff-eyebrow">Site tracking</p>
        <h2 id="wff-tracking-title">
          See what gets
          <br />
          their attention.
        </h2>
        <p>Page views, visitor clicks and heatmaps. See where people stop, click and scroll.</p>
        <div className="wff-publishing-note">
          <h3>Your website. Your domain.</h3>
          <p>Save a draft. Review, publish and connect your own domain.</p>
        </div>
        <a className="wff-text-link" href="/customer-marketing">
          Explore Customer Marketing <ArrowRight size={16} />
        </a>
      </div>
      <div className="wff-tracking-panel wff-product-window">
        <div className="wff-product-toolbar">
          <ProductBrand name="Site Tracking" />
        </div>
        <div className="wff-tracking-content">
          <div className="wff-tracking-scope">
            <strong>Courtyard / Home</strong>
            <span>Page activity</span>
          </div>
          <dl className="wff-tracking-stats">
            <div>
              <dt>Page views</dt>
              <dd>1</dd>
            </div>
            <div>
              <dt>Unique visitors</dt>
              <dd>1</dd>
            </div>
            <div>
              <dt>Total clicks</dt>
              <dd aria-live="polite">{clicks}</dd>
            </div>
          </dl>
          <div className="wff-click-map-heading">
            <strong>Click map</strong>
            {!reducedMotion && (
              <button
                className="wff-tracking-control"
                type="button"
                aria-label={
                  finished ? "Replay click map" : paused ? "Resume click map" : "Pause click map"
                }
                onClick={() => {
                  if (finished) {
                    clock.current = 0;
                    setElapsed(0);
                    setPaused(false);
                    setStarted(true);
                    setReplay((value) => value + 1);
                  } else setPaused((value) => !value);
                }}
              >
                {finished ? (
                  <RotateCcw size={12} />
                ) : paused ? (
                  <Play size={12} />
                ) : (
                  <Pause size={12} />
                )}
                {finished ? "Replay" : paused ? "Resume" : "Pause"}
              </button>
            )}
          </div>
          <div
            className="wff-tracked-page"
            ref={trackedPage}
            data-playback={finished ? "complete" : paused ? "paused" : "playing"}
          >
            <div className="wff-tracked-nav">
              <strong>courtyard</strong>
              <span data-click-target="services">Our services</span>
            </div>
            <div className="wff-tracked-hero">
              <div>
                <span>GARDEN DESIGN</span>
                <h3>
                  A garden that
                  <br />
                  feels like home.
                </h3>
                <span className="wff-tracked-cta" data-click-target="enquiry">
                  Plan my garden <ArrowRight size={13} />
                </span>
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
            <div
              className="wff-tracking-pointer"
              aria-hidden="true"
              style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
            >
              <i
                style={{
                  opacity: pulse < 0 ? 0 : 1 - pulse,
                  transform: `translate(-50%, -50%) scale(${0.4 + Math.max(0, pulse) * 0.8})`,
                }}
              />
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path
                  d="M2 1.5V21L7.2 16.2L11.4 24L15 22.1L10.9 14.6L18 13.8L2 1.5Z"
                  fill="white"
                  stroke="#24344D"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
