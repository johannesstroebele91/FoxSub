import { Service } from "./Service";

export interface Subscription {

    id?: string;

    cost?: number;

    dueDate?: number;

    paymentMethod?: string;

    monthlyPayment?: boolean;

    automaticPayment?: boolean;

    service?: Service;
}
