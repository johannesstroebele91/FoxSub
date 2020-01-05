import { Service } from "./Service";

export interface Subscription {

    id?: string;

    cost?: number;

    dueDate?: number;

    monthlyPayment?: boolean;

    automaticPayment?: boolean;

    service?: Service;
}