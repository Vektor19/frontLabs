export class LearningTheme {
    constructor(id, title, author, taskType, usersToday, usersYesterday, learnDuration, imagePath, lessonNames) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.taskType = taskType;
        this.usersToday = usersToday;
        this.usersYesterday = usersYesterday;
        this.learnDuration = learnDuration;
        this.imagePath = imagePath;
        this.lessonNames = lessonNames;
    }
}
