import ThemesFileReader from "./ThemesFileReader.js";
import ThemesManager from "./ThemesManager.js";
import FeedbackUsersManager from "./FeedbackUsersManager.js";
import {LearningTheme} from "./Models/LearningTheme.js";
import {FeedbackUser} from "./Models/FeedbackUser.js";

//Обробник події надсилання форми
document.getElementsByTagName("form")[0].addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const lastName = formData.get("surname");
    const firstName = formData.get("name");
    const age = Number(formData.get("age"));
    const email = formData.get("email");
    const feedbackGoal = formData.get("feedback-purpose");
    const feedbackDate = Date.now();
    const user = new FeedbackUser(lastName, firstName, age, email, feedbackGoal, feedbackDate);
    await FeedbackUsersManager.add_user(user);
    console.log("Users after form: ", FeedbackUsersManager.users);
});

// Читання даних з файлу та виведення їх у консоль
const themes=await ThemesFileReader.read_themes()
console.log("All themes: ", themes);

// Виклик методу, що сортує теми за тривалістю навчання
const sortedThemes=await ThemesManager.sort_themes_by_duration();
console.log("Sorted themes: ", sortedThemes);

// Виклик методу, що знаходить середню кількість відвідувачів для теми
console.log("Average users for theme 1: ", await ThemesManager.average_theme_users(themes[0]));

// Виклик методу для знаходження теми з найменшою кількістю відвідувачів вчора (за добу_2)
const lowestYesterdayUsersTheme=await ThemesManager.get_lowest_yesterday_users_theme(themes);
console.log("Theme with lowest users yesterday: ", lowestYesterdayUsersTheme, " id:", lowestYesterdayUsersTheme.id);

// Виклик методу для додавання нової теми (повна інформація)
const newTheme=new LearningTheme(25, "New theme", "Дуанас О.О", "New task type", 100, 200, {hours: 1, minutes: 30}, "newImagePath", ["newLesson1", "newLesson2"]);
const newThemes = await ThemesManager.add_new_theme(newTheme);
console.log("Themes with new theme: ", newThemes);

// Виклик методу для додавання нової теми (не повна інформація)
const newUncompletedTheme=new LearningTheme(25, "New theme2", "Дуанас О.О", "New task type", 100, 200, {hours: 1, minutes: 30});
const newThemesWithUncompletedTheme = await ThemesManager.add_new_theme(newUncompletedTheme);
console.log("Themes with new uncompleted theme: ", newThemesWithUncompletedTheme);

// Виклик методу для підрахунку загальної тривалості навчання для тем одночасно (3 теми)
const threeThemesArray = [themes[0], themes[1], themes[2]];
console.log("Each theme base learning duration (3 themes array): ");
threeThemesArray.forEach(theme => {
    console.log(theme.title, ": ", theme.learnDuration.hours*60+theme.learnDuration.minutes);
});
console.log("Learning duration for 3 themes: ", await ThemesManager.count_learning_duration(threeThemesArray));

// Виклик методу для підрахунку загальної тривалості навчання для тем одночасно (4 теми - час навчання збільшений на 50%)
const fourThemesArray = [themes[0], themes[1], themes[2], themes[3]];
console.log("Each theme base learning duration (4 themes array): ");
fourThemesArray.forEach(theme => {
    console.log(theme.title, ": ", theme.learnDuration.hours*60+theme.learnDuration.minutes);
});
console.log("Learning duration for 4 themes: ", await ThemesManager.count_learning_duration(fourThemesArray));


// Дані користувачів для відгуків
const usersData = [
    ["Smith", "John", 28, "john@example.com", "General Inquiry", "2023-08-15T10:15:00"],
    ["Doe", "Jane", 34, "jane@example.com", "Support Request", "2023-08-18T14:00:00"],
    ["Brown", "Charlie", 22, "charlie@example.com", "Feedback", "2023-09-10T08:30:00"],
    ["Wilson", "Emily", 58, "emily@example.com", "Complaint", "2023-08-22T12:00:00"],
    ["Taylor", "Michael", 72, "michael@example.com", "Follow-up", "2023-09-02T11:00:00"],
    ["Lee", "Sophia", 19, "sophia@example.com", "General Inquiry", "2023-09-15T09:45:00"],
    ["Kim", "Robert", 45, "robert@example.com", "Technical Issue", "2023-08-12T13:30:00"],
    ["Martinez", "Daniel", 61, "daniel@example.com", "Support Request", "2023-09-08T15:00:00"],
    ["Garcia", "Laura", 29, "laura@example.com", "Feedback", "2023-09-01T10:45:00"],
    ["Anderson", "David", 55, "david@example.com", "Complaint", "2023-09-12T14:15:00"]
];

// Додавання користувачів до списку
usersData.forEach(data => {
    const [lastName, firstName, age, email, feedbackGoal, feedbackDate] = data;
    const user = new FeedbackUser(lastName, firstName, age, email, feedbackGoal, feedbackDate);
    FeedbackUsersManager.add_user(user);
});

// Виведення користувачів
console.log("Users: ", FeedbackUsersManager.users);

// Виведення користувачів, які надіслали відгук у серпні
console.log("Users filtered by month and time diapason: ", FeedbackUsersManager.filter_by_month_and_time_diapason(8, 10, 14));

// Виведення наймолодшого користувача
console.log("User with min age: ", FeedbackUsersManager.get_min_age_user());

// Виведення класифікації користувачів за віком
console.log("Users classified by age: ", FeedbackUsersManager.classify_users_by_age());

// Виведення відсортованих електронних адрес користувачів з вказанням цілей відгуків
FeedbackUsersManager.display_sorted_emails_with_goals();