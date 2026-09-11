## Accessibility Shift-Left Report



| Metric | Value |
|---|---:|
| Total | 189 |
| Critical | 3 |
| Warning | 186 |
| Info | 0 |
| Raw findings | 235 |
| Duplicates removed | 46 |
| Duplicate rate | 0.1957 |
| Scan duration | 155578ms |
| Framework | react |
| Standard | WCAG 2.2 Level AA support mode (2.2 AA) |
| Automated coverage | partial |
| Manual review required | yes |
| Retention evidence | none |
| WCAG-mapped findings | 11 |
| Best-practice findings | 118 |
| Unmapped findings | 0 |
| Likely root causes | 27 |
| Affected pages | 12 |
| POUR | robust: 2, perceivable: 59, operable: 178, understandable: 33 |
| WCAG levels | A: 26, AA: 246 |
| WCAG versions | 2.0: 173, 2.1: 10, 2.2: 89 |
| Confidence | high: 2, low: 111, medium: 76 |
| User impact | significant: 3, minor: 178, workaround: 8 |
| Color schemes | light: 117, dark: 38 |
| Finding types | wcag: 11, needs-review: 60, best-practice: 118 |
| Categories | aria: 2, contrast: 23, images: 24, layout: 12, headings: 6, focus: 89, structure: 33 |
| Ownership | none |
| Human verification blockers | 0 |
| Scan errors | 0 |
| Rules without WCAG mapping | page-has-heading-one: 4, heading-order: 2 |

## Review Focus

| Signal | Count | What to do |
|---|---:|---|
| First-party fix groups | 11 | Start here; these are most likely owned by the application team. |
| Third-party embedded groups | 0 | Verify ownership before assigning remediation. |
| Needs-review groups | 4 | Confirm manually before treating as pass or fail. |
| High-confidence groups | 1 | Good candidates for immediate tickets or fixes. |

Fix first:

1. `aria-prohibited-attr` - critical, significant, high confidence, 1 page
2. `keyboard-focus-not-visible` - critical, significant, medium confidence, 1 page
3. `layout-clipped-text` - warning, workaround, medium confidence, 1 page

## What Was Checked

This WCAG-EM-inspired scope summary is reproducibility evidence, not a WCAG conformance claim. See `evaluation-scope.json` for the machine-readable version.

| Scope item | Value |
|---|---|
| Requested URLs | http://localhost:3000/, http://localhost:3000/contact, http://localhost:3000/services, http://localhost:3000/projects, http://localhost:3000/projects/canex-creative-africa-nexus, http://localhost:3000/projects/uzapoint-mobile-and-web-pos-erp, http://localhost:3000/projects/the-actuarial-society-of-kenya, http://localhost:3000/projects/citizen-engagement-platform-auda-nepad, http://localhost:3000/projects/devske-developer-community-platform, http://localhost:3000/privacy-policy, http://localhost:3000/projects/iatf-africa-international-trade-platform, http://localhost:3000/projects/tuitunze-jamii-community-empowerment |
| URLs included | 12 |
| Rendered states | 31 of 20 max |
| Exploration depth | 2 interaction levels from the start page |
| Selector scope | whole page |
| Hidden elements | none |
| Evidence collected | browser exploration; axe, forced-colors, image-quality, keyboard, layout, orchestrator; keyboard traversal; Lighthouse not included; manual checklist |
| Representative states | state-2: 20 findings; state-1: 19 findings; state-21: 14 findings |

## Audit Trail

| Item | Value |
|---|---|
| Tool | a11y-shiftleft-cli 0.9.4 on v22.22.0 |
| Command profile | audit / visual-audit |
| Requested URLs | http://localhost:3000/, http://localhost:3000/contact, http://localhost:3000/services, http://localhost:3000/projects, http://localhost:3000/projects/canex-creative-africa-nexus, http://localhost:3000/projects/uzapoint-mobile-and-web-pos-erp, http://localhost:3000/projects/the-actuarial-society-of-kenya, http://localhost:3000/projects/citizen-engagement-platform-auda-nepad, http://localhost:3000/projects/devske-developer-community-platform, http://localhost:3000/privacy-policy, http://localhost:3000/projects/iatf-africa-international-trade-platform, http://localhost:3000/projects/tuitunze-jamii-community-empowerment |
| Included URLs | 12 |
| Automation | browser automation; keyboard traversal; manual checklist |
| Browser evidence | Chromium 151.0.7922.34 (exploration); Chromium 151.0.7922.34 (keyboard) |
| Limits | depth 2; 20 states max; 40 tabs max |
| Output files | evaluation-scope.json, a11y-report.json, a11y-comment.md, a11y-report.html |
| CI context | not detected |
| Boundaries | Automated findings are evidence for triage, not a WCAG conformance certification. Manual review is still required for screen reader behavior, task completion, content clarity, media quality, and assistive-technology-specific behavior. Screenshots and raw browser evidence stay local unless the user explicitly shares or exports them. |



## Audit Coverage

| Area | Status | Evidence or next step |
|---|---|---|
| Browser automation | Completed | 31 rendered states scanned |
| Static source analysis | Configuration-dependent | Install the adapter for the detected framework |
| Multiple ways to find pages | [Checklist ready](#manual-checklist-item-multiple-ways-findability) | Confirm important pages can be found through at least two supported paths such as navigation, search, sitemap, breadcrumbs, related links, or footer links |
| Keyboard traversal | Bounded evidence collected | 40 forward focus steps |
| Reflow and 200% zoom | Heuristic evidence collected | 31 rendered states checked for 200% zoom, 400% reflow, clipped text, and fixed or sticky overlap |
| Forced colors / high contrast | Heuristic evidence collected | 31 rendered states checked; 92 review signals collected |
| Non-text contrast | [Checklist ready](#manual-checklist-item-non-text-contrast-review) | Review meaningful control boundaries, focus indicators, icons, charts, custom graphics, and state colors against adjacent colors |
| Modal focus behavior | No opened modal observed | 0 states checked for name, initial focus, Escape, and restoration |
| Dynamic announcements | Mutation evidence collected | 0 meaningful live-region updates observed after 7 actions |
| Form error states | Rendered-state evidence collected | 0 explicit invalid fields; 0 without an exposed associated error |
| Sensory and color-only instructions | [Checklist ready](#manual-checklist-item-sensory-color-instructions) | Review instructions, legends, charts, filters, and validation copy for color-only, position-only, sound-only, or shape-only cues |
| Text spacing resilience | Automated heuristic plus manual review | 31 states checked with WCAG text-spacing overrides; 8 clipped text candidates; 0 overflow states |
| Account and authentication flow | [Checklist ready](#manual-checklist-item-account-authentication-flow) | Review login, checkout, account recovery, and multi-step forms for redundant entry and cognitive authentication barriers |
| Time limits and recovery | [Checklist ready](#manual-checklist-item-time-limits-recovery) | Review timeout warnings, session extension, interrupted tasks, data preservation, and legal/financial/data-change confirmation |
| Context changes on focus or input | [Checklist ready](#manual-checklist-item-context-change-control) | Review focus and input changes so users are warned before navigation, submission, new windows, or major task-context changes |
| Predictable actions and calm recovery | [Checklist ready](#manual-checklist-item-cognitive-clarity) | Review task copy, button labels, errors, recovery paths, help access, and multi-step form clarity |
| Image alternatives | Quality heuristics collected | 31 alternatives flagged for contextual human review |
| Images of text | [Checklist ready](#manual-checklist-item-images-of-text-review) | Review banners, screenshots, charts, ads, and infographics for meaningful text baked into images; replace with real text or document valid exceptions |
| Media and motion | Manual review required | 0 audio/video elements; 0 autoplay control risks |
| Character key shortcuts | [Checklist ready](#manual-checklist-item-character-shortcuts-review) | Review single-key shortcuts in editors, data grids, media players, maps, and custom widgets; confirm they can be turned off, remapped, or scoped to focus |
| Hover/focus content | [Checklist ready](#manual-checklist-item-hover-focus-content) | Review tooltips, menus, popovers, and disclosures for dismissible, hoverable, and persistent behavior |
| Pointer and dragging alternatives | [Checklist ready](#manual-checklist-item-pointer-dragging-alternatives) | Review sliders, maps, carousels, drag-and-drop, swipe, and pointer-heavy controls for cancellation and non-drag alternatives |
| Motion actuation | [Checklist ready](#manual-checklist-item-motion-actuation-review) | Review shake, tilt, rotation, camera, map, game, and AR interactions on representative devices; confirm non-motion alternatives and disable controls |
| Voice and switch control readiness | Automated signals plus human review | 33 label-in-name or same-purpose naming signals; confirm representative tasks manually |
| Embedded content and complex graphics | No iframe or canvas observed | 0 iframes; 0 unavailable; 0 canvas alternative gaps |
| Screen reader | [Checklist ready](#manual-checklist-item-screen-reader-smoke) | Test representative tasks with NVDA, JAWS, or VoiceOver |
| Task completion worksheet | [Checklist ready](#manual-checklist-item-task-completion-worksheet) | Record task, environment, input method, inclusive constraint, outcome, blocker, owner, and retest date without unnecessary personal data |
| Content and task usability | [Checklist ready](#manual-checklist-item-representative-user-test) | Record human evidence and outcome |

## WCAG Review Coverage

Automated coverage counts criteria with installed browser, source, or keyboard evidence. Assisted review coverage also counts heuristic evidence and generated manual-review prompts; it supports review planning but does not prove conformance.

| Criterion | Level | Status | Findings | Evidence | Next step |
|---|---|---|---:|---|---|
| [WCAG 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | AA | automated | 89 | keyboard traversal; keyboard; forced-colors heuristic; forced-colors; manual checklist | Review findings and confirm representative states. |
| [WCAG 2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | AA | automated | 89 | keyboard traversal; keyboard; forced-colors heuristic; forced-colors | Review findings and confirm representative states. |
| [WCAG 3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html) | AA | heuristic | 33 | orchestrator; manual checklist | Review heuristic evidence and confirm manually. |
| [WCAG 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | A | automated | 24 | browser automation; image alternative heuristic; image-quality; manual checklist | Review findings and confirm representative states. |
| [WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | AA | automated | 23 | browser automation; axe | Review findings and confirm representative states. |
| [WCAG 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | AA | heuristic | 8 | 400% reflow and sticky-overlap heuristic; layout; manual checklist | Review heuristic evidence and confirm manually. |
| [WCAG 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) | AA | heuristic | 2 | text-spacing override heuristic; layout; manual checklist | Review heuristic evidence and confirm manually. |
| [WCAG 1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) | AA | automated | 2 | browser automation; 200% resize-text heuristic; layout; manual checklist | Review findings and confirm representative states. |

Showing 8 of 39 criteria with findings or manual-review prompts. See `a11y-report.json` for the complete review matrix.

### Page Risk Ranking

| URL | Total | Critical | Warning | Info | Score |
|---|---:|---:|---:|---:|---:|
| http://localhost:3000/ | 43 | 3 | 40 | 0 | 95 |
| http://localhost:3000/contact | 22 | 0 | 22 | 0 | 44 |
| http://localhost:3000/services | 18 | 0 | 18 | 0 | 36 |
| http://localhost:3000/projects/canex-creative-africa-nexus | 17 | 0 | 17 | 0 | 34 |
| http://localhost:3000/projects/citizen-engagement-platform-auda-nepad | 17 | 0 | 17 | 0 | 34 |
| http://localhost:3000/projects/devske-developer-community-platform | 17 | 0 | 17 | 0 | 34 |
| http://localhost:3000/projects/the-actuarial-society-of-kenya | 17 | 0 | 17 | 0 | 34 |
| http://localhost:3000/projects/uzapoint-mobile-and-web-pos-erp | 17 | 0 | 17 | 0 | 34 |
| http://localhost:3000/projects | 7 | 0 | 7 | 0 | 14 |
| http://localhost:3000/projects/iatf-africa-international-trade-platform | 5 | 0 | 5 | 0 | 10 |

### Compliance Evidence Summary

| Evidence | Value |
|---|---:|
| Total findings | 189 |
| WCAG-mapped findings | 11 |
| Best-practice findings | 118 |
| Unmapped findings | 0 |
| Affected pages | 12 |
| Automated coverage | partial |
| Manual review required | yes |

Top affected pages:

- http://localhost:3000/: 43 findings, score 95
- http://localhost:3000/contact: 22 findings, score 44
- http://localhost:3000/services: 18 findings, score 36



### Likely Root Causes

Heuristic groups reduce repeated page-level occurrences without hiding their individual evidence.

| Rule | Type | Severity | Occurrences | Pages | Target pattern |
|---|---|---|---:|---:|---|
| `forced-colors-focus-indicator-risk` | best practice | warning | 42 | 7 | `selector:header > nav > ul > li > a` |
| `image-alt-generic` | best practice | warning | 31 | 12 | `selector:img[alt]` |
| `control-name-inconsistent` | needs review | warning | 29 | 12 | `selector:div > a` |
| `control-name-inconsistent` | needs review | warning | 24 | 12 | `selector:li > a` |
| `forced-colors-focus-indicator-risk` | best practice | warning | 14 | 7 | `selector:header > nav > a` |
| `control-name-inconsistent` | needs review | warning | 13 | 2 | `selector:h3 > a` |
| `forced-colors-focus-indicator-risk` | best practice | warning | 12 | 1 | `selector:[id]` |
| `forced-colors-focus-indicator-risk` | best practice | warning | 10 | 5 | `selector:main > div > article > div > a` |
| `color-contrast` | needs review | warning | 8 | 1 | `selector:a[href]` |
| `layout-clipped-text` | WCAG violation | warning | 8 | 1 | `selector:div > div > div > div > p` |

## Keyboard Evidence

| Metric | Value |
|---|---:|
| Focusable controls | 63 |
| Forward steps | 40 |
| Reverse steps | 0 |
| Complete cycle | no |
| Activation attempts | 0 |

| Step | Role | Accessible name | Focus indicator | Obscured |
|---:|---|---|---|---|
| 1 | link | none | yes | no |
| 2 | link | Home | yes | no |
| 3 | link | Services | yes | no |
| 4 | link | Work | yes | no |
| 5 | link | Clients | yes | no |
| 6 | link | Reviews | yes | no |
| 7 | link | Contact | yes | no |
| 8 | link | Let's Talk | yes | no |
| 9 | link | Chat on WhatsApp | yes | no |
| 10 | link | See Work | yes | no |
| 11 | link | Read More | yes | no |
| 12 | link | For any Help:hello@tammingabudds.com | yes | no |
| 13 | link | View All → | yes | no |
| 14 | link | View All → | yes | no |
| 15 | link | none | yes | no |
| 16 | link | CANEX - Creative Africa Nexus | yes | no |
| 17 | link | Case Study | yes | no |
| 18 | link | Live Demo | yes | no |
| 19 | link | none | yes | no |
| 20 | link | Uzapoint - Mobile and Web POS & ERP | yes | no |

Showing 20 of 40 forward focus steps. See `a11y-report.json` for the complete path and `a11y-report.html` for the visual keyboard report.

## Manual Review Checklist

Automation cannot complete these checks. Record the full status, evidence, and notes in the visual or JSON report.

| Status | Count |
|---|---:|
| Not reviewed | 30 |
| Pass | 0 |
| Fail | 0 |
| Not applicable | 0 |

Structured fields available per item: tester, tested date, environment, per-step status, task outcome, first blocker, blocker severity, missing states, task evidence attachments, retest date, notes, evidence links, and remediation owner.

- [ ] <a id="manual-checklist-item-text-spacing-resilience"></a>**Text spacing resilience** (WCAG 1.4.12)
- [ ] <a id="manual-checklist-item-zoom-reflow"></a>**Zoom, reflow, and responsive layout** (WCAG 1.4.4, 1.4.10)
- [ ] <a id="manual-checklist-item-alternative-text-quality"></a>**Alternative text quality** (WCAG 1.1.1)
- [ ] <a id="manual-checklist-item-landmarks-bypass"></a>**Landmarks and repeated-content bypass** (WCAG 1.3.1, 2.4.1, 2.4.6)
- [ ] <a id="manual-checklist-item-form-label-quality"></a>**Meaningful form labels and instructions** (WCAG 1.3.1, 3.3.2)
- [ ] <a id="manual-checklist-item-screen-reader-dynamic-content"></a>**Screen reader forms, dialogs, and dynamic updates** (WCAG 3.3.1, 3.3.2, 4.1.2, 4.1.3)
- [ ] <a id="manual-checklist-item-status-messages-live-updates"></a>**Status messages and live updates** (WCAG 4.1.3, 3.3.1, 3.3.2)
- [ ] <a id="manual-checklist-item-media-motion"></a>**Media alternatives, autoplay, and motion** (WCAG 1.2.1, 1.2.2, 1.2.3, 1.2.4, 1.2.5, 2.2.2, 2.3.1)
- [ ] <a id="manual-checklist-item-complex-widget-focus"></a>**Focus behavior for complex widgets** (WCAG 2.1.1, 2.4.3, 4.1.2)
- [ ] <a id="manual-checklist-item-plain-language"></a>**Readable and understandable content** (WCAG 3.1.5, 3.3.2)
- [ ] <a id="manual-checklist-item-logical-navigation"></a>**Logical navigation and reading order** (WCAG 1.3.2, 2.4.3, 2.4.6)
- [ ] <a id="manual-checklist-item-multiple-ways-findability"></a>**Multiple ways to find important pages** (WCAG 2.4.5)
- [ ] <a id="manual-checklist-item-sensory-color-instructions"></a>**Instructions do not rely only on color, shape, or position** (WCAG 1.3.3, 1.4.1, 3.3.2)
- [ ] <a id="manual-checklist-item-non-text-contrast-review"></a>**Non-text contrast for controls and graphics** (WCAG 1.4.11)
- [ ] <a id="manual-checklist-item-account-authentication-flow"></a>**Account, checkout, and authentication flow** (WCAG 3.3.7, 3.3.8, 3.3.2)
- [ ] <a id="manual-checklist-item-time-limits-recovery"></a>**Time limits, interruption recovery, and data loss prevention** (WCAG 2.2.1, 3.3.4, 3.3.7)
- [ ] <a id="manual-checklist-item-cognitive-clarity"></a>**Predictable next actions and calm error recovery** (WCAG 3.2.3, 3.2.4, 3.2.6, 3.3.2, 3.3.3)
- [ ] <a id="manual-checklist-item-context-change-control"></a>**No unexpected context changes on focus or input** (WCAG 3.2.1, 3.2.2)
- [ ] <a id="manual-checklist-item-screen-reader-smoke"></a>**Screen reader navigation and task smoke test** (WCAG 1.3.1, 2.4.1, 2.4.6, 4.1.2)
- [ ] <a id="manual-checklist-item-voiceover-smoke"></a>**VoiceOver smoke test for Safari** (WCAG 1.3.1, 2.4.1, 2.4.6, 4.1.2)
- [ ] <a id="manual-checklist-item-images-of-text-review"></a>**Images of text have a text alternative or exception** (WCAG 1.4.5)
- [ ] <a id="manual-checklist-item-brand-logo-accessibility"></a>**Logo purpose and accessible name** (WCAG 1.1.1, 2.4.4, 4.1.2)
- [ ] <a id="manual-checklist-item-character-shortcuts-review"></a>**Character key shortcuts can be turned off or remapped** (WCAG 2.1.4)
- [ ] <a id="manual-checklist-item-hover-focus-content"></a>**Hover and focus-triggered content** (WCAG 1.4.13, 2.1.1, 2.4.7)
- [ ] <a id="manual-checklist-item-pointer-dragging-alternatives"></a>**Pointer cancellation and dragging alternatives** (WCAG 2.5.1, 2.5.2, 2.5.7, 2.5.8)
- [ ] <a id="manual-checklist-item-motion-actuation-review"></a>**Motion actuation has non-motion alternatives** (WCAG 2.5.4)
- [ ] <a id="manual-checklist-item-embedded-content-complex-graphics"></a>**Embedded content and complex graphics** (WCAG 1.1.1, 2.1.1, 2.4.4, 4.1.2)
- [ ] <a id="manual-checklist-item-voice-switch-readiness"></a>**Voice and switch control readiness** (WCAG 2.1.1, 2.4.4, 2.5.3, 4.1.2)
- [ ] <a id="manual-checklist-item-representative-user-test"></a>**Representative assistive-technology usability test** (WCAG 2.1.1, 2.4.3, 3.3.1, 3.3.3)
- [ ] <a id="manual-checklist-item-task-completion-worksheet"></a>**Task completion evidence worksheet** (WCAG 2.1.1, 2.4.3, 3.3.1, 3.3.3)

## Top Findings And Recommendations

### Critical

- **critical** `aria-prohibited-attr` [WCAG 4.1.2 Name, Role, Value, Level A] (2 occurrences) user impact: significant users: Screen reader users, Voice-control users type: WCAG violation category: aria confidence: high 95%: Elements must only use permitted ARIA attributes
  - Priority signals: impact: significant; confidence: high
  - Fix scope: repeated local pattern; 2 related occurrences may share one page-level or component-level fix.
  - Affected: pages: http://localhost:3000/; targets: div[aria-label="5 out of 5 stars"]; states: Initial page; color schemes: light, dark; screenshots: screenshots/state-1.jpg, screenshots/state-2.jpg
  - Fix: Review the mapped WCAG success criteria and fix the underlying accessibility requirement.
  - Step 1: Address WCAG 4.1.2 Name, Role, Value.
  - Docs: <https://dequeuniversity.com/rules/axe/4.13/aria-prohibited-attr?application=playwright>, <https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html>

- **critical** `keyboard-focus-not-visible` [WCAG 2.4.7 Focus Visible, Level AA; WCAG 2.4.11 Focus Not Obscured (Minimum), Level AA] (1 occurrence) user impact: significant users: Keyboard users, Low-vision users, Screen reader users type: WCAG violation category: focus confidence: medium 75%: Keyboard focus moved to an element that is not visibly rendered in the viewport.
  - Priority signals: impact: significant; confidence: medium
  - Affected: pages: http://localhost:3000/; targets: main > div > section:nth-of-type(5) > div:nth-of-type(2) > div > div > a:nth-of-type(1)
  - Fix: Keep the focused element visible when keyboard focus moves to it.
  - Step 1: Avoid moving focus to hidden, clipped, offscreen, or zero-size elements.
  - Step 2: If focus moves to content inside a scrollable container, scroll the focused item into view.
  - Step 3: Move focus to the visible control that represents the action instead of an internal hidden proxy element.
  - Docs: <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>, <https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html>

### Warning

- **warning** `layout-clipped-text` [WCAG 1.4.10 Reflow, Level AA] (8 occurrences) user impact: workaround users: Low-vision users, Keyboard users, Mobile users type: WCAG violation category: layout confidence: medium 70%: Text may be clipped at 320px: "Production-ready web applications built with Next.js, React, Vue.js, and Laravel — scaling from lean MVPs to enterprise-"
  - Priority signals: impact: workaround; confidence: medium
  - Fix scope: multiple target patterns on one page/state. Check whether this is a shared component variant or a local template issue.
  - Affected: pages: http://localhost:3000/; targets: div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > p:nth-of-type(2), div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > p:nth-of-type(2), div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > p:nth-of-type(2), +1 more; states: Initial page; color schemes: light, dark
  - Fix: Prevent meaningful text from being clipped when the page reflows to a narrow viewport.
  - Step 1: Remove fixed heights and hidden overflow from text containers unless the complete text remains available through an accessible control.
  - Step 2: Allow text to wrap and containers to grow after zoom, localization, and user font changes.
  - Step 3: Confirm manually that the flagged text is meaningful and unavailable, because intentional visual truncation can be acceptable when the full name remains accessible.
  - Docs: <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>, <https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html>

- **warning** `image-alt-generic` [WCAG 1.1.1 Non-text Content, Level A] (31 occurrences) user impact: minor users: Development team type: best practice category: images confidence: medium 75%: Alternative text is too generic to communicate the image purpose. Current alt: "logo"
  - Priority signals: impact: minor; confidence: medium; 12 pages; 11 states
  - Fix scope: likely shared UI/component; one target pattern appears on 12 pages. Check the shared component, layout, or template first.
  - Affected: pages: http://localhost:3000/, http://localhost:3000/contact, http://localhost:3000/services, +9 more; targets: img[alt="logo"]; states: Initial page, Navigate: Contact, Navigate: View All →, +8 more; color schemes: light, dark; screenshots: screenshots/state-1.jpg, screenshots/state-2.jpg, screenshots/state-3.jpg, +21 more
  - Fix: Replace generic alternative text with a concise description of the image purpose.
  - Step 1: Avoid alternatives that only say image, photo, icon, graphic, or logo.
  - Step 2: Name the subject, information, brand, or action that matters in the current context.
  - Step 3: Use an empty alternative only when the image is decorative.
  - Docs: <https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html>, <https://www.w3.org/WAI/tutorials/images/informative/>

- **warning** `page-has-heading-one` (6 occurrences) user impact: minor users: Development team type: best practice category: headings confidence: medium 75%: Page should contain a level-one heading
  - Priority signals: impact: minor; confidence: medium; 2 pages; 2 states
  - Fix scope: likely shared UI/component; one target pattern appears on 2 pages. Check the shared component, layout, or template first.
  - Affected: pages: http://localhost:3000/contact, http://localhost:3000/services; targets: html; states: Navigate: Contact, Navigate: View All →; color schemes: light, dark; screenshots: screenshots/state-3.jpg, screenshots/state-4.jpg, screenshots/state-5.jpg, +1 more
  - Fix: Add a clear h1 that names the current page or route.
  - Step 1: Use one h1 near the start of the main content.
  - Step 2: If the visual design cannot show it, keep an h1 available to screen readers with a visually-hidden utility class.
  - Docs: <https://dequeuniversity.com/rules/axe/4.13/page-has-heading-one?application=playwright>, <https://www.w3.org/WAI/tutorials/page-structure/headings/>

- **warning** `heading-order` (2 occurrences) user impact: minor users: Development team type: best practice category: headings confidence: medium 75%: Heading levels should only increase by one
  - Priority signals: impact: minor; confidence: medium
  - Fix scope: repeated local pattern; 2 related occurrences may share one page-level or component-level fix.
  - Affected: pages: http://localhost:3000/projects; targets: article:nth-child(1) > .p-6 > h3; states: Navigate: View All →; color schemes: light, dark; screenshots: screenshots/state-7.jpg, screenshots/state-8.jpg
  - Fix: Keep headings in a logical order.
  - Step 1: Do not skip heading levels only for visual styling.
  - Step 2: Use CSS for size and keep heading levels aligned with the page outline.
  - Docs: <https://dequeuniversity.com/rules/axe/4.13/heading-order?application=playwright>, <https://www.w3.org/WAI/tutorials/page-structure/headings/>

- **warning** `control-name-inconsistent` [WCAG 3.2.4 Consistent Identification, Level AA] (66 occurrences) user impact: minor users: Low-vision users, Users in bright environments type: needs review category: structure confidence: medium 70%: Potential inconsistent accessible name for the same-purpose link. Observed names: "home", "services", "work", "clients", "reviews", "see work", "book now".
  - Priority signals: impact: minor; confidence: medium; 12 pages; 11 states
  - Fix scope: cross-page pattern across 12 pages. Check shared layout, routing, or design-system code before fixing pages one by one.
  - Affected: pages: http://localhost:3000/, http://localhost:3000/contact, http://localhost:3000/services, +9 more; targets: li > a:nth-of-type(1), div > a:nth-of-type(1), div > a:nth-of-type(2), +1 more; states: Initial page, Navigate: Contact, Navigate: View All →, +8 more
  - Fix: Use consistent accessible names for controls that perform the same function.
  - Step 1: Review the listed controls and confirm whether they have the same purpose.
  - Step 2: If they do, align the visible text, aria-label, aria-labelledby, or shared component label across pages.
  - Step 3: If the controls intentionally differ, document that decision during manual review instead of treating it as an automatic failure.
  - Docs: <https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html>, <https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html>

- **warning** `forced-colors-focus-indicator-risk` [WCAG 2.4.7 Focus Visible, Level AA; WCAG 2.4.11 Focus Not Obscured (Minimum), Level AA] (92 occurrences) user impact: minor users: Development team type: best practice category: focus confidence: low 65%: No outline, border, or shadow focus indicator was detected while forced-colors was active.
  - Priority signals: impact: minor; confidence: low; 7 pages; 2 states
  - Fix scope: cross-page pattern across 7 pages. Check shared layout, routing, or design-system code before fixing pages one by one.
  - Affected: pages: http://localhost:3000/contact, http://localhost:3000/services, http://localhost:3000/projects/canex-creative-africa-nexus, +4 more; targets: [id="name"], [id="email"], [id="budget"], +18 more; states: Navigate: Contact, Click: Open Next.js Dev Tools; color schemes: light, dark
  - Fix: Make the focused control visible when system forced-colors or high-contrast mode is active.
  - Step 1: Use a real outline or border for :focus-visible instead of relying only on box-shadow or subtle color changes.
  - Step 2: Avoid removing outlines without replacing them with a high-contrast indicator.
  - Step 3: Test the control in Windows High Contrast or forced-colors emulation and confirm the focused item is obvious.
  - Docs: <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>, <https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html>

- **warning** `resize-text-200-risk` [WCAG 1.4.4 Resize Text, Level AA] (2 occurrences) user impact: minor users: Low-vision users, Users in bright environments type: needs review category: layout confidence: medium 60%: Review 200% resize-text behavior: 4 clipped text candidates.
  - Priority signals: impact: minor; confidence: medium
  - Fix scope: repeated local pattern; 2 related occurrences may share one page-level or component-level fix.
  - Affected: pages: http://localhost:3000/; targets: html; states: Initial page; color schemes: light, dark
  - Fix: Review whether content remains readable and operable when text or page zoom reaches 200%.
  - Step 1: Avoid fixed-height text containers, fixed-width cards, and clipped controls that break when text size increases.
  - Step 2: Let text wrap, increase available line height, and allow containers to grow without hiding labels, errors, or actions.
  - Step 3: Confirm manually at 200% browser zoom or equivalent text-size settings because automated checks can only flag layout risk signals.
  - Docs: <https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html>, <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>

- **warning** `text-spacing-resilience-risk` [WCAG 1.4.12 Text Spacing, Level AA] (2 occurrences) user impact: minor users: Low-vision users, Users in bright environments type: needs review category: layout confidence: medium 60%: Review text-spacing resilience: 4 clipped text candidates.
  - Priority signals: impact: minor; confidence: medium
  - Fix scope: repeated local pattern; 2 related occurrences may share one page-level or component-level fix.
  - Affected: pages: http://localhost:3000/; targets: html; states: Initial page; color schemes: light, dark
  - Fix: Review the mapped WCAG success criteria and fix the underlying accessibility requirement.
  - Step 1: Address WCAG 1.4.12 Text Spacing.
  - Docs: <https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html>

Showing 10 of 11 finding groups. See `a11y-report.json` for every finding and `a11y-report.html` for the visual report. Add CSV export only when spreadsheet triage is needed.

### Compliance Note

This report supports accessibility risk detection and remediation tracking. It does not certify legal compliance with ADA, Section 508, EN 301 549, EAA, or WCAG. Manual review, keyboard testing, screen reader testing, and organizational compliance review are required.
