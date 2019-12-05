export class Subscription {

    subscriptionId: number;
    cost: number;
    dueData: Date;
    monthlyPayment: boolean;
    automaticPayment: boolean;
    serviceId: number;

    constructor(subscriptionId: number, cost: number, dueData: Date, monthlyPayment: boolean, automaticPayment: boolean, serviceId: number) {
        this.subscriptionId = subscriptionId;
        this.cost = cost;
        this.dueData = dueData;
        this.monthlyPayment = monthlyPayment;
        this.automaticPayment = automaticPayment;
        this.serviceId = serviceId;
    }
}
