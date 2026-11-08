const CATEGORIES = {
  'automation': { name: 'Gumloop Automations', sub: 'Agents that run Salesforce work on their own.' },
  'data-ops':   { name: 'Salesforce Data Operations', sub: 'Cleanup, backfills, audits and reports.' },
  'misc':       { name: 'Miscellaneous Achievements', sub: 'Memos, deliverables and everything else.' }
};
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function loadData() {
  return fetch('data.json').then(r => r.json()).then(d => {
    const items = [...(d.projects || []), ...(d.deliverables || []).map(x => ({ ...x, kind: 'deliverable' }))];
    items.forEach(i => { if (!i.category) i.category = i.kind === 'deliverable' ? 'misc' : 'data-ops'; });
    return items;
  });
}
function footerDate() {
  const el = document.getElementById('footer-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
}