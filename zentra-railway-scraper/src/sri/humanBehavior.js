function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function humanDelay(min = 300, max = 1200) {
  await sleep(randomBetween(min, max));
}

async function humanType(page, selector, text, options = {}) {
  const { minDelay = 50, maxDelay = 180, clearFirst = false } = options;

  await page.waitForSelector(selector, { visible: true });
  await page.click(selector);

  if (clearFirst) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.value = '';
    }, selector);
  }

  for (const char of text) {
    await page.type(selector, char, { delay: randomBetween(minDelay, maxDelay) });
    if (Math.random() < 0.08) {
      await humanDelay(80, 250);
    }
  }
}

async function humanScroll(page, options = {}) {
  const { direction = 'down', distance = null, steps = null } = options;
  const scrollDistance = distance ?? randomBetween(120, 420);
  const scrollSteps = steps ?? randomBetween(3, 8);
  const stepSize = Math.round(scrollDistance / scrollSteps);
  const delta = direction === 'up' ? -stepSize : stepSize;

  for (let i = 0; i < scrollSteps; i += 1) {
    await page.evaluate((amount) => {
      window.scrollBy({ top: amount, left: 0, behavior: 'smooth' });
    }, delta);
    await humanDelay(120, 400);
  }
}

async function humanMouseMove(page, options = {}) {
  const { x = null, y = null } = options;
  const viewport = page.viewport() || { width: 1366, height: 768 };
  const targetX = x ?? randomBetween(80, viewport.width - 80);
  const targetY = y ?? randomBetween(80, viewport.height - 80);
  const steps = randomBetween(8, 18);

  const start = await page.evaluate(() => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }));

  for (let i = 1; i <= steps; i += 1) {
    const progress = i / steps;
    const eased = progress * progress * (3 - 2 * progress);
    const currentX = Math.round(start.x + (targetX - start.x) * eased);
    const currentY = Math.round(start.y + (targetY - start.y) * eased);

    await page.mouse.move(currentX, currentY);
    await sleep(randomBetween(15, 45));
  }

  await humanDelay(100, 300);
}

module.exports = {
  humanDelay,
  humanType,
  humanScroll,
  humanMouseMove,
};
