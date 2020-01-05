import {Component} from '@angular/core';
import {Subscription} from "../../../../shared/models/Subscription";

@Component({
    selector: 'subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent {

    displayDetails: boolean = false;

    subscriptions: Subscription[] = [
        {cost: 5, dueDate: 2000, monthlyPayment: true, automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {cost: 5, dueDate: 2000, monthlyPayment: true, automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {cost: 10, dueDate: 2000, monthlyPayment: true, automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {cost: 10, dueDate: 2000, monthlyPayment: true, automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {cost: 5, dueDate: 2000, monthlyPayment: true, automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
        {cost: 5, dueDate: 2000, monthlyPayment: true, automaticPayment: true, service: { name: 'Netflix', category: 'Entertainment' }},
    ];

    clickDetails(){
        this.displayDetails = !this.displayDetails;
    }
}
