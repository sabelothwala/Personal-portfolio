# Portfolio — Implementation Instructions for Claude Code

Apply these edits to the Lumen portfolio. **Only two files change: `index.html` and `style.css`.** Each edit is a find-and-replace: match the OLD block exactly, swap in the NEW block. Preserve existing indentation. Do not touch anything not listed here.

**Skip list (leave exactly as-is — owner is handling these separately):**

- About section paragraph 1 (the framework paragraph)
- The `.stats` block in About
- Any dead `#` links (Ventura URL, GitHub, LinkedIn) — leave as `#`, owner will supply real URLs

-----

## FILE 1 — `index.html`

### Edit 1.1 — `<title>` (line ~6)

OLD:

```html
<title>Sabelo Thwala — Creative Developer</title>
```

NEW:

```html
<title>Sabelo Thwala — Data & AI Product Builder</title>
```

### Edit 1.2 — meta description (lines ~7–10)

OLD:

```html
<meta
  name="description"
  content="Sabelo Thwala — creative developer & designer crafting immersive, performance-obsessed web experiences."
/>
```

NEW:

```html
<meta
  name="description"
  content="Sabelo Thwala — I build data & AI products that turn business problems into decisions. Creator of Ventura, a live profit-intelligence platform for DTC e-commerce founders."
/>
```

### Edit 1.3 — Open Graph tags (lines ~13–18)

OLD:

```html
<!-- Open Graph (placeholder) -->
<meta property="og:title" content="Sabelo Thwala — Creative Developer" />
<meta
  property="og:description"
  content="Immersive, performance-obsessed web experiences where motion, depth, and code meet."
/>
```

NEW:

```html
<!-- Open Graph -->
<meta property="og:title" content="Sabelo Thwala — Data & AI Product Builder" />
<meta
  property="og:description"
  content="I build data & AI products that turn business problems into decisions — pipeline, AI, and cloud, end to end. Right now that's Ventura, a live profit-intelligence platform for DTC e-commerce founders."
/>
```

### Edit 1.4 — Hero role line (line ~58)

OLD:

```html
<p class="hero__role" data-hero>Creative Developer &amp; Designer</p>
```

NEW:

```html
<p class="hero__role" data-hero>I build data &amp; AI products that turn business problems into decisions.</p>
```

### Edit 1.5 — Hero pitch (lines ~59–63)

OLD:

```html
<p class="hero__pitch" data-hero>
  I craft immersive, performance-obsessed interfaces where motion, depth,
  and code meet — tactile experiences that feel less like pages and more
  like places.
</p>
```

NEW:

```html
<p class="hero__pitch" data-hero>
  I match the stack to the stage: prototype fast on Vercel and Supabase to get
  in front of users and investors, then architect for scale on Azure when it's
  earned. Ventura runs live with DTC founders; uni360, a university companion
  app, is live in prototype while I build out its full Azure platform.
</p>
```

### Edit 1.6 — About ¶2 ONLY (leave ¶1 untouched)

In the `#about` card, find the SECOND `<p>` inside `.card__body`:
OLD:

```html
<p>
  I care about the details you feel before you notice: easing that lands,
  type that breathes, frame budgets that never drop. Placeholder copy for now —
  the real story comes next.
</p>
```

NEW:

```html
<p>
  That lens is what I build with. I turn the data a business already has into
  data-driven, AI-powered products — owning the pipeline, the analysis, the
  cloud, and the product end to end. I match the stack to the stage: prototype
  fast on Vercel and Supabase to get in front of users and investors, then
  architect for scale on Azure when it's earned. Ventura runs live with DTC
  founders; uni360, a university companion app, is live in prototype while I
  build out its full Azure platform — identity, AI services, and a
  POPIA-compliant data layer.
</p>
```

> NOTE: The first `<p>` in this card (starting “I’m a creative developer who treats the browser as a canvas”) — **LEAVE IT. Owner is rewriting ¶1 himself.**

### Edit 1.7 — About skill chips (the `<ul class="chips">`)

OLD:

```html
<li class="chip">three.js</li>
<li class="chip">GLSL / Shaders</li>
<li class="chip">GSAP</li>
<li class="chip">WebGL</li>
<li class="chip">Vite</li>
<li class="chip">TypeScript</li>
<li class="chip">Creative Coding</li>
<li class="chip">UI / UX</li>
```

NEW:

```html
<li class="chip">Data Analysis</li>
<li class="chip">Generative AI</li>
<li class="chip">Claude API</li>
<li class="chip">Next.js</li>
<li class="chip">Supabase</li>
<li class="chip">Azure</li>
<li class="chip">Cloud Architecture</li>
<li class="chip">Automation</li>
```

> NOTE: the `<dl class="stats">` block right below the chips — **LEAVE IT. Owner revisiting.**

### Edit 1.8 — What I do (02), the three `.morph__block` cards

Replace the three block titles + descriptions (keep the `01/02/03` index spans):

Block 1 OLD title/desc:

```html
<h3 class="morph__block-title">Web Development</h3>
<p class="morph__block-desc">
  Fast, tactile interfaces — from WebGL and shaders to design
  systems, accessibility, and the performance details that make it
  all feel effortless.
</p>
```

Block 1 NEW:

```html
<h3 class="morph__block-title">Data &amp; Analysis</h3>
<p class="morph__block-desc">
  Turning the data a business already has into clear signal —
  pipelines, analysis, and the metrics that actually drive decisions.
</p>
```

Block 2 OLD title/desc:

```html
<h3 class="morph__block-title">Data Science</h3>
<p class="morph__block-desc">
  Turning messy data into decisions — analysis, modelling, and
  visualisations that people actually use.
</p>
```

Block 2 NEW:

```html
<h3 class="morph__block-title">Product Development</h3>
<p class="morph__block-desc">
  Taking an idea from prototype to live product, with generative AI
  and the Claude API doing real work under the hood — applied with
  judgement, not hype.
</p>
```

Block 3 OLD title/desc:

```html
<h3 class="morph__block-title">AI Engineering</h3>
<p class="morph__block-desc">
  Building with AI — LLM-powered features, agents, and tooling,
  applied with judgement instead of hype.
</p>
```

Block 3 NEW:

```html
<h3 class="morph__block-title">Cloud Architecture</h3>
<p class="morph__block-desc">
  Architecting for scale and compliance — from lean prototypes to
  full Azure platforms with identity, AI services, and a clean data layer.
</p>
```

### Edit 1.9 — CV intro line

OLD:

```html
<p class="card__body">
  A snapshot of experience and education. Placeholder entries for now —
  real roles, degrees, and certifications drop straight in here.
</p>
```

NEW:

```html
<p class="card__body">
  A snapshot of where I've studied and worked.
</p>
```

### Edit 1.10 — CV Experience list (both `.cv__item`s under the Experience group)

OLD:

```html
<li class="cv__item">
  <span class="cv__period">2023 — Now</span>
  <div class="cv__detail">
    <span class="cv__role">Role / Title</span>
    <span class="cv__org">Company · Location</span>
    <p class="cv__note">One concise line on the impact you had.</p>
  </div>
</li>
<li class="cv__item">
  <span class="cv__period">2021 — 23</span>
  <div class="cv__detail">
    <span class="cv__role">Role / Title</span>
    <span class="cv__org">Company · Location</span>
    <p class="cv__note">One concise line on the impact you had.</p>
  </div>
</li>
```

NEW:

```html
<li class="cv__item">
  <span class="cv__period">2025 — Now</span>
  <div class="cv__detail">
    <span class="cv__role">Founder</span>
    <span class="cv__org">Ventura Decision Systems · Pretoria</span>
    <p class="cv__note">Building data &amp; AI products end to end — live with DTC e-commerce founders.</p>
  </div>
</li>
<li class="cv__item">
  <span class="cv__period">2024 — 25</span>
  <div class="cv__detail">
    <span class="cv__role">Sales Agent</span>
    <span class="cv__org">VX Media Group</span>
  </div>
</li>
```

### Edit 1.11 — CV Education list (both `.cv__item`s under the Education group)

OLD:

```html
<li class="cv__item">
  <span class="cv__period">20XX</span>
  <div class="cv__detail">
    <span class="cv__role">Degree / Field of study</span>
    <span class="cv__org">Institution</span>
  </div>
</li>
<li class="cv__item">
  <span class="cv__period">20XX</span>
  <div class="cv__detail">
    <span class="cv__role">Certification / Award</span>
    <span class="cv__org">Issuing body</span>
  </div>
</li>
```

NEW:

```html
<li class="cv__item">
  <span class="cv__period">2025</span>
  <div class="cv__detail">
    <span class="cv__role">BIS Honours — Information Science</span>
    <span class="cv__org">University of Pretoria</span>
  </div>
</li>
<li class="cv__item">
  <span class="cv__period">2021 — 24</span>
  <div class="cv__detail">
    <span class="cv__role">BIS — Information Science</span>
    <span class="cv__org">University of Pretoria</span>
  </div>
</li>
```

### Edit 1.12 — Work (04): replace the whole `<ul class="work-grid">` with one feature card

OLD (the entire `<ul class="work-grid"> ... </ul>` with all four `<li>`s):

```html
<ul class="work-grid">
  <li>
    <a class="work-card" href="#" aria-label="Aurora Commerce — coming soon">
      <span class="work-card__index">01</span>
      <span class="work-card__title">Aurora Commerce</span>
      <span class="work-card__meta">WebGL · Brand · 2025</span>
      <span class="work-card__arrow" aria-hidden="true">↗</span>
    </a>
  </li>
  <li>
    <a class="work-card" href="#" aria-label="Nebula Dashboard — coming soon">
      <span class="work-card__index">02</span>
      <span class="work-card__title">Nebula Dashboard</span>
      <span class="work-card__meta">Product · Data Viz · 2025</span>
      <span class="work-card__arrow" aria-hidden="true">↗</span>
    </a>
  </li>
  <li>
    <a class="work-card" href="#" aria-label="Tactile Audio — coming soon">
      <span class="work-card__index">03</span>
      <span class="work-card__title">Tactile Audio</span>
      <span class="work-card__meta">Shaders · Sound · 2024</span>
      <span class="work-card__arrow" aria-hidden="true">↗</span>
    </a>
  </li>
  <li>
    <a class="work-card" href="#" aria-label="Studio Folio — coming soon">
      <span class="work-card__index">04</span>
      <span class="work-card__title">Studio Folio</span>
      <span class="work-card__meta">Site · Motion · 2024</span>
      <span class="work-card__arrow" aria-hidden="true">↗</span>
    </a>
  </li>
</ul>
```

NEW (single feature card + a “more in the works” line; `work-card--feature` modifier added for the CSS in Edit 2.1):

```html
<ul class="work-grid work-grid--single">
  <li>
    <a class="work-card work-card--feature" href="#" aria-label="Ventura Decision Systems">
      <span class="work-card__index">01</span>
      <span class="work-card__title">Ventura Decision Systems</span>
      <span class="work-card__meta">Data · AI · Cloud · 2026</span>
      <p class="work-card__desc">
        Profit intelligence for DTC e-commerce founders — the true per-SKU margin
        hiding behind the ROAS. An automated data + AI pipeline (upload →
        processing → Claude analysis → live dashboard), built and running end to end.
      </p>
      <span class="work-card__arrow" aria-hidden="true">↗</span>
    </a>
  </li>
</ul>
<p class="work-more">More in the works — including a university platform currently in development.</p>
```

> The `href="#"` stays a placeholder — owner will supply Ventura’s real URL.

### Edit 1.13 — Contact (05) body

OLD:

```html
<p class="card__body">
  I'm open to select freelance work and collaborations. Tell me what you're
  dreaming up — the weirder, the better.
</p>
```

NEW:

```html
<p class="card__body">
  I'm open to roles, collaborations, and the occasional ambitious build. If
  you're working on something where data, AI, and product meet — let's talk.
</p>
```

### Edit 1.14 — Contact email button

OLD:

```html
<a class="btn btn--primary btn--lg" href="mailto:hello@example.com">
  hello@example.com
  <span class="btn__arrow" aria-hidden="true">→</span>
</a>
```

NEW:

```html
<a class="btn btn--primary btn--lg" href="mailto:sabelo.me90@gmail.com">
  sabelo.me90@gmail.com
  <span class="btn__arrow" aria-hidden="true">→</span>
</a>
```

### Edit 1.15 — Contact socials (drop X + Dribbble)

OLD:

```html
<ul class="socials" aria-label="Social links">
  <li><a href="#" rel="noopener">GitHub</a></li>
  <li><a href="#" rel="noopener">LinkedIn</a></li>
  <li><a href="#" rel="noopener">X / Twitter</a></li>
  <li><a href="#" rel="noopener">Dribbble</a></li>
</ul>
```

NEW (keep `#` placeholders — owner supplies real URLs):

```html
<ul class="socials" aria-label="Social links">
  <li><a href="#" rel="noopener">GitHub</a></li>
  <li><a href="#" rel="noopener">LinkedIn</a></li>
</ul>
```

-----

## FILE 2 — `style.css`

### Edit 2.1 — make the single Work card render as a full-width feature

The existing `.work-grid` (around line 543) is `grid-template-columns: repeat(2, 1fr)`. Add new rules immediately AFTER the existing `.work-grid { ... }` rule (do not delete the original — the modifier class overrides it):

```css
.work-grid--single {
  grid-template-columns: 1fr;
}
.work-card--feature {
  min-height: 240px;
  padding: 2rem 2rem 1.8rem;
}
.work-card__desc {
  font-size: 0.98rem;
  color: var(--ink-dim);
  line-height: 1.55;
  margin-top: 0.6rem;
  max-width: 60ch;
}
.work-more {
  margin-top: 1.4rem;
  font-size: 0.92rem;
  color: var(--muted);
}
```

-----

## After applying

- Run the dev server and eyeball at `localhost:5173`.
- **Owner to review on preview:** whether `.hero__role` (now a full sentence) wraps too heavily — if so, lower its `font-size` max in the `.hero__role` rule from `1.5rem` to ~`1.3rem`. Not applied here by default.
- **Still placeholder by owner’s choice:** About ¶1, the stats block, and all `#` links (Ventura URL, GitHub, LinkedIn).