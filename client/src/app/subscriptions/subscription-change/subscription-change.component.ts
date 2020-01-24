import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from "../../../shared/models/Subscription";
import {SubscriptionsService} from "../../../shared/services/subscriptions.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {ServicesService} from "../../../shared/services/services.service";
import {Service} from "../../../shared/models/Service";
import {DateFormatter} from "../../../shared/utility/dateFormatter";
import {DateFormatted} from "../../../shared/models/DateFormatted";

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
                dueDate: ['2020-05-30'], // date as String (2020-05-08)
                cost: ['this.subscription.cost'],
                monthlyPayment: [''],
                paymentMethod: [''],
                automaticPayment: ['']
            });
        }else{
            //AddForm
            this.form = this.formBuilder.group( {
                service: ['', [Validators.required]],
                dueDate: [''],
                cost: ['', [Validators.required]],
                monthlyPayment: [false],
                paymentMethod: ['', [Validators.required]],
                automaticPayment: [true]
            });
        }
    }

    submitEdit() {
        //TODO:
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


    date(){
        DateFormatter.formatDateFromDB(this.form.get('dueDate').value);
    }

    ngOnInit() {
        this.activatedRoute
            .data
            .subscribe((data) => {this.showEdit = data.showEdit});

        this.subscriptionsService.getSubscription(this.activatedRoute.snapshot.params.uuid)
            .subscribe((subscription) => {
                console.log(subscription);
                this.subscription = subscription });

        this.servicesService.getServices()
            .subscribe((services) => { this.services = services });

        this.buildForm();
    }
}
