import { Service } from "./Service";

export interface Subscription {

    uuid?: string;

    cost?: number;

    dueDate?: number;

    paymentMethod?: string;

    monthlyPayment?: boolean;

    automaticPayment?: boolean;

    service?: Service;
}
