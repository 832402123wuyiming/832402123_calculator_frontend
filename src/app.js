/* UI and HTTP requests only. All mathematical results come from the API. */
const config = window.CALCULATOR_CONFIG || {};
const apiBase = (config.apiBaseUrl || 'http://localhost:3000').replace(/\/$/, '');
const expression = document.querySelector('#expression');
const result = document.querySelector('#result');
const message = document.querySelector('#message');
const status = document.querySelector('#connection-status');
const calculateButton = document.querySelector('#calculate-button');
const historyList = document.querySelector('#history-list');
const searchInput = document.querySelector('#history-search');
const previousButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');
let page = 1;
let total = 0;
let historyRequest = 0;
let searchTimer;
let calculating = false;

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle('error', isError);
}

async function api(path, options = {}) {
  try {
    const response = await fetch(`${apiBase}${path}`, {
      ...options,
      signal: AbortSignal.timeout(10000),
      headers: {...(options.body ? {'Content-Type': 'application/json'} : {}), ...options.headers},
    });
    const data = await response.json();
    status.textContent = 'API connected';
    status.className = 'connection online';
    if (!response.ok || !data.success) throw new Error(data.message || 'The request failed.');
    return data;
  } catch (error) {
    if (error instanceof TypeError || ['TimeoutError', 'AbortError'].includes(error.name)) {
      status.textContent = 'API unavailable';
      status.className = 'connection offline';
      throw new Error('Cannot reach the API. Check the back-end service and API URL.');
    }
    throw error;
  }
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

async function loadHistory() {
  const requestId = ++historyRequest;
  try {
    const query = new URLSearchParams({page: String(page), limit: '5', search: searchInput.value});
    const data = await api(`/api/history?${query}`);
    if (requestId !== historyRequest) return;
    total = data.total;
    const pages = Math.max(1, Math.ceil(total / 5));
    if (page > pages) { page = pages; await loadHistory(); return; }
    document.querySelector('#history-count').textContent = String(total);
    document.querySelector('#page-label').textContent = `Page ${page} of ${pages}`;
    previousButton.disabled = page <= 1;
    nextButton.disabled = page >= pages;
    historyList.replaceChildren();
    if (!data.items.length) {
      historyList.append(element('div', 'empty-state', searchInput.value ? 'No matching calculations.' : 'A fresh start.\nYour calculations will appear here.'));
    }
    for (const record of data.items) {
      const row = element('div', 'history-row');
      row.dataset.id = record.id;
      const content = element('div', 'record-content');
      const reuse = element('button', 'record-expression', record.expression);
      reuse.type = 'button';
      reuse.title = 'Reuse this expression';
      reuse.addEventListener('click', () => {
        expression.value = record.expression;
        result.textContent = '—';
        showMessage('Expression restored. Press Enter to calculate again.');
        expression.focus();
      });
      const time = element('div', 'record-time', new Date(record.created_at).toLocaleString('en-GB'));
      time.title = record.created_at;
      content.append(reuse, element('div', 'record-result', `= ${record.result}`), time);
      const remove = element('button', 'delete-button', 'Delete');
      remove.type = 'button';
      remove.setAttribute('aria-label', `Delete calculation ${record.expression}`);
      remove.addEventListener('click', async () => {
        remove.disabled = true;
        try {
          await api(`/api/history/${record.id}`, {method: 'DELETE'});
          showMessage('History record deleted from the database.');
          await loadHistory();
        } catch (error) {
          showMessage(error.message, true);
          remove.disabled = false;
        }
      });
      row.append(content, remove);
      historyList.append(row);
    }
  } catch (error) {
    if (requestId !== historyRequest) return;
    historyList.replaceChildren(element('div', 'empty-state', error.message));
    previousButton.disabled = true;
    nextButton.disabled = true;
    showMessage(error.message, true);
  }
}

document.querySelector('#calculate-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (calculating) return;
  calculating = true;
  calculateButton.disabled = true;
  result.textContent = '—';
  showMessage('Calculating on the server…');
  try {
    const data = await api('/api/calculate', {method: 'POST', body: JSON.stringify({expression: expression.value})});
    result.textContent = data.result;
    showMessage('Calculated by the API and saved to SQLite.');
    page = 1;
    await loadHistory();
  } catch (error) {
    showMessage(error.message, true);
  } finally {
    calculating = false;
    calculateButton.disabled = false;
  }
});

expression.addEventListener('input', () => {
  if (!calculating) { result.textContent = '—'; showMessage('Ready to calculate.'); }
});
document.querySelector('.keypad').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button || button.type === 'submit') return;
  if (button.dataset.action === 'clear') {
    expression.value = '';
    result.textContent = '—';
    showMessage('Enter an expression to get started.');
  } else {
    const start = expression.selectionStart ?? expression.value.length;
    const end = expression.selectionEnd ?? start;
    if (button.dataset.action === 'backspace') {
      expression.setRangeText('', start === end ? Math.max(0, start - 1) : start, end, 'end');
    } else if (expression.value.length - (end - start) < 256) {
      expression.setRangeText(button.dataset.value, start, end, 'end');
    }
    result.textContent = '—';
    showMessage('Ready to calculate.');
  }
  expression.focus();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.activeElement === expression) {
    event.preventDefault();
    document.querySelector('[data-action="clear"]').click();
  }
});
document.querySelector('#refresh-button').addEventListener('click', loadHistory);
previousButton.addEventListener('click', () => { page -= 1; loadHistory(); });
nextButton.addEventListener('click', () => { page += 1; loadHistory(); });
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { page = 1; loadHistory(); }, 250);
});
const themeButton = document.querySelector('#theme-button');
try { document.body.classList.toggle('dark', localStorage.getItem('calculator-theme') === 'dark'); } catch {}
function updateThemeButton() { themeButton.textContent = document.body.classList.contains('dark') ? 'Light theme' : 'Dark theme'; }
updateThemeButton();
themeButton.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  try { localStorage.setItem('calculator-theme', dark ? 'dark' : 'light'); } catch {}
  updateThemeButton();
});
loadHistory();
