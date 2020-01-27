import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {ServicesService} from "../services/services.service";
import {Service} from "../models/Service";

@Injectable({ providedIn: 'root' })
export class ServicesResolver implements Resolve<any> {
    constructor(private service: ServicesService) {}

    resolve(): Observable<Service[]> {
        return this.service.getServices();
    }
}
