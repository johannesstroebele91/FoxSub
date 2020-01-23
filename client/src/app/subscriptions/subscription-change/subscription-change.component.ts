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
            //EditForm
            this.form = this.formBuilder.group( {
                name: [this.serviceName],
                dueDate: ['2020-05-30'], // date as String (2020-05-08)
                price: [this.subscription.cost],
                provider: [this.subscription.service],
                monthlyPayment: [this.subscription.monthlyPayment],
                payment: [this.subscription.paymentMethod],
                automaticRenewal: [this.subscription.automaticPayment]
            });
        }else{
            //AddForm
            this.form = this.formBuilder.group( {
                name: ['', [Validators.required]],
                dueDate: [''],
                price: ['', [Validators.required]],
                provider: ['', [Validators.required]],
                monthlyPayment: [false],
                payment: ['', [Validators.required]],
                automaticRenewal: [true]
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
        // this.subscriptionsService.getSubscription("6f615dff-3d07-11ea-b50a-0242ac120002")
        //     .subscribe((subscription) => { this.subscription = subscription });

        this.buildForm();
    }
}
