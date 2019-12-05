import {Component, OnInit} from '@angular/core';
import {Subscription} from "../../../../shared/models/Subscription";

@Component({
    selector: 'subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
    spotifySubscription: Subscription = new Subscription(1,5.99,new Date(), true, true, 1);
    netflixSubscription: Subscription = new Subscription(1,5.99,new Date(), true, true, 1);
    adobeSubscription: Subscription = new Subscription(1,5.99,new Date(), true, true, 1);
    fit4funubscription: Subscription = new Subscription(1,5.99,new Date(), true, true, 1);
    officeSubscription: Subscription = new Subscription(1,5.99,new Date(), true, true, 1);

    subscriptions: Subscription[] = [this.spotifySubscription, this.netflixSubscription, this.adobeSubscription, this.fit4funubscription, this.officeSubscription];

    ngOnInit(): void {
        console.log(this.subscriptions)
    }
}