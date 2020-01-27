import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    showLoginError: boolean = false;

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) { }

    buildLoginForm() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    submit() {
        // Checks if the inserted email and password are correct via the authService
        this.authService.signIn(this.form.get('email').value, this.form.get('password').value).pipe(
            catchError(() => {
                this.showLoginError = true;
                return of();
            })
            // redirect to dashboard screen
        ).subscribe(() => this.router.navigate(['/dashboard']));
    }

    ngOnInit(): void {
        this.buildLoginForm()
    }
}
