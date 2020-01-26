import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {DateFormatter} from "../../shared/utility/dateFormatter";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
    //TODO get User drom DB
    //user : User = {id: '1', firstName: 'Userius', lastName: 'Rex', email: 'userius@rex.me', goal: 15, montlyCumulatedPayment: 35.99, nextDueDate: 221213, subscriptionCounter: 9};


    user: User;
    dueDateFormatted: string;

    constructor(
        private userService: UserService) {
        Object.assign(this, this.data);
    }

    clickEdit() {
        //TODO optional: goal edit
    }

    ngOnInit() {
        // get subscription from the database based on uuid
        this.userService.getUser()
            .subscribe((user) => {
                this.user = user;
            });
    }

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

    // Chart options
    showXAxis: boolean = false;
    showYAxis: boolean = false;
    gradient: boolean = false;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    showYAxisLabel: boolean = true;
    animations: boolean = true;
    tooltipDisabled: boolean = true;

    // Chart colors
    colorScheme = {
        domain: ['#3498db', '#9b59b6', '#e67e22', "#f1c40f"]
    };
}
