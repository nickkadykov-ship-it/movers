// Minimal site JS: nav highlight + form submit
(function(){const p=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav a.link').forEach(a=>{const h=a.getAttribute('href');if(h&&h.endsWith(p))a.classList.add('active')})})();

const form=document.getElementById('quote-form');
const statusEl=document.getElementById('form-status');
function setStatus(msg){ if(statusEl) statusEl.textContent=msg; }

if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    setStatus('Sending…');
    const endpoint=document.getElementById('endpoint').value;
    const params=new URLSearchParams(new FormData(form));
    try{
      const res=await fetch(endpoint,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/x-www-form-urlencoded'},body:params});
      const text=await res.text();
      try{
        const json=JSON.parse(text);
        if(!res.ok || json.ok===false) throw new Error(json.error||res.statusText);
        setStatus('Thanks! We will contact you soon.');
        form.reset();
      }catch(_){
        if(!res.ok) throw new Error('HTTP '+res.status);
        setStatus('Received non‑JSON response: '+text);
      }
    }catch(err){
      setStatus('Submission failed: '+String(err));
    }
  });
}