import { Injectable} from "@angular/core";
import { HttpClient} from "@angular/common/http";

@Injectable(
    {providedIn: 'root'}
)

export class AuthService {

    private readonly signInEndpoint = "/api/signin";

    constructor(private http: HttpClient) { }

    configUrl = 'assets/config.json';

    signIn(email: string, password: string) {
        return this.http.post(this.signInEndpoint, {email, password});
    }
}
