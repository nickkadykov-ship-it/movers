# In and Out Movers — Pro Landing

Готовый лендинг с:
- 🌗 Переключателем темы (Dark/Light)
- 🌐 Двумя языками (EN/RU) и быстрым переключателем
- 🧾 Формой заявки с 2 вариантами отправки (Formspree или Google Apps Script)
- 📈 Google Analytics 4 (вставьте свой ID)
- 📦 Локальным SEO (Schema.org MovingCompany)

## Быстрый старт
1. Разверните папку на **Netlify/Vercel/Cloudflare Pages**.
2. В `index.html` замените `G-XXXXXXX` на ваш GA4 ID.
3. Подключите отправку формы ОДНИМ из способов:

### Вариант A — Formspree (самый простой)
1. Создайте форму на https://formspree.io (без кода).
2. Возьмите `Form ID` вида `https://formspree.io/f/abcdwxyz`.
3. В `index.html` в секции формы раскомментируйте строку
   ```html
   <input type="hidden" name="_formspree" value="https://formspree.io/f/YOUR_FORM_ID">
   ```

### Вариант B — Google Apps Script → Google Sheets + почта
1. Создайте Google Sheet (например, `Leads`).
2. Apps Script → Новый проект → вставьте код:
   ```javascript
   function doPost(e){
     const sheetId = 'PASTE_SHEET_ID';
     const ss = SpreadsheetApp.openById(sheetId);
     const sh = ss.getSheetByName('Sheet1') || ss.insertSheet('Sheet1');
     const data = e.parameter;
     sh.appendRow([new Date(), data.name, data.email, data.phone, data.date, data.from, data.to, data.details]);
     MailApp.sendEmail('you@domain.com', 'New Move Lead', JSON.stringify(data,null,2));
     return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
   }
   ```
3. Deploy → `Deploy as web app` → `Anyone` → получите URL.
4. В `index.html` в форме раскомментируйте и вставьте URL:
   ```html
   <input type="hidden" name="_endpoint" value="https://script.google.com/macros/s/DEPLOYMENT_ID/exec">
   ```

## Переключатель языка
Кнопка **RU/EN** меняет текст без перезагрузки. Добавить новые фразы можно в объекте `dict` в `script.js`.

## Переключатель темы
Кнопка **Light/Dark** меняет тему, стили строятся на CSS‑переменных.

## SEO
- Обновите `schema-json` (телефон, email, ссылки).
- Добавьте favicon и Open Graph изображения.

## Аналитика
- Вставьте GA4 ID в `<head>`.
- Событие `lead_submit` отправляется при успешной заявке.

Удачных запусков! 🚚
