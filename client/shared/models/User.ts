export class User {

    constructor(private userId: number, private lastName: string, private firstName: string, private email: string, private password: string, goal: number, private monthlyCummulatedPayment: boolean, private nextDueDate: Date, subscriptionCounter: number, private subscriptionId: number) {
    }
}
