import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {Category} from "../models/Category";

@Injectable(
    { providedIn: 'root' }
)
export class CategoriesService {

    private readonly endpoint = "/api/v1/subscriptions/general";

    constructor(private http: HttpClient) {
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.endpoint);
    }
}
