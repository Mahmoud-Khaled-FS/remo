export const commandsAnswer = {
  start: {
    en: `Hi %%!👋 
I'm Remo, your new friend who shares with you movies, I can help you to find the movie you're looking for, and give you some information about these movies. 
Start now by sending me your favourite movie name preceded by m:
Ex. M: Avengers Endgame 
For more commands, use /help command by default language "English", you can change it to "Arabic" with /setlang command
#version 0.4beta
Join our group to communicate with the programmer or report bugs.
https://t.me/+Y6zhcvygMfgxNzc8
',
ar: 'اهلا %%`,
    ar: `مرحبا %%!👋
أنا ريمو، صديقتك الجديدة الذي تشاركك الأفلام، يمكنني مساعدتك في العثور على الفيلم الذي تبحث عنه وإعطائك بعض المعلومات حول هذه الأفلام.
ابدأ الآن بإرسال اسم فيلمك المفضل مسبقًا بـ m:
علي سبيل المثال m: Avengers Endgame
لمزيد من الأوامر، استخدم help/ الأمر افتراضيًا، تم تعيينه على «الإنجليزية»، يمكنك تغييره إلى «العربية» بأمر /setlang
انضم إلى مجموعتنا للتواصل مع المبرمج أو الإبلاغ عن الأخطاء.
https://t.me/+Y6zhcvygMfgxNzc8
`,
  },
};

export const messageAnswer = {
  movieMessage: {
    en: `<b>%%</b>
----------------------------
Overview:
%%
----------------------------
<b>%%</b>
    
Rating: <b>%%</b>
Popularity: <b>%%</b>
Relase date: <b>%%</b>
Adult: <b>%%</b>
Original language: <b>%%</b>`,
    ar: `<b>%%</b>
----------------------------
قصة الفيلم:
%%
----------------------------
<b>%%</b>

تقيم: <b>%%</b>
الشعبية: <b>%%</b>
تاريخ العرض: <b>%%</b>
للكبار: <b>%%</b>
لغة الفيلم: <b>%%</b>`,
  },
  listMoviesMessage: {
    en: `Result: <b>%%</b>

%%`,
    ar: `النتائج: <b>%%</b>

%%`,
  },
};
