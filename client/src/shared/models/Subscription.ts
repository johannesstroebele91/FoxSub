import { Service } from "./Service";
import { DateFormatted } from "./DateFormatted";

export interface Subscription {

    uuid?: string;

    cost?: number;

    dueDate?: DateFormatted;

    paymentMethod?: string;

    monthlyPayment?: boolean;

    automaticPayment?: boolean;

    service?: Service;

    serviceId?: string;
}
