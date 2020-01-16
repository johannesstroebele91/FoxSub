import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                // TODO: request sigin auf login anpassen @Rafail
                if(error.status === 401 && !request.url.endsWith('signin')) {
                    this.router.navigate(["/login"]);
                }
                const err = error.message || error.statusText;
                return throwError(err);
            })
        );
    }
}
