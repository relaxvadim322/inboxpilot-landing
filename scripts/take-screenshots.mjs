/**
 * Visual QA screenshot script
 * Takes before/after screenshots for PR #1 visual comparison
 *
 * Usage: node scripts/take-screenshots.mjs
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const BEFORE_URL = 'http://localhost:4322';
const AFTER_URL  = 'http://localhost:4323';

const BEFORE_DIR = join(ROOT, 'docs/visual-review/before');
const AFTER_DIR  = join(ROOT, 'docs/visual-review/after');

mkdirSync(BEFORE_DIR, { recursive: true });
mkdirSync(AFTER_DIR,  { recursive: true });

// Viewports for full-page passes
const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1280', width: 1280, height: 900 },
  { name: 'tablet-768',   width: 768,  height: 1024 },
  { name: 'mobile-375',   width: 375,  height: 812 },
];

// Sections to screenshot individually (at 1280px)
const SECTIONS = [
  { name: 'hero',        selector: '.hero' },
  { name: 'truststrip',  selector: '.trust-strip-section' },
  { name: 'problem',     selector: '#problem' },
  { name: 'whatwedo',    selector: '#how-it-works' },
  { name: 'benefits',    selector: '.section:has(.featured-outcomes)' },
  { name: 'whatyouget',  selector: '#what-you-get' },
  { name: 'pricing',     selector: '#pricing' },
];

async function shoot(page, outPath, options = {}) {
  await page.screenshot({ path: outPath, fullPage: false, ...options });
  console.log(`  ✓ ${outPath.replace(ROOT, '.')}`);
}

async function shootSection(page, selector, outPath) {
  try {
    const el = await page.locator(selector).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await el.screenshot({ path: outPath });
    console.log(`  ✓ ${outPath.replace(ROOT, '.')}`);
  } catch (e) {
    // fallback: viewport screenshot after scroll
    await page.locator(selector).first().scrollIntoViewIfNeeded().catch(() => {});
    await shoot(page, outPath);
    console.log(`  ⚠ fallback for ${selector}`);
  }
}

async function runVersion(browser, baseUrl, outDir, label) {
  console.log(`\n📸 ${label} — ${baseUrl}\n`);

  // ── Full-page viewport screenshots at each width ──
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Top (above fold)
    await shoot(page, join(outDir, `${vp.name}-top.png`));

    // Mid scroll
    await page.evaluate(() => window.scrollTo(0, 2400));
    await page.waitForTimeout(200);
    await shoot(page, join(outDir, `${vp.name}-mid.png`));

    // Bottom scroll
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(200);
    await shoot(page, join(outDir, `${vp.name}-bottom.png`));

    await page.close();
  }

  // ── Section screenshots at 1280px ──
  const sectionPage = await browser.newPage();
  await sectionPage.setViewportSize({ width: 1280, height: 900 });
  await sectionPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await sectionPage.waitForTimeout(500);

  for (const section of SECTIONS) {
    await shootSection(sectionPage, section.selector, join(outDir, `section-${section.name}.png`));
  }

  // ── Mobile 375px — full walkthrough ──
  const mobilePage = await browser.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);

  const mobileScrolls = [
    { name: 'hero', y: 0 },
    { name: 'truststrip', y: 900 },
    { name: 'problem', y: 1700 },
    { name: 'whatwedo', y: 3200 },
    { name: 'benefits', y: 4400 },
    { name: 'process', y: 5600 },
    { name: 'whatyouget', y: 6800 },
    { name: 'beforeafter', y: 8200 },
    { name: 'cases', y: 9600 },
    { name: 'pricing', y: 11000 },
    { name: 'forwho', y: 12400 },
    { name: 'faq', y: 13800 },
    { name: 'finalcta', y: 15200 },
  ];

  for (const s of mobileScrolls) {
    await mobilePage.evaluate((y) => window.scrollTo(0, y), s.y);
    await mobilePage.waitForTimeout(200);
    await shoot(mobilePage, join(outDir, `mobile-${s.name}.png`));
  }

  await sectionPage.close();
  await mobilePage.close();
}

async function checkAnchors(browser, baseUrl) {
  console.log(`\n🔗 Anchor check — ${baseUrl}\n`);
  const anchors = [
    { label: 'Проблема',    href: '#problem' },
    { label: 'Как работает', href: '#how-it-works' },
    { label: 'Что входит',  href: '#what-you-get' },
    { label: 'Примеры',     href: '#cases' },
    { label: 'FAQ',         href: '#faq' },
  ];

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  const results = [];
  for (const { label, href } of anchors) {
    const selector = href;
    const el = await page.locator(selector).first();
    const visible = await el.isVisible().catch(() => false);
    const count = await page.locator(selector).count();
    results.push({ label, href, found: count > 0, visible });
    console.log(`  ${count > 0 ? '✓' : '✗'} ${label} (${href}) — ${count > 0 ? 'found' : 'MISSING'}`);
  }

  await page.close();
  return results;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    await runVersion(browser, BEFORE_URL, BEFORE_DIR, 'BEFORE (master)');
    await runVersion(browser, AFTER_URL,  AFTER_DIR,  'AFTER (feature/visual-redesign)');

    console.log('\n🔗 Anchor navigation check\n');
    const beforeAnchors = await checkAnchors(browser, BEFORE_URL);
    const afterAnchors  = await checkAnchors(browser, AFTER_URL);

    console.log('\n✅ All screenshots done.');
    console.log(`   Before: ${BEFORE_DIR.replace(ROOT, '.')}`);
    console.log(`   After:  ${AFTER_DIR.replace(ROOT, '.')}`);

    // Return anchor results for README
    return { beforeAnchors, afterAnchors };
  } finally {
    await browser.close();
  }
}

main().catch(e => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
