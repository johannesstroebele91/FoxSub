import { Component } from '@angular/core';
import { User} from "../../../shared/models/User";
import { FormsModule }   from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    // TODO delete mock data later
    users: User[] = [
        {id: "1",firstName: "Rafail", lastName: "Antoniadis", email: "ra022@hdm-stuttgart.de", goal: 20, montlyCumulatedPayment: 30, nextDueDate: 2020, subscriptionCounter: 6},
        {id: "2",firstName: "Johannes", lastName: "Ströbele", email: "js349@hdm-stuttgart.de", goal: 10, montlyCumulatedPayment: 20, nextDueDate: 2021, subscriptionCounter: 4}];

    submitted = false;

    onSubmit() {
        this.submitted = true;
    }
}
