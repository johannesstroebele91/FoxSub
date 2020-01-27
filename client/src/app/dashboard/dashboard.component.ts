import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {DateFormatter} from "../../shared/utility/dateFormatter";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../shared/models/Category";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{

    // Initialisation with empty object is important
    user: User = {};
    categories: Category[] = [];

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,) {
        Object.assign(this, this.data);
    }

    getNextDueDate(){
        return DateFormatter.formatDateFromDB(this.user.dueDate);
    }

    ngOnInit() {
        // load user from the database with resolver
        if(this.activatedRoute.snapshot.data.user){
            this.user = this.activatedRoute.snapshot.data.user;
        }

        // load user from the database with resolver
        if(this.activatedRoute.snapshot.data.categories){
            this.categories = this.activatedRoute.snapshot.data.categories;
        }

        this.data[0].series = this.categoriesForGraph();
    }

    // CHART
    data: any = [
        {
            "name": "Subscriptions",
            "series": []
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

    // Creates an array for the graph of the categories
    categoriesForGraph() {
        const data = [];
        this.categories.forEach((category) => {
            data.push({name: category.category, value: category.cost})
        });

        return data;
    }
}
