import {Component, Input} from '@angular/core';
import {Subscription} from "../../../../../shared/models/Subscription";
import {Router} from "@angular/router";

@Component({
    selector: 'app-subscription-list-expansion',
    templateUrl: './subscription-list-element.component.html',
    styleUrls: ['./subscription-list-element.component.scss']
})
export class SubscriptionListElementComponent {

    @Input() subscription: Subscription;

    isExpanded: boolean = false;

    constructor(private router: Router){}

    clickDetails(){
        this.isExpanded = !this.isExpanded;
    }
    
    clickEdit(){
        console.log(this.subscription)
        this.router.navigate(["/subscriptions/edit/" + this.subscription.uuid])
    }
}
