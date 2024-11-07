// User.js
export class FeedbackUser {
    constructor(lastName, firstName, age, email, feedbackGoal, feedbackDate) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.email = email;
        this.feedbackGoal = feedbackGoal;
        this.feedbackDate = new Date(feedbackDate);
    }
}
