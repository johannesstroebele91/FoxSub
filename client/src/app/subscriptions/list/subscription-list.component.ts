import {Component, OnInit} from '@angular/core';
import {Subscription} from "../../../../shared/models/Subscription";

@Component({
    selector: 'subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
    spotifySubscription: Subscription = new Subscription(1,5.99,new Date(), true, true);
    netflixSubscription: Subscription = new Subscription(1,5.99,new Date(), true, true);
    adobeSubscription: Subscription = new Subscription(1,5.99,new Date(), true, true);
    fit4funubscription: Subscription = new Subscription(1,5.99,new Date(), true, true);
    officeSubscription: Subscription = new Subscription(1,5.99,new Date(), true, true);

    subscriptions: Subscription[] = [this.spotifySubscription, this.netflixSubscription, this.adobeSubscription, this.fit4funubscription, this.officeSubscription];

    ngOnInit(): void {
        console.log(this.subscriptions)
    }
}