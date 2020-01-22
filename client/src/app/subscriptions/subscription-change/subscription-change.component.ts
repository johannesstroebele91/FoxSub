import {Component, OnInit} from '@angular/core';
import { Subscription} from "../../../../shared/models/Subscription";
import { SubscriptionsService } from '../../../../shared/services/subscriptions.service';
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../../../shared/models/User";

@Component({
    selector: 'app-subscription-change',
    templateUrl: './subscription-change.component.html',
    styleUrls: ['./subscription-change.component.scss']
})

export class SubscriptionChangeComponent implements OnInit {

    //subscription: Subscription = {};

    // TODO: get showEdit value
    public showEdit: boolean = true;

    form: FormGroup;

    // TODO: date format
    // TODO: get DB Data and delete mocks
    serviceName: String = "Spotify";
    subscription: Subscription = {uuid: "0", cost: 10, dueDate: 2000, paymentMethod: "paypal", monthlyPayment: true, automaticPayment: false};

    constructor(
        private subscriptionsService: SubscriptionsService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder) { }

    buildForm() {
        if(this.showEdit){
            this.form = this.formBuilder.group( {
                name: [this.serviceName, [Validators.required]],
                dueDate: [''], // date as String (2020-05-08)
                price: [this.subscription.cost, [Validators.required]],
                provider: [this.subscription.service, [Validators.required]],
                monthlyPayment: [this.subscription.monthlyPayment, [Validators.required]],
                payment: [this.subscription.paymentMethod, [Validators.required]],
                automaticRenewal: [this.subscription.automaticPayment, [Validators.required]]
            });
        }else{
            this.form = this.formBuilder.group( {
                name: ['', [Validators.required]],
                dueDate: [''],
                price: ['', [Validators.required]],
                provider: ['', [Validators.required]],
                monthlyPayment: [false, [Validators.required]],
                payment: ['', [Validators.required]],
                automaticRenewal: [false, [Validators.required]]
            });
        }
    }

    submitEdit() {
        //TODO:
    }
    submitAdd() {
        //TODO:
    }

    ngOnInit() {
        // this.subscriptionsService.getSubscription(this.activatedRoute.snapshot.params.uuid)
        this.subscriptionsService.getSubscription("1564509e-3c5e-11ea-bc30-0242ac120002")
            .subscribe((subscription) => { this.subscription = subscription });

        this.buildForm();
    }
}
