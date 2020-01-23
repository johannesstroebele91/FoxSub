import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {Service} from "../models/Service";

@Injectable(
    { providedIn: 'root' }
)
export class ServicesService {

    private readonly endpoint = "/api/v1/services";

    constructor(private http: HttpClient) { }

    getServices(): Observable<Service[]> {
        return this.http.get<Service[]>(this.endpoint);
    }
}

