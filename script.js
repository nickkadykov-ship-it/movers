const $=s=>document.querySelector(s);
document.getElementById('year').textContent=new Date().getFullYear();

// Theme toggle
$('#theme-toggle').addEventListener('click',()=>{
  const html=document.documentElement;
  const isLight=html.getAttribute('data-theme')==='light';
  html.setAttribute('data-theme', isLight?'dark':'light');
  $('#theme-toggle').textContent=isLight?'Light':'Dark';
});

// i18n
const dict={
  en:{
    brand:'In and Out Movers',tagline:'Moving Made Easy',cta_quote:'Get a Quote',cta_call:'Call Us',
    about_title:'About Us',
    about_text:'Fast, reliable and affordable moving services across Boston and New England. Our trained crews pack, move and protect your belongings with care.',
    badge_fast:'Fast & Reliable',badge_affordable:'Affordable Rates',badge_care:'Careful Handling',badge_rated:'Highly Rated',
    services_title:'Services',
    s1_title:'Local Moving',s1_text:'Apartment & house moves within Greater Boston.',
    s2_title:'Long Distance',s2_text:'Licensed inter‑state moving, door to door.',
    s3_title:'Packing & Unpacking',s3_text:'Full or partial packing with quality supplies.',
    s4_title:'Storage',s4_text:'Short‑term and long‑term storage options.',
    s5_title:'Commercial',s5_text:'Office and retail relocations on your schedule.',
    s6_title:'Specialty Items',s6_text:'Pianos, safes and fragile items handling.',
    quote_title:'Get a Free Quote',
    f_name:'Name',f_email:'Email',f_phone:'Phone',f_date:'Move date',f_from:'From (City, ZIP)',f_to:'To (City, ZIP)',f_details:'Describe your move (home size, stairs, elevators, packing needs)…',
    btn_send:'Send Request',fineprint:'By submitting, you agree to be contacted about your quote.',
    testimonials_title:'Testimonials',testimonial:'“In and Out Movers made our move stress‑free and quick! Highly recommend.” — Sarah M.',
    contact_title:'Contact',c_phone_l:'Phone:',c_email_l:'Email:',c_area_l:'Service Area:',c_area_v:'Boston, MA & New England',rights:'All rights reserved'
  },
  ru:{
    brand:'In and Out Movers',tagline:'Переезд — легко',cta_quote:'Рассчитать цену',cta_call:'Позвонить',
    about_title:'О нас',
    about_text:'Быстрые, надёжные и доступные переезды по Бостону и Новой Англии. Аккуратно упакуем, перевезём и защитим ваши вещи.',
    badge_fast:'Быстро и надёжно',badge_affordable:'Честные цены',badge_care:'Аккуратная перевозка',badge_rated:'Высокие отзывы',
    services_title:'Услуги',
    s1_title:'Городские переезды',s1_text:'Квартиры и дома в пределах Большого Бостона.',
    s2_title:'Межштатные',s2_text:'Лицензированные перевозки “от двери до двери”.',
    s3_title:'Упаковка/Распаковка',s3_text:'Полная или частичная упаковка с материалами.',
    s4_title:'Хранение',s4_text:'Кратко‑ и долгосрочные склады.',
    s5_title:'Коммерческие',s5_text:'Офисы и ритейл в удобное время.',
    s6_title:'Нестандартные грузы',s6_text:'Пианино, сейфы и хрупкие предметы.',
    quote_title:'Бесплатный расчёт',
    f_name:'Имя',f_email:'Email',f_phone:'Телефон',f_date:'Дата переезда',f_from:'Откуда (Город, ZIP)',f_to:'Куда (Город, ZIP)',f_details:'Опишите переезд (площадь, этажи, лифты, упаковка)…',
    btn_send:'Отправить заявку',fineprint:'Отправляя форму, вы соглашаетесь на связь по вашей заявке.',
    testimonials_title:'Отзывы',testimonial:'«In and Out Movers сделали наш переезд лёгким и быстрым! Рекомендую.» — Sarah M.',
    contact_title:'Контакты',c_phone_l:'Телефон:',c_email_l:'Email:',c_area_l:'Зона обслуживания:',c_area_v:'Бостон и Новая Англия',rights:'Все права защищены'
  }
};
let lang='en';
function applyI18n(){
  const d=dict[lang];
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=d[el.dataset.i18n]});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.placeholder=d[el.dataset.i18nPlaceholder]});
}
$('#lang-toggle').addEventListener('click',()=>{
  lang = (lang==='en') ? 'ru' : 'en';
  $('#lang-toggle').textContent = (lang==='en') ? 'RU' : 'EN';
  applyI18n();
});
applyI18n();

// Form submit: supports Formspree or custom endpoint
const form=$('#quote-form');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const status=$('#form-status');
  status.textContent = (lang==='ru') ? 'Отправка…' : 'Sending…';
  const data = new FormData(form);
  // Option A: Formspree
  const formspree = form.querySelector('input[name="_formspree"]');
  const endpoint = form.querySelector('input[name="_endpoint"]');
  let url=null, method='POST';
  if(formspree){ url=formspree.value; }
  else if(endpoint){ url=endpoint.value; }
  else { // fallback: show data
    alert('Form data (demo):\n\n'+JSON.stringify(Object.fromEntries(data.entries()), null, 2));
    status.textContent = (lang==='ru') ? 'Готово (демо). Подключите Formspree или Apps Script.' : 'Done (demo). Connect Formspree or Apps Script.';
    return;
  }
  try{
    const res = await fetch(url, { method, body: data });
    if(!res.ok) throw new Error(res.statusText);
    form.reset();
    status.textContent = (lang==='ru') ? 'Спасибо! Мы свяжемся с вами.' : 'Thanks! We will contact you soon.';
    gtag('event','lead_submit',{event_category:'lead',event_label:'quote_form'});
  }catch(err){
    status.textContent = (lang==='ru') ? 'Ошибка отправки. Попробуйте позже.' : 'Submission failed. Please try again.';
  }
});
