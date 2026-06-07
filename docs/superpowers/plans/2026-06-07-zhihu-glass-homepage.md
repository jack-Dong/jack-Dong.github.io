# Zhihu Glass Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish all 11 current Zhihu articles on the personal homepage and refine the site into a readable, responsive glassmorphism design.

**Architecture:** Keep the existing dependency-free static site. Store article content in semantic HTML, centralize the glass visual system in CSS custom properties, and keep JavaScript limited to progressive scroll and navigation enhancements.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner.

---

### Task 1: Add Static Regression Tests

**Files:**
- Create: `tests/homepage.test.js`
- Test: `index.html`
- Test: `style.css`

- [ ] Add tests that read `index.html` and `style.css`, then assert the article count, all canonical title/link pairs, the profile link, `backdrop-filter`, responsive rules, and reduced-motion support.
- [ ] Run `node --test tests/homepage.test.js`.
- [ ] Confirm the suite fails because the page currently has eight cards, three missing articles, two incorrect links, and incomplete fallback/reduced-motion styling.

### Task 2: Rebuild the Zhihu Article Section

**Files:**
- Modify: `index.html`
- Test: `tests/homepage.test.js`

- [ ] Replace the existing essay cards with the 11 verified title/link pairs in current Zhihu order.
- [ ] Add article summaries, topic labels, latest markers, and a profile-level “查看全部文章” link.
- [ ] Run `node --test tests/homepage.test.js` and confirm the content assertions pass.

### Task 3: Refine the Glass Visual System

**Files:**
- Modify: `style.css`
- Modify: `script.js`
- Test: `tests/homepage.test.js`

- [ ] Replace the animated blob background with a restrained grid and broad color-band background.
- [ ] Apply consistent translucent surfaces, blur, borders, inner highlights, focus states, and card hover behavior.
- [ ] Add responsive article grids, mobile navigation behavior, `@supports` fallback, and `prefers-reduced-motion`.
- [ ] Remove blob injection from JavaScript and make the intersection observer unobserve revealed elements.
- [ ] Run `node --test tests/homepage.test.js` and confirm all assertions pass.

### Task 4: Browser Verification

**Files:**
- Verify: `index.html`
- Verify: `style.css`
- Verify: `script.js`

- [ ] Start a local static server.
- [ ] Open the homepage in the in-app browser and inspect desktop rendering.
- [ ] Inspect a mobile viewport for overflow, wrapping, and navigation usability.
- [ ] Check browser console errors and verify all 11 article links exist in the rendered DOM.
- [ ] Run the full static test suite once more and inspect `git diff --check`.
