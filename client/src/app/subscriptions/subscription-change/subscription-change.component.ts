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

    subscription: Subscription = {dueDate: {}, service: {}};
    services: Service[];
    showEdit: boolean = false;
    form: FormGroup;
    showError: boolean = false;

    constructor(
        private subscriptionsService: SubscriptionsService,
        private servicesService: ServicesService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        if(this.activatedRoute.snapshot.data.subscription){
            this.subscription = this.activatedRoute.snapshot.data.subscription;
            this.showEdit = true;
        }

        if(this.activatedRoute.snapshot.data.services){
            this.services = this.activatedRoute.snapshot.data.services;
        }

        this.buildForm();

        for(let i = 0; i< this.services.length; i++){
            if(this.services[i].name == this.subscription.service.name) {
                // this.services.splice(i, 1);
                this.form.get('service').setValue(this.services[i].uuid);
            }
        }
    }

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
        this.form = this.formBuilder.group( {
            service: ['', [Validators.required]],
            dueDate: [DateFormatter.formatDateFromDB(this.subscription.dueDate), [Validators.required]],
            cost: [this.subscription.cost, [Validators.required]],
            monthlyPayment: [this.subscription.monthlyPayment],
            paymentMethod: [this.subscription.paymentMethod, [Validators.required]],
            automaticPayment: [this.subscription.automaticPayment]
        });
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
}
