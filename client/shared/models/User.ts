export class User {
    get subscriptionCounter(): number {
        return this._subscriptionCounter;
    }

    set subscriptionCounter(value: number) {
        this._subscriptionCounter = value;
    }
    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get monthlyCummulatedPayment(): number {
        return this._monthlyCummulatedPayment;
    }

    set monthlyCummulatedPayment(value: number) {
        this._monthlyCummulatedPayment = value;
    }

    get nextDueDate(): Date {
        return this._nextDueDate;
    }

    set nextDueDate(value: Date) {
        this._nextDueDate = value;
    }

    constructor(private _userId: number, private _lastName: string, private _firstName: string, private _email: string, private _password: string, goal: number, private _monthlyCummulatedPayment: number, private _nextDueDate: Date, private _subscriptionCounter: number) {
    }
}
