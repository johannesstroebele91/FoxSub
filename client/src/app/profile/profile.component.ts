import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    user: User = {};
    showError: boolean = false;

    row0: String[] = [];
    row1: String[] = [];
    row2: String[] = [];
    rows: Object[] = [];

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {

        // load user from the database with resolver
        if (this.activatedRoute.snapshot.data.user) {
            this.user = this.activatedRoute.snapshot.data.user;
            this.row0 = ["First name", this.user.firstName];
            this.row1 = ["Last name", this.user.lastName];
            this.row2 = ["Email", this.user.email];
            this.rows= [this.row0, this.row1, this.row2];
        }
    }

    submitEditProfile() {
        // Adapt goal of user based on new input
        this.userService.editSubscriptionGoal(this.user).pipe(
            catchError(() => {
                this.showError = true;
                return of();
            })
        ).subscribe();
    }
}
