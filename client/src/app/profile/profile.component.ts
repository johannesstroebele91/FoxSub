import {Component} from '@angular/core';
import {User} from "../../../shared/models/User";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
    date: Date = new Date();
    //TODO: DB Data
    user: User = {id:"0", firstName:"Manni", lastName:"DelGardo", email:"manni@del.gardo", goal:4, montlyCumulatedPayment:3, nextDueDate:121212, subscriptionCounter:6};

    row0 : String[] = ["Vorname", this.user.firstName];
    row1 : String[] = ["Nachname", this.user.lastName];
    row2 : String[] = ["Email", this.user.email];

    rows : Object[] = [this.row0, this.row1, this.row2];
}
