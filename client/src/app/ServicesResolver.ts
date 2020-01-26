import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {SubscriptionsService} from "../shared/services/subscriptions.service";
import {ServicesService} from "../shared/services/services.service";
import {Service} from "../shared/models/Service";

@Injectable({ providedIn: 'root' })
export class ServicesResolver implements Resolve<any> {
    constructor(private service: ServicesService) {}

    resolve(): Observable<Service[]> {
        return this.service.getServices();
    }
}
