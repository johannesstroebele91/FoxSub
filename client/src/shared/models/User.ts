import {DateFormatted} from "./DateFormatted";

export interface User {
    id?: string;

    firstName?: string;

    lastName?: string;

    email?: string;

    goal?: number;

    monthlyCumulatedPayment?: number;

    dueDate?: DateFormatted;

    subscriptionCounter?: number;
}
