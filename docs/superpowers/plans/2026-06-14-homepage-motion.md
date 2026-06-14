# Homepage Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained but visible motion to the personal homepage without changing its content hierarchy or introducing dependencies.

**Architecture:** Extend the existing CSS visual system with ambient and component transitions. Keep the current IntersectionObserver, but gate hidden states behind a root `js` class and assign project-specific stagger variables.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner.

---

### Task 1: Lock Motion Requirements with Tests

**Files:**
- Modify: `tests/homepage.test.js`
- Test: `style.css`
- Test: `script.js`

- [ ] Assert ambient transitions, Hero entrance transitions, project child stagger selectors, and hover feedback exist.
- [ ] Assert hidden reveal states are scoped under `.js`.
- [ ] Assert reduced-motion rules disable ambient and entrance animations.
- [ ] Run `node --test tests/homepage.test.js` and confirm the motion assertions fail.

### Task 2: Add Progressive Motion Behavior

**Files:**
- Modify: `index.html`
- Modify: `script.js`
- Test: `tests/homepage.test.js`

- [ ] Add an early inline script that adds `js` to the root element.
- [ ] Expand observed elements to include section intros and supporting cards.
- [ ] Assign `--reveal-order` to project cases and `--item-order` to project outcomes and story cells.
- [ ] Preserve immediate visibility when IntersectionObserver is unavailable.

### Task 3: Build the Motion Visual System

**Files:**
- Modify: `style.css`
- Test: `tests/homepage.test.js`

- [ ] Add slow ambient background keyframes using body pseudo-elements.
- [ ] Add layered Hero entrance animations for text, actions, quick facts, portrait, and meta card.
- [ ] Enhance scroll reveal with opacity, translate, scale, and blur under `.js`.
- [ ] Add project case, outcome, and story-cell stagger transitions.
- [ ] Add restrained navigation, button, metric, and link hover feedback.
- [ ] Disable animations and delays under `prefers-reduced-motion`.

### Task 4: Verify Motion and Fallbacks

**Files:**
- Verify: `index.html`
- Verify: `style.css`
- Verify: `script.js`

- [ ] Run `node --test tests/homepage.test.js`, `node --check script.js`, and `git diff --check`.
- [ ] Reload the desktop page and inspect Hero entrance, ambient motion, project reveal, and hover states.
- [ ] Inspect a mobile viewport for overflow and readable animation pacing.
- [ ] Emulate reduced motion and verify content is immediately visible with ambient animation disabled.
- [ ] Confirm the browser console has no errors or warnings.
