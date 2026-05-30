const themeSelect = document.querySelector<HTMLSelectElement>('#theme-select');
const savedTheme = localStorage.getItem('theme');

if (!themeSelect) {
  throw new Error('Theme selector was not found.');
}

themeSelect.value = savedTheme ?? 'system';

themeSelect.addEventListener('change', (event) => {
  const theme = (event.currentTarget as HTMLSelectElement).value;

  if (theme === 'system') {
    localStorage.removeItem('theme');
    delete document.documentElement.dataset.theme;
    return;
  }

  localStorage.setItem('theme', theme);
  document.documentElement.dataset.theme = theme;
});
