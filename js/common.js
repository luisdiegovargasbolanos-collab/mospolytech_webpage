// =======================================================
// ОБЩАЯ ЛОГИКА (LÓGICA COMÚN: TEMA E IDIOMA)
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ (TOGGLE THEME) ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    const header = document.querySelector('header');
    
    // Элементы, специфичные для разных страниц
    const infoCard = document.querySelector('.info-card');
    const floorWrapper = document.getElementById('floorButtonsWrapper');
    const floorPlan = document.querySelector('.floor-plan');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.contains('dark');
            
            if (isDark) {
                // Переключение на Светлую тему (Light Mode)
                body.classList.replace('dark', 'light');
                header.classList.replace('dark', 'light');
                
                if (infoCard) infoCard.classList.replace('dark', 'light');
                if (floorWrapper) floorWrapper.classList.replace('dark', 'light');
                if (floorPlan) floorPlan.classList.replace('dark', 'light');

                themeToggle.classList.add('light'); 
                themeIcon.textContent = '☀️'; 
            } else {
                // Переключение на Темную тему (Dark Mode)
                body.classList.replace('light', 'dark');
                header.classList.replace('light', 'dark');

                if (infoCard) infoCard.classList.replace('light', 'dark');
                if (floorWrapper) floorWrapper.classList.replace('light', 'dark');
                if (floorPlan) floorPlan.classList.replace('light', 'dark');

                themeToggle.classList.remove('light'); 
                themeIcon.textContent = '🌙'; 
            }
        });
    }

    // --- ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА (LANGUAGE TOGGLE) ---
    const flags = document.querySelectorAll('.flag');
    
    flags.forEach(flag => {
        flag.addEventListener('click', () => {
            const lang = flag.getAttribute('data-lang');
            
            // Смена активного флага
            flags.forEach(f => f.classList.remove('active'));
            flag.classList.add('active');

            // Класс для body (для CSS фильтрации)
            if (lang === 'en') {
                body.classList.add('is-en');
            } else {
                body.classList.remove('is-en');
            }

            // Обновление текстов на главной (если функция есть)
            if (typeof updatePageTexts === 'function') {
                updatePageTexts(lang);
            }
        });
    });
});