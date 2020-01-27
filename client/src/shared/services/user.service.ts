import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable(
    { providedIn: 'root' }
)
export class UserService {

    private readonly endpoint = "/api/v1/user";

    constructor(private http: HttpClient) {}

    getUser(): Observable<User> {
        return this.http.get<User>(this.endpoint);
    }

    editSubscriptionGoal(user: User): Observable<User> {
        return this.http.put<User>(this.endpoint + "/goal", user);
    }

}
