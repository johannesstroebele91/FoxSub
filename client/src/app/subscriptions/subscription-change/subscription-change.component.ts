import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "../../../shared/models/Subscription";
import { SubscriptionsService } from "../../../shared/services/subscriptions.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ServicesService } from "../../../shared/services/services.service";
import { Service } from "../../../shared/models/Service";
import { DateFormatter } from "../../../shared/utility/dateFormatter";

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

    buildForm() {
        //EditForm
        if (this.showEdit) {
            this.form = this.formBuilder.group({
                service: [''],
                dueDate: [DateFormatter.formatDateFromDB(this.subscription.dueDate)], // date as String (2020-05-08)
                cost: [this.subscription.cost],
                monthlyPayment: [this.subscription.monthlyPayment],
                paymentMethod: [this.subscription.paymentMethod],
                automaticPayment: [this.subscription.automaticPayment]
            });

        }
        //AddForm
        else {
            this.form = this.formBuilder.group({
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
        // Save changed input
        this.subscription = {
            uuid: this.subscription.uuid,
            cost: this.form.get('cost').value,
            dueDate: DateFormatter.formatDateToDB(this.form.get('dueDate').value),
            paymentMethod: this.form.get('paymentMethod').value,
            monthlyPayment: this.form.get('monthlyPayment').value,
            automaticPayment: this.form.get('automaticPayment').value,
            serviceId: this.form.get('service').value,
        };

        // Adapt subscription Object based on new input
        this.subscriptionsService.editSubscriptions(this.subscription).pipe(
            catchError(() => {
                this.showError = true;
                return of();
            })
        ).subscribe(() => this.router.navigate(["/subscriptions"]));
    }

    submitAdd() {
        // Save new input
        this.subscription = {
            cost: this.form.get('cost').value,
            dueDate: DateFormatter.formatDateToDB(this.form.get('dueDate').value),
            paymentMethod: this.form.get('paymentMethod').value,
            monthlyPayment: this.form.get('monthlyPayment').value,
            automaticPayment: this.form.get('automaticPayment').value,
            serviceId: this.form.get('service').value,
        };

        console.log(this.subscription.serviceId)

        // Adapt subscription Object
        this.subscriptionsService.createSubscriptions(this.subscription).pipe(
            catchError(() => {
                this.showError = true;
                return of();
            })
        ).subscribe(() => this.router.navigate(["/subscriptions"]));
    }

    ngOnInit() {
        // change component into edit or add based on button clicked in subscription list
        this.activatedRoute
            .data
            .subscribe((data) => { this.showEdit = data.showEdit });

        // get subscription from the database based on uuid
        this.subscriptionsService.getSubscription(this.activatedRoute.snapshot.params.uuid)
            .subscribe((subscription) => {
                this.subscription = subscription;

                // get all services
                this.servicesService.getServices()
                    .subscribe((services) => {
                        this.services = services;

                        // remove the already selected service from the list of services
                        if (this.showEdit) {
                            for (let i = 0; i < services.length; i++) {
                                if (services[i].name == this.subscription.service.name) {
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
