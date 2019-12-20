import {Component, Input} from '@angular/core';
import {Subscription} from "../../../shared/models/Subscription";
import {User} from "../../../shared/models/User";
import DateTimeFormat = Intl.DateTimeFormat;
import {rename} from "fs";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
    date: Date = new Date();
    //TODO: DB Data
    user: User = new User(1, "Marx", "Karl", "karl.marx@ourland.de", "sicher", 0, 399.99, this.date, 18);

    row0 : String[] = ["Vorname", this.user.firstName];
    row1 : String[] = ["Nachname", this.user.lastName];
    row2 : String[] = ["Email", this.user.email];

    rows : Object[] = [this.row0, this.row1, this.row2];
}