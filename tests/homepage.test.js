const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const expectedArticles = [
  ['世界模型的N种用法', 'https://zhuanlan.zhihu.com/p/2030402224220786815'],
  ['AutoResearch自主研究范式', 'https://zhuanlan.zhihu.com/p/2026773441034864070'],
  ['大模型时代强化学习的收敛优势：从先验知识到优化曲面的深度解析', 'https://zhuanlan.zhihu.com/p/2021730272870241321'],
  ['大模型驱动的算法工程范式转移', 'https://zhuanlan.zhihu.com/p/2018813300662649884'],
  ['自动驾驶世界模型的深度演进：架构、因果推理与物理人工智能的工程范式', 'https://zhuanlan.zhihu.com/p/2018477330725631678'],
  ['数据闭环产线架构设计：支撑人工智能2.0的工业化范式', 'https://zhuanlan.zhihu.com/p/2018112074199377659'],
  ['具身智能的范式演进：VLA路线的有用性争鸣与技术实现', 'https://zhuanlan.zhihu.com/p/2016998151173723743'],
  ['从动作奇点到具身智能：2026年大模型演进逻辑与人形机器人终极形态', 'https://zhuanlan.zhihu.com/p/2016625791753015824'],
  ['LLM之我见', 'https://zhuanlan.zhihu.com/p/640882729'],
  ['用二进制编码代替one-hot编码训练分类器', 'https://zhuanlan.zhihu.com/p/338274678'],
  ['图像分割的难点在哪里？', 'https://zhuanlan.zhihu.com/p/72743589'],
];

test('renders every current Zhihu article exactly once', () => {
  const cards = html.match(/<article class="essay-card/g) || [];
  assert.equal(cards.length, expectedArticles.length);

  for (const [title, href] of expectedArticles) {
    const titlePattern = new RegExp(`<h3>${escapeRegExp(title)}</h3>`, 'g');
    assert.equal(html.match(titlePattern)?.length || 0, 1, `expected one heading: ${title}`);
    assert.equal(html.split(href).length - 1, 1, `expected one link: ${href}`);
  }
});

test('links to the full Zhihu posts profile', () => {
  assert.match(
    html,
    /href="https:\/\/www\.zhihu\.com\/people\/dongshizhou\/posts"/,
  );
});

test('defines glass surfaces with responsive and accessibility fallbacks', () => {
  assert.match(css, /backdrop-filter:\s*blur\(/);
  assert.match(css, /-webkit-backdrop-filter:\s*blur\(/);
  assert.match(css, /@supports\s+not\s+\(\s*backdrop-filter:/);
  assert.match(css, /@media\s+\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /:focus-visible/);
});

test('renders three complete project case studies', () => {
  const projectCases = html.match(/<article class="project-case"/g) || [];
  assert.equal(projectCases.length, 3);

  const projectsSection = html.slice(
    html.indexOf('<section class="section project-section" id="projects">'),
    html.indexOf('<section class="section grid two-column" id="about">'),
  );

  for (const label of ['挑战', '职责', '方法', '结果']) {
    const matches = projectsSection.match(new RegExp(`<b>${label}</b>`, 'g')) || [];
    assert.equal(matches.length, 3, `expected every project to include ${label}`);
  }
});

test('puts projects before experience, papers, and writing', () => {
  const projectsIndex = html.indexOf('id="projects"');
  const aboutIndex = html.indexOf('id="about"');
  const papersIndex = html.indexOf('id="papers"');
  const writingIndex = html.indexOf('id="zhihu-posts"');

  assert.ok(projectsIndex > -1);
  assert.ok(projectsIndex < aboutIndex);
  assert.ok(aboutIndex < papersIndex);
  assert.ok(papersIndex < writingIndex);
});

test('links the hero to projects and defines responsive case layouts', () => {
  assert.match(html, /class="button"\s+href="#projects"/);
  assert.match(css, /\.project-case\s*\{/);
  assert.match(css, /\.case-story\s*\{/);
  assert.match(css, /@media\s+\(max-width:\s*760px\)[\s\S]*\.project-case/);
});

test('defines ambient and layered entrance motion', () => {
  assert.doesNotMatch(css, /@keyframes\s+ambient-drift/);
  assert.match(css, /body::after\s*\{[^}]*transition:[^;}]*transform/);
  assert.match(css, /\.page-ready\s+body::after\s*\{[^}]*transform:/);
  assert.doesNotMatch(css, /animation:\s*hero-rise/);
  assert.match(css, /\.js\s+\.hero\s+\.eyebrow,[\s\S]*?\{[^}]*transition:[^;}]*transform/);
  assert.match(css, /\.js\.page-ready\s+\.hero\s+\.eyebrow,[\s\S]*?\{[^}]*transform:\s*none/);
});

test('progressively reveals projects and their internal content', () => {
  assert.match(html, /document\.documentElement\.classList\.add\('js'\)/);
  assert.match(css, /\.js\s+\.animate-on-scroll/);
  assert.match(css, /\.project-case\.visible\s+\.outcome/);
  assert.match(css, /\.project-case\.visible\s+\.story-cell/);
  assert.match(script, /--reveal-order/);
  assert.match(script, /--item-order/);
});

test('disables decorative motion for reduced-motion users', () => {
  const reducedMotion = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(reducedMotion, /body::after/);
  assert.match(reducedMotion, /animation:\s*none\s*!important/);
  assert.match(reducedMotion, /transition-delay:\s*0ms\s*!important/);
});
