import {Component} from '@angular/core';
import {User} from "../../../shared/models/User";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
    user : User = {id: '1', firstName: 'Userius', lastName: 'Rex', email: 'userius@rex.me', goal: 15, montlyCumulatedPayment: 35.99, nextDueDate: 221213, subscriptionCounter: 9}

    monthlyPayment: number = this.user.montlyCumulatedPayment;
    goal: number = this.user.goal;
    dueDate: number = this.user.nextDueDate;

    // CHART
    data: any = [
        {
            "name": "Subscriptions",
            "series": [
                {
                    "name": "Others",
                    "value": 10
                },
                {
                    "name": "Games",
                    "value": 20
                },
                {
                    "name": "Productivity",
                    "value": 30
                },
                {
                    "name": "Entertainment",
                    "value": 40
                }
            ]
        }
    ];

    view: any[] = [200, 400];

    // options
    showXAxis: boolean = false;
    showYAxis: boolean = false;
    gradient: boolean = false;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    showYAxisLabel: boolean = true;
    animations: boolean = true;
    tooltipDisabled: boolean = true;

    colorScheme = {
        domain: ['#3498db', '#9b59b6', '#e67e22', "#f1c40f"]
    };

    constructor() {
        Object.assign(this, this.data);
    }

    onSelect(event) {
        console.log(event);
    }

    clickEdit() {
        //TODO
    }
}
