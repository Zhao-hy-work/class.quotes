// 名言内容保留在 HTML 中；JavaScript 只控制筛选和随机选择。
const quotes = Array.from(document.querySelectorAll('.quote'));
const languageFilter = document.getElementById('language-filter');
const randomButton = document.getElementById('random-quote');
const quoteStatus = document.getElementById('quote-status');
let lastQuote = null;

function visibleQuotes() {
  return quotes.filter(function (quote) {
    return !quote.hidden;
  });
}

languageFilter.addEventListener('change', function () {
  const language = languageFilter.value;

  quotes.forEach(function (quote) {
    quote.hidden = language !== 'all' && quote.dataset.language !== language;
    quote.classList.remove('is-highlighted');
  });

  lastQuote = null;
  const count = visibleQuotes().length;
  const label = languageFilter.options[languageFilter.selectedIndex].text;
  quoteStatus.textContent = count + ' quotes · ' + label;
  randomButton.disabled = count === 0;
});

randomButton.addEventListener('click', function () {
  const visible = visibleQuotes();
  if (visible.length === 0) return;

  // 从当前筛选结果中随机选一条；有多条时避免连续选中同一条。
  const candidates = visible.length > 1
    ? visible.filter(function (quote) { return quote !== lastQuote; })
    : visible;
  const index = Math.floor(Math.random() * candidates.length);
  const selected = candidates[index];

  quotes.forEach(function (quote) {
    quote.classList.remove('is-highlighted');
  });
  selected.classList.add('is-highlighted');
  selected.focus({ preventScroll: true });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  selected.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'center' });
  quoteStatus.textContent = 'Selected ' + selected.getAttribute('aria-label') + ' · ' + visible.length + ' quotes in this collection';
  lastQuote = selected;
});

languageFilter.disabled = false;
randomButton.disabled = false;
