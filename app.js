(() => {
  const commands = Array.isArray(window.COMMANDS) ? window.COMMANDS : [];
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const list = document.getElementById('command-list');
  const empty = document.getElementById('empty-state');
  const totalCount = document.getElementById('total-count');
  const shownCount = document.getElementById('shown-count');
  const botCount = document.getElementById('bot-count');
  const toast = document.getElementById('toast');
  let activeBot = 'All';
  let toastTimer;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  })[ch]);
  const botClass = bot => bot === 'Nightbot' ? 'nightbot' : bot === 'StreamElements' ? 'streamelements' : '';
  const bots = [...new Set(commands.map(c => c.bot).filter(Boolean))];
  totalCount.textContent = commands.length;
  botCount.textContent = bots.length;

  [...new Set(commands.map(c => c.category || 'Other'))].sort().forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const filtered = commands.filter(c => {
      const matchesBot = activeBot === 'All' || c.bot === activeBot;
      const matchesCategory = category === 'All' || (c.category || 'Other') === category;
      const haystack = [c.name, c.bot, c.category, c.description, c.copyText].join(' ').toLowerCase();
      return matchesBot && matchesCategory && haystack.includes(query);
    });
    list.innerHTML = filtered.map((c, index) => `
      <article class="command-card">
        <div class="card-top">
          <div class="command-name">${esc(c.name)}</div>
          <span class="bot-pill ${botClass(c.bot)}">${esc(c.bot)}</span>
        </div>
        <p class="card-desc">${esc(c.description || 'No description added yet.')}</p>
        <div class="card-meta">
          <span class="category-pill">${esc(c.category || 'Other')}</span>
          ${c.example ? '<span class="example-pill">✦ EXAMPLE</span>' : ''}
        </div>
        <div class="copy-row">
          <div class="copy-preview" title="${esc(c.copyText || c.name)}">${esc(c.copyText || c.name)}</div>
          <button class="copy-btn" type="button" data-copy-index="${commands.indexOf(c)}">♡ Copy command</button>
        </div>
      </article>`).join('');
    empty.hidden = filtered.length !== 0;
    list.hidden = filtered.length === 0;
    shownCount.textContent = filtered.length;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  list.addEventListener('click', async event => {
    const button = event.target.closest('[data-copy-index]');
    if (!button) return;
    const command = commands[Number(button.dataset.copyIndex)];
    if (!command) return;
    const text = command.copyText || command.name;
    try {
      await navigator.clipboard.writeText(text);
      showToast('♡ Copied to clipboard!');
    } catch (_) {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      showToast(copied ? '♡ Copied to clipboard!' : 'Copy failed — select the command text manually.');
    }
  });

  document.getElementById('bot-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-bot]');
    if (!button) return;
    activeBot = button.dataset.bot;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn === button));
    render();
  });
  searchInput.addEventListener('input', render);
  categoryFilter.addEventListener('change', render);
  document.getElementById('reset-filters').addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = 'All';
    activeBot = 'All';
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.bot === 'All'));
    render();
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      event.preventDefault(); searchInput.focus();
    }
    if (event.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = ''; render(); searchInput.blur();
    }
  });
  render();
})();
