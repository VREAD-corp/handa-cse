// Renders docs/../site/assets/og.png (1200x630) from the real home hero. Needs the local server (npm run serve).
import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.goto('http://localhost:4820/handa-cse/');
await p.addStyleTag({ content: 'header.top{display:none}main{padding-top:34px}.hero{gap:36px}' });
await p.screenshot({ path: new URL('../site/assets/og.png', import.meta.url).pathname });
await b.close();
