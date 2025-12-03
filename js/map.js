// =======================================================
// ЛОГИКА КАРТЫ (LÓGICA DEL MAPA)
// =======================================================

// Переводы для динамического контента (Traducciones JS)
const translations = {
    en: {
        faqPlaceholder: "Frequently asked questions",
        searchPlaceholder: "Enter classroom number",
        resultMessage: "Classroom {room} → Floor {floor}, Room {roomNum}",
        floor: "Floor",
        telegramBtn: "To find out how to get there, use our Telegram bot"
    },
    ru: {
        faqPlaceholder: "Часто задаваемые вопросы",
        searchPlaceholder: "Введите номер аудитории",
        resultMessage: "Аудитория {room} → Этаж {floor}, Кабинет {roomNum}",
        floor: "этаж",
        telegramBtn: "Чтобы узнать, как добраться, используйте наш Telegram-бот"
    }
};

let currentLang = 'ru';

// Функция обновления текстов JS
function updatePageTexts(lang) {
    currentLang = lang;
    const t = translations[lang];

    const faqInput = document.querySelector('.faq-input');
    const roomInput = document.getElementById('roomSearch');
    
    if(faqInput) faqInput.placeholder = t.faqPlaceholder;
    if(roomInput) roomInput.placeholder = t.searchPlaceholder;
    
    // Обновление кнопок этажей
    for (let i = 1; i <= 5; i++) {
        const floorBtn = document.getElementById('floor' + i);
        if (floorBtn) {
            const hasIndicator = floorBtn.classList.contains('active');
            floorBtn.innerHTML = i + ' ' + t.floor + (hasIndicator ? ' <span class="indicator"></span>' : '');
        }
    }

    // Обновление результата поиска
    const val = roomInput ? roomInput.value : '';
    if (val.length === 3) handleSearch(val);
}

// Логика поиска
const roomSearch = document.getElementById('roomSearch');
const resultMessage = document.getElementById('resultMessage');
const telegramBotBtn = document.getElementById('telegramBotBtn');

if (roomSearch) {
    roomSearch.addEventListener('input', function(e) {
        // Фильтр: только цифры
        let val = e.target.value.replace(/[^0-9]/g, '');

        if (val.length > 3) val = val.slice(0, 3);

        // Валидация этажа
        if (val.length >= 1) {
            const firstDigit = parseInt(val[0]);
            if (firstDigit === 0 || firstDigit > 5) val = ''; 
        }

        // Валидация десятков
        if (val.length >= 2) {
            const secondDigit = parseInt(val[1]);
            if (secondDigit > 1) val = val.slice(0, 1);
        }

        // Валидация единиц
        if (val.length === 3) {
            const roomNum = parseInt(val.substring(1));
            if (roomNum > 15) val = val.slice(0, 2);
        }

        e.target.value = val;
        handleSearch(val);
    });
}

function handleSearch(query) {
    if (typeof query !== 'string') {
        query = roomSearch.value;
    }

    const t = translations[currentLang];
    
    // Сброс кнопок
    for (let i = 1; i <= 5; i++) {
        const floorBtn = document.getElementById('floor' + i);
        if (floorBtn) {
            floorBtn.classList.remove('active');
            floorBtn.classList.add('inactive');
            floorBtn.innerHTML = i + ' ' + t.floor;
        }
    }

    if(resultMessage) resultMessage.classList.remove('show');
    if(telegramBotBtn) telegramBotBtn.classList.remove('show');

    if (query.length === 3) {
        const firstDigit = parseInt(query[0]);
        const roomNum = query.substring(1);

        if (firstDigit >= 1 && firstDigit <= 5) {
            const floorBtn = document.getElementById('floor' + firstDigit);
            if (floorBtn) {
                floorBtn.classList.remove('inactive');
                floorBtn.classList.add('active');
                floorBtn.innerHTML = firstDigit + ' ' + t.floor + ' <span class="indicator"></span>';
            }

            if(resultMessage) {
                resultMessage.textContent = t.resultMessage
                    .replace('{room}', query)
                    .replace('{floor}', firstDigit)
                    .replace('{roomNum}', roomNum);
                resultMessage.classList.add('show');
            }
            
            if(telegramBotBtn) {
                telegramBotBtn.textContent = "🤖 " + t.telegramBtn;
                telegramBotBtn.classList.add('show');
            }
        }
    }
}

const btnSearch = document.querySelector('.search-btn');
if(btnSearch) {
    btnSearch.addEventListener('click', () => handleSearch());
}