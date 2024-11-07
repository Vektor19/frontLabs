import {LearningTheme} from "./Models/LearningTheme.js";


const path = "./js/data/learningThemes.json"; // Шлях до файлу з даними про навчальні теми

class ThemesFileReader {
    
    // Асинхронний метод для зчитування тем
    async read_themes() {
        // Отримуємо дані з файлу
        const response = await fetch(path);
        
        // Перетворюємо відповідь у формат JSON
        const themes = await response.json();
        
        // Створюємо нові об'єкти LearningTheme
        return themes.map(theme => new LearningTheme(
            theme.id, 
            theme.title, 
            theme.author, 
            theme.taskType, 
            theme.usersToday, 
            theme.usersYesterday, 
            theme.learnDuration, 
            theme.imagePath, 
            theme.lessonNames
        ));
    }
}

export default new ThemesFileReader();
