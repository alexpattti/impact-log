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
// Footer: "CREATED MAY 2026 ⋅ UPDATED NOVEMBER 2026"
// "Updated" comes from when GitHub last published data.json, so it changes on its own every push.
const CREATED = 'May 2026';
function footerDate() {
  const els = document.querySelectorAll('.footer-date');
  if (!els.length) return;
  const show = d => {
    const updated = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    els.forEach(el => el.textContent = `Created ${CREATED} \u22C5 Updated ${updated}`.toUpperCase());
  };
  fetch('data.json', { method: 'HEAD', cache: 'no-store' })
    .then(r => {
      const lm = r.headers.get('Last-Modified');
      show(lm ? new Date(lm) : new Date(document.lastModified));
    })
    .catch(() => show(new Date(document.lastModified)));
}