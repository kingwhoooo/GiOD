const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");
const stackSections = document.querySelectorAll(".section-stack");
const langButtons = document.querySelectorAll(".lang-button");
const themeToggle = document.querySelector(".theme-toggle");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const ariaLabelNodes = document.querySelectorAll("[data-i18n-aria-label]");
const metaDescription = document.querySelector('meta[name="description"]');
const langSwitcher = document.querySelector(".lang-switcher");
const heroSection = document.querySelector(".hero");
const heroCopy = document.querySelector(".hero-copy");
const heroPanel = document.querySelector(".hero-panel");
const scrollShells = document.querySelectorAll(".section-shell");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const LANGUAGE_STORAGE_KEY = "site-language";
const THEME_STORAGE_KEY = "site-theme";
const MOBILE_HEADER_BREAKPOINT = 760;
const MOBILE_HEADER_COMPACT_OFFSET = 48;
const MOBILE_HEADER_HIDE_OFFSET = 110;
const MOBILE_HEADER_HIDE_DELTA = 10;
const MOBILE_HEADER_SHOW_DELTA = 6;

const translations = {
  ru: {
    "site.title": "Цикл гуманитарных и общеобразовательных дисциплин",
    "meta.description": "Сайт-визитка цикла гуманитарных и общеобразовательных дисциплин Военного колледжа.",
    "lang.switcherAria": "Переключение языка",
    "brand.homeAria": "На главную",
    "brand.college": "Военный колледж",
    "brand.cycle": "Цикл гуманитарных и общеобразовательных дисциплин",
    "nav.aria": "Основная навигация",
    "nav.about": "О цикле",
    "nav.disciplines": "Дисциплины",
    "nav.teachers": "Преподаватели",
    "nav.activity": "Деятельность",
    "nav.events": "События",
    "nav.contacts": "Контакты",
    "menu.toggle": "Меню",
    "hero.eyebrow": "Сайт-визитка структурного подразделения",
    "hero.title": "Цикл гуманитарных и общеобразовательных дисциплин",
    "hero.text": "Цикл обеспечивает гуманитарную, языковую и общеобразовательную подготовку кадетов, формируя широкий кругозор, гражданскую ответственность, культуру речи и уважение к историческим и духовным ценностям.",
    "hero.primary": "Преподавательский состав",
    "hero.secondary": "Связаться с циклом",
    "hero.point1": "Подготовка кадетов по гуманитарным и общеобразовательным направлениям",
    "hero.point2": "Методическая, воспитательная и исследовательская работа",
    "hero.point3": "Поддержка олимпиад, конференций и тематических мероприятий",
    "hero.status": "Учебное подразделение колледжа",
    "hero.taskLabel": "Основная задача",
    "hero.taskText": "Формирование образованного, дисциплинированного и нравственно устойчивого кадета",
    "hero.workLabel": "Направления работы",
    "hero.workText": "Учебная, методическая, воспитательная и внеаудиторная деятельность",
    "hero.audienceLabel": "Для кого сайт",
    "hero.audienceText": "Кадеты, родители, преподаватели и администрация колледжа",
    "hero.footerHead": "Руководитель цикла: ФИО",
    "hero.footerRoom": "Кабинет: № 000",
    "about.eyebrow": "О цикле",
    "about.title": "Назначение и роль цикла в подготовке кадетов",
    "about.text1": "Цикл гуманитарных и общеобразовательных дисциплин координирует преподавание предметов, которые развивают мышление, языковую грамотность, правовую и историческую культуру, а также поддерживают воспитание патриотизма, ответственности и уважения к службе.",
    "about.text2": "На этой странице можно показать структуру цикла, преподавательский состав, дисциплины, достижения кадетов, учебно-методические материалы и основные направления работы.",
    "about.stat1": "учебных дисциплин в составе цикла",
    "about.stat2": "ключевых направления деятельности",
    "about.stat3": "тематических мероприятий в течение года",
    "about.stat4": "ориентация на всестороннее развитие кадета",
    "disciplines.eyebrow": "Дисциплины",
    "disciplines.title": "Что можно представить в разделе учебных предметов",
    "disciplines.text": "Вместо простого списка стоит показать, чему именно обучает каждая дисциплина и какую роль она играет в профессиональном и личностном становлении кадета.",
    "disciplines.card1Title": "История",
    "disciplines.card1Text": "Изучение исторического наследия, военных традиций и ключевых этапов развития государства и общества.",
    "disciplines.card2Title": "Русский язык и литература",
    "disciplines.card2Text": "Развитие грамотной письменной и устной речи, культуры общения, анализа текстов и аргументации.",
    "disciplines.card3Title": "Казахский язык",
    "disciplines.card3Text": "Формирование языковой компетентности, расширение словарного запаса и совершенствование коммуникативных навыков.",
    "disciplines.card4Title": "Иностранный язык",
    "disciplines.card4Text": "Подготовка к профессиональной коммуникации, работе с учебными материалами и расширению общего кругозора.",
    "disciplines.card5Title": "Обществознание и право",
    "disciplines.card5Text": "Освоение основ гражданского устройства, правовой культуры, ответственности и социальной ориентированности.",
    "disciplines.card6Title": "География и мировое развитие",
    "disciplines.card6Text": "Понимание глобальных процессов, геополитических факторов и роли государства в современном мире.",
    "teachers.eyebrow": "Преподаватели",
    "teachers.title": "Педагогический состав цикла",
    "teachers.text": "В этом разделе можно разместить фотографии преподавателей цикла, краткие биографии, квалификацию, педагогический стаж и перечень преподаваемых дисциплин. Ниже сохранён удобный формат карточек, который можно заполнить реальными данными.",
    "teachers.card1Role": "Руководитель цикла",
    "teachers.card1Name": "Фамилия Имя Отчество",
    "teachers.card1Bio": "Краткая биография: образование, педагогический стаж, квалификационная категория, научно-методические интересы и основные направления работы.",
    "teachers.card1Subjects": "Дисциплины: руководство циклом, методическая работа, гуманитарные дисциплины",
    "teachers.card2Role": "Преподаватель казахского языка",
    "teachers.card2Name": "Фамилия Имя Отчество",
    "teachers.card2Bio": "Здесь можно указать профессиональный путь преподавателя, участие в методической работе, результаты кадетов и основные формы учебной деятельности.",
    "teachers.card2Subjects": "Дисциплины: казахский язык, профессиональный казахский язык",
    "teachers.card3Role": "Преподаватель английского языка",
    "teachers.card3Name": "Фамилия Имя Отчество",
    "teachers.card3Bio": "Подходит для информации о повышении квалификации, авторских материалах, языковых компетенциях и внеаудиторной работе с обучающимися.",
    "teachers.card3Subjects": "Дисциплины: английский язык, профессиональный английский язык",
    "teachers.card4Role": "Преподаватель истории и общественных дисциплин",
    "teachers.card4Name": "Фамилия Имя Отчество",
    "teachers.card4Bio": "В этом блоке удобно показать педагогическое кредо, достижения, участие в воспитательных мероприятиях и работу по военно-патриотическому направлению.",
    "teachers.card4Subjects": "Дисциплины: история Казахстана, всемирная история, философия",
    "activity.eyebrow": "Деятельность",
    "activity.title": "Что еще важно показать на странице цикла",
    "activity.card1Title": "Учебная работа",
    "activity.card1Text": "Планирование и проведение занятий, контроль успеваемости, развитие учебной мотивации и дисциплины.",
    "activity.card2Title": "Методическая работа",
    "activity.card2Text": "Открытые уроки, обмен опытом, разработка учебных материалов, участие в семинарах и повышение квалификации.",
    "activity.card3Title": "Воспитательная работа",
    "activity.card3Text": "Формирование патриотизма, гражданской позиции, уважения к истории, культуре и воинским традициям.",
    "activity.card4Title": "Исследовательская активность",
    "activity.card4Text": "Подготовка докладов, участие в конференциях, олимпиадах, конкурсах и предметных неделях.",
    "events.eyebrow": "События и достижения",
    "events.title": "Мероприятия, которыми можно наполнить сайт",
    "events.text": "Этот раздел делает страницу живой: здесь можно обновлять информацию о значимых мероприятиях, победах кадетов и работе преподавателей в течение учебного года.",
    "events.card1Tag": "Мероприятия",
    "events.card1Title": "Предметные недели и открытые занятия",
    "events.card1Text": "Анонсы и итоги открытых уроков, интегрированных занятий, викторин и тематических недель цикла.",
    "events.card2Tag": "Достижения",
    "events.card2Title": "Олимпиады, конкурсы, конференции",
    "events.card2Text": "Победы и участие кадетов в олимпиадах по истории, языкам, литературе и общественным дисциплинам.",
    "events.card3Tag": "Патриотическое воспитание",
    "events.card3Title": "Уроки мужества и памятные даты",
    "events.card3Text": "Встречи, круглые столы и образовательные события, посвященные истории, героизму и служению Родине.",
    "resources.eyebrow": "Материалы",
    "resources.title": "Полезные разделы для кадетов и родителей",
    "resources.card1Title": "Учебно-методические материалы",
    "resources.card1Text": "Список литературы, рекомендации по подготовке, презентации и электронные пособия.",
    "resources.card2Title": "График консультаций",
    "resources.card2Text": "Расписание дополнительных занятий, индивидуальных консультаций и работы кружков.",
    "resources.card3Title": "Нормативная база",
    "resources.card3Text": "Внутренние положения, планы работы цикла, темы самообразования и методические документы.",
    "contacts.eyebrow": "Контакты",
    "contacts.title": "Информация для связи с циклом",
    "contacts.text": "Для связи с циклом используйте актуальные контактные данные, указанные ниже.",
    "contacts.headLabel": "Руководитель цикла",
    "contacts.headValue": "Фамилия Имя Отчество",
    "contacts.roomLabel": "Кабинет",
    "contacts.roomValue": "Кабинет 301, учебный корпус, 3 этаж",
    "contacts.phoneLabel": "Телефон",
    "footer.college": "Военный колледж",
    "footer.cycle": "Цикл гуманитарных и общеобразовательных дисциплин",
  },
  kk: {
    "site.title": "Гуманитарлық және жалпы білім беру пәндері циклі",
    "meta.description": "Әскери колледждің гуманитарлық және жалпы білім беру пәндері цикліне арналған визитка-сайт.",
    "lang.switcherAria": "Тілді ауыстыру",
    "brand.homeAria": "Басты бетке",
    "brand.college": "Әскери колледж",
    "brand.cycle": "Гуманитарлық және жалпы білім беру пәндері циклі",
    "nav.aria": "Негізгі навигация",
    "nav.about": "Цикл туралы",
    "nav.disciplines": "Пәндер",
    "nav.teachers": "Оқытушылар",
    "nav.activity": "Қызметі",
    "nav.events": "Оқиғалар",
    "nav.contacts": "Байланыс",
    "menu.toggle": "Мәзір",
    "hero.eyebrow": "Құрылымдық бөлімшенің визитка-сайты",
    "hero.title": "Гуманитарлық және жалпы білім беру пәндері циклі",
    "hero.text": "Цикл кадеттердің гуманитарлық, тілдік және жалпы білім беру даярлығын қамтамасыз етеді, олардың дүниетанымын кеңейтіп, азаматтық жауапкершілігін, сөйлеу мәдениетін және тарихи-рухани құндылықтарға құрметін қалыптастырады.",
    "hero.primary": "Оқытушылар құрамы",
    "hero.secondary": "Циклмен байланысу",
    "hero.point1": "Кадеттерді гуманитарлық және жалпы білім беру бағыттары бойынша даярлау",
    "hero.point2": "Әдістемелік, тәрбиелік және зерттеу жұмысы",
    "hero.point3": "Олимпиадаларды, конференцияларды және тақырыптық іс-шараларды қолдау",
    "hero.status": "Колледждің оқу бөлімшесі",
    "hero.taskLabel": "Негізгі міндет",
    "hero.taskText": "Білімді, тәртіпті және адамгершілік тұрғыдан орнықты кадет қалыптастыру",
    "hero.workLabel": "Жұмыс бағыттары",
    "hero.workText": "Оқу, әдістемелік, тәрбиелік және аудиториядан тыс қызмет",
    "hero.audienceLabel": "Сайт кімге арналған",
    "hero.audienceText": "Кадеттер, ата-аналар, оқытушылар және колледж әкімшілігі",
    "hero.footerHead": "Цикл жетекшісі: Тегі Аты Әкесінің аты",
    "hero.footerRoom": "Кабинет: № 000",
    "about.eyebrow": "Цикл туралы",
    "about.title": "Кадеттерді даярлаудағы циклдің мақсаты мен рөлі",
    "about.text1": "Гуманитарлық және жалпы білім беру пәндері циклі ойлауды, тілдік сауаттылықты, құқықтық және тарихи мәдениетті дамытатын пәндерді оқытуды үйлестіреді, сондай-ақ патриотизмді, жауапкершілікті және қызметке құрметті тәрбиелеуді қолдайды.",
    "about.text2": "Бұл бетте цикл құрылымын, оқытушылар құрамын, пәндерді, кадеттердің жетістіктерін, оқу-әдістемелік материалдарды және негізгі жұмыс бағыттарын көрсетуге болады.",
    "about.stat1": "цикл құрамындағы оқу пәні",
    "about.stat2": "негізгі қызмет бағыты",
    "about.stat3": "жыл ішіндегі тақырыптық іс-шара",
    "about.stat4": "кадетті жан-жақты дамытуға бағдар",
    "disciplines.eyebrow": "Пәндер",
    "disciplines.title": "Оқу пәндері бөлімінде нені көрсетуге болады",
    "disciplines.text": "Жай ғана тізім берудің орнына, әр пәннің нені үйрететінін және кадеттің кәсіби әрі тұлғалық қалыптасуында қандай рөл атқаратынын көрсету маңызды.",
    "disciplines.card1Title": "Тарих",
    "disciplines.card1Text": "Тарихи мұраны, әскери дәстүрлерді және мемлекет пен қоғам дамуының негізгі кезеңдерін зерделеу.",
    "disciplines.card2Title": "Орыс тілі мен әдебиеті",
    "disciplines.card2Text": "Сауатты жазбаша және ауызша сөйлеуді, қарым-қатынас мәдениетін, мәтінді талдау мен дәлелдеу дағдыларын дамыту.",
    "disciplines.card3Title": "Қазақ тілі",
    "disciplines.card3Text": "Тілдік құзыреттілікті қалыптастыру, сөздік қорды кеңейту және коммуникативтік дағдыларды жетілдіру.",
    "disciplines.card4Title": "Шетел тілі",
    "disciplines.card4Text": "Кәсіби коммуникацияға, оқу материалдарымен жұмыс істеуге және дүниетанымды кеңейтуге даярлау.",
    "disciplines.card5Title": "Қоғамтану және құқық",
    "disciplines.card5Text": "Азаматтық құрылым, құқықтық мәдениет, жауапкершілік және әлеуметтік бағдар негіздерін меңгеру.",
    "disciplines.card6Title": "География және әлемдік даму",
    "disciplines.card6Text": "Ғаламдық үдерістерді, геосаяси факторларды және мемлекеттің қазіргі әлемдегі рөлін түсіну.",
    "teachers.eyebrow": "Оқытушылар",
    "teachers.title": "Циклдің педагогикалық құрамы",
    "teachers.text": "Бұл бөлімде цикл оқытушыларының фотосуреттерін, қысқаша өмірбаянын, біліктілігін, педагогикалық өтілін және жүргізетін пәндерін орналастыруға болады. Төменде нақты деректермен толтыруға ыңғайлы карточка пішімі сақталған.",
    "teachers.card1Role": "Цикл жетекшісі",
    "teachers.card1Name": "Тегі Аты Әкесінің аты",
    "teachers.card1Bio": "Қысқаша өмірбаян: білімі, педагогикалық өтілі, біліктілік санаты, ғылыми-әдістемелік қызығушылықтары және негізгі жұмыс бағыттары.",
    "teachers.card1Subjects": "Пәндер: циклді басқару, әдістемелік жұмыс, гуманитарлық пәндер",
    "teachers.card2Role": "Қазақ тілі оқытушысы",
    "teachers.card2Name": "Тегі Аты Әкесінің аты",
    "teachers.card2Bio": "Мұнда оқытушының кәсіби жолын, әдістемелік жұмысқа қатысуын, кадеттердің нәтижелерін және оқу қызметінің негізгі түрлерін көрсетуге болады.",
    "teachers.card2Subjects": "Пәндер: қазақ тілі, кәсіби қазақ тілі",
    "teachers.card3Role": "Ағылшын тілі оқытушысы",
    "teachers.card3Name": "Тегі Аты Әкесінің аты",
    "teachers.card3Bio": "Бұл карточкада біліктілікті арттыру, авторлық материалдар, тілдік құзыреттер және аудиториядан тыс жұмыс туралы мәлімет беруге ыңғайлы.",
    "teachers.card3Subjects": "Пәндер: ағылшын тілі, кәсіби ағылшын тілі",
    "teachers.card4Role": "Тарих және қоғамдық пәндер оқытушысы",
    "teachers.card4Name": "Тегі Аты Әкесінің аты",
    "teachers.card4Bio": "Бұл блокта педагогикалық ұстанымды, жетістіктерді, тәрбиелік іс-шараларға қатысуды және әскери-патриоттық бағыттағы жұмысты көрсетуге болады.",
    "teachers.card4Subjects": "Пәндер: Қазақстан тарихы, дүниежүзі тарихы, философия",
    "activity.eyebrow": "Қызметі",
    "activity.title": "Цикл парақшасында тағы нені көрсету маңызды",
    "activity.card1Title": "Оқу жұмысы",
    "activity.card1Text": "Сабақтарды жоспарлау және өткізу, үлгерімді бақылау, оқу мотивациясы мен тәртіпті дамыту.",
    "activity.card2Title": "Әдістемелік жұмыс",
    "activity.card2Text": "Ашық сабақтар, тәжірибе алмасу, оқу материалдарын әзірлеу, семинарларға қатысу және біліктілікті арттыру.",
    "activity.card3Title": "Тәрбиелік жұмыс",
    "activity.card3Text": "Патриотизмді, азаматтық ұстанымды, тарихқа, мәдениетке және әскери дәстүрлерге құрметті қалыптастыру.",
    "activity.card4Title": "Зерттеу белсенділігі",
    "activity.card4Text": "Баяндамалар дайындау, конференцияларға, олимпиадаларға, байқауларға және пәндік апталарға қатысу.",
    "events.eyebrow": "Оқиғалар мен жетістіктер",
    "events.title": "Сайтты қандай іс-шаралармен толықтыруға болады",
    "events.text": "Бұл бөлім парақшаны жандандырады: мұнда маңызды іс-шаралар, кадеттердің жетістіктері және оқытушылар жұмысы туралы ақпаратты оқу жылы бойы жаңартып отыруға болады.",
    "events.card1Tag": "Іс-шаралар",
    "events.card1Title": "Пәндік апталықтар мен ашық сабақтар",
    "events.card1Text": "Ашық сабақтардың, кіріктірілген дәрістердің, викториналардың және циклдің тақырыптық апталықтарының хабарламалары мен қорытындылары.",
    "events.card2Tag": "Жетістіктер",
    "events.card2Title": "Олимпиадалар, байқаулар, конференциялар",
    "events.card2Text": "Кадеттердің тарих, тілдер, әдебиет және қоғамдық пәндер бойынша олимпиадалардағы жеңістері мен қатысуы.",
    "events.card3Tag": "Патриоттық тәрбие",
    "events.card3Title": "Ерлік сабақтары және атаулы күндер",
    "events.card3Text": "Тарихқа, ерлікке және Отанға қызмет етуге арналған кездесулер, дөңгелек үстелдер мен білім беру іс-шаралары.",
    "resources.eyebrow": "Материалдар",
    "resources.title": "Кадеттер мен ата-аналарға арналған пайдалы бөлімдер",
    "resources.card1Title": "Оқу-әдістемелік материалдар",
    "resources.card1Text": "Әдебиеттер тізімі, дайындық бойынша ұсыныстар, презентациялар және электрондық құралдар.",
    "resources.card2Title": "Кеңес беру кестесі",
    "resources.card2Text": "Қосымша сабақтардың, жеке кеңестердің және үйірме жұмысының кестесі.",
    "resources.card3Title": "Нормативтік база",
    "resources.card3Text": "Ішкі ережелер, циклдің жұмыс жоспарлары, өзін-өзі дамыту тақырыптары және әдістемелік құжаттар.",
    "contacts.eyebrow": "Байланыс",
    "contacts.title": "Циклмен байланысу ақпараты",
    "contacts.text": "Циклмен байланысу үшін төменде көрсетілген өзекті байланыс деректерін пайдаланыңыз.",
    "contacts.headLabel": "Цикл жетекшісі",
    "contacts.headValue": "Тегі Аты Әкесінің аты",
    "contacts.roomLabel": "Кабинет",
    "contacts.roomValue": "301-кабинет, оқу корпусы, 3-қабат",
    "contacts.phoneLabel": "Телефон",
    "footer.college": "Әскери колледж",
    "footer.cycle": "Гуманитарлық және жалпы білім беру пәндері циклі",
  },
  en: {
    "site.title": "Cycle of Humanities and General Education Disciplines",
    "meta.description": "A profile website for the Cycle of Humanities and General Education Disciplines of the Military College.",
    "lang.switcherAria": "Language switcher",
    "brand.homeAria": "Back to top",
    "brand.college": "Military College",
    "brand.cycle": "Cycle of Humanities and General Education Disciplines",
    "nav.aria": "Main navigation",
    "nav.about": "About",
    "nav.disciplines": "Disciplines",
    "nav.teachers": "Faculty",
    "nav.activity": "Activity",
    "nav.events": "Events",
    "nav.contacts": "Contacts",
    "menu.toggle": "Menu",
    "hero.eyebrow": "Profile website of an academic unit",
    "hero.title": "Cycle of Humanities and General Education Disciplines",
    "hero.text": "The cycle provides cadets with humanities, language and general education training, shaping a broad outlook, civic responsibility, communication culture and respect for historical and spiritual values.",
    "hero.primary": "Faculty members",
    "hero.secondary": "Contact the cycle",
    "hero.point1": "Training cadets in humanities and general education fields",
    "hero.point2": "Methodological, educational and research work",
    "hero.point3": "Support for Olympiads, conferences and thematic events",
    "hero.status": "Academic unit of the college",
    "hero.taskLabel": "Main mission",
    "hero.taskText": "To shape an educated, disciplined and morally resilient cadet",
    "hero.workLabel": "Areas of work",
    "hero.workText": "Academic, methodological, educational and extracurricular activity",
    "hero.audienceLabel": "Who the site is for",
    "hero.audienceText": "Cadets, parents, teachers and the college administration",
    "hero.footerHead": "Head of the cycle: Full Name",
    "hero.footerRoom": "Office: Room 000",
    "about.eyebrow": "About the cycle",
    "about.title": "Purpose and role of the cycle in cadet training",
    "about.text1": "The cycle coordinates the teaching of subjects that develop thinking, language literacy, legal and historical culture, while also supporting the education of patriotism, responsibility and respect for service.",
    "about.text2": "This page can present the structure of the cycle, faculty members, disciplines, cadet achievements, educational materials and the main areas of work.",
    "about.stat1": "academic disciplines within the cycle",
    "about.stat2": "key areas of activity",
    "about.stat3": "thematic events during the year",
    "about.stat4": "focus on the all-round development of the cadet",
    "disciplines.eyebrow": "Disciplines",
    "disciplines.title": "What can be shown in the academic subjects section",
    "disciplines.text": "Instead of a simple list, it is better to show what each discipline teaches and what role it plays in the professional and personal development of the cadet.",
    "disciplines.card1Title": "History",
    "disciplines.card1Text": "Study of historical heritage, military traditions and key stages in the development of the state and society.",
    "disciplines.card2Title": "Russian Language and Literature",
    "disciplines.card2Text": "Development of competent written and oral communication, communication culture, text analysis and argumentation.",
    "disciplines.card3Title": "Kazakh Language",
    "disciplines.card3Text": "Building language competence, expanding vocabulary and improving communication skills.",
    "disciplines.card4Title": "Foreign Language",
    "disciplines.card4Text": "Preparation for professional communication, work with study materials and a broader outlook.",
    "disciplines.card5Title": "Social Studies and Law",
    "disciplines.card5Text": "Mastering the foundations of civic structure, legal culture, responsibility and social orientation.",
    "disciplines.card6Title": "Geography and Global Development",
    "disciplines.card6Text": "Understanding global processes, geopolitical factors and the role of the state in the modern world.",
    "teachers.eyebrow": "Faculty",
    "teachers.title": "Teaching staff of the cycle",
    "teachers.text": "This section can present faculty photos, short biographies, qualifications, teaching experience and the list of subjects taught. Below is a convenient card layout that can be filled with real information.",
    "teachers.card1Role": "Head of the cycle",
    "teachers.card1Name": "Full Name",
    "teachers.card1Bio": "A short profile: education, teaching experience, qualification category, academic and methodological interests, and main areas of work.",
    "teachers.card1Subjects": "Subjects: cycle management, methodological work, humanities disciplines",
    "teachers.card2Role": "Kazakh language teacher",
    "teachers.card2Name": "Full Name",
    "teachers.card2Bio": "This card can describe the teacher's professional path, participation in methodological work, cadet results and the main forms of classroom activity.",
    "teachers.card2Subjects": "Subjects: Kazakh language, Professional Kazakh language",
    "teachers.card3Role": "English language teacher",
    "teachers.card3Name": "Full Name",
    "teachers.card3Bio": "Suitable for presenting information about professional development, authored materials, language competencies and extracurricular work with learners.",
    "teachers.card3Subjects": "Subjects: English language, Professional English language",
    "teachers.card4Role": "Teacher of history and social disciplines",
    "teachers.card4Name": "Full Name",
    "teachers.card4Bio": "This block is useful for showing the teacher's pedagogical credo, achievements, participation in educational activities and work in the military-patriotic area.",
    "teachers.card4Subjects": "Subjects: History of Kazakhstan, World History, Philosophy",
    "activity.eyebrow": "Activity",
    "activity.title": "What else is important to show on the cycle page",
    "activity.card1Title": "Academic work",
    "activity.card1Text": "Planning and conducting classes, monitoring performance, and developing study motivation and discipline.",
    "activity.card2Title": "Methodological work",
    "activity.card2Text": "Open lessons, exchange of experience, development of teaching materials, participation in seminars and professional development.",
    "activity.card3Title": "Educational work",
    "activity.card3Text": "Building patriotism, civic values and respect for history, culture and military traditions.",
    "activity.card4Title": "Research activity",
    "activity.card4Text": "Preparing reports and taking part in conferences, Olympiads, competitions and subject weeks.",
    "events.eyebrow": "Events and achievements",
    "events.title": "Activities that can fill the website",
    "events.text": "This section makes the page feel alive: it can be updated throughout the academic year with significant events, cadet achievements and faculty work.",
    "events.card1Tag": "Events",
    "events.card1Title": "Subject weeks and open lessons",
    "events.card1Text": "Announcements and results of open lessons, integrated classes, quizzes and themed weeks of the cycle.",
    "events.card2Tag": "Achievements",
    "events.card2Title": "Olympiads, contests and conferences",
    "events.card2Text": "Victories and participation of cadets in Olympiads in history, languages, literature and social disciplines.",
    "events.card3Tag": "Patriotic education",
    "events.card3Title": "Lessons of courage and memorable dates",
    "events.card3Text": "Meetings, round tables and educational events dedicated to history, heroism and service to the Motherland.",
    "resources.eyebrow": "Resources",
    "resources.title": "Useful sections for cadets and parents",
    "resources.card1Title": "Educational and methodological materials",
    "resources.card1Text": "Reading lists, preparation guidelines, presentations and digital study resources.",
    "resources.card2Title": "Consultation schedule",
    "resources.card2Text": "Timetable of additional classes, individual consultations and clubs.",
    "resources.card3Title": "Regulatory framework",
    "resources.card3Text": "Internal regulations, work plans of the cycle, self-education topics and methodological documents.",
    "contacts.eyebrow": "Contacts",
    "contacts.title": "Contact information for the cycle",
    "contacts.text": "Use the current contact details below to get in touch with the cycle.",
    "contacts.headLabel": "Head of the cycle",
    "contacts.headValue": "Full Name",
    "contacts.roomLabel": "Office",
    "contacts.roomValue": "Room 301, academic building, 3rd floor",
    "contacts.phoneLabel": "Phone",
    "footer.college": "Military College",
    "footer.cycle": "Cycle of Humanities and General Education Disciplines",
  },
};

const contentOverrides = {
  ru: {
    "site.title": "Цикл гуманитарных и общеобразовательных дисциплин",
    "meta.description": "Официальная страница цикла гуманитарных и общеобразовательных дисциплин Военного колледжа Министерства обороны Республики Казахстан.",
    "brand.college": "Военный колледж МО РК",
    "brand.cycle": "Цикл гуманитарных и общеобразовательных дисциплин",
    "nav.about": "О цикле",
    "nav.history": "История",
    "nav.traditions": "Традиции",
    "nav.disciplines": "Дисциплины",
    "nav.activity": "Деятельность",
    "nav.today": "Сегодня",
    "hero.eyebrow": "Военный колледж Министерства обороны Республики Казахстан",
    "hero.title": "Цикл гуманитарных и общеобразовательных дисциплин",
    "hero.text1": "Цикл гуманитарных и общеобразовательных дисциплин является важным учебно-методическим подразделением Военного колледжа Министерства обороны Республики Казахстан. Его деятельность направлена на формирование у кадетов языковой, гуманитарной, гражданской и профессиональной компетентности.",
    "hero.text2": "Преподаватели цикла обеспечивают качественную подготовку по дисциплинам гуманитарного и общеобразовательного направлений, воспитывают патриотизм, культуру речи, ответственность, уважение к истории, традициям и ценностям Республики Казахстан.",
    "hero.primary": "Подробнее о цикле",
    "hero.secondary": "История цикла",
    "hero.point1": "Гуманитарная подготовка — основа формирования личности будущего военнослужащего",
    "hero.point2": "Традиции педагогического мастерства и современный подход к обучению",
    "hero.point3": "Знания, дисциплина, ответственность и культура профессионального общения",
    "hero.status": "Учебно-методическое подразделение",
    "hero.taskLabel": "Ключевая задача",
    "hero.taskText": "Формирование языковой, гуманитарной, гражданской и профессиональной компетентности у кадетов",
    "hero.workLabel": "Ценностные ориентиры",
    "hero.workText": "Патриотизм, культура речи, ответственность и уважение к истории и традициям",
    "hero.audienceLabel": "Смысловой акцент",
    "hero.audienceText": "Язык. История. Культура. Патриотизм.",
    "hero.footerHead": "С 1996 года — история становления и развития цикла",
    "hero.footerRoom": "Знания, дисциплина, ответственность",
    "about.eyebrow": "О цикле",
    "about.title": "Гуманитарная подготовка в системе военного образования",
    "about.text1": "Цикл гуманитарных и общеобразовательных дисциплин занимает особое место в образовательной и воспитательной системе Военного колледжа Министерства обороны Республики Казахстан. Его работа направлена не только на передачу знаний, но и на формирование личности будущего военнослужащего, развитие гражданской ответственности, культуры общения, профессиональной речи и патриотического сознания.",
    "about.text2": "На занятиях кадеты изучают дисциплины языкового, гуманитарного, социального и общеобразовательного направлений. Особое внимание уделяется развитию коммуникативных навыков, умению грамотно выражать свои мысли, анализировать информацию, работать с текстами, выступать перед аудиторией и применять полученные знания в профессиональной деятельности.",
    "about.text3": "Деятельность цикла сочетает учебную, методическую, воспитательную и военно-патриотическую работу. Это позволяет формировать у кадетов не только теоретические знания, но и личностные качества, необходимые будущему защитнику Отечества.",
    "about.stat1Value": "1996",
    "about.stat1": "с года — история становления и развития цикла",
    "about.stat2Value": "Язык",
    "about.stat2": "История. Культура. Патриотизм.",
    "about.stat3Value": "Традиции",
    "about.stat3": "педагогического мастерства и современный подход к обучению",
    "about.stat4Value": "Знания",
    "about.stat4": "дисциплина, ответственность и культура профессионального общения",
    "history.eyebrow": "История цикла",
    "history.title": "От цикла общеобразовательных дисциплин к гуманитарному направлению",
    "history.text1": "Цикл гуманитарных и общеобразовательных дисциплин ведёт свою историю с сентября 1996 года, когда в Кадетском корпусе был образован цикл общеобразовательных дисциплин. С первых лет своего существования он стал важной частью образовательной системы учебного заведения, обеспечивая подготовку кадетов по языковым, гуманитарным, социальным и общеобразовательным направлениям.",
    "history.text2": "В разные годы руководство циклом осуществляли офицеры и педагоги, внёсшие вклад в его становление и развитие. История цикла отражает не только развитие образовательной работы, но и усиление гуманитарной подготовки в системе военного образования.",
    "history.item1Period": "1996 год",
    "history.item1Title": "Образование цикла общеобразовательных дисциплин",
    "history.item1Text": "В сентябре 1996 года в Кадетском корпусе был образован цикл общеобразовательных дисциплин, который стал основой гуманитарной и языковой подготовки кадетов.",
    "history.item2Period": "Период становления",
    "history.item2Title": "Первые преподаватели и методические традиции",
    "history.item2Text": "У истоков становления цикла стояли опытные педагоги, чьи профессионализм, педагогический опыт и преданность делу заложили основу учебно-воспитательного процесса и дальнейшего развития гуманитарного направления.",
    "history.item3Period": "Преобразование",
    "history.item3Title": "Создание цикла гуманитарных и общеобразовательных дисциплин",
    "history.item3Text": "В последующие годы цикл общеобразовательных дисциплин был преобразован в цикл гуманитарных и общеобразовательных дисциплин. Это изменение отразило расширение содержания образовательной работы и усиление роли гуманитарной подготовки в формировании личности будущего военнослужащего.",
    "history.item4Period": "Современный этап",
    "history.item4Title": "Гуманитарная подготовка кадетов на современном этапе",
    "history.item4Text": "Сегодня цикл гуманитарных и общеобразовательных дисциплин продолжает развиваться, обеспечивая гуманитарную, языковую и общеобразовательную подготовку кадетов, формируя культуру речи, патриотизм и профессиональную компетентность.",
    "history.originsLabel": "У истоков цикла",
    "history.originsTitle": "Первые преподаватели",
    "history.originsText": "Н.М. Пилипенко, М.К. Космагамбетова, Ф.С. Сосновская, Т.Н. Максимова, Е.В. Рождественская, А.Г. Каримова, Ю.Ж. Крыкбесов и другие преподаватели.",
    "history.leadershipLabel": "Руководители цикла",
    "history.leadershipTitle": "Преемственность руководства",
    "history.leadershipText": "Первым заведующим циклом общеобразовательных дисциплин был Крыкбесов Юсуф Жагипарович. Первым начальником цикла гуманитарных и общеобразовательных дисциплин стал майор Асанов Кайрат Амангельдинович. В последующий период циклом руководил подполковник Милиди Константин Иванович.",
    "disciplines.eyebrow": "Дисциплины",
    "disciplines.title": "Дисциплины цикла",
    "disciplines.text1": "На разных этапах развития цикл обеспечивал преподавание дисциплин гуманитарного, языкового, социального и общеобразовательного направлений.",
    "disciplines.summaryLabel": "Направления подготовки",
    "disciplines.summaryTitle": "Языковые, гуманитарные, социальные и прикладные дисциплины",
    "disciplines.summaryText": "Содержание подготовки сочетает языковые дисциплины, историко-гуманитарные курсы, общественные науки и прикладные модули, связанные с военной средой и профессиональным общением.",
    "disciplines.item1": "Казахский язык",
    "disciplines.item2": "Профессиональный казахский язык",
    "disciplines.item3": "Английский язык",
    "disciplines.item4": "Профессиональный английский язык",
    "disciplines.item5": "История Казахстана",
    "disciplines.item6": "Всемирная история",
    "disciplines.item7": "Философия",
    "disciplines.item8": "Культурология",
    "disciplines.item9": "Социология и политология",
    "disciplines.item10": "Основы экономики",
    "disciplines.item11": "Менеджмент",
    "disciplines.item12": "Информатика и информационные технологии",
    "disciplines.item13": "Военная этика",
    "disciplines.item14": "Религиоведение",
    "disciplines.item15": "Логика",
    "disciplines.item16": "Военный менеджмент и логистика",
    "disciplines.item17": "История современных войн",
    "disciplines.text2": "Дисциплины цикла направлены на развитие общей культуры кадетов, формирование грамотной устной и письменной речи, расширение кругозора, развитие критического мышления и подготовку к профессиональному общению в военной среде.",
    "traditions.eyebrow": "Традиции и преемственность",
    "traditions.title": "Педагогическое сотрудничество как основа работы цикла",
    "traditions.text": "Особое место в истории цикла занимает развитие педагогического сотрудничества и активных методов обучения. Эти подходы сохранили актуальность и сегодня, поскольку современное военное образование требует активности, самостоятельности и осознанного отношения к обучению.",
    "traditions.card1Title": "Педагогика сотрудничества",
    "traditions.card1Text": "Преподаватели цикла выстраивают занятия как совместную работу: помогают кадетам задавать вопросы, обсуждать материал, аргументировать свою позицию и применять знания на практике.",
    "traditions.card2Title": "Кадет как активный участник обучения",
    "traditions.card2Text": "Такой подход превращал кадета из пассивного слушателя в активного участника учебного процесса, а преподавателя — в организатора совместной познавательной деятельности.",
    "traditions.card3Title": "Память и преемственность",
    "traditions.card3Text": "Память о преподавателях, внёсших вклад в становление цикла, бережно сохраняется в истории учебного заведения. Их труд и профессионализм остаются примером для нынешнего поколения преподавателей и кадетов.",
    "traditions.highlightLabel": "Смысловой акцент",
    "traditions.highlightText": "Традиции педагогического мастерства и современный подход к обучению.",
    "activity.eyebrow": "Деятельность цикла",
    "activity.title": "Основные направления работы",
    "activity.text": "Деятельность цикла объединяет учебную, методическую, воспитательную и военно-патриотическую работу. Каждый из этих блоков направлен на формирование знаний, ценностей и профессиональных качеств будущего военнослужащего.",
    "activity.card1Title": "Учебная работа",
    "activity.card1Text": "Преподаватели цикла проводят занятия по гуманитарным и языковым дисциплинам, используют современные методы обучения, интерактивные формы работы, практические задания, обсуждения, презентации и индивидуальную работу с кадетами.",
    "activity.card2Title": "Методическая работа",
    "activity.card2Text": "Цикл уделяет большое внимание совершенствованию методики преподавания, разработке учебных материалов, обновлению содержания занятий и внедрению современных педагогических технологий в образовательный процесс.",
    "activity.card3Title": "Воспитательная работа",
    "activity.card3Text": "Воспитательная деятельность цикла направлена на формирование патриотизма, гражданской ответственности, уважения к воинскому долгу, культуре, истории и традициям Республики Казахстан.",
    "activity.card4Title": "Военно-патриотическое направление",
    "activity.card4Text": "Через гуманитарные дисциплины кадеты знакомятся с историей государства, воинскими традициями, примерами мужества, дисциплины и служения Отечеству. Это способствует формированию ценностных ориентиров будущего военнослужащего.",
    "achievements.eyebrow": "Материальная база и достижения",
    "achievements.title": "Развитие условий обучения и достижения кадетов",
    "achievements.text": "С развитием учебного заведения укреплялась и материально-техническая база цикла. Учебные кабинеты оснащались современным оборудованием, интерактивными средствами обучения, учебной и методической литературой.",
    "achievements.card1Tag": "База",
    "achievements.card1Title": "Современные учебные кабинеты",
    "achievements.card1Text": "Оснащение кабинетов и наличие современных средств обучения позволяют поддерживать высокий уровень наглядности, практической работы и методического сопровождения занятий.",
    "achievements.card2Tag": "Результат",
    "achievements.card2Title": "Качество подготовки",
    "achievements.card2Text": "Это способствует повышению качества занятий, развитию познавательной активности кадетов и их успешному участию в олимпиадах, конкурсах и предметных мероприятиях различного уровня.",
    "achievements.card3Tag": "Достижения",
    "achievements.card3Title": "Олимпиады, конкурсы и конференции",
    "achievements.card3Text": "Кадеты, обучающиеся по дисциплинам цикла, принимают участие в районных, областных и республиканских предметных олимпиадах, интеллектуальных конкурсах, открытых занятиях, конференциях и воспитательных мероприятиях.",
    "today.eyebrow": "Цикл сегодня",
    "today.title": "Современная образовательная и воспитательная миссия",
    "today.text1": "Сегодня цикл гуманитарных и общеобразовательных дисциплин продолжает выполнять важную образовательную и воспитательную миссию. Его деятельность направлена на подготовку грамотных, ответственных, патриотически воспитанных и профессионально ориентированных кадетов.",
    "today.card1Title": "Культура мышления и речи",
    "today.card1Text": "Преподаватели цикла стремятся не только дать знания по учебным дисциплинам, но и сформировать у обучающихся культуру мышления, умение выражать свою позицию и работать с информацией.",
    "today.card2Title": "Профессиональная и гражданская зрелость",
    "today.card2Text": "Гуманитарная подготовка помогает будущему военнослужащему уважать историю и традиции своей страны, осознавать гражданскую ответственность и развивать профессиональную культуру общения.",
    "today.card3Title": "Преемственность и развитие",
    "today.card3Text": "Цикл гуманитарных и общеобразовательных дисциплин сохраняет преемственность педагогических традиций и одновременно развивается в соответствии с современными требованиями военного образования.",
    "today.quote": "Гуманитарная подготовка — основа формирования личности будущего военнослужащего.",
    "footer.college": "Военный колледж Министерства обороны Республики Казахстан",
    "footer.cycle": "Цикл гуманитарных и общеобразовательных дисциплин",
  },
  kk: {
    "site.title": "Гуманитарлық және жалпы білім беру пәндері циклі",
    "meta.description": "Қазақстан Республикасы Қорғаныс министрлігі Әскери колледжінің гуманитарлық және жалпы білім беру пәндері цикліне арналған ресми сайт.",
    "brand.college": "ҚР ҚМ Әскери колледжі",
    "brand.cycle": "Гуманитарлық және жалпы білім беру пәндері циклі",
    "nav.about": "Цикл туралы",
    "nav.history": "Тарихы",
    "nav.traditions": "Дәстүр",
    "nav.disciplines": "Пәндер",
    "nav.activity": "Қызметі",
    "nav.today": "Бүгін",
    "hero.eyebrow": "Қазақстан Республикасы Қорғаныс министрлігінің Әскери колледжі",
    "hero.title": "Гуманитарлық және жалпы білім беру пәндері циклі",
    "hero.text1": "Гуманитарлық және жалпы білім беру пәндері циклі Қазақстан Республикасы Қорғаныс министрлігі Әскери колледжінің маңызды оқу-әдістемелік бөлімшесі болып табылады. Оның қызметі кадеттердің тілдік, гуманитарлық, азаматтық және кәсіби құзыреттілігін қалыптастыруға бағытталған.",
    "hero.text2": "Цикл оқытушылары гуманитарлық бағыттағы пәндер бойынша сапалы даярлықты қамтамасыз етіп, патриотизмді, сөйлеу мәдениетін, жауапкершілікті, Қазақстан Республикасының тарихына, дәстүрлері мен құндылықтарына құрметті тәрбиелейді.",
    "hero.primary": "Цикл туралы толығырақ",
    "hero.secondary": "Цикл тарихы",
    "hero.point1": "Гуманитарлық даярлық — болашақ әскери қызметшінің тұлғасын қалыптастырудың негізі",
    "hero.point2": "Педагогикалық шеберлік дәстүрлері және оқытудың заманауи тәсілі",
    "hero.point3": "Білім, тәртіп, жауапкершілік және кәсіби қарым-қатынас мәдениеті",
    "hero.status": "Оқу-әдістемелік бөлімше",
    "hero.taskLabel": "Негізгі міндет",
    "hero.taskText": "Кадеттердің тілдік, гуманитарлық, азаматтық және кәсіби құзыреттілігін қалыптастыру",
    "hero.workLabel": "Құндылық бағдарлар",
    "hero.workText": "Патриотизм, сөйлеу мәдениеті, жауапкершілік және тарих пен дәстүрге құрмет",
    "hero.audienceLabel": "Мазмұндық акцент",
    "hero.audienceText": "Тіл. Тарих. Мәдениет. Патриотизм.",
    "hero.footerHead": "1996 жылдан бері — циклдің қалыптасуы мен дамуы",
    "hero.footerRoom": "Білім, тәртіп, жауапкершілік",
    "about.eyebrow": "Цикл туралы",
    "about.title": "Әскери білім беру жүйесіндегі гуманитарлық даярлық",
    "about.text1": "Гуманитарлық және жалпы білім беру пәндері циклі Қазақстан Республикасы Қорғаныс министрлігі Әскери колледжінің білім беру және тәрбие жүйесінде ерекше орын алады. Оның жұмысы тек білім беруге ғана емес, болашақ әскери қызметшінің тұлғасын қалыптастыруға, азаматтық жауапкершілікті, қарым-қатынас мәдениетін, кәсіби сөйлеуді және патриоттық сананы дамытуға бағытталған.",
    "about.text2": "Сабақтарда кадеттер тілдік, гуманитарлық, әлеуметтік және жалпы білім беру бағытындағы пәндерді оқиды. Ойды сауатты жеткізуге, ақпаратты талдауға, мәтінмен жұмыс істеуге, аудитория алдында сөйлеуге және алған білімді кәсіби қызметте қолдануға ерекше көңіл бөлінеді.",
    "about.text3": "Цикл қызметі оқу, әдістемелік, тәрбие және әскери-патриоттық жұмысты ұштастырады. Бұл кадеттерда теориялық біліммен қатар Отан қорғаушысына қажетті тұлғалық қасиеттерді қалыптастыруға мүмкіндік береді.",
    "about.stat1Value": "1996",
    "about.stat1": "жылдан бері — циклдің қалыптасуы мен дамуы",
    "about.stat2Value": "Тіл",
    "about.stat2": "Тарих. Мәдениет. Патриотизм.",
    "about.stat3Value": "Дәстүр",
    "about.stat3": "педагогикалық шеберлік пен заманауи оқыту тәсілі",
    "about.stat4Value": "Білім",
    "about.stat4": "тәртіп, жауапкершілік және кәсіби қарым-қатынас мәдениеті",
    "history.eyebrow": "Цикл тарихы",
    "history.title": "Жалпы білім беру пәндерінен гуманитарлық бағытқа дейін",
    "history.text1": "Гуманитарлық және жалпы білім беру пәндері циклі өз тарихын 1996 жылғы қыркүйектен бастайды. Сол кезде Кадет корпусында жалпы білім беру пәндері циклі құрылып, кадеттерді тілдік, гуманитарлық, әлеуметтік және жалпы білім беру бағыттары бойынша даярлаудың маңызды бөлігіне айналды.",
    "history.text2": "Әр кезеңде циклге оның қалыптасуы мен дамуына үлес қосқан офицерлер мен педагогтер жетекшілік етті. Цикл тарихы білім беру жұмысының кеңеюін және әскери білім беру жүйесіндегі гуманитарлық даярлықтың маңызының артуын көрсетеді.",
    "history.item1Period": "1996 жыл",
    "history.item1Title": "Жалпы білім беру пәндері циклінің құрылуы",
    "history.item1Text": "1996 жылғы қыркүйекте Кадет корпусында кадеттердің гуманитарлық және тілдік даярлығының негізіне айналған жалпы білім беру пәндері циклі құрылды.",
    "history.item2Period": "Қалыптасу кезеңі",
    "history.item2Title": "Алғашқы оқытушылар және әдістемелік дәстүрлер",
    "history.item2Text": "Циклдің қалыптасуының бастауында кәсіби шеберлігі, педагогикалық тәжірибесі мен іске адалдығы оқу-тәрбие үдерісінің және гуманитарлық бағыттың дамуының негізін қалаған тәжірибелі ұстаздар тұрды.",
    "history.item3Period": "Қайта құру",
    "history.item3Title": "Гуманитарлық және жалпы білім беру пәндері циклінің құрылуы",
    "history.item3Text": "Кейінгі жылдары жалпы білім беру пәндері циклі гуманитарлық және жалпы білім беру пәндері циклі болып қайта құрылды. Бұл өзгеріс білім беру жұмысы мазмұнының кеңейгенін және болашақ әскери қызметші тұлғасын қалыптастырудағы гуманитарлық даярлық рөлінің күшейгенін көрсетті.",
    "history.item4Period": "Қазіргі кезең",
    "history.item4Title": "Қазіргі кезеңдегі кадеттердің гуманитарлық даярлығы",
    "history.item4Text": "Бүгінде гуманитарлық және жалпы білім беру пәндері циклі кадеттердің гуманитарлық, тілдік және жалпы білім беру даярлығын қамтамасыз етіп, сөйлеу мәдениетін, патриотизмді және кәсіби құзыреттілікті қалыптастыруды жалғастыруда.",
    "history.originsLabel": "Цикл бастауында",
    "history.originsTitle": "Алғашқы оқытушылар",
    "history.originsText": "Н.М. Пилипенко, М.К. Космагамбетова, Ф.С. Сосновская, Т.Н. Максимова, Е.В. Рождественская, А.Г. Каримова, Ю.Ж. Крыкбесов және басқа да оқытушылар.",
    "history.leadershipLabel": "Цикл басшылары",
    "history.leadershipTitle": "Басшылық сабақтастығы",
    "history.leadershipText": "Жалпы білім беру пәндері цикліне алғашқы болып Крыкбесов Юсуф Жагипарович жетекшілік етті. Гуманитарлық және жалпы білім беру пәндері цикліне алғаш басшылық жасаған — майор Асанов Қайрат Амангелдинович. Кейінгі кезеңде циклді подполковник Милиди Константин Иванович басқарды.",
    "disciplines.eyebrow": "Пәндер",
    "disciplines.title": "Цикл пәндері",
    "disciplines.text1": "Әр кезеңде цикл гуманитарлық, тілдік, әлеуметтік және жалпы білім беру бағытындағы пәндерді оқытуды қамтамасыз етті.",
    "disciplines.summaryLabel": "Даярлық бағыттары",
    "disciplines.summaryTitle": "Тілдік, гуманитарлық, әлеуметтік және қолданбалы пәндер",
    "disciplines.summaryText": "Даярлық мазмұны тілдік пәндерді, тарихи-гуманитарлық курстарды, қоғамдық ғылымдарды және әскери орта мен кәсіби қарым-қатынасқа байланысты қолданбалы модульдерді біріктіреді.",
    "disciplines.item1": "Қазақ тілі",
    "disciplines.item2": "Кәсіби қазақ тілі",
    "disciplines.item3": "Ағылшын тілі",
    "disciplines.item4": "Кәсіби ағылшын тілі",
    "disciplines.item5": "Қазақстан тарихы",
    "disciplines.item6": "Дүниежүзі тарихы",
    "disciplines.item7": "Философия",
    "disciplines.item8": "Мәдениеттану",
    "disciplines.item9": "Әлеуметтану және саясаттану",
    "disciplines.item10": "Экономика негіздері",
    "disciplines.item11": "Менеджмент",
    "disciplines.item12": "Информатика және ақпараттық технологиялар",
    "disciplines.item13": "Әскери этика",
    "disciplines.item14": "Дінтану",
    "disciplines.item15": "Логика",
    "disciplines.item16": "Әскери менеджмент және логистика",
    "disciplines.item17": "Қазіргі заманғы соғыстар тарихы",
    "disciplines.text2": "Цикл пәндері кадеттердің жалпы мәдениетін дамытуға, сауатты ауызша және жазбаша сөйлеуді қалыптастыруға, дүниетанымды кеңейтуге, сыни ойлауды дамытуға және әскери ортада кәсіби қарым-қатынасқа дайындауға бағытталған.",
    "traditions.eyebrow": "Дәстүр және сабақтастық",
    "traditions.title": "Педагогикалық ынтымақтастық — цикл жұмысының негізі",
    "traditions.text": "Цикл тарихында педагогикалық ынтымақтастықты және белсенді оқыту әдістерін дамыту ерекше орын алады. Бұл тәсілдер бүгін де өзектілігін жоғалтқан жоқ, өйткені заманауи әскери білім белсенділікті, дербестікті және оқуға саналы көзқарасты талап етеді.",
    "traditions.card1Title": "Педагогикалық ынтымақтастық",
    "traditions.card1Text": "Цикл оқытушылары сабақты бірлескен жұмыс ретінде ұйымдастырады: кадеттерге сұрақ қоюға, материалды талқылауға, өз ұстанымын дәлелдеуге және білімін тәжірибеде қолдануға көмектеседі.",
    "traditions.card2Title": "Кадеттің белсенді рөлі",
    "traditions.card2Text": "Мұндай тәсіл кадетті енжар тыңдаушыдан оқу үдерісінің белсенді қатысушысына, ал оқытушыны бірлескен танымдық қызметтің ұйымдастырушысына айналдырды.",
    "traditions.card3Title": "Жад және сабақтастық",
    "traditions.card3Text": "Циклдің қалыптасуына үлес қосқан оқытушылар туралы естелік оқу орны тарихында мұқият сақталады. Олардың еңбегі мен кәсібилігі қазіргі оқытушылар мен кадеттер үшін үлгі болып қала береді.",
    "traditions.highlightLabel": "Мағыналық акцент",
    "traditions.highlightText": "Педагогикалық шеберлік дәстүрлері және оқытудың заманауи тәсілі.",
    "activity.eyebrow": "Цикл қызметі",
    "activity.title": "Негізгі жұмыс бағыттары",
    "activity.text": "Цикл қызметі оқу, әдістемелік, тәрбие және әскери-патриоттық жұмысты біріктіреді. Әр бағыт болашақ әскери қызметшінің білімі, құндылықтары және кәсіби қасиеттерін қалыптастыруға қызмет етеді.",
    "activity.card1Title": "Оқу жұмысы",
    "activity.card1Text": "Цикл оқытушылары гуманитарлық және тілдік пәндер бойынша сабақтар өткізеді, заманауи оқыту әдістерін, интерактивті жұмыс формаларын, практикалық тапсырмаларды, талқылауларды, презентацияларды және кадеттермен жеке жұмысты қолданады.",
    "activity.card2Title": "Әдістемелік жұмыс",
    "activity.card2Text": "Цикл оқыту әдістемесін жетілдіруге, оқу материалдарын әзірлеуге, сабақ мазмұнын жаңартуға және заманауи педагогикалық технологияларды білім беру үдерісіне енгізуге үлкен көңіл бөледі.",
    "activity.card3Title": "Тәрбие жұмысы",
    "activity.card3Text": "Тәрбие жұмысы патриотизмді, азаматтық жауапкершілікті, әскери борышқа, Қазақстан Республикасының мәдениеті, тарихы мен дәстүрлеріне құрметті қалыптастыруға бағытталған.",
    "activity.card4Title": "Әскери-патриоттық бағыт",
    "activity.card4Text": "Гуманитарлық пәндер арқылы кадеттер мемлекет тарихымен, әскери дәстүрлермен, ерлік, тәртіп пен Отанға қызмет етудің үлгілерімен танысады. Бұл болашақ әскери қызметшінің құндылық бағдарларын қалыптастыруға ықпал етеді.",
    "achievements.eyebrow": "Материалдық база және жетістіктер",
    "achievements.title": "Оқу жағдайларының дамуы және кадет нәтижелері",
    "achievements.text": "Оқу орнының дамуымен бірге циклдің материалдық-техникалық базасы да нығайды. Оқу кабинеттері заманауи жабдықтармен, интерактивті оқыту құралдарымен, оқу және әдістемелік әдебиеттермен қамтамасыз етілді.",
    "achievements.card1Tag": "База",
    "achievements.card1Title": "Заманауи оқу кабинеттері",
    "achievements.card1Text": "Кабинеттердің жабдықталуы және қазіргі оқыту құралдарының болуы сабақтардың көрнекілігін, практикалық бағытын және әдістемелік сүйемелдеуін жоғары деңгейде ұстауға мүмкіндік береді.",
    "achievements.card2Tag": "Нәтиже",
    "achievements.card2Title": "Даярлық сапасы",
    "achievements.card2Text": "Бұл сабақ сапасының артуына, кадеттердің танымдық белсенділігінің дамуына және олардың олимпиадаларға, байқауларға және түрлі деңгейдегі пәндік іс-шараларға табысты қатысуына ықпал етеді.",
    "achievements.card3Tag": "Жетістіктер",
    "achievements.card3Title": "Олимпиадалар, байқаулар және конференциялар",
    "achievements.card3Text": "Цикл пәндерін меңгеріп жүрген кадеттер аудандық, облыстық және республикалық пәндік олимпиадаларға, зияткерлік байқауларға, ашық сабақтарға, конференцияларға және тәрбие іс-шараларына қатысады.",
    "today.eyebrow": "Цикл бүгін",
    "today.title": "Қазіргі білім беру және тәрбие миссиясы",
    "today.text1": "Бүгінде гуманитарлық және жалпы білім беру пәндері циклі маңызды білім беру және тәрбие миссиясын жалғастырып келеді. Оның қызметі сауатты, жауапты, патриоттық рухта тәрбиеленген және кәсіби бағдарланған кадеттерді даярлауға бағытталған.",
    "today.card1Title": "Ойлау мен сөйлеу мәдениеті",
    "today.card1Text": "Цикл оқытушылары оқу пәндері бойынша білім беріп қана қоймай, білім алушылардың ойлау мәдениетін, өз ұстанымын білдіру және ақпаратпен жұмыс істеу қабілетін қалыптастыруға ұмтылады.",
    "today.card2Title": "Кәсіби және азаматтық кемелдік",
    "today.card2Text": "Гуманитарлық даярлық болашақ әскери қызметшіге өз елінің тарихы мен дәстүрлерін құрметтеуге, азаматтық жауапкершілікті сезінуге және кәсіби қарым-қатынас мәдениетін дамытуға көмектеседі.",
    "today.card3Title": "Сабақтастық пен даму",
    "today.card3Text": "Гуманитарлық және жалпы білім беру пәндері циклі педагогикалық дәстүрлер сабақтастығын сақтай отырып, әскери білім берудің заманауи талаптарына сәйкес дамып келеді.",
    "today.quote": "Гуманитарлық даярлық — болашақ әскери қызметшінің тұлғасын қалыптастырудың негізі.",
    "footer.college": "Қазақстан Республикасы Қорғаныс министрлігінің Әскери колледжі",
    "footer.cycle": "Гуманитарлық және жалпы білім беру пәндері циклі",
  },
  en: {
    "site.title": "Cycle of Humanities and General Education Disciplines",
    "meta.description": "Official website of the Cycle of Humanities and General Education Disciplines of the Military College of the Ministry of Defence of the Republic of Kazakhstan.",
    "brand.college": "Military College of MoD RK",
    "brand.cycle": "Cycle of Humanities and General Education Disciplines",
    "nav.about": "About",
    "nav.history": "History",
    "nav.traditions": "Traditions",
    "nav.disciplines": "Disciplines",
    "nav.activity": "Activity",
    "nav.today": "Today",
    "hero.eyebrow": "Military College of the Ministry of Defence of the Republic of Kazakhstan",
    "hero.title": "Cycle of Humanities and General Education Disciplines",
    "hero.text1": "The Cycle of Humanities and General Education Disciplines is an important academic and methodological unit of the Military College of the Ministry of Defence of the Republic of Kazakhstan. Its work is aimed at shaping the cadets' language, humanities, civic and professional competence.",
    "hero.text2": "The faculty of the cycle provide high-quality training in humanities disciplines and foster patriotism, communication culture, responsibility, and respect for the history, traditions and values of the Republic of Kazakhstan.",
    "hero.primary": "Learn more",
    "hero.secondary": "History of the cycle",
    "hero.point1": "Humanities training is the foundation for shaping the future serviceman's personality",
    "hero.point2": "Traditions of pedagogical excellence and a modern approach to teaching",
    "hero.point3": "Knowledge, discipline, responsibility and a culture of professional communication",
    "hero.status": "Academic and methodological unit",
    "hero.taskLabel": "Main objective",
    "hero.taskText": "To develop cadets' language, humanities, civic and professional competence",
    "hero.workLabel": "Core values",
    "hero.workText": "Patriotism, communication culture, responsibility, and respect for history and tradition",
    "hero.audienceLabel": "Key focus",
    "hero.audienceText": "Language. History. Culture. Patriotism.",
    "hero.footerHead": "Since 1996 — the history of the cycle's formation and growth",
    "hero.footerRoom": "Knowledge, discipline, responsibility",
    "about.eyebrow": "About the cycle",
    "about.title": "Humanities training in military education",
    "about.text1": "The Cycle of Humanities and General Education Disciplines holds a special place in the educational and character-building system of the Military College of the Ministry of Defence of the Republic of Kazakhstan. Its work is aimed not only at transferring knowledge, but also at shaping the personality of the future serviceman, developing civic responsibility, communication culture, professional speech and patriotic awareness.",
    "about.text2": "In class, cadets study language, humanities, social and general education disciplines. Particular attention is paid to communication skills, the ability to express ideas clearly, analyse information, work with texts, speak before an audience and apply knowledge in professional activity.",
    "about.text3": "The cycle combines academic, methodological, educational and military-patriotic work. This makes it possible to develop not only theoretical knowledge, but also the personal qualities required of a future defender of the Fatherland.",
    "about.stat1Value": "1996",
    "about.stat1": "onward — the history of the cycle's formation and development",
    "about.stat2Value": "Language",
    "about.stat2": "History. Culture. Patriotism.",
    "about.stat3Value": "Traditions",
    "about.stat3": "of pedagogical excellence and a modern teaching approach",
    "about.stat4Value": "Knowledge",
    "about.stat4": "discipline, responsibility and the culture of professional communication",
    "history.eyebrow": "History of the cycle",
    "history.title": "From general education disciplines to the humanities focus",
    "history.text1": "The Cycle of Humanities and General Education Disciplines traces its history back to September 1996, when the Cycle of General Education Disciplines was established at the Cadet Corps. From its earliest years, it became an important part of the institution's educational system, providing cadets with language, humanities, social and general education training.",
    "history.text2": "In different years, the cycle was led by officers and educators who contributed to its formation and development. Its history reflects not only the growth of educational work, but also the strengthening of humanities training in the military education system.",
    "history.item1Period": "1996",
    "history.item1Title": "Creation of the Cycle of General Education Disciplines",
    "history.item1Text": "In September 1996, a cycle of general education disciplines was established at the Cadet Corps and became the foundation of the cadets' humanities and language training.",
    "history.item2Period": "Formative period",
    "history.item2Title": "First teachers and methodological traditions",
    "history.item2Text": "The cycle was shaped by experienced educators whose professionalism, teaching experience and dedication laid the foundation for the educational process and the further development of the humanities direction.",
    "history.item3Period": "Transformation",
    "history.item3Title": "Creation of the Cycle of Humanities and General Education Disciplines",
    "history.item3Text": "In subsequent years, the Cycle of General Education Disciplines was transformed into the Cycle of Humanities and General Education Disciplines. This change reflected the broader scope of educational work and the growing role of humanities training in shaping the future serviceman's personality.",
    "history.item4Period": "Modern stage",
    "history.item4Title": "Humanities training of cadets at the modern stage",
    "history.item4Text": "Today, the Cycle of Humanities and General Education Disciplines continues to develop, providing humanities, language and general education training for cadets while shaping communication culture, patriotism and professional competence.",
    "history.originsLabel": "At the origins",
    "history.originsTitle": "First teachers",
    "history.originsText": "N.M. Pilipenko, M.K. Kosmagambetova, F.S. Sosnovskaya, T.N. Maksimova, E.V. Rozhdestvenskaya, A.G. Karimova, Yu.Zh. Krykbesov and other faculty members.",
    "history.leadershipLabel": "Leaders of the cycle",
    "history.leadershipTitle": "Continuity of leadership",
    "history.leadershipText": "The first head of the Cycle of General Education Disciplines was Yusuf Zhagiparovich Krykbesov. The first head of the Cycle of Humanities and General Education Disciplines was Major Kairat Amangeldinovich Asanov. In the following period, the cycle was led by Lieutenant Colonel Konstantin Ivanovich Milidi.",
    "disciplines.eyebrow": "Disciplines",
    "disciplines.title": "Disciplines of the cycle",
    "disciplines.text1": "At different stages of its development, the cycle provided instruction in humanities, language, social and general education disciplines.",
    "disciplines.summaryLabel": "Areas of training",
    "disciplines.summaryTitle": "Language, humanities, social and applied disciplines",
    "disciplines.summaryText": "The curriculum combines language studies, historical and humanities courses, social sciences and applied modules connected with the military environment and professional communication.",
    "disciplines.item1": "Kazakh Language",
    "disciplines.item2": "Professional Kazakh Language",
    "disciplines.item3": "English Language",
    "disciplines.item4": "Professional English Language",
    "disciplines.item5": "History of Kazakhstan",
    "disciplines.item6": "World History",
    "disciplines.item7": "Philosophy",
    "disciplines.item8": "Cultural Studies",
    "disciplines.item9": "Sociology and Political Science",
    "disciplines.item10": "Fundamentals of Economics",
    "disciplines.item11": "Management",
    "disciplines.item12": "Informatics and Information Technology",
    "disciplines.item13": "Military Ethics",
    "disciplines.item14": "Religious Studies",
    "disciplines.item15": "Logic",
    "disciplines.item16": "Military Management and Logistics",
    "disciplines.item17": "History of Modern Wars",
    "disciplines.text2": "The disciplines of the cycle are aimed at developing the cadets' general culture, strong oral and written communication, broader outlook, critical thinking and readiness for professional communication in the military environment.",
    "traditions.eyebrow": "Traditions and continuity",
    "traditions.title": "Pedagogical cooperation as the foundation of the cycle",
    "traditions.text": "A special place in the history of the cycle belongs to the development of pedagogical cooperation and active learning methods. These approaches remain relevant today because modern military education requires initiative, independence and a conscious attitude toward learning.",
    "traditions.card1Title": "Pedagogy of cooperation",
    "traditions.card1Text": "The cycle's teachers build lessons as collaborative work: they help cadets ask questions, discuss material, support their position and apply knowledge in practice.",
    "traditions.card2Title": "The cadet's active role",
    "traditions.card2Text": "This approach turned the cadet from a passive listener into an active participant in the learning process, while the teacher became the organiser of joint cognitive activity.",
    "traditions.card3Title": "Memory and continuity",
    "traditions.card3Text": "The memory of teachers who contributed to the formation of the cycle is carefully preserved in the history of the institution. Their work and professionalism remain an example for the current generation of teachers and cadets.",
    "traditions.highlightLabel": "Key idea",
    "traditions.highlightText": "Traditions of pedagogical excellence and a modern approach to teaching.",
    "activity.eyebrow": "Activity of the cycle",
    "activity.title": "Main areas of work",
    "activity.text": "The cycle combines academic, methodological, educational and military-patriotic work. Each of these areas contributes to shaping the knowledge, values and professional qualities of a future serviceman.",
    "activity.card1Title": "Academic work",
    "activity.card1Text": "The faculty of the cycle conduct classes in humanities and language disciplines, use modern teaching methods, interactive formats, practical tasks, discussions, presentations and individual work with cadets.",
    "activity.card2Title": "Methodological work",
    "activity.card2Text": "The cycle gives significant attention to improving teaching methods, developing instructional materials, updating lesson content and introducing modern pedagogical technologies into the educational process.",
    "activity.card3Title": "Educational work",
    "activity.card3Text": "The educational work of the cycle is aimed at developing patriotism, civic responsibility and respect for military duty, culture, history and the traditions of the Republic of Kazakhstan.",
    "activity.card4Title": "Military-patriotic focus",
    "activity.card4Text": "Through humanities disciplines, cadets become acquainted with the history of the state, military traditions and examples of courage, discipline and service to the Motherland. This helps form the value system of a future serviceman.",
    "achievements.eyebrow": "Facilities and achievements",
    "achievements.title": "Development of learning conditions and cadet results",
    "achievements.text": "As the institution developed, the material and technical base of the cycle also became stronger. Classrooms were equipped with modern equipment, interactive learning tools, and academic and methodological literature.",
    "achievements.card1Tag": "Facilities",
    "achievements.card1Title": "Modern classrooms",
    "achievements.card1Text": "Well-equipped classrooms and modern learning tools support a high level of visualisation, practical work and methodological support during lessons.",
    "achievements.card2Tag": "Outcome",
    "achievements.card2Title": "Quality of training",
    "achievements.card2Text": "This contributes to higher lesson quality, the development of cadets' cognitive activity and their successful participation in Olympiads, contests and subject events at different levels.",
    "achievements.card3Tag": "Achievements",
    "achievements.card3Title": "Olympiads, contests and conferences",
    "achievements.card3Text": "Cadets studying the disciplines of the cycle take part in district, regional and national subject Olympiads, intellectual contests, open lessons, conferences and educational events.",
    "today.eyebrow": "The cycle today",
    "today.title": "A modern educational and character-building mission",
    "today.text1": "Today, the Cycle of Humanities and General Education Disciplines continues to fulfil an important educational and character-building mission. Its work is aimed at preparing literate, responsible, patriotic and professionally oriented cadets.",
    "today.card1Title": "Culture of thinking and speech",
    "today.card1Text": "The faculty of the cycle strive not only to provide knowledge in academic disciplines, but also to develop the learners' culture of thinking, the ability to express their position and to work with information.",
    "today.card2Title": "Professional and civic maturity",
    "today.card2Text": "Humanities training helps a future serviceman respect the history and traditions of the country, understand civic responsibility and develop a professional culture of communication.",
    "today.card3Title": "Continuity and growth",
    "today.card3Text": "The Cycle of Humanities and General Education Disciplines preserves the continuity of pedagogical traditions while developing in accordance with the modern requirements of military education.",
    "today.quote": "Humanities training is the foundation for shaping the personality of a future serviceman.",
    "footer.college": "Military College of the Ministry of Defence of the Republic of Kazakhstan",
    "footer.cycle": "Cycle of Humanities and General Education Disciplines",
  },
};

Object.entries(contentOverrides).forEach(([language, values]) => {
  Object.assign(translations[language], values);
});

const interfaceOverrides = {
  ru: {
    "hero.eyebrow": "Военный колледж МО РК",
    "about.eyebrow": "О цикле",
    "history.eyebrow": "История",
    "disciplines.eyebrow": "Дисциплины",
    "teachers.eyebrow": "Преподаватели",
    "traditions.eyebrow": "Традиции",
    "activity.eyebrow": "Деятельность",
    "achievements.eyebrow": "Достижения",
    "today.eyebrow": "Цикл сегодня",
    "contacts.eyebrow": "Контакты",
    "teachers.photoPlaceholder": "Фото преподавателя",
    "teachers.experience": "Стаж: информация уточняется",
    "contacts.phoneValue": "24019",
    "contacts.scheduleLabel": "График работы",
    "contacts.scheduleValue": "Пн-Пт 09:00-18:00, Сб 09:00-13:00",
  },
  kk: {
    "hero.eyebrow": "ҚР ҚМ Әскери колледжі",
    "about.eyebrow": "Цикл туралы",
    "history.eyebrow": "Цикл тарихы",
    "disciplines.eyebrow": "Пәндер",
    "teachers.eyebrow": "Оқытушылар",
    "traditions.eyebrow": "Дәстүр мен сабақтастық",
    "activity.eyebrow": "Қызмет",
    "achievements.eyebrow": "Жетістіктер",
    "today.eyebrow": "Цикл бүгін",
    "contacts.eyebrow": "Байланыс",
    "teachers.photoPlaceholder": "Оқытушы фотосы",
    "teachers.experience": "Өтілі: ақпарат нақтылануда",
    "contacts.phoneValue": "24019",
    "contacts.scheduleLabel": "Жұмыс кестесі",
    "contacts.scheduleValue": "Дс-Жм 09:00-18:00, Сб 09:00-13:00",
  },
  en: {
    "hero.eyebrow": "Military College of MoD RK",
    "about.eyebrow": "About the cycle",
    "history.eyebrow": "History",
    "disciplines.eyebrow": "Disciplines",
    "teachers.eyebrow": "Faculty",
    "traditions.eyebrow": "Traditions",
    "activity.eyebrow": "Activity",
    "achievements.eyebrow": "Achievements",
    "today.eyebrow": "The cycle today",
    "contacts.eyebrow": "Contacts",
    "teachers.photoPlaceholder": "Faculty photo",
    "teachers.experience": "Experience: information pending",
    "contacts.phoneValue": "24019",
    "contacts.scheduleLabel": "Office hours",
    "contacts.scheduleValue": "Mon-Fri 09:00-18:00, Sat 09:00-13:00",
  },
};

Object.entries(interfaceOverrides).forEach(([language, values]) => {
  Object.assign(translations[language], values);
});

Object.assign(translations.ru, {
  "theme.toggle": "\u0422\u0435\u043c\u0430",
  "theme.toggleAria": "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0442\u0435\u043c\u0443 \u0441\u0430\u0439\u0442\u0430",
  "teachers.title": "Преподавательский состав цикла",
  "teachers.text": "В разделе представлен преподаватель цикла. По мере пополнения состава сюда можно будет добавить новые карточки с фотографиями, должностями, стажем, образованием и преподаваемыми дисциплинами.",
  "teachers.card1PhotoLabel": "Лингвистика",
  "teachers.card1Role": "Сержант, преподаватель (лингвист)",
  "teachers.card1Name": "Хорошун Иван Юрьевич",
  "teachers.card1Bio": "Сержант Хорошун Иван Юрьевич ведёт занятия по лингвистическому направлению, а также по военной этике и основам военного права. Имеет степень магистра по филологическим наукам и степень бакалавра по специальности «Переводческое дело».",
  "teachers.card1Subjects": "Дисциплины: лингвистика, военная этика, основы военного права",
  "teachers.experience": "Общий стаж: с 2022 года. Педагогический стаж: с 2024 года.",
});

Object.assign(translations.kk, {
  "theme.toggle": "\u0422\u0430\u049b\u044b\u0440\u044b\u043f",
  "theme.toggleAria": "\u0421\u0430\u0439\u0442 \u0442\u0430\u049b\u044b\u0440\u044b\u0431\u044b\u043d \u0430\u0443\u044b\u0441\u0442\u044b\u0440\u0443",
  "teachers.title": "Циклдің оқытушылар құрамы",
  "teachers.text": "Бұл бөлімде цикл оқытушысы туралы мәлімет берілген. Құрам толыққан сайын мұнда фотосуреті, лауазымы, өтілі, білімі және жүргізетін пәндері көрсетілген жаңа карточкаларды қосуға болады.",
  "teachers.card1PhotoLabel": "Лингвистика",
  "teachers.card1Role": "Сержант, оқытушы (лингвист)",
  "teachers.card1Name": "Хорошун Иван Юрьевич",
  "teachers.card1Bio": "Сержант Хорошун Иван Юрьевич лингвистика бағыты бойынша, сондай-ақ әскери этика және әскери құқық негіздері пәндері бойынша сабақ жүргізеді. Филология ғылымдары бойынша магистр дәрежесі және «Аударма ісі» мамандығы бойынша бакалавр дәрежесі бар.",
  "teachers.card1Subjects": "Пәндер: лингвистика, әскери этика, әскери құқық негіздері",
  "teachers.experience": "Жалпы өтілі: 2022 жылдан бастап. Педагогикалық өтілі: 2024 жылдан бастап.",
});

Object.assign(translations.en, {
  "theme.toggle": "Theme",
  "theme.toggleAria": "Switch site theme",
  "teachers.title": "Teaching Staff of the Cycle",
  "teachers.text": "This section presents the current faculty member of the cycle. As the staff list grows, new cards with photos, positions, experience, education and taught disciplines can be added here.",
  "teachers.card1PhotoLabel": "Linguistics",
  "teachers.card1Role": "Sergeant, Instructor (Linguist)",
  "teachers.card1Name": "Ivan Yuryevich Khoroshun",
  "teachers.card1Bio": "Sergeant Ivan Yuryevich Khoroshun teaches in the field of linguistics, as well as military ethics and fundamentals of military law. He holds a master's degree in philological sciences and a bachelor's degree in Translation Studies.",
  "teachers.card1Subjects": "Subjects: linguistics, military ethics, fundamentals of military law",
  "teachers.experience": "Total service: since 2022. Teaching experience: since 2024.",
});

Object.assign(translations.ru, {
  "teachers.text": "В разделе представлен преподавательский состав цикла. Карточки содержат фотографию, должность, статус, стаж, образование, преподаваемые дисциплины и методическое направление работы.",
  "teachers.card1Experience": "Общий стаж: с 2022 года. Педагогический стаж: с 2024 года.",
  "teachers.card2PhotoLabel": "История",
  "teachers.card2Role": "Гражданский преподаватель, преподаватель истории",
  "teachers.card2Name": "Хасенова Лариса Васильевна",
  "teachers.card2Bio": "Хасенова Лариса Васильевна ведёт дисциплины исторического направления. Имеет высшее образование: Омский государственный университет, квалификация — историк, преподаватель истории. Методическая проблема: развитие познавательной активности и аналитических навыков обучающихся через поэтапное обучение созданию и использованию структурно-логических схем при изучении исторического материала.",
  "teachers.card2Subjects": "Дисциплины: всемирная история, история современного Казахстана",
  "teachers.card2Experience": "Общий педагогический стаж: с 1998 года. Стаж работы в Военном колледже МО РК: с 2005 года.",
  "teachers.card3PhotoLabel": "Английский язык",
  "teachers.card3Role": "Преподаватель английского языка",
  "teachers.card3Name": "Кажыбаева Гульмира Дамировна",
  "teachers.card3Bio": "Кажыбаева Гульмира Дамировна ведёт занятия по английскому языку. Окончила Кокшетауский государственный университет имени Шокана Уалиханова, квалификация — учитель английского языка. Методическая проблема: организация дифференцированного подхода на уроках английского языка в группах с разным уровнем подготовки.",
  "teachers.card3Subjects": "Дисциплины: английский язык",
  "teachers.card3Experience": "Общий педагогический стаж: 14 лет. Стаж работы в Военном колледже МО РК: 14 лет.",
  "teachers.card4PhotoLabel": "Казахский язык",
  "teachers.card4Role": "Гражданский преподаватель, преподаватель казахского языка и литературы",
  "teachers.card4Name": "Шаяхметова Толеу Казбековна",
  "teachers.card4Bio": "Шаяхметова Толеу Казбековна преподаёт казахский язык и литературу. Получила образование в городе Кокшетау, в Институте имени Шокана Уалиханова, на филологическом факультете; квалификация — учитель казахского языка и литературы. Методическая тема: развитие творческих способностей кадетов на уроках казахской литературы.",
  "teachers.card4Subjects": "Дисциплины: профессиональный казахский язык, казахский язык и литература, казахская литература, глобальная компетенция",
  "teachers.card4Experience": "Общий педагогический стаж: 26 лет. Стаж работы в Военном колледже МО РК: 23 года.",
  "teachers.card5PhotoLabel": "Английский язык",
  "teachers.card5Role": "Гражданский преподаватель, преподаватель английского языка",
  "teachers.card5Name": "Рождественская Елена Владимировна",
  "teachers.card5Bio": "Рождественская Елена Владимировна преподаёт английский язык. Окончила Ташкентский государственный университет мировых языков, квалификация — учитель английского языка. Методическая тема: активизация деятельности кадетов на уроках английского языка.",
  "teachers.card5Subjects": "Дисциплины: английский язык",
  "teachers.card5Experience": "Общий педагогический стаж: 34 года. Стаж работы в Военном колледже МО РК: 26 лет.",
  "teachers.card6PhotoLabel": "Информатика",
  "teachers.card6Role": "Сотрудник Военного колледжа МО РК, преподаватель",
  "teachers.card6Name": "Тажибекова Наргиз Кумарбековна",
  "teachers.card6Bio": "Образование: Южно-Казахстанский государственный педагогический институт имени Өзбекәлі Жәнібеков, бакалавр, 2013 год. Методическая проблема: использование современных информационных технологий и интерактивных методов обучения для развития логического мышления, технических навыков и познавательной активности обучающихся.",
  "teachers.card6Subjects": "Дисциплины: информатика, физика, графика и проектирование.",
  "teachers.card6Experience": "Общий педагогический стаж: с 2014 года. Стаж работы в Военном колледже МО РК: с 01.09.2019.",
  "teachers.card7PhotoLabel": "Математика",
  "teachers.card7Role": "Преподаватель математики",
  "teachers.card7Name": "Кульмагамбетова Сауле Галимовна",
  "teachers.card7Bio": "Образование: Кокчетавский педагогический институт, физико-математический факультет, специальность «Математик», 1974 год. Методическая проблема: дифференцированный подход на уроках математики.",
  "teachers.card7Subjects": "Дисциплина: математика.",
  "teachers.card7Experience": "Общий педагогический стаж: 47 лет. Стаж работы в Кадетском корпусе: с 2000 года.",
  "teachers.card8PhotoLabel": "Казахский язык",
  "teachers.card8Role": "Преподаватель казахского языка и литературы",
  "teachers.card8Name": "Бейсенова Гулзада Кабдушевна",
  "teachers.card8Bio": "Образование: Кокшетауский университет имени Ш. Уалиханова, 2006 год. Квалификация: учитель казахского языка и литературы. Методическая проблема: повышение учебной грамотности кадетов через использование информационно-коммуникативных технологий при обучении казахскому языку и литературе.",
  "teachers.card8Subjects": "Дисциплины: казахский язык и литература.",
  "teachers.card8Experience": "Общий педагогический стаж: 30 лет. Стаж работы в Кадетском корпусе: 19 лет.",
  "teachers.card9PhotoLabel": "Информатика",
  "teachers.card9Role": "Педагог-модератор, преподаватель информатики",
  "teachers.card9Name": "Еркебаева Динара Рафагатовна",
  "teachers.card9Bio": "Образование: высшее, программист-экономист. Методическая проблема: индивидуальный дифференцированный подход на уроках информатики.",
  "teachers.card9Subjects": "Дисциплины: информатика, логика.",
  "teachers.card9Experience": "Общий педагогический стаж: 22 года. Стаж работы в Военном колледже МО РК: 22 года.",
});

Object.assign(translations.kk, {
  "teachers.text": "Бұл бөлімде циклдің оқытушылар құрамы ұсынылған. Карточкаларда фотосурет, лауазым, мәртебе, өтіл, білім, жүргізетін пәндер және әдістемелік жұмыс бағыты көрсетіледі.",
  "teachers.card1Experience": "Жалпы өтілі: 2022 жылдан бастап. Педагогикалық өтілі: 2024 жылдан бастап.",
  "teachers.card2PhotoLabel": "Тарих",
  "teachers.card2Role": "Азаматтық оқытушы, тарих пәнінің оқытушысы",
  "teachers.card2Name": "Хасенова Лариса Васильевна",
  "teachers.card2Bio": "Хасенова Лариса Васильевна тарих бағыты бойынша пәндер жүргізеді. Жоғары білімі бар: Омбы мемлекеттік университеті, біліктілігі — тарихшы, тарих пәнінің оқытушысы. Әдістемелік мәселесі: тарихи материалды зерделеу кезінде құрылымдық-логикалық схемаларды кезең-кезеңімен құрастыру және қолдану арқылы білім алушылардың танымдық белсенділігі мен аналитикалық дағдыларын дамыту.",
  "teachers.card2Subjects": "Пәндер: дүниежүзі тарихы, қазіргі Қазақстан тарихы",
  "teachers.card2Experience": "Жалпы педагогикалық өтілі: 1998 жылдан бастап. ҚР ҚМ Әскери колледжіндегі жұмыс өтілі: 2005 жылдан бастап.",
  "teachers.card3PhotoLabel": "Ағылшын тілі",
  "teachers.card3Role": "Ағылшын тілі оқытушысы",
  "teachers.card3Name": "Кажыбаева Гульмира Дамировна",
  "teachers.card3Bio": "Кажыбаева Гульмира Дамировна ағылшын тілі пәнінен сабақ береді. Шоқан Уәлиханов атындағы Көкшетау мемлекеттік университетін бітірген, біліктілігі — ағылшын тілі мұғалімі. Әдістемелік мәселесі: дайындық деңгейі әртүрлі топтарда ағылшын тілі сабақтарында сараланған тәсілді ұйымдастыру.",
  "teachers.card3Subjects": "Пәндер: ағылшын тілі",
  "teachers.card3Experience": "Жалпы педагогикалық өтілі: 14 жыл. ҚР ҚМ Әскери колледжіндегі жұмыс өтілі: 14 жыл.",
  "teachers.card4PhotoLabel": "Қазақ тілі",
  "teachers.card4Role": "Азаматтық оқытушы, қазақ тілі мен әдебиеті оқытушысы",
  "teachers.card4Name": "Шаяхметова Толеу Казбековна",
  "teachers.card4Bio": "Шаяхметова Толеу Казбековна қазақ тілі мен әдебиеті пәндерінен сабақ береді. Көкшетау қаласындағы Шоқан Уәлиханов атындағы институттың филология факультетін бітірген, біліктілігі — қазақ тілі мен әдебиеті мұғалімі. Әдістемелік тақырыбы: қазақ әдебиеті сабақтарында кадеттердің шығармашылық қабілеттерін дамыту.",
  "teachers.card4Subjects": "Пәндер: кәсіби қазақ тілі, қазақ тілі мен әдебиеті, қазақ әдебиеті, жаһандық құзыреттілік",
  "teachers.card4Experience": "Жалпы педагогикалық өтілі: 26 жыл. ҚР ҚМ Әскери колледжіндегі жұмыс өтілі: 23 жыл.",
  "teachers.card5PhotoLabel": "Ағылшын тілі",
  "teachers.card5Role": "Азаматтық оқытушы, ағылшын тілі оқытушысы",
  "teachers.card5Name": "Рождественская Елена Владимировна",
  "teachers.card5Bio": "Рождественская Елена Владимировна ағылшын тілі пәнінен сабақ береді. Ташкент мемлекеттік әлем тілдері университетін бітірген, біліктілігі — ағылшын тілі мұғалімі. Әдістемелік тақырыбы: ағылшын тілі сабақтарында кадеттердің оқу қызметін белсендіру.",
  "teachers.card5Subjects": "Пәндер: ағылшын тілі",
  "teachers.card5Experience": "Жалпы педагогикалық өтілі: 34 жыл. ҚР ҚМ Әскери колледжіндегі жұмыс өтілі: 26 жыл.",
  "teachers.card6PhotoLabel": "Информатика",
  "teachers.card6Role": "ҚР ҚМ Әскери колледжінің қызметкері, оқытушы",
  "teachers.card6Name": "Тажибекова Наргиз Кумарбековна",
  "teachers.card6Bio": "Білімі: Өзбекәлі Жәнібеков атындағы Оңтүстік Қазақстан мемлекеттік педагогикалық институты, бакалавр, 2013 жыл. Әдістемелік мәселесі: білім алушылардың логикалық ойлауын, техникалық дағдыларын және танымдық белсенділігін дамыту үшін заманауи ақпараттық технологиялар мен интерактивті оқыту әдістерін қолдану.",
  "teachers.card6Subjects": "Пәндер: информатика, физика, графика және жобалау.",
  "teachers.card6Experience": "Жалпы педагогикалық өтілі: 2014 жылдан бастап. ҚР ҚМ Әскери колледжіндегі жұмыс өтілі: 01.09.2019 жылдан бастап.",
  "teachers.card7PhotoLabel": "Математика",
  "teachers.card7Role": "Математика пәнінің оқытушысы",
  "teachers.card7Name": "Кульмагамбетова Сауле Галимовна",
  "teachers.card7Bio": "Білімі: Көкшетау педагогикалық институты, физика-математика факультеті, «Математик» мамандығы, 1974 жыл. Әдістемелік мәселесі: математика сабақтарында саралап оқыту тәсілін қолдану.",
  "teachers.card7Subjects": "Пәні: математика.",
  "teachers.card7Experience": "Жалпы педагогикалық өтілі: 47 жыл. Кадет корпусындағы жұмыс өтілі: 2000 жылдан бастап.",
  "teachers.card8PhotoLabel": "Қазақ тілі",
  "teachers.card8Role": "Қазақ тілі мен әдебиеті пәнінің оқытушысы",
  "teachers.card8Name": "Бейсенова Гулзада Кабдушевна",
  "teachers.card8Bio": "Білімі: Ш. Уәлиханов атындағы Көкшетау университеті, 2006 жыл. Біліктілігі: қазақ тілі мен әдебиеті мұғалімі. Әдістемелік мәселесі: қазақ тілі мен әдебиетін оқытуда ақпараттық-коммуникативтік технологияларды пайдалану арқылы кадеттердің оқу сауаттылығын арттыру.",
  "teachers.card8Subjects": "Пәндер: қазақ тілі мен әдебиеті.",
  "teachers.card8Experience": "Жалпы педагогикалық өтілі: 30 жыл. Кадет корпусындағы жұмыс өтілі: 19 жыл.",
  "teachers.card9PhotoLabel": "Информатика",
  "teachers.card9Role": "Педагог-модератор, информатика пәнінің оқытушысы",
  "teachers.card9Name": "Еркебаева Динара Рафагатовна",
  "teachers.card9Bio": "Білімі: жоғары, бағдарламашы-экономист. Әдістемелік мәселесі: информатика сабақтарында жеке сараланған тәсілді қолдану.",
  "teachers.card9Subjects": "Пәндер: информатика, логика.",
  "teachers.card9Experience": "Жалпы педагогикалық өтілі: 22 жыл. ҚР ҚМ Әскери колледжіндегі жұмыс өтілі: 22 жыл.",
});

Object.assign(translations.en, {
  "teachers.text": "This section presents the teaching staff of the cycle. Each card includes a photo, position, status, experience, education, taught disciplines and the teacher's methodological focus.",
  "teachers.card1Experience": "Total service: since 2022. Teaching experience: since 2024.",
  "teachers.card2PhotoLabel": "History",
  "teachers.card2Role": "Civilian Instructor, History Teacher",
  "teachers.card2Name": "Larisa Vasilyevna Khasenova",
  "teachers.card2Bio": "Larisa Vasilyevna Khasenova teaches history-related disciplines. She has higher education from Omsk State University, with qualification as a historian and history teacher. Her methodological focus is the development of learners' cognitive activity and analytical skills through step-by-step training in creating and using structural-logical schemes when studying historical material.",
  "teachers.card2Subjects": "Subjects: World History, History of Modern Kazakhstan",
  "teachers.card2Experience": "Total teaching experience: since 1998. Experience at the Military College of MoD RK: since 2005.",
  "teachers.card3PhotoLabel": "English",
  "teachers.card3Role": "English Language Teacher",
  "teachers.card3Name": "Gulmira Damirovna Kazhybayeva",
  "teachers.card3Bio": "Gulmira Damirovna Kazhybayeva teaches English. She graduated from Shokan Ualikhanov Kokshetau State University with qualification as an English language teacher. Her methodological focus is the organisation of a differentiated approach in English lessons for groups with different levels of preparation.",
  "teachers.card3Subjects": "Subjects: English language",
  "teachers.card3Experience": "Total teaching experience: 14 years. Experience at the Military College of MoD RK: 14 years.",
  "teachers.card4PhotoLabel": "Kazakh Language",
  "teachers.card4Role": "Civilian Instructor, Teacher of Kazakh Language and Literature",
  "teachers.card4Name": "Toleu Kazbekovna Shayakhmetova",
  "teachers.card4Bio": "Toleu Kazbekovna Shayakhmetova teaches Kazakh language and literature. She studied in Kokshetau at the Shokan Ualikhanov Institute, Faculty of Philology, with qualification as a teacher of Kazakh language and literature. Her methodological topic is the development of cadets' creative abilities in Kazakh literature lessons.",
  "teachers.card4Subjects": "Subjects: Professional Kazakh language, Kazakh language and literature, Kazakh literature, Global competence",
  "teachers.card4Experience": "Total teaching experience: 26 years. Experience at the Military College of MoD RK: 23 years.",
  "teachers.card5PhotoLabel": "English",
  "teachers.card5Role": "Civilian Instructor, English Language Teacher",
  "teachers.card5Name": "Elena Vladimirovna Rozhdestvenskaya",
  "teachers.card5Bio": "Elena Vladimirovna Rozhdestvenskaya teaches English. She graduated from Tashkent State University of World Languages with qualification as an English language teacher. Her methodological topic is the activation of cadets' learning activity in English lessons.",
  "teachers.card5Subjects": "Subjects: English language",
  "teachers.card5Experience": "Total teaching experience: 34 years. Experience at the Military College of MoD RK: 26 years.",
  "teachers.card6PhotoLabel": "Informatics",
  "teachers.card6Role": "Staff Member of the Military College of MoD RK, Instructor",
  "teachers.card6Name": "Nargiz Kumarbekovna Tazhibekova",
  "teachers.card6Bio": "Education: South Kazakhstan State Pedagogical Institute named after Ozbekali Zhanibekov, Bachelor's degree, 2013. Methodological focus: using modern information technologies and interactive teaching methods to develop learners' logical thinking, technical skills and cognitive activity.",
  "teachers.card6Subjects": "Subjects: informatics, physics, graphics and design.",
  "teachers.card6Experience": "Total teaching experience: since 2014. Experience at the Military College of MoD RK: since 01.09.2019.",
  "teachers.card7PhotoLabel": "Mathematics",
  "teachers.card7Role": "Mathematics Instructor",
  "teachers.card7Name": "Saule Galimovna Kulmagambetova",
  "teachers.card7Bio": "Education: Kokshetau Pedagogical Institute, Faculty of Physics and Mathematics, qualification in Mathematics, 1974. Methodological focus: differentiated approach in mathematics lessons.",
  "teachers.card7Subjects": "Subject: mathematics.",
  "teachers.card7Experience": "Total teaching experience: 47 years. Experience at the Cadet Corps: since 2000.",
  "teachers.card8PhotoLabel": "Kazakh Language",
  "teachers.card8Role": "Kazakh Language and Literature Instructor",
  "teachers.card8Name": "Gulzada Kabdushevna Beysenova",
  "teachers.card8Bio": "Education: Kokshetau University named after Sh. Ualikhanov, 2006. Qualification: teacher of Kazakh language and literature. Methodological focus: improving cadets' learning literacy through information and communication technologies in teaching Kazakh language and literature.",
  "teachers.card8Subjects": "Subjects: Kazakh language and literature.",
  "teachers.card8Experience": "Total teaching experience: 30 years. Experience at the Cadet Corps: 19 years.",
  "teachers.card9PhotoLabel": "Informatics",
  "teachers.card9Role": "Teacher-Moderator, Informatics Instructor",
  "teachers.card9Name": "Dinara Rafagatovna Erkebaeva",
  "teachers.card9Bio": "Education: higher education, programmer-economist. Methodological focus: an individual differentiated approach in informatics lessons.",
  "teachers.card9Subjects": "Subjects: informatics, logic.",
  "teachers.card9Experience": "Total teaching experience: 22 years. Experience at the Military College of MoD RK: 22 years.",
});

if (year) {
  year.textContent = new Date().getFullYear();
}

const setMenuOpen = (isOpen) => {
  if (!menuToggle || !siteNav) {
    return;
  }

  siteNav.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));

  if (siteHeader) {
    siteHeader.classList.toggle("menu-open", isOpen);
    if (isOpen) {
      siteHeader.classList.remove("is-hidden");
    }
  }

  syncMobileHeader();
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    setMenuOpen(!siteNav.classList.contains("is-open"));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });
}

revealItems.forEach((item, index) => {
  const delay = Math.min(index * 70, 280);
  item.style.setProperty("--reveal-delay", `${delay}ms`);
});

stackSections.forEach((section, index) => {
  section.style.setProperty("--stack-index", String(index + 1));
});

const getTranslation = (language, key) => {
  const languageDictionary = translations[language] || {};
  return languageDictionary[key] || translations.ru[key] || "";
};

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const normalizeTheme = (theme) => {
  return theme === "dark" ? "dark" : "light";
};

const setTheme = (theme, shouldPersist = true) => {
  const normalizedTheme = normalizeTheme(theme);
  const isDark = normalizedTheme === "dark";

  document.body.dataset.theme = normalizedTheme;

  if (themeToggle) {
    themeToggle.classList.toggle("is-dark", isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  if (!shouldPersist) {
    return;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
  } catch (error) {
    console.warn("Could not persist selected theme.", error);
  }
};

const decorateTeacherSubjects = () => {
  document.querySelectorAll(".teacher-subjects").forEach((node) => {
    const rawText = node.textContent.trim();

    if (!rawText) {
      return;
    }

    const separatorIndex = rawText.indexOf(":");
    const label = separatorIndex >= 0 ? rawText.slice(0, separatorIndex).trim() : "";
    const subjectText = separatorIndex >= 0 ? rawText.slice(separatorIndex + 1).trim() : rawText;
    const subjects = subjectText
      .split(",")
      .map((subject) => subject.trim())
      .filter(Boolean);

    if (!subjects.length) {
      return;
    }

    node.textContent = "";

    if (label) {
      const labelNode = document.createElement("span");
      labelNode.className = "teacher-subject-label";
      labelNode.textContent = label;
      node.append(labelNode);
    }

    subjects.forEach((subject) => {
      const subjectNode = document.createElement("span");
      subjectNode.className = "teacher-tag";
      subjectNode.textContent = subject;
      node.append(subjectNode);
    });
  });
};

let lastMobileHeaderScrollY = window.scrollY || window.pageYOffset || 0;

const syncMobileHeader = () => {
  if (!siteHeader) {
    return;
  }

  const currentScrollY = window.scrollY || window.pageYOffset || 0;
  const isMobileViewport = window.innerWidth <= MOBILE_HEADER_BREAKPOINT;
  const navIsOpen = siteNav ? siteNav.classList.contains("is-open") : false;

  if (!isMobileViewport) {
    if (navIsOpen) {
      siteNav.classList.remove("is-open");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }

    siteHeader.classList.remove("is-compact", "is-hidden", "menu-open");
    lastMobileHeaderScrollY = currentScrollY;
    return;
  }

  const shouldCompact = currentScrollY > MOBILE_HEADER_COMPACT_OFFSET;
  siteHeader.classList.toggle("is-compact", shouldCompact);
  siteHeader.classList.toggle("menu-open", navIsOpen);

  if (navIsOpen || currentScrollY <= 12) {
    siteHeader.classList.remove("is-hidden");
    lastMobileHeaderScrollY = currentScrollY;
    return;
  }

  const delta = currentScrollY - lastMobileHeaderScrollY;

  if (currentScrollY > MOBILE_HEADER_HIDE_OFFSET && delta > MOBILE_HEADER_HIDE_DELTA) {
    siteHeader.classList.add("is-hidden");
  } else if (delta < -MOBILE_HEADER_SHOW_DELTA) {
    siteHeader.classList.remove("is-hidden");
  }

  lastMobileHeaderScrollY = currentScrollY;
};

const setLanguage = (language) => {
  const normalizedLanguage = translations[language] ? language : "ru";

  document.documentElement.lang = normalizedLanguage;
  document.title = getTranslation(normalizedLanguage, "site.title");

  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      getTranslation(normalizedLanguage, "meta.description")
    );
  }

  if (langSwitcher) {
    langSwitcher.setAttribute(
      "aria-label",
      getTranslation(normalizedLanguage, "lang.switcherAria")
    );
  }

  translatableNodes.forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = getTranslation(normalizedLanguage, key);
  });

  ariaLabelNodes.forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    node.setAttribute("aria-label", getTranslation(normalizedLanguage, key));
  });

  decorateTeacherSubjects();

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === normalizedLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
  } catch (error) {
    console.warn("Could not persist selected language.", error);
  }
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme === "dark" ? "dark" : "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

let initialTheme = "light";

try {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "dark" || storedTheme === "light") {
    initialTheme = storedTheme;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    initialTheme = "dark";
  }
} catch (error) {
  console.warn("Could not read saved theme.", error);
}

setTheme(initialTheme, false);

let initialLanguage = "ru";

try {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLanguage && translations[storedLanguage]) {
    initialLanguage = storedLanguage;
  }
} catch (error) {
  console.warn("Could not read saved language.", error);
}

setLanguage(initialLanguage);

const resetScrollMotion = () => {
  [heroCopy, heroPanel, ...scrollShells].filter(Boolean).forEach((element) => {
    element.style.setProperty("--scroll-lift", "0px");
    element.style.setProperty("--scroll-drop", "0px");
    element.style.setProperty("--scroll-tilt", "0deg");
    element.style.setProperty("--scroll-glow", "0");
  });
};

const updateHeroScrollMotion = (viewportHeight) => {
  if (!heroSection || !heroCopy || !heroPanel) {
    return;
  }

  const rect = heroSection.getBoundingClientRect();
  const relativeCenter = ((rect.top + rect.height / 2) - viewportHeight / 2) / viewportHeight;
  const depth = clamp(relativeCenter, -1, 1);
  const progress = clamp(1 - Math.abs(relativeCenter) * 1.4, 0, 1);

  heroCopy.style.setProperty("--scroll-lift", `${(-depth * 26).toFixed(2)}px`);
  heroCopy.style.setProperty("--scroll-drop", `${(depth * 14).toFixed(2)}px`);
  heroCopy.style.setProperty("--scroll-tilt", `${(-depth * 1.6).toFixed(2)}deg`);
  heroCopy.style.setProperty("--scroll-glow", progress.toFixed(3));

  heroPanel.style.setProperty("--scroll-lift", `${(-depth * 18).toFixed(2)}px`);
  heroPanel.style.setProperty("--scroll-drop", `${(depth * 22).toFixed(2)}px`);
  heroPanel.style.setProperty("--scroll-tilt", `${(-depth * 2.8).toFixed(2)}deg`);
  heroPanel.style.setProperty("--scroll-glow", progress.toFixed(3));
};

const updateSectionScrollMotion = (viewportHeight) => {
  scrollShells.forEach((shell) => {
    const rect = shell.getBoundingClientRect();
    const relativeCenter = ((rect.top + rect.height / 2) - viewportHeight * 0.56) / viewportHeight;
    const depth = clamp(relativeCenter, -1, 1);
    const progress = clamp(1 - Math.abs(relativeCenter) * 1.55, 0, 1);

    shell.style.setProperty("--scroll-lift", `${(-depth * 18).toFixed(2)}px`);
    shell.style.setProperty("--scroll-drop", `${(depth * 16).toFixed(2)}px`);
    shell.style.setProperty("--scroll-tilt", `${(depth * 1.25).toFixed(2)}deg`);
    shell.style.setProperty("--scroll-glow", progress.toFixed(3));
  });
};

let scrollMotionFrame = null;

const runScrollMotion = () => {
  scrollMotionFrame = null;
  syncMobileHeader();

  if (reducedMotionQuery.matches) {
    resetScrollMotion();
    return;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  updateHeroScrollMotion(viewportHeight);
  updateSectionScrollMotion(viewportHeight);
};

const scheduleScrollMotion = () => {
  if (scrollMotionFrame !== null) {
    return;
  }

  scrollMotionFrame = window.requestAnimationFrame(runScrollMotion);
};

window.addEventListener("scroll", scheduleScrollMotion, { passive: true });
window.addEventListener("resize", scheduleScrollMotion);

if (typeof reducedMotionQuery.addEventListener === "function") {
  reducedMotionQuery.addEventListener("change", scheduleScrollMotion);
} else if (typeof reducedMotionQuery.addListener === "function") {
  reducedMotionQuery.addListener(scheduleScrollMotion);
}

scheduleScrollMotion();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
