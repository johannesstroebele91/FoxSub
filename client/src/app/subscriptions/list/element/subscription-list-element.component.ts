import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "../../../../shared/models/Subscription";
import {DateFormatted} from "../../../../shared/models/DateFormatted";

@Component({
    selector: 'app-subscription-list-expansion',
    templateUrl: './subscription-list-element.component.html',
    styleUrls: ['./subscription-list-element.component.scss']
})
export class SubscriptionListElementComponent implements OnInit{

    @Input() subscription: Subscription;

    isExpanded: boolean = false;

    dateFormatted: DateFormatted;

    constructor(private router: Router){}

    clickDetails(){
        this.isExpanded = !this.isExpanded;
    }
    
    clickEdit(){
        console.log(this.subscription);
        this.router.navigate(["/subscriptions/edit/" + this.subscription.uuid])
    }

    ngOnInit(): void {
        //TODO getSubscription > DateFormatter.formatDateFromDB()
    }
}
