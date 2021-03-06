import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
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

  editSubscriptions(subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(this.endpoint + "/" + subscription.uuid, subscription);
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.endpoint)
  }

  deleteSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.delete<Subscription>(this.endpoint + "/" + subscription.uuid);
  }

  getSubscription(uuid: string): Observable<Subscription> {
    if (uuid && uuid !== '') {
      return this.http.get<Subscription>(this.endpoint + "/" + uuid);
    } else {
      return of({})
    }
  }
}

