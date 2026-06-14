# Project-First Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder and redesign the static personal homepage so three equally weighted project case studies become the primary content while preserving research, writing, and accessibility.

**Architecture:** Keep the dependency-free single-page site. Express project content in semantic HTML, extend the existing glass visual system with reusable project-case classes, and retain JavaScript only for progressive reveal behavior.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner.

---

### Task 1: Add Project-First Regression Tests

**Files:**
- Modify: `tests/homepage.test.js`
- Test: `index.html`
- Test: `style.css`

- [ ] Add a test that asserts exactly three `project-case` articles and all four narrative labels in every case.
- [ ] Add a test that compares section positions and requires `projects < about < papers < zhihu-posts`.
- [ ] Add a test for the Hero project CTA and project responsive selectors.
- [ ] Run `node --test tests/homepage.test.js` and verify the new assertions fail because the current project markup and order are absent.

### Task 2: Rebuild Homepage Hierarchy and Project Cases

**Files:**
- Modify: `index.html`
- Test: `tests/homepage.test.js`

- [ ] Put the project navigation item first and add a Hero CTA targeting `#projects`.
- [ ] Move the project section directly after the Hero.
- [ ] Replace the three compact project cards with three semantic `project-case` articles.
- [ ] Give every case a domain label, summary, outcome metrics, tags, and four labeled story cells: 挑战、职责、方法、结果.
- [ ] Move papers before Zhihu posts while preserving all existing article, paper, patent, competition, and contact content.
- [ ] Run `node --test tests/homepage.test.js` and confirm structural tests pass.

### Task 3: Implement the Case-Study Visual System

**Files:**
- Modify: `style.css`
- Modify: `script.js`
- Test: `tests/homepage.test.js`

- [ ] Replace the three-column project grid with stacked two-column case cards.
- [ ] Style project introductions, metric tiles, story cells, labels, and tags using existing color and glass tokens.
- [ ] Add tablet and mobile rules that collapse cases and story grids without horizontal overflow.
- [ ] Include project sub-elements in reveal animation while preserving reduced-motion behavior.
- [ ] Run `node --test tests/homepage.test.js` and `node --check script.js`.

### Task 4: Verify the Finished Homepage

**Files:**
- Verify: `index.html`
- Verify: `style.css`
- Verify: `script.js`

- [ ] Run `node --test tests/homepage.test.js`, `node --check script.js`, and `git diff --check`.
- [ ] Serve the repository locally and inspect the desktop layout in the in-app browser.
- [ ] Inspect a mobile viewport for wrapping, ordering, navigation, and overflow.
- [ ] Check browser console errors and rendered counts for three project cases and eleven essay cards.
- [ ] Review the final diff against every requirement in the approved design specification.
