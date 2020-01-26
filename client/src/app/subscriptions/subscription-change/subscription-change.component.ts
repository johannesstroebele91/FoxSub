import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from "../../../shared/models/Subscription";
import {SubscriptionsService} from "../../../shared/services/subscriptions.service";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {ServicesService} from "../../../shared/services/services.service";
import {Service} from "../../../shared/models/Service";
import {DateFormatter} from "../../../shared/utility/dateFormatter";
import {DateFormatted} from "../../../shared/models/DateFormatted";
import {lookupService} from "dns";

@Component({
    selector: 'app-subscription-change',
    templateUrl: './subscription-change.component.html',
    styleUrls: ['./subscription-change.component.scss']
})

export class SubscriptionChangeComponent implements OnInit {

    subscription: Subscription;
    services: Service[];
    showEdit: boolean;

    public showError: boolean = false;

    constructor(
        private subscriptionsService: SubscriptionsService,
        private servicesService: ServicesService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router) { }

    form: FormGroup;

    // TODO: get DB Data and delete mocks
    // serviceName: String = "Spotify";
    // subscription: Subscription = {uuid: "0", cost: 10, dueDate: 2000, paymentMethod: "paypal", monthlyPayment: true, automaticPayment: false};

    buildForm() {
        if(this.showEdit){
            //EditForm
            this.form = this.formBuilder.group( {
                service: [''],
                dueDate: [DateFormatter.formatDateFromDB(this.subscription.dueDate)], // date as String (2020-05-08)
                cost: [this.subscription.cost],
                monthlyPayment: [this.subscription.monthlyPayment],
                paymentMethod: [this.subscription.paymentMethod],
                automaticPayment: [this.subscription.automaticPayment]
            });
        }else{
            //AddForm
            this.form = this.formBuilder.group( {
                service: [''],
                dueDate: ['', [Validators.required]],
                cost: ['', [Validators.required]],
                monthlyPayment: [false],
                paymentMethod: ['', [Validators.required]],
                automaticPayment: [true]
            });
        }
    }

    submitEdit() {
        this.subscription = {
            uuid: this.subscription.uuid,
            cost: this.form.get('cost').value,
            dueDate: DateFormatter.formatDateToDB(this.form.get('dueDate').value),
            paymentMethod: this.form.get('paymentMethod').value,
            monthlyPayment: this.form.get('monthlyPayment').value,
            automaticPayment: this.form.get('automaticPayment').value,
            service: this.form.get('service').value,
        };

        this.subscriptionsService.editSubscriptions(this.subscription).pipe(
            catchError(() => {
                this.showError = true;
                return of();
            })
        ).subscribe(()=> this.router.navigate(["/subscriptions"]));
    }

    submitAdd() {
        this.subscription = {
            cost: this.form.get('cost').value,
            dueDate: DateFormatter.formatDateToDB(this.form.get('dueDate').value),
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
        this.activatedRoute
            .data
            .subscribe((data) => {this.showEdit = data.showEdit});

        this.subscriptionsService.getSubscription(this.activatedRoute.snapshot.params.uuid)
            .subscribe((subscription) => {
                this.subscription = subscription;

                this.servicesService.getServices()
                    .subscribe((services) => {
                        this.services = services;

                        if(this.showEdit){
                            for(let i = 0; i< services.length; i++){
                                if(services[i].name == this.subscription.service.name) {
                                    services.splice(i, 1);
                                }
                            }
                        }
                    }
                );

                this.buildForm();
            }
        );
    }
}
