import {Component} from '@angular/core';
import {Subscription} from "../../../../shared/models/Subscription";

@Component({
    selector: 'app-subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent {

    // TODO delete mock data later
    subscriptions: Subscription[] = [
        {id: '1', cost: 5, dueDate: 2000, monthlyPayment: true, paymentMethod: 'PayPal', automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {id: '2', cost: 5, dueDate: 2000, monthlyPayment: true, paymentMethod: 'PayPal', automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {id: '3', cost: 10, dueDate: 2000, monthlyPayment: true, paymentMethod: 'PayPal', automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {id: '4', cost: 10, dueDate: 2000, monthlyPayment: true, paymentMethod: 'PayPal', automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {id: '5', cost: 5, dueDate: 2000, monthlyPayment: true, paymentMethod: 'PayPal', automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {id: '6', cost: 5, dueDate: 2000, monthlyPayment: true, paymentMethod: 'PayPal', automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
    ];

}
