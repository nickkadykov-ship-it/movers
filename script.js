const form=document.getElementById('quote-form');
const statusEl=document.getElementById('form-status');
function show(msg){ if(statusEl){ statusEl.textContent = msg; } }
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    show('Sending…');
    const endpoint = document.getElementById('endpoint').value;
    const params = new URLSearchParams(new FormData(form));
    try{
      const res = await fetch(endpoint, {
        method:'POST',
        headers:{ 'Accept':'application/json', 'Content-Type':'application/x-www-form-urlencoded' },
        body: params
      });
      const text = await res.text();
      try{
        const json = JSON.parse(text);
        if(!res.ok || json.ok===false){ throw new Error(json.error || res.statusText); }
        show('OK! Row should be in Google Sheet now.');
      }catch(_){
        if(!res.ok){ throw new Error('HTTP '+res.status); }
        show('Received non‑JSON response:\n'+text);
      }
      form.reset();
    }catch(err){
      show('Submission failed: '+String(err));
    }
  });
}
