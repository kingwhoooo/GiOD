const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");
const stackSections = document.querySelectorAll(".section-stack");
const langButtons = document.querySelectorAll(".lang-button");
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
    "hero.text": "Цикл обеспечивает гуманитарную, языковую и общеобразовательную подготовку курсантов, формируя широкий кругозор, гражданскую ответственность, культуру речи и уважение к историческим и духовным ценностям.",
    "hero.primary": "Преподавательский состав",
    "hero.secondary": "Связаться с циклом",
    "hero.point1": "Подготовка курсантов по гуманитарным и общеобразовательным направлениям",
    "hero.point2": "Методическая, воспитательная и исследовательская работа",
    "hero.point3": "Поддержка олимпиад, конференций и тематических мероприятий",
    "hero.status": "Учебное подразделение колледжа",
    "hero.taskLabel": "Основная задача",
    "hero.taskText": "Формирование образованного, дисциплинированного и нравственно устойчивого курсанта",
    "hero.workLabel": "Направления работы",
    "hero.workText": "Учебная, методическая, воспитательная и внеаудиторная деятельность",
    "hero.audienceLabel": "Для кого сайт",
    "hero.audienceText": "Курсанты, родители, преподаватели и администрация колледжа",
    "hero.footerHead": "Руководитель цикла: ФИО",
    "hero.footerRoom": "Кабинет: № 000",
    "about.eyebrow": "О цикле",
    "about.title": "Назначение и роль цикла в подготовке курсантов",
    "about.text1": "Цикл гуманитарных и общеобразовательных дисциплин координирует преподавание предметов, которые развивают мышление, языковую грамотность, правовую и историческую культуру, а также поддерживают воспитание патриотизма, ответственности и уважения к службе.",
    "about.text2": "На этой странице можно показать структуру цикла, преподавательский состав, дисциплины, достижения курсантов, учебно-методические материалы и основные направления работы.",
    "about.stat1": "учебных дисциплин в составе цикла",
    "about.stat2": "ключевых направления деятельности",
    "about.stat3": "тематических мероприятий в течение года",
    "about.stat4": "ориентация на всестороннее развитие курсанта",
    "disciplines.eyebrow": "Дисциплины",
    "disciplines.title": "Что можно представить в разделе учебных предметов",
    "disciplines.text": "Вместо простого списка стоит показать, чему именно обучает каждая дисциплина и какую роль она играет в профессиональном и личностном становлении курсанта.",
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
    "teachers.title": "Карточки преподавательского состава",
    "teachers.text": "Ниже размещен готовый формат карточек. Здесь можно заменить шаблонные данные на реальные фотографии, ФИО, биографии, квалификацию и перечень предметов.",
    "teachers.card1Role": "Руководитель цикла",
    "teachers.card1Name": "Фамилия Имя Отчество",
    "teachers.card1Bio": "Краткая биография преподавателя: образование, стаж работы, квалификация, педагогические достижения и участие в методической деятельности.",
    "teachers.card1Subjects": "Предметы: история, обществознание, основы права",
    "teachers.card2Role": "Преподаватель",
    "teachers.card2Name": "Фамилия Имя Отчество",
    "teachers.card2Bio": "Здесь можно указать специализацию преподавателя, тему методической работы и краткие сведения о профессиональном пути.",
    "teachers.card2Subjects": "Предметы: русский язык и литература",
    "teachers.card3Role": "Преподаватель",
    "teachers.card3Name": "Фамилия Имя Отчество",
    "teachers.card3Bio": "Подходит для размещения информации о наградах, повышении квалификации, авторских разработках и участии в конкурсах.",
    "teachers.card3Subjects": "Предметы: казахский язык, иностранный язык",
    "teachers.card4Role": "Преподаватель",
    "teachers.card4Name": "Фамилия Имя Отчество",
    "teachers.card4Bio": "В этом блоке удобно показывать педагогическое кредо, направления работы с курсантами и участие в воспитательных мероприятиях.",
    "teachers.card4Subjects": "Предметы: география, обществознание",
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
    "events.text": "Этот раздел делает страницу живой: здесь можно обновлять информацию о значимых мероприятиях, победах курсантов и работе преподавателей в течение учебного года.",
    "events.card1Tag": "Мероприятия",
    "events.card1Title": "Предметные недели и открытые занятия",
    "events.card1Text": "Анонсы и итоги открытых уроков, интегрированных занятий, викторин и тематических недель цикла.",
    "events.card2Tag": "Достижения",
    "events.card2Title": "Олимпиады, конкурсы, конференции",
    "events.card2Text": "Победы и участие курсантов в олимпиадах по истории, языкам, литературе и общественным дисциплинам.",
    "events.card3Tag": "Патриотическое воспитание",
    "events.card3Title": "Уроки мужества и памятные даты",
    "events.card3Text": "Встречи, круглые столы и образовательные события, посвященные истории, героизму и служению Родине.",
    "resources.eyebrow": "Материалы",
    "resources.title": "Полезные разделы для курсантов и родителей",
    "resources.card1Title": "Учебно-методические материалы",
    "resources.card1Text": "Список литературы, рекомендации по подготовке, презентации и электронные пособия.",
    "resources.card2Title": "График консультаций",
    "resources.card2Text": "Расписание дополнительных занятий, индивидуальных консультаций и работы кружков.",
    "resources.card3Title": "Нормативная база",
    "resources.card3Text": "Внутренние положения, планы работы цикла, темы самообразования и методические документы.",
    "contacts.eyebrow": "Контакты",
    "contacts.title": "Информация для связи с циклом",
    "contacts.text": "Ниже оставлены шаблонные данные. Их можно заменить на реальные контакты, кабинет, электронную почту и график приема.",
    "contacts.headLabel": "Руководитель цикла",
    "contacts.headValue": "Фамилия Имя Отчество",
    "contacts.roomLabel": "Кабинет",
    "contacts.roomValue": "№ 000, учебный корпус",
    "contacts.mailLabel": "Электронная почта",
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
    "hero.text": "Цикл курсанттардың гуманитарлық, тілдік және жалпы білім беру даярлығын қамтамасыз етеді, олардың дүниетанымын кеңейтіп, азаматтық жауапкершілігін, сөйлеу мәдениетін және тарихи-рухани құндылықтарға құрметін қалыптастырады.",
    "hero.primary": "Оқытушылар құрамы",
    "hero.secondary": "Циклмен байланысу",
    "hero.point1": "Курсанттарды гуманитарлық және жалпы білім беру бағыттары бойынша даярлау",
    "hero.point2": "Әдістемелік, тәрбиелік және зерттеу жұмысы",
    "hero.point3": "Олимпиадаларды, конференцияларды және тақырыптық іс-шараларды қолдау",
    "hero.status": "Колледждің оқу бөлімшесі",
    "hero.taskLabel": "Негізгі міндет",
    "hero.taskText": "Білімді, тәртіпті және адамгершілік тұрғыдан орнықты курсант қалыптастыру",
    "hero.workLabel": "Жұмыс бағыттары",
    "hero.workText": "Оқу, әдістемелік, тәрбиелік және аудиториядан тыс қызмет",
    "hero.audienceLabel": "Сайт кімге арналған",
    "hero.audienceText": "Курсанттар, ата-аналар, оқытушылар және колледж әкімшілігі",
    "hero.footerHead": "Цикл жетекшісі: Тегі Аты Әкесінің аты",
    "hero.footerRoom": "Кабинет: № 000",
    "about.eyebrow": "Цикл туралы",
    "about.title": "Курсанттарды даярлаудағы циклдің мақсаты мен рөлі",
    "about.text1": "Гуманитарлық және жалпы білім беру пәндері циклі ойлауды, тілдік сауаттылықты, құқықтық және тарихи мәдениетті дамытатын пәндерді оқытуды үйлестіреді, сондай-ақ патриотизмді, жауапкершілікті және қызметке құрметті тәрбиелеуді қолдайды.",
    "about.text2": "Бұл бетте цикл құрылымын, оқытушылар құрамын, пәндерді, курсанттардың жетістіктерін, оқу-әдістемелік материалдарды және негізгі жұмыс бағыттарын көрсетуге болады.",
    "about.stat1": "цикл құрамындағы оқу пәні",
    "about.stat2": "негізгі қызмет бағыты",
    "about.stat3": "жыл ішіндегі тақырыптық іс-шара",
    "about.stat4": "курсантты жан-жақты дамытуға бағдар",
    "disciplines.eyebrow": "Пәндер",
    "disciplines.title": "Оқу пәндері бөлімінде нені көрсетуге болады",
    "disciplines.text": "Жай ғана тізім берудің орнына, әр пәннің нені үйрететінін және курсанттың кәсіби әрі тұлғалық қалыптасуында қандай рөл атқаратынын көрсету маңызды.",
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
    "teachers.title": "Оқытушылар құрамының карточкалары",
    "teachers.text": "Төменде дайын карточка форматы берілген. Мұнда үлгі деректерді нақты фотосуреттермен, Т.А.Ә., өмірбаянмен, біліктілікпен және пәндер тізімімен ауыстыруға болады.",
    "teachers.card1Role": "Цикл жетекшісі",
    "teachers.card1Name": "Тегі Аты Әкесінің аты",
    "teachers.card1Bio": "Оқытушының қысқаша өмірбаяны: білімі, еңбек өтілі, біліктілігі, педагогикалық жетістіктері және әдістемелік жұмысқа қатысуы.",
    "teachers.card1Subjects": "Пәндер: тарих, қоғамтану, құқық негіздері",
    "teachers.card2Role": "Оқытушы",
    "teachers.card2Name": "Тегі Аты Әкесінің аты",
    "teachers.card2Bio": "Мұнда оқытушының мамандануы, әдістемелік жұмысының тақырыбы және кәсіби жолы туралы қысқаша мәлімет беруге болады.",
    "teachers.card2Subjects": "Пәндер: орыс тілі мен әдебиеті",
    "teachers.card3Role": "Оқытушы",
    "teachers.card3Name": "Тегі Аты Әкесінің аты",
    "teachers.card3Bio": "Марапаттар, біліктілікті арттыру, авторлық әзірлемелер және байқауларға қатысу туралы ақпаратты орналастыруға ыңғайлы.",
    "teachers.card3Subjects": "Пәндер: қазақ тілі, шетел тілі",
    "teachers.card4Role": "Оқытушы",
    "teachers.card4Name": "Тегі Аты Әкесінің аты",
    "teachers.card4Bio": "Бұл блокта педагогикалық ұстанымды, курсанттармен жұмыс бағыттарын және тәрбиелік іс-шараларға қатысуды көрсету ыңғайлы.",
    "teachers.card4Subjects": "Пәндер: география, қоғамтану",
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
    "events.text": "Бұл бөлім парақшаны жандандырады: мұнда маңызды іс-шаралар, курсанттардың жетістіктері және оқытушылар жұмысы туралы ақпаратты оқу жылы бойы жаңартып отыруға болады.",
    "events.card1Tag": "Іс-шаралар",
    "events.card1Title": "Пәндік апталықтар мен ашық сабақтар",
    "events.card1Text": "Ашық сабақтардың, кіріктірілген дәрістердің, викториналардың және циклдің тақырыптық апталықтарының хабарламалары мен қорытындылары.",
    "events.card2Tag": "Жетістіктер",
    "events.card2Title": "Олимпиадалар, байқаулар, конференциялар",
    "events.card2Text": "Курсанттардың тарих, тілдер, әдебиет және қоғамдық пәндер бойынша олимпиадалардағы жеңістері мен қатысуы.",
    "events.card3Tag": "Патриоттық тәрбие",
    "events.card3Title": "Ерлік сабақтары және атаулы күндер",
    "events.card3Text": "Тарихқа, ерлікке және Отанға қызмет етуге арналған кездесулер, дөңгелек үстелдер мен білім беру іс-шаралары.",
    "resources.eyebrow": "Материалдар",
    "resources.title": "Курсанттар мен ата-аналарға арналған пайдалы бөлімдер",
    "resources.card1Title": "Оқу-әдістемелік материалдар",
    "resources.card1Text": "Әдебиеттер тізімі, дайындық бойынша ұсыныстар, презентациялар және электрондық құралдар.",
    "resources.card2Title": "Кеңес беру кестесі",
    "resources.card2Text": "Қосымша сабақтардың, жеке кеңестердің және үйірме жұмысының кестесі.",
    "resources.card3Title": "Нормативтік база",
    "resources.card3Text": "Ішкі ережелер, циклдің жұмыс жоспарлары, өзін-өзі дамыту тақырыптары және әдістемелік құжаттар.",
    "contacts.eyebrow": "Байланыс",
    "contacts.title": "Циклмен байланысу ақпараты",
    "contacts.text": "Төменде үлгі деректер қалдырылған. Оларды нақты байланыс мәліметтерімен, кабинетпен, электрондық поштамен және қабылдау кестесімен ауыстыруға болады.",
    "contacts.headLabel": "Цикл жетекшісі",
    "contacts.headValue": "Тегі Аты Әкесінің аты",
    "contacts.roomLabel": "Кабинет",
    "contacts.roomValue": "№ 000, оқу корпусы",
    "contacts.mailLabel": "Электрондық пошта",
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
    "teachers.title": "Faculty profile cards",
    "teachers.text": "Below is a ready-made card format. You can replace the placeholder data with real photos, names, biographies, qualifications and subject lists.",
    "teachers.card1Role": "Head of the cycle",
    "teachers.card1Name": "Full Name",
    "teachers.card1Bio": "A short faculty profile: education, work experience, qualifications, teaching achievements and participation in methodological work.",
    "teachers.card1Subjects": "Subjects: history, social studies, basics of law",
    "teachers.card2Role": "Teacher",
    "teachers.card2Name": "Full Name",
    "teachers.card2Bio": "This card can describe the teacher's specialization, methodological topic and brief professional background.",
    "teachers.card2Subjects": "Subjects: Russian language and literature",
    "teachers.card3Role": "Teacher",
    "teachers.card3Name": "Full Name",
    "teachers.card3Bio": "Suitable for placing information about awards, professional development, authored materials and participation in competitions.",
    "teachers.card3Subjects": "Subjects: Kazakh language, foreign language",
    "teachers.card4Role": "Teacher",
    "teachers.card4Name": "Full Name",
    "teachers.card4Bio": "This block is useful for showing the teacher's pedagogical credo, work with cadets and participation in educational activities.",
    "teachers.card4Subjects": "Subjects: geography, social studies",
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
    "contacts.text": "Placeholder details are shown below. They can be replaced with real contact information, office, email and consultation schedule.",
    "contacts.headLabel": "Head of the cycle",
    "contacts.headValue": "Full Name",
    "contacts.roomLabel": "Office",
    "contacts.roomValue": "Room 000, academic building",
    "contacts.mailLabel": "Email",
    "contacts.phoneLabel": "Phone",
    "footer.college": "Military College",
    "footer.cycle": "Cycle of Humanities and General Education Disciplines",
  },
};

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
  return translations[language]?.[key] ?? translations.ru[key] ?? "";
};

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

let lastMobileHeaderScrollY = window.scrollY || window.pageYOffset || 0;

const syncMobileHeader = () => {
  if (!siteHeader) {
    return;
  }

  const currentScrollY = window.scrollY || window.pageYOffset || 0;
  const isMobileViewport = window.innerWidth <= MOBILE_HEADER_BREAKPOINT;
  const navIsOpen = siteNav?.classList.contains("is-open") ?? false;

  if (!isMobileViewport) {
    if (navIsOpen) {
      siteNav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
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
