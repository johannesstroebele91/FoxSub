export class Subscription {
    constructor(private _subscriptionId: number, private _cost: number, private _dueData: Date, private _monthlyPayment: boolean, private _automaticPayment: boolean) {
    }
    get subscriptionId(): number {
        return this._subscriptionId;
    }

    set subscriptionId(value: number) {
        this._subscriptionId = value;
    }

    get cost(): number {
        return this._cost;
    }

    set cost(value: number) {
        this._cost = value;
    }

    get dueData(): Date {
        return this._dueData;
    }

    set dueData(value: Date) {
        this._dueData = value;
    }

    get monthlyPayment(): boolean {
        return this._monthlyPayment;
    }

    set monthlyPayment(value: boolean) {
        this._monthlyPayment = value;
    }

    get automaticPayment(): boolean {
        return this._automaticPayment;
    }

    set automaticPayment(value: boolean) {
        this._automaticPayment = value;
    }
}
