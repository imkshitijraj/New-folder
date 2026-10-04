// Run before styles are painted. Storage may be unavailable in private contexts.
try {
  const saved = localStorage.getItem('kr_site_theme');
  document.documentElement.dataset.theme = saved === 'light' ? 'light' : 'dark';
} catch {
  document.documentElement.dataset.theme = 'dark';
}
