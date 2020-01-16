import { Component} from '@angular/core';
import { Subscription} from "../../../../shared/models/Subscription";
import { SubscriptionsService } from '../../../../shared/services/subscriptions.service';
import { ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-subscription-change',
    templateUrl: './subscription-change.component.html',
    styleUrls: ['./subscription-change.component.scss']
})

export class SubscriptionChangeComponent {

    subscription: Subscription = {};

    constructor(
        private subscriptionsService: SubscriptionsService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.subscriptionsService.getSubscription(this.activatedRoute.snapshot.params.uuid)
            .subscribe((subscription) => { this.subscription = subscription })
    }
}
