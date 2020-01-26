import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "../../../../shared/models/Subscription";
import {DateFormatter} from "../../../../shared/utility/dateFormatter";

@Component({
    selector: 'app-subscription-list-expansion',
    templateUrl: './subscription-list-element.component.html',
    styleUrls: ['./subscription-list-element.component.scss']
})
export class SubscriptionListElementComponent implements OnInit{

    @Input() subscription: Subscription;

    isExpanded: boolean = false;

    dueDateFormatted: string;

    constructor(private router: Router){}

    clickDetails(){
        this.isExpanded = !this.isExpanded;
    }
    
    clickEdit(){
        // redirect to the respective subscription based on the uuid
        this.router.navigate(["/subscriptions/edit/" + this.subscription.uuid])
    }

    ngOnInit(): void {
        // Format due date
        this.dueDateFormatted = DateFormatter.formatDateFromDB(this.subscription.dueDate);
    }
}
