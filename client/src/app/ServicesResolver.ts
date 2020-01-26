import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {ServicesService} from "../shared/services/services.service";
import {Service} from "../shared/models/Service";

@Injectable({ providedIn: 'root' })
export class ServicesResolver implements Resolve<any> {
    constructor(private service: ServicesService) {}

    resolve(): Observable<Service[]> {
        return this.service.getServices();
    }
}
