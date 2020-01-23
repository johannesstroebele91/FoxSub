import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable(
    { providedIn: 'root' }
)
export class AuthService {

    private readonly signInEndpoint = "/api/login";

    constructor(private http: HttpClient) { }

    signIn(email: string, password: string) {
        return this.http.post(this.signInEndpoint, { email, password });
    }
}
