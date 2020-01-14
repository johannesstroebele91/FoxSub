import { Component, OnInit} from '@angular/core';
import { User} from "../../../shared/models/User";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

    showLoginError: boolean = false;

    form: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

    buildLoginForm() {
        this.form = this.formBuilder.group( {
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    submit() {
        this.authService.signIn(this.form.get('email').value, this.form.get('password').value).pipe(
            catchError(() => {
                this.showLoginError = true;
                return of();
            })
        ).subscribe(()=> this.router.navigate(["/subscriptions"]));
    }

    // TODO delete mock data later
    users: User[] = [
        {id: "1",firstName: "Rafail", lastName: "Antoniadis", email: "ra022@hdm-stuttgart.de", goal: 20, montlyCumulatedPayment: 30, nextDueDate: 2020, subscriptionCounter: 6},
        {id: "2",firstName: "Johannes", lastName: "Ströbele", email: "js349@hdm-stuttgart.de", goal: 10, montlyCumulatedPayment: 20, nextDueDate: 2021, subscriptionCounter: 4}];

    ngOnInit(): void {
        this.buildLoginForm()
    }

    // TODO implement logic for invalid form
}
