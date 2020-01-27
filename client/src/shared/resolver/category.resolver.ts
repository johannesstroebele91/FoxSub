import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {Category} from "../models/Category";
import {CategoriesService} from "../services/categories.service";

@Injectable({ providedIn: 'root' })
export class CategoryResolver implements Resolve<any> {
    constructor(private categories: CategoriesService) {}

    resolve(): Observable<Category[]> {
        return this.categories.getCategories();
    }
}
