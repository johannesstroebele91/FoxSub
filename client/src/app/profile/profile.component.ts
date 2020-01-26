import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    //TODO: DB Data
    user: User = {};

    row0: String[] = ["First name", this.user.firstName];
    row1: String[] = ["Last name", this.user.lastName];
    row2: String[] = ["Email", this.user.email];
    row3: any[] = ["Subscription goal", this.user.goal + " € / month"];
    rows: Object[] = [this.row0, this.row1, this.row2, this.row3];

    ngOnInit() {

        // load user from the database with resolver
        if (this.activatedRoute.snapshot.data.user) {
            this.user = this.activatedRoute.snapshot.data.user;
        }

    }
}
