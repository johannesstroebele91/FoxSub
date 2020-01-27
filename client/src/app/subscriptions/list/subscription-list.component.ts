import {Component, OnInit} from '@angular/core';
import { Subscription } from "../../../shared/models/Subscription";
import { SubscriptionsService } from '../../../shared/services/subscriptions.service';

@Component({
    selector: 'app-subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

    subscriptions: Subscription[] = [];

    constructor(private subscriptionsService: SubscriptionsService) { }

    ngOnInit() {
        // loading subscriptions from the database via the subscriptionService
        this.subscriptionsService.getSubscriptions()
            .subscribe((subscriptions) => { this.subscriptions = subscriptions });
    }
}
