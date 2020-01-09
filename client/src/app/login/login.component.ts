import { Component, OnInit} from '@angular/core';
import { User} from "../../../shared/models/User";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    buildLoginForm() {
        this.form = this.formBuilder.group( {
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    // TODO: implement service
    submit() {
        console.log(this.form.get('email').value);
        console.log(this.form.get('password').value);
    }

    // TODO delete mock data later
    users: User[] = [
        {id: "1",firstName: "Rafail", lastName: "Antoniadis", email: "ra022@hdm-stuttgart.de", goal: 20, montlyCumulatedPayment: 30, nextDueDate: 2020, subscriptionCounter: 6},
        {id: "2",firstName: "Johannes", lastName: "Ströbele", email: "js349@hdm-stuttgart.de", goal: 10, montlyCumulatedPayment: 20, nextDueDate: 2021, subscriptionCounter: 4}];

    ngOnInit(): void {
        this.buildLoginForm()
    }
}
