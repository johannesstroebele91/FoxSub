import {Component, Input} from '@angular/core';
import {Subscription} from "../../../../../shared/models/Subscription";

@Component({
    selector: 'subscription-list-expansion',
    templateUrl: './subscription-list-element.component.html',
    styleUrls: ['./subscription-list-element.component.scss']
})
export class SubscriptionListElementComponent {

    @Input() subscription: Subscription;

    isExpanded: boolean = false;

    clickDetails(){
        this.isExpanded = !this.isExpanded;
    }

    clickEdit(){
        // TODO implement edit functionality
    }
}
