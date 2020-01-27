import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";
import {User} from "../models/User";

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<any> {
    constructor(private user: UserService) {}

    resolve(): Observable<User> {
        return this.user.getUser();
    }
}
