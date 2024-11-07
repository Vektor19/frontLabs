import ThemesFileReader from './ThemesFileReader.js';

// Об'єкт ThemesManager для управління різними операціями, пов'язаними з темами
const ThemesManager = {
    
    // Асинхронно сортує теми за тривалістю навчання у порядку зростання
    async sort_themes_by_duration(){
        const themes = await ThemesFileReader.read_themes();
        // Сортування тем за загальною тривалістю у хвилинах
        return themes.sort((a, b) => {
            const durationA = a.learnDuration.hours * 60 + a.learnDuration.minutes;
            const durationB = b.learnDuration.hours * 60 + b.learnDuration.minutes;
            return durationA - durationB;
        });
    },
    
    // Розраховує середню кількість користувачів для заданої теми за два дні
    async average_theme_users(theme){
        return (theme.usersToday + theme.usersYesterday) / 2;
    },
    
    // Знаходить тему з найменшою кількістю користувачів за вчорашній день (добу_2)
    async get_lowest_yesterday_users_theme(themes){
        // Сортування тем за вчорашнім днем у порядку зростання та повернення першого елементу
        return themes.sort((a, b) => a.usersYesterday - b.usersYesterday)[0];
    },
    
    // Додає нову тему до списку у відсортованому порядку або на початок, якщо дані не повні
    async add_new_theme(newTheme) {
        const themes = await ThemesFileReader.read_themes();
        
        // Перевірка, чи нова тема має всі необхідні поля
        const isComplete = newTheme.id && newTheme.title && newTheme.author && newTheme.taskType 
                           && newTheme.usersToday && newTheme.usersYesterday && newTheme.learnDuration 
                           && newTheme.imagePath && newTheme.lessonNames;
        
        if(!isComplete){
            // Якщо дані неповні, додаємо нову тему на початок списку
            themes.unshift(newTheme);
        } else {
            // Сортування тем за іменем автора
            themes.sort((a, b) => a.author.localeCompare(b.author));
            let index = 0;
            // Пошук правильного місця для вставки нової теми за іменем автора
            while (index < themes.length && themes[index].author.localeCompare(newTheme.author) < 0) {
                index++;
            }
            // Вставка нової теми на визначене місце
            themes.splice(index, 0, newTheme);
        }
        return await themes;
    },
    
    // Обчислює загальну тривалість навчання для всіх тем, 
    // збільшуючи на 1.5 рази, якщо тем більше ніж 3
    async count_learning_duration(themes){
        let totalDuration = 0;
        // Підсумовування тривалості кожної теми у хвилинах
        themes.forEach(theme => {
            totalDuration += (theme.learnDuration.hours * 60 + theme.learnDuration.minutes);
        });
        // Застосування множника 1.5, якщо тем більше ніж 3
        return totalDuration * (themes.length <= 3 ? 1 : 1.5);
    }
};

export default ThemesManager;
