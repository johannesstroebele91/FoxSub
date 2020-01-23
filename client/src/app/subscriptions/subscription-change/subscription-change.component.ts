import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from "../../../shared/models/Subscription";
import {SubscriptionsService} from "../../../shared/services/subscriptions.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {ServicesService} from "../../../shared/services/services.service";
import {Service} from "../../../shared/models/Service";

@Component({
    selector: 'app-subscription-change',
    templateUrl: './subscription-change.component.html',
    styleUrls: ['./subscription-change.component.scss']
})

export class SubscriptionChangeComponent implements OnInit {

    subscription: Subscription;
    services: Service[];

    // TODO: get showEdit value

    public showError: boolean = false;
    public showEdit: boolean = false;

    form: FormGroup;

    // TODO: date format
    // TODO: get DB Data and delete mocks
    // serviceName: String = "Spotify";
    // subscription: Subscription = {uuid: "0", cost: 10, dueDate: 2000, paymentMethod: "paypal", monthlyPayment: true, automaticPayment: false};

    constructor(
        private subscriptionsService: SubscriptionsService,
        private servicesService: ServicesService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router) { }

    buildForm() {
        if(this.showEdit){
            //EditForm
            this.form = this.formBuilder.group( {
                name: [''],
                dueDate: ['2020-05-30'], // date as String (2020-05-08)
                cost: [this.subscription.cost],
                monthlyPayment: [this.subscription.monthlyPayment],
                payment: [this.subscription.paymentMethod],
                automaticRenewal: [this.subscription.automaticPayment]
            });
        }else{
            //AddForm
            this.form = this.formBuilder.group( {
                services: ['', [Validators.required]],
                dueDate: [''],
                cost: ['', [Validators.required]],
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
        this.subscription = {
            cost: this.form.get('price').value,
            dueDate: this.form.get('dueDate').value,
            paymentMethod: this.form.get('paymentMethod').value,
            monthlyPayment: this.form.get('monthlyPayment').value,
            automaticPayment: this.form.get('automaticPayment').value,
            service: this.form.get('service').value,
        };

        this.subscriptionsService.createSubscriptions(this.subscription).pipe(
            catchError(() => {
                this.showError = true;
                return of();
            })
        ).subscribe(()=> this.router.navigate(["/subscriptions"]));
    }

    ngOnInit() {
        this.subscriptionsService.getSubscription(this.activatedRoute.snapshot.params.uuid)
             .subscribe((subscription) => { this.subscription = subscription });

        this.servicesService.getServices()
            .subscribe((services) => { this.services = services });

        console.log(this.services);

        this.buildForm();
    }
}
