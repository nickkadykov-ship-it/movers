const $=s=>document.querySelector(s);
document.getElementById?.('year') && (document.getElementById('year').textContent=new Date().getFullYear());

// Theme toggle
const themeBtn=document.getElementById('theme-toggle');
if(themeBtn){themeBtn.addEventListener('click',()=>{const h=document.documentElement;const l=h.getAttribute('data-theme')==='light';h.setAttribute('data-theme',l?'dark':'light');themeBtn.textContent=l?'Light':'Dark';});}

// i18n minimal
const dict={en:{cta_quote:'Get a Quote',cta_call:'Call Us',rights:'All rights reserved',btn_send:'Send Request',fineprint:'By submitting, you agree to be contacted about your quote.'},
ru:{cta_quote:'Рассчитать цену',cta_call:'Позвонить',rights:'Все права защищены',btn_send:'Отправить заявку',fineprint:'Отправляя форму, вы соглашаетесь на связь по вашей заявке.'}};
let lang='en';
function applyI18n(){const d=dict[lang];document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;d[k]&&(el.textContent=d[k])});document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{const k=el.dataset.i18nPlaceholder;d[k]&&(el.placeholder=d[k])});}
const langBtn=document.getElementById('lang-toggle');if(langBtn){langBtn.addEventListener('click',()=>{lang=lang==='en'?'ru':'en';langBtn.textContent=lang==='en'?'RU':'EN';applyI18n();});applyI18n();}

// Quote form with Google Apps Script
const form=document.getElementById('quote-form');
if(form){form.addEventListener('submit',async e=>{e.preventDefault();const status=document.getElementById('form-status');status&&(status.textContent=lang==='ru'?'Отправка…':'Sending…');const data=new FormData(form);
  const endpoint = form.querySelector('input[name="_endpoint"]');
  const url = endpoint ? endpoint.value : 'https://script.google.com/macros/s/AKfycbyn1aInI3SAVJFJNry9ta8DfaFX-yXPiJ7Anhg_briO-33yUa9X6Hq8sWIBUnnv7LYH/exec';
  try{const res=await fetch(url,{method:'POST',body:data,headers:{'Accept':'application/json'}});if(!res.ok)throw new Error(res.statusText);form.reset();status&&(status.textContent=lang==='ru'?'Спасибо! Мы свяжемся с вами.':'Thanks! We will contact you soon.');window.gtag&&gtag('event','lead_submit',{event_category:'lead',event_label:'quote_form'});}
  catch(err){status&&(status.textContent=lang==='ru'?'Ошибка отправки. Попробуйте позже.':'Submission failed. Please try again.');}
});}

// Active nav
(function(){const p=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav a.link').forEach(a=>{const h=a.getAttribute('href');if(h&&h.endsWith(p))a.classList.add('active')})})();
