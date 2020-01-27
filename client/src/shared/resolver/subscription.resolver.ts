import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {SubscriptionsService} from "../services/subscriptions.service";

@Injectable({ providedIn: 'root' })
export class SubscriptionResolver implements Resolve<any> {
    constructor(private service: SubscriptionsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        return this.service.getSubscription(route.paramMap.get('uuid'));
    }
}
