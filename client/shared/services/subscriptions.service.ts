import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subscription } from "../models/Subscription";

@Injectable(
  { providedIn: 'root' }
)
export class SubscriptionsService {

  private readonly endpoint = "/api/v1/subscriptions";

  constructor(private http: HttpClient) { }

  createSubscriptions(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.endpoint, subscription);
  }

  getSubscriptions() {
    return this.http.get<Subscription[]>(this.endpoint)
  }
}
