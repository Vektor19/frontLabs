const FeedbackUsersManager = {
    users: [],
    
    // Асинхронний метод для додавання нового користувача
    async add_user(user){
        this.users.push(user);
    },
    
    // Фільтрація користувачів за місяцем та діапазоном часу
    filter_by_month_and_time_diapason(month, timeFrom, timeTo){
        return this.users.filter(user => {
            const date = user.feedbackDate;
            // Перевірка, чи відповідає місяць і чи входить час у вказаний діапазон
            return date.getMonth() + 1 === month && date.getHours() >= timeFrom && date.getHours() <= timeTo;       
        });
    },
    
    // Отримує користувача з найменшим віком
    get_min_age_user() {
        // Сортування користувачів за віком у зростаючому порядку та повернення першого
        return this.users.sort((a, b) => a.age - b.age)[0];
    },
    
    // Класифікує користувачів за віковими категоріями: Youth, Middle, Senior
    classify_users_by_age() {
        // Створення об'єкту для зберігання категорій
        const ageClasses = {
            Youth: { users: [], length: 0 },
            Middle: { users: [], length: 0 },
            Senior: { users: [], length: 0 }
        };

        // Додавання користувачів до відповідної категорії залежно від віку
        this.users.forEach(user => {
            const ageClass = user.age < 25 ? "Youth" 
                           : user.age >= 25 && user.age <= 60 ? "Middle" 
                           : "Senior";
            ageClasses[ageClass].users.push(user);
        });

        // Підрахунок кількості користувачів у кожній віковій категорії
        ageClasses.Youth.length = ageClasses.Youth.users.length;
        ageClasses.Middle.length = ageClasses.Middle.users.length;
        ageClasses.Senior.length = ageClasses.Senior.users.length;

        return ageClasses;
    },
    
    // Сортує користувачів за електронною поштою в алфавітному порядку
    sort_users_by_email() {
        // Повертає копію масиву користувачів, відсортовану за полем email
        return this.users.slice().sort((a, b) => a.email.localeCompare(b.email));
    },
    
    // Виводить відсортовані електронні адреси користувачів та їхні цілі
    display_sorted_emails_with_goals() {
        const sortedUsers = this.sort_users_by_email();
        // Виводимо email і ціль кожного користувача
        sortedUsers.forEach(user => {
            console.log(`Email: ${user.email}, Goal: ${user.feedbackGoal}`);
        });
    }
}

export default FeedbackUsersManager;
