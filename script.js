const form = document.getElementById('quote-form');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const endpoint = document.getElementById('endpoint').value; // берём URL из скрытого input вне формы
  const params = new URLSearchParams(new FormData(form));     // превращаем форму в формат для GAS

  statusEl.textContent = 'Sending…';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.ok === false) throw new Error(json.error || res.statusText);

    statusEl.textContent = 'Done! We will contact you soon.';
    form.reset();
  } catch (err) {
    statusEl.textContent = 'Submission failed: ' + String(err);
  }
});
